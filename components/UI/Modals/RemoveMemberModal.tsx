'use client'

import { removeServerMemberAction } from '@/app/actions'
import { modalSecondLayerStore } from '@/lib/modalSecondLayerStore'
import { modalStore } from '@/lib/modalStore'
import { useRouter } from 'next/navigation'

const RemoveMemberModal = () => {
  const router = useRouter()
  const { isOpenSecond, typeSecond, closeSecond, dataSecond } = modalSecondLayerStore()
  const { open, close } = modalStore()
  const isModalOpen = isOpenSecond && typeSecond == 'removeMember'
  const { serverId, memberId, memberName } = dataSecond

  const handleSubmit = async () => {
    if (!memberId || !serverId) return null
    const server = await removeServerMemberAction({ serverId, memberId })
    router.refresh()
    closeSecond()
    close()
    open('members', { server })
  }

  if (isModalOpen)
    return (
      <div className={`modal z-[70] visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? closeSecond() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-8 justify-center bg-background text-primary w-96'>
          <h1 className='text-xl md:text-2xl text-center font-bold'>Are you sure you want to remove {memberName}?</h1>
          <div className='flex gap-4'>
            <button className='btn btn-block bg-indigo-500 text-white font-semibold' onClick={() => closeSecond()}>
              NO
            </button>
            <button className='btn btn-block bg-destructive text-white font-semibold' onClick={handleSubmit}>
              YES
            </button>
          </div>
        </div>
      </div>
    )
  return null
}

export default RemoveMemberModal
