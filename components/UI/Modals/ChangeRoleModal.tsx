import { changeMemberRoleAction } from '@/app/actions'
import { modalSecondLayerStore } from '@/lib/modalSecondLayerStore'
import { MemberRole } from '@prisma/client'

const ChangeRoleModal = () => {
  const { isOpen, type, close, data } = modalSecondLayerStore()
  const isModalOpen = isOpen && type == 'changeRole'
  const { memberId, memberRole } = data

  const roleMap = new Map([
    ['ADMIN', MemberRole.ADMIN],
    ['MODERATOR', MemberRole.MODERATOR],
    ['GUEST', MemberRole.GUEST],
  ])
  let newRole: MemberRole

  const handleChange = (value: string) => {
    const newRoleMapped = roleMap.get(value)
    if (!newRoleMapped) return null
    newRole = newRoleMapped
  }
  const handleSubmit = () => {
    if (!memberId || !newRole) return null
    changeMemberRoleAction({ newRole, memberId })
    close()
  }

  if (isModalOpen)
    return (
      <div className={`modal z-[70] visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-8 justify-center bg-background text-primary'>
          <h1 className='text-xl md:text-2xl text-center font-bold'>Change Role</h1>
          <select className='select select-block' defaultValue={memberRole} onChange={(e) => handleChange(e.target.value)}>
            <option value={'ADMIN'}>{MemberRole.ADMIN}</option>
            <option value={'MODERATOR'}>{MemberRole.MODERATOR}</option>
            <option value={'GUEST'}>{MemberRole.GUEST}</option>
          </select>
          <button className='btn btn-block bg-indigo-500 text-white font-semibold' onClick={handleSubmit}>
            Change
          </button>
        </div>
      </div>
    )
  return null
}

export default ChangeRoleModal
