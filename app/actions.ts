'use server'

import { db } from '@/lib/db'
import { MemberRole } from '@prisma/client'

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

export { changeMemberRoleAction }
