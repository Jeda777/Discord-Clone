import { modalSecondLayerStore } from '@/lib/modalSecondLayerStore'
import { $Enums } from '@prisma/client'

const ChangeRoleModal = () => {
  const { isOpen, type, close, data } = modalSecondLayerStore()
  const isModalOpen = isOpen && type == 'changeRole'
  const { memberId, memberRole } = data

  if (isModalOpen)
    return (
      <div className={`modal z-[70] visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-8 justify-center bg-background text-primary'>
          <h1 className='text-xl md:text-2xl text-center font-bold'>Change Role</h1>
          <select className='select select-block' defaultValue={memberRole}>
            <option value={$Enums.MemberRole.ADMIN}>{$Enums.MemberRole.ADMIN}</option>
            <option value={$Enums.MemberRole.MODERATOR}>{$Enums.MemberRole.MODERATOR}</option>
            <option value={$Enums.MemberRole.GUEST}>{$Enums.MemberRole.GUEST}</option>
          </select>
          <button
            className='btn btn-block bg-indigo-500 text-white font-semibold'
            onClick={() => {
              //TODO Change role function
            }}
          >
            Change
          </button>
        </div>
      </div>
    )
  return null
}

export default ChangeRoleModal
