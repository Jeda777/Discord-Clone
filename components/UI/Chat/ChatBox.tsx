import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessagesBox from './MessagesBox'

const ChatBox = ({ type, name, userImageUrl }: { type: 'channel' | 'conversation'; name: string; userImageUrl?: string }) => {
  return (
    <div className='w-full h-full flex flex-col'>
      <ChatHeader name={name} type={type} userImageUrl={userImageUrl} />
      <MessagesBox />
      <ChatInput />
    </div>
  )
}

export default ChatBox
