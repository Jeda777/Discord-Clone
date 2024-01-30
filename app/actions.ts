'use server'

import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { changeChannelFormDataSchema, createServerFormDataSchema } from '@/lib/schema'
import { ChannelType, MemberRole } from '@prisma/client'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'

export const createServerAction = async (data: z.infer<typeof createServerFormDataSchema>) => {
  const profile = await currentProfile()
  const { name, imageUrl } = data

  const server = await db.server.create({
    data: {
      name: name,
      imageUrl: imageUrl,
      profileId: profile.id,
      inviteCode: uuid(),
      channels: { create: { name: 'General' } },
      members: { create: { profileId: profile.id, role: MemberRole.ADMIN } },
    },
  })

  return server.id
}

export const updateServerAction = async ({
  data,
  serverId,
}: {
  data: z.infer<typeof createServerFormDataSchema>
  serverId: string
}) => {
  const { name, imageUrl } = data

  const server = await db.server.update({
    where: { id: serverId },
    data: { name: name, imageUrl: imageUrl },
  })

  return server
}

export const removeServerAction = async (serverId: string) => {
  const server = await db.server.delete({ where: { id: serverId } })

  return server
}

export const leaveServerAction = async ({ serverId, profileId }: { serverId: string; profileId: string }) => {
  const member = await db.serverMember.findFirst({ where: { profileId, serverId } })
  if (!member) return
  if (member.role == MemberRole.ADMIN) {
    const server = await db.server.findUnique({ where: { id: serverId }, include: { members: {} } })
    if (!server?.members || server.members.length == 1) {
      return removeServerAction(serverId)
    }
    const admins = server.members.filter((m) => m.role == MemberRole.ADMIN)
    if (admins.length > 1) {
      const server = await db.server.update({ where: { id: serverId }, data: { members: { deleteMany: { profileId } } } })
      return server
    }
    const moderators = server.members.filter((m) => m.role == MemberRole.MODERATOR)
    if (moderators.length > 0) {
      const oldestModerator = await db.server.findUnique({
        where: { id: serverId },
        select: { members: { where: { role: MemberRole.MODERATOR }, orderBy: { createdAt: 'asc' } } },
      })
      if (!oldestModerator?.members) return
      const server = await db.server.update({
        where: { id: serverId },
        data: {
          profileId: oldestModerator.members[0].id,
          members: {
            deleteMany: { profileId },
            update: { where: { id: oldestModerator.members[0].id }, data: { role: MemberRole.ADMIN } },
          },
        },
      })
      return server
    }
    const guests = await db.server.findUnique({
      where: { id: serverId },
      select: { members: { where: { role: MemberRole.GUEST }, orderBy: { createdAt: 'asc' } } },
    })
    if (!guests?.members) return
    const newServer = await db.server.update({
      where: { id: serverId },
      data: {
        profileId: guests.members[0].id,
        members: { deleteMany: { profileId }, update: { where: { id: guests.members[0].id }, data: { role: MemberRole.ADMIN } } },
      },
    })
    return newServer
  }
  const server = await db.server.update({ where: { id: serverId }, data: { members: { deleteMany: { profileId } } } })
  return server
}

export const createChannelAction = async ({ serverId, name, type }: { serverId: string; name: string; type: string }) => {
  const typeMap = new Map([
    ['0', ChannelType.TEXT],
    ['1', ChannelType.AUDIO],
    ['2', ChannelType.VIDEO],
  ])
  const getType = typeMap.get(type)
  if (!getType) return null

  const server = await db.server.update({
    where: { id: serverId },
    data: { channels: { create: { name, type: getType } } },
  })
  return server
}

export const updateChannelAction = async ({
  data,
  channelId,
}: {
  data: z.infer<typeof changeChannelFormDataSchema>
  channelId: string
}) => {
  const channel = await db.channel.update({ where: { id: channelId }, data: { name: data.name } })

  return channel
}

export const deleteChannelAction = async (channelId: string) => {
  const channel = await db.channel.delete({ where: { id: channelId } })

  return channel
}

export const changeMemberRoleAction = async ({
  serverId,
  newRole,
  memberId,
}: {
  serverId: string
  newRole: MemberRole
  memberId: string
}) => {
  const server = await db.server.update({
    where: { id: serverId },
    data: { members: { update: { where: { id: memberId }, data: { role: newRole } } } },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })
  return server
}

export const removeServerMemberAction = async ({ serverId, memberId }: { serverId: string; memberId: string }) => {
  const server = await db.server.update({
    where: { id: serverId },
    data: { members: { delete: { id: memberId } } },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })
  return server
}

export const getConversationAction = async (memberId: string) => {
  const profile = await currentProfile()
  const member = await db.serverMember.findUnique({ where: { id: memberId } })
  if (!member) return null

  const option1 = `${profile.id}${member.profileId}`
  const option2 = `${member.profileId}${profile.id}`

  let conversation = await db.conversation.findUnique({
    where: { id: option1 },
  })

  if (!conversation) {
    conversation = await db.conversation.findUnique({
      where: { id: option2 },
    })
  }

  if (!conversation) return createConversationAction({ profileId1: profile.id, profileId2: member.profileId })
  return conversation.id
}

export const createConversationAction = async ({ profileId1, profileId2 }: { profileId1: string; profileId2: string }) => {
  const conversation = await db.conversation.create({
    data: { inviteCode: uuid(), id: `${profileId1}${profileId2}` },
  })

  return conversation.id
}
