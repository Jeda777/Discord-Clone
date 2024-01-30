import { getConversationAction } from '@/app/actions'
import { modalSecondLayerStore } from '@/lib/modalSecondLayerStore'
import { modalStore } from '@/lib/modalStore'
import { MemberRole } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoEllipsisHorizontal } from 'react-icons/io5'

interface props {
  serverId: string
  isModerator: boolean
  memberId: string
  role: MemberRole
  name: string
  imageUrl: string
  isUser?: boolean
}

const Member = ({ serverId, isModerator, memberId, role, name, imageUrl, isUser }: props) => {
  const { close } = modalStore()
  const { openSecond } = modalSecondLayerStore()
  const router = useRouter()

  const handleConversation = async () => {
    const conversationId = await getConversationAction(memberId)
    close()
    return router.push(`/conversation/${conversationId}`)
  }

  if (!isUser) {
    return (
      <div className='card dropdown p-2 bg-secondary'>
        <button className='flex flex-row items-center w-64 gap-2'>
          <Image alt='Member avatar' src={imageUrl} width={32} height={32} className='rounded-full aspect-square' />
          <div className='flex flex-col gap-0.5 items-start'>
            <p className='text-lg font-semibold overflow-clip'>{name}</p>
            <p className='text-sm'>{role.charAt(0) + role.slice(1).toLowerCase()}</p>
          </div>
          <IoEllipsisHorizontal className='text-2xl text-primary ml-auto' />
        </button>
        <div className='dropdown-menu dropdown-menu-bottom-left bg-background text-primary'>
          <button className='dropdown-item text-sm' onClick={handleConversation}>
            Conversation
          </button>
          {isModerator && (
            <button
              className='dropdown-item text-sm'
              onClick={() => openSecond('changeRole', { serverId, memberId, memberRole: role })}
            >
              Change Role
            </button>
          )}
          {isModerator && (
            <button
              className='dropdown-item text-sm'
              onClick={() => openSecond('removeMember', { serverId, memberId, memberName: name })}
            >
              Remove Member
            </button>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div className='card dropdown p-2 bg-secondary'>
        <div className='flex flex-row items-center w-64 gap-2'>
          <Image alt='Member avatar' src={imageUrl} width={24} height={24} className='rounded-full aspect-square' />
          <div className='flex flex-col gap-0.5 items-start'>
            <p className='text-lg font-semibold overflow-clip'>{name}</p>
            <p className='text-sm'>{role.charAt(0) + role.slice(1).toLowerCase()}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Member
