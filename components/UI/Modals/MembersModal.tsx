'use client'

import { modalStore } from '@/lib/modalStore'
import Member from '../Server/Member'
import { ServerWithMembersWithProfiles } from '@/types'

const MembersModal = () => {
  const { isOpen, type, close, data } = modalStore()
  const isModalOpen = isOpen && type == 'members'
  const { server } = data as { server: ServerWithMembersWithProfiles }

  return (
    <div
      className={`modal ${isModalOpen ? 'visible opacity-100' : ''}`}
      onClick={(e) => (e.target == e.currentTarget ? close() : null)}
    >
      <div className='modal-overlay modal-content flex flex-col gap-8 justify-center bg-background text-primary'>
        <h1 className='text-xl md:text-2xl text-center font-bold'>Members</h1>
        <div className='flex flex-col gap-3 py-2 overflow-scroll max-h-96 hide-scrollbar'>
          {server?.members.map((m) => (
            <Member serverId={server.id} memberId={m.id} role={m.role} name={m.profile.name} imageUrl={m.profile.imageUrl} />
          ))}
        </div>
        <button
          className='btn btn-block bg-indigo-500 text-white text-lg font-semibold'
          onClick={() => {
            close()
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default MembersModal
