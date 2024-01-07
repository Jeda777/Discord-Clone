'use client'

import { modalStore } from '@/lib/modalStore'
import { ServerWithMembersWithProfiles } from '@/types'
import { $Enums, MemberRole } from '@prisma/client'
import { IoChevronDown } from 'react-icons/io5'

const ServerHeader = ({ server, role }: { server: ServerWithMembersWithProfiles; role: $Enums.MemberRole | undefined }) => {
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  const { open } = modalStore()

  return (
    <div className='dropdown w-full'>
      <button className='p-2 flex items-center justify-between w-full'>
        <IoChevronDown className='md:text-2xl text-primary' />
        {server.name}
      </button>
      <div className='dropdown-menu dropdown-menu-bottom-right bg-background'>
        {isModerator && (
          <button className='dropdown-item' onClick={() => open('invite', { server })}>
            Invite Friends
          </button>
        )}
        {/* //TODO implement server settings */}
        {isAdmin && <button className='dropdown-item'>Server Settings</button>}
        <button className='dropdown-item lg:hidden' onClick={() => open('members', { server })}>
          Members
        </button>
        {/* //TODO implement channel creation */}
        {isModerator && <button className='dropdown-item'>Create Channel</button>}
        {/* //TODO implement server delete */}
        {isAdmin && <button className='dropdown-item dropdown-item-destructive'>Delete Server</button>}
        {/* //TODO implement leave server */}
        <button className='dropdown-item dropdown-item-destructive'>Leave Server</button>
      </div>
    </div>
  )
}

export default ServerHeader
