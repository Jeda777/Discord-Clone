import ChatHeader from './ChatHeader'

const ChatBox = ({ type, name, userImageUrl }: { type: 'channel' | 'conversation'; name: string; userImageUrl?: string }) => {
  return (
    <div className='w-full h-full'>
      <ChatHeader name={name} type={type} userImageUrl={userImageUrl} />
    </div>
  )
}

export default ChatBox
