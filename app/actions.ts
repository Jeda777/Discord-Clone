'use server'

import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { changeChannelFormDataSchema, createServerFormDataSchema } from '@/lib/schema'
import { ChannelType, MemberRole, Prisma } from '@prisma/client'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'

const createServerAction = async (data: z.infer<typeof createServerFormDataSchema>) => {
  const profile = await currentProfile()
  const { name, imageUrl } = data

  const server = await db.server.create({
    data: {
      name: name,
      imageUrl: imageUrl,
      profileId: profile.id,
      inviteCode: uuid(),
      channels: { create: { name: 'General', profileId: profile.id } },
      members: { create: { profileId: profile.id, role: MemberRole.ADMIN } },
    },
  })

  return server.id
}

const updateServerAction = async ({ data, serverId }: { data: z.infer<typeof createServerFormDataSchema>; serverId: string }) => {
  const { name, imageUrl } = data

  const server = await db.server.update({
    where: { id: serverId },
    data: { name: name, imageUrl: imageUrl },
  })

  return server
}

const removeServerAction = async ({ serverId }: { serverId: string }) => {
  const server = await db.server.delete({ where: { id: serverId } })

  return server
}

const leaveServerAction = async ({ serverId, profileId }: { serverId: string; profileId: string }) => {
  const member = await db.serverMember.findFirst({ where: { profileId, serverId } })
  if (!member) return false
  if (member.role == MemberRole.ADMIN) {
    const server = await db.server.findUnique({ where: { id: serverId }, include: { members: {} } })
    if (!server?.members || server.members.length == 1) {
      return removeServerAction({ serverId })
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
      if (!oldestModerator?.members) return false
      const server = await db.server.update({
        where: { id: serverId },
        data: {
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
    if (!guests?.members) return false
    const newServer = await db.server.update({
      where: { id: serverId },
      data: {
        members: { deleteMany: { profileId }, update: { where: { id: guests.members[0].id }, data: { role: MemberRole.ADMIN } } },
      },
    })
    return newServer
  }
  const server = await db.server.update({ where: { id: serverId }, data: { members: { deleteMany: { profileId } } } })
  return server
}

const createChannelAction = async ({ serverId, name, type }: { serverId: string; name: string; type: string }) => {
  const profile = await currentProfile()

  const typeMap = new Map([
    ['0', ChannelType.TEXT],
    ['1', ChannelType.AUDIO],
    ['2', ChannelType.VIDEO],
  ])
  const getType = typeMap.get(type)
  if (!getType) return null

  const server = await db.server.update({
    where: { id: serverId },
    data: { channels: { create: { profileId: profile.id, name, type: getType } } },
  })
  return server
}

const updateChannelAction = async ({
  data,
  channelId,
}: {
  data: z.infer<typeof changeChannelFormDataSchema>
  channelId: string
}) => {
  const channel = await db.channel.update({ where: { id: channelId }, data: { name: data.name } })

  return channel
}

const deleteChannelAction = async (channelId: string) => {
  const channel = await db.channel.delete({ where: { id: channelId } })

  return channel
}

const changeMemberRoleAction = async ({
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

const removeServerMemberAction = async ({ serverId, memberId }: { serverId: string; memberId: string }) => {
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

const getConversationAction = async ({ memberId }: { memberId: string }) => {
  const profile = await currentProfile()

  const member = await db.serverMember.findUnique({ where: { id: memberId } })
  if (!member) return null

  const conversation = await db.conversation.findMany({
    where: { AND: [{ members: { some: { profileId: profile.id } } }, { members: { some: { profileId: member.id } } }] },
  })

  if (conversation.length == 0) return createConversationAction({ profileId1: profile.id, profileId2: member.id })
  return conversation[0].id
}

const createConversationAction = async ({ profileId1, profileId2 }: { profileId1: string; profileId2: string }) => {
  const conversation = await db.conversation.create({
    data: { inviteCode: uuid(), members: { create: [{ profileId: profileId1 }, { profileId: profileId2 }] } },
  })

  return conversation.id
}

export {
  createServerAction,
  updateServerAction,
  removeServerAction,
  leaveServerAction,
  createChannelAction,
  updateChannelAction,
  deleteChannelAction,
  changeMemberRoleAction,
  removeServerMemberAction,
  getConversationAction,
}
