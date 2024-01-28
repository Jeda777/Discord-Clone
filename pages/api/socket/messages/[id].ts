import { currentProfilePages } from '@/lib/currentProfilePages'
import { db } from '@/lib/db'
import { NextApiResponseServerIo } from '@/types'
import { MemberRole } from '@prisma/client'
import { NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method !== 'DELETE' && req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' })

  const profile = await currentProfilePages(req)

  const { content } = req.body

  const { serverId, channelId, conversationId, id } = req.query
  if (typeof id !== 'string') return res.status(400).json({ error: 'Bad request' })

  if (req.method === 'DELETE') {
    try {
      if (!profile) return res.status(401).json({ error: 'Unauthorized' })

      if (typeof serverId === 'string' && typeof channelId === 'string' && typeof conversationId === 'string')
        return res.status(400).json({ error: 'To many queries' })

      if (typeof serverId === 'string' && typeof channelId === 'string') {
        const server = await db.server.findFirst({
          where: { id: serverId, members: { some: { profileId: profile.id } } },
          include: { members: true },
        })
        if (!server) return res.status(404).json({ error: 'Server not found' })

        const channel = await db.channel.findFirst({ where: { id: channelId, serverId } })
        if (!channel) return res.status(404).json({ error: 'Channel not found' })

        const member = server.members.find((m) => m.profileId === profile.id)
        if (!member) return res.status(404).json({ error: 'Member not found' })

        const existingMessage = await db.message.findUnique({ where: { id } })
        if (!existingMessage) return res.status(404).json({ error: 'Message not found' })

        const canDelete =
          member.role === MemberRole.ADMIN || member.role === MemberRole.MODERATOR || member.id === existingMessage.memberId
        if (!canDelete) return res.status(401).json({ error: 'Unauthorized' })

        const message = await db.message.update({
          where: { id },
          data: { deleted: true },
          include: { member: { include: { profile: true } } },
        })

        const channelKey = `channel:${channelId}:messages:update`

        res.socket.server.io.emit(channelKey, message)

        return res.status(200).json(message)
      }

      if (typeof conversationId === 'string') {
        const conversation = await db.conversation.findFirst({ where: { id: conversationId } })
        if (!conversation) return res.status(404).json({ error: 'Conversation not found' })

        const existingMessage = await db.directMessage.findUnique({ where: { id } })
        if (!existingMessage) return res.status(404).json({ error: 'Message not found' })

        const canDelete = existingMessage.profileId === profile.id
        if (!canDelete) return res.status(401).json({ error: 'Unauthorized' })

        const directMessage = await db.directMessage.update({ where: { id }, data: { deleted: true }, include: { profile: true } })

        const conversationKey = `conversation:${conversationId}:messages:update`

        res.socket.server.io.emit(conversationKey, directMessage)

        return res.status(200).json(directMessage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (req.method === 'PATCH') {
    try {
      if (!profile) return res.status(401).json({ error: 'Unauthorized' })

      if (typeof serverId === 'string' && typeof channelId === 'string' && typeof conversationId === 'string')
        return res.status(400).json({ error: 'To many queries' })

      if (typeof serverId === 'string' && typeof channelId === 'string') {
        const server = await db.server.findFirst({
          where: { id: serverId, members: { some: { profileId: profile.id } } },
          include: { members: true },
        })
        if (!server) return res.status(404).json({ error: 'Server not found' })

        const channel = await db.channel.findFirst({ where: { id: channelId, serverId } })
        if (!channel) return res.status(404).json({ error: 'Channel not found' })

        const member = server.members.find((m) => m.profileId === profile.id)
        if (!member) return res.status(404).json({ error: 'Member not found' })

        const existingMessage = await db.message.findUnique({ where: { id } })
        if (!existingMessage) return res.status(404).json({ error: 'Message not found' })

        const canChange = member.id === existingMessage.memberId
        if (!canChange) return res.status(401).json({ error: 'Unauthorized' })

        const message = await db.message.update({
          where: { id },
          data: { content },
          include: { member: { include: { profile: true } } },
        })

        const channelKey = `channel:${channelId}:messages:update`

        res.socket.server.io.emit(channelKey, message)

        return res.status(200).json(message)
      }

      if (typeof conversationId === 'string') {
        const conversation = await db.conversation.findFirst({ where: { id: conversationId } })
        if (!conversation) return res.status(404).json({ error: 'Conversation not found' })

        const existingMessage = await db.directMessage.findUnique({ where: { id } })
        if (!existingMessage) return res.status(404).json({ error: 'Message not found' })

        const canChange = existingMessage.profileId === profile.id
        if (!canChange) return res.status(401).json({ error: 'Unauthorized' })

        const directMessage = await db.directMessage.update({ where: { id }, data: { content }, include: { profile: true } })

        const conversationKey = `conversation:${conversationId}:messages:update`

        res.socket.server.io.emit(conversationKey, directMessage)

        return res.status(200).json(directMessage)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
