'use client'

import { ServerWithMembersWithProfiles } from '@/types'
import MemberSidebarItem from './MemberSidebarItem'
import { MemberRole } from '@prisma/client'

const MembersSideBar = ({
  server,
  role,
  profileId,
}: {
  server: ServerWithMembersWithProfiles
  role: MemberRole
  profileId: string
}) => {
  const user = server.members.filter((m) => m.profileId == profileId)

  const membersWithoutUser = server.members.filter((m) => m.profileId != profileId)

  const admins = membersWithoutUser.filter((m) => m.role == 'ADMIN')
  const moderators = membersWithoutUser.filter((m) => m.role == 'MODERATOR')
  const guests = membersWithoutUser.filter((m) => m.role == 'GUEST')

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <div className='h-full max-h-screen bg-secondary text-primary lg:flex flex-col w-auto items-end p-2 gap-2 hidden'>
      <MemberSidebarItem
        key={user[0].id}
        serverId={server.id}
        isModerator={isModerator}
        memberId={user[0].id}
        role={user[0].role}
        name={user[0].profile.name}
        imageUrl={user[0].profile.imageUrl}
        isUser
      />
      {admins.length > 0 ? <div className='divider divider-horizontal w-full text-sm mt-2 -mb-1'>Admin</div> : null}
      {admins.map((m) => (
        <MemberSidebarItem
          key={m.id}
          serverId={server.id}
          isModerator={isModerator}
          memberId={m.id}
          role={m.role}
          name={m.profile.name}
          imageUrl={m.profile.imageUrl}
        />
      ))}
      {moderators.length > 0 ? <div className='divider divider-horizontal w-full text-sm mt-2 -mb-1'>Moderator</div> : null}

      {moderators.map((m) => (
        <MemberSidebarItem
          key={m.id}
          serverId={server.id}
          isModerator={isModerator}
          memberId={m.id}
          role={m.role}
          name={m.profile.name}
          imageUrl={m.profile.imageUrl}
        />
      ))}
      {guests.length > 0 ? <div className='divider divider-horizontal w-full text-sm mt-2 -mb-1'>Guest</div> : null}

      {guests.map((m) => (
        <MemberSidebarItem
          key={m.id}
          serverId={server.id}
          isModerator={isModerator}
          memberId={m.id}
          role={m.role}
          name={m.profile.name}
          imageUrl={m.profile.imageUrl}
        />
      ))}
    </div>
  )
}

export default MembersSideBar
