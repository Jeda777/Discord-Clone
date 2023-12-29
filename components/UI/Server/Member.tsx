import { modalSecondLayerStore } from '@/lib/modalSecondLayerStore'
import { MemberRole } from '@prisma/client'
import Image from 'next/image'
import { IoEllipsisHorizontal } from 'react-icons/io5'

const Member = ({ memberId, role, name, imageUrl }: { memberId: string; role: MemberRole; name: string; imageUrl: string }) => {
  const { open } = modalSecondLayerStore()

  return (
    <div className='card dropdown p-2'>
      <button className='flex flex-row items-center w-64 gap-2'>
        <Image alt='Member avatar' src={imageUrl} width={32} height={32} className='rounded-full aspect-square' />
        <p className='text-lg font-semibold overflow-clip'>{name}</p>
        <IoEllipsisHorizontal className='text-2xl text-secondary ml-auto' />
      </button>
      <div className='dropdown-menu dropdown-menu-bottom-left bg-background text-primary'>
        <button className='dropdown-item text-sm' onClick={() => open('changeRole', { memberId, memberRole: role })}>
          Change Role
        </button>
        <button className='dropdown-item text-sm' onClick={() => open('removeMember', { memberId })}>
          Remove Member
        </button>
      </div>
    </div>
  )
}

export default Member
