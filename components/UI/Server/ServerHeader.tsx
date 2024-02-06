'use client'

import { modalStore } from '@/lib/modalStore'
import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'
import { IoChevronDown } from 'react-icons/io5'

interface props {
  server: ServerWithMembersWithProfiles
  role: MemberRole
  profileId: string
}

const ServerHeader = ({ server, role, profileId }: props) => {
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  const { open } = modalStore()

  return (
    <div className='dropdown w-full'>
      <button className='p-2 flex items-center justify-between w-full' tabIndex={0}>
        <IoChevronDown className='md:text-2xl text-primary' />
        {server.name}
      </button>
      <div className='dropdown-menu dropdown-menu-bottom-right bg-background'>
        {isModerator && (
          <button className='dropdown-item' onClick={() => open('invite', { server })}>
            Invite Friends
          </button>
        )}
        {isAdmin && (
          <button className='dropdown-item' onClick={() => open('editServer', { server })}>
            Server Settings
          </button>
        )}
        <button className='dropdown-item lg:hidden' onClick={() => open('members', { server, isModerator, profileId })}>
          Members
        </button>
        {isModerator && (
          <button className='dropdown-item' onClick={() => open('createChannel', { server })}>
            Create Channel
          </button>
        )}
        {isAdmin && (
          <button className='dropdown-item dropdown-item-destructive' onClick={() => open('deleteServer', { server })}>
            Delete Server
          </button>
        )}
        <button className='dropdown-item dropdown-item-destructive' onClick={() => open('leaveServer', { server, profileId })}>
          Leave Server
        </button>
      </div>
    </div>
  )
}

export default ServerHeader
