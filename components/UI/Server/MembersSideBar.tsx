'use client'

import { ServerWithMembersWithProfiles } from '@/types'
import MemberSidebarItem from './MemberSidebarItem'

const MembersSideBar = ({ server }: { server: ServerWithMembersWithProfiles }) => {
  const admins = server.members.filter((m) => m.role == 'ADMIN')
  const moderators = server.members.filter((m) => m.role == 'MODERATOR')
  const guests = server.members.filter((m) => m.role == 'GUEST')

  return (
    <div className='h-full bg-secondary text-primary lg:flex flex-col w-auto items-end p-2 gap-2 hidden'>
      <div className='divider divider-horizontal w-full text-sm mt-2 -mb-1'>Admin</div>
      {admins.map((m) => (
        <MemberSidebarItem serverId={server.id} memberId={m.id} role={m.role} name={m.profile.name} imageUrl={m.profile.imageUrl} />
      ))}
      {moderators.length > 0 ? <div className='divider divider-horizontal w-full text-sm mt-2 -mb-1'>Moderator</div> : null}

      {moderators.map((m) => (
        <MemberSidebarItem serverId={server.id} memberId={m.id} role={m.role} name={m.profile.name} imageUrl={m.profile.imageUrl} />
      ))}
      {guests.length > 0 ? <div className='divider divider-horizontal w-full text-sm mt-2 -mb-1'>Guest</div> : null}

      {guests.map((m) => (
        <MemberSidebarItem serverId={server.id} memberId={m.id} role={m.role} name={m.profile.name} imageUrl={m.profile.imageUrl} />
      ))}
    </div>
  )
}

export default MembersSideBar
