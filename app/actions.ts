'use server'

import { db } from '@/lib/db'
import { MemberRole } from '@prisma/client'

const changeMemberRoleAction = async ({ newRole, memberId }: { newRole: MemberRole; memberId: string }) => {
  const member = await db.serverMember.update({ where: { id: memberId }, data: { role: newRole } })
  return null
}

export { changeMemberRoleAction }
