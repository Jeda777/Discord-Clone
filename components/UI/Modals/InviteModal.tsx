'use client'

import { useOrigin } from '@/hooks/useOrigin'
import { modalStore } from '@/lib/modalStore'

const InviteModal = () => {
  const { isOpen, type, close, data } = modalStore()
  const isModalOpen = isOpen && type == 'invite'
  const { server } = data
  const pathname = useOrigin()

  if (isModalOpen && server) {
    const inviteLink = `${pathname}/invite/${server.inviteCode}`

    return (
      <div className={`modal visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-8 justify-center bg-secondary-foreground text-secondary'>
          <h1 className='text-xl md:text-2xl text-center font-bold'>Invite Friend</h1>
          <input className='input' value={inviteLink}></input>
          <button
            className='btn btn-block bg-indigo-500 text-white text-lg font-semibold'
            onClick={() => {
              navigator.clipboard.writeText(inviteLink)
            }}
          >
            Copy
          </button>
        </div>
      </div>
    )
  }
}

export default InviteModal
