'use client'

import { changeMemberRoleAction } from '@/app/actions'
import { modalSecondLayerStore } from '@/lib/modalSecondLayerStore'
import { modalStore } from '@/lib/modalStore'
import { MemberRole } from '@prisma/client'
import { useRouter } from 'next/navigation'

const ChangeRoleModal = () => {
  const router = useRouter()
  const { isOpenSecond, typeSecond, closeSecond, dataSecond } = modalSecondLayerStore()
  const { open, close } = modalStore()
  const isModalOpen = isOpenSecond && typeSecond == 'changeRole'
  const { serverId, memberId, memberRole } = dataSecond

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
  const handleSubmit = async () => {
    if (!memberId || !newRole || !serverId) return null
    const server = await changeMemberRoleAction({ serverId, newRole, memberId })
    router.refresh()
    closeSecond()
    close()
    open('members', { server })
  }

  if (isModalOpen)
    return (
      <div className={`modal z-[70] visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? closeSecond() : null)}>
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
