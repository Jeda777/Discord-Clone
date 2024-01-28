import { currentProfilePages } from '@/lib/currentProfilePages'
import { db } from '@/lib/db'
import { NextApiResponseServerIo } from '@/types'
import { NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const profile = await currentProfilePages(req)

  const { content, fileUrl } = req.body
  const { serverId, channelId, conversationId } = req.query

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

      const message = await db.message.create({
        data: { content, channelId, memberId: member.id, fileUrl },
        include: { member: { include: { profile: true } } },
      })

      const channelKey = `channel:${channelId}:messages`

      res.socket.server.io.emit(channelKey, message)

      return res.status(200).json(message)
    }

    if (typeof conversationId === 'string') {
      const conversation = await db.conversation.findFirst({ where: { id: conversationId } })
      if (!conversation) return res.status(404).json({ error: 'Conversation not found' })

      const directMessage = await db.directMessage.create({
        data: { content, conversationId, profileId: profile.id, fileUrl },
        include: { profile: true },
      })

      const conversationKey = `conversation:${conversationId}:messages`

      res.socket.server.io.emit(conversationKey, directMessage)

      return res.status(200).json(directMessage)
    }
  } catch (error) {
    console.log(error)
  }
}
