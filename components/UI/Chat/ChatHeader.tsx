import Image from 'next/image'
import { IoChatboxEllipses } from 'react-icons/io5'

interface props {
  type: 'channel' | 'conversation'
  name: string
  userImageUrl?: string
}

const ChatHeader = ({ type, name, userImageUrl }: props) => {
  return (
    <div className='w-full p-3 border-border border-b-2 flex gap-4 items-center'>
      {type == 'conversation' && userImageUrl && (
        <Image className='rounded-full' alt='user profile image' src={userImageUrl} width={32} height={32} />
      )}
      {type == 'channel' && <IoChatboxEllipses className='text-primary text-3xl' />}
      <p className='text-primary font-semibold text-lg'>{name}</p>
    </div>
  )
}

export default ChatHeader
