'use client'

import { ServerWithMembersWithProfiles } from '@/types'
import MemberSidebarItem from './MemberSidebarItem'
import { MemberRole } from '@prisma/client'

const MembersSideBar = ({ server, role }: { server: ServerWithMembersWithProfiles; role: MemberRole }) => {
  const admins = server.members.filter((m) => m.role == 'ADMIN')
  const moderators = server.members.filter((m) => m.role == 'MODERATOR')
  const guests = server.members.filter((m) => m.role == 'GUEST')

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <div className='h-full max-h-screen bg-secondary text-primary lg:flex flex-col w-auto items-end p-2 gap-2 hidden'>
      <div className='divider divider-horizontal w-full text-sm mt-2 -mb-1'>Admin</div>
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
