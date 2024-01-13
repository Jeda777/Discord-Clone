'use client'

import { modalStore } from '@/lib/modalStore'
import { useRouter } from 'next/navigation'

const DeleteServerModal = () => {
  const { isOpen, type, close, data } = modalStore()
  const isModalOpen = isOpen && type == 'deleteServer'
  const { server } = data
  const router = useRouter()
  if (!server) return close()

  const handleSubmit = async () => {
    //const newServer = await removeServerMemberAction({ serverId, memberId })
    router.push('/')
    close()
  }

  if (isModalOpen)
    return (
      <div className={`modal z-[70] visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-4 justify-center bg-background text-primary w-96'>
          <h1 className='text-xl md:text-2xl text-center font-bold mb-4'>Are you sure you want to delete {server?.name}?</h1>
          <div className='flex gap-4'>
            <button className='btn btn-block bg-indigo-500 text-white font-semibold' onClick={() => close()}>
              NO
            </button>
            <button className='btn btn-block bg-destructive text-white font-semibold' onClick={handleSubmit}>
              YES
            </button>
          </div>
        </div>
      </div>
    )
}

export default DeleteServerModal
