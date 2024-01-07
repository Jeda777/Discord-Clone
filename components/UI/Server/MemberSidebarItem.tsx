import { modalSecondLayerStore } from '@/lib/modalSecondLayerStore'
import { MemberRole } from '@prisma/client'
import Image from 'next/image'
import { IoEllipsisHorizontal } from 'react-icons/io5'

const MemberSidebarItem = ({
  serverId,
  memberId,
  role,
  name,
  imageUrl,
}: {
  serverId: string
  memberId: string
  role: MemberRole
  name: string
  imageUrl: string
}) => {
  const { openSecond } = modalSecondLayerStore()

  return (
    <div className='dropdown p-2 w-auto dark:hover:bg-white hover:bg-black rounded-xl hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-all'>
      <button className='flex flex-row items-center w-40 gap-2'>
        <Image alt='Member avatar' src={imageUrl} width={24} height={24} className='rounded-full aspect-square' />
        <div className='flex flex-col gap-0.5 items-start'>
          <p className='text-sm font-semibold overflow-clip w-[100px] whitespace-nowrap text-left'>{name}</p>
          <p className='text-xs'>{role.charAt(0) + role.slice(1).toLowerCase()}</p>
        </div>
        <IoEllipsisHorizontal className='text-2xl text-primary ml-auto' />
      </button>
      <div className='dropdown-menu dropdown-menu-bottom-left bg-secondary text-primary w-auto px-2'>
        <button
          className='dropdown-item text-xs w-40'
          onClick={() => openSecond('changeRole', { serverId, memberId, memberRole: role })}
        >
          Change Role
        </button>
        <button
          className='dropdown-item text-xs w-40'
          onClick={() => openSecond('removeMember', { serverId, memberId, memberName: name })}
        >
          Remove Member
        </button>
      </div>
    </div>
  )
}

export default MemberSidebarItem
