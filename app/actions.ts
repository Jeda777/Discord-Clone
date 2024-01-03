'use server'

import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { createServerFormDataSchema } from '@/lib/schema'
import { MemberRole } from '@prisma/client'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { NextResponse } from 'next/server'

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

export { createServerAction, changeMemberRoleAction, removeServerMemberAction }
