import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessagesBox from './MessagesBox'

const ChatBox = ({
  type,
  name,
  userImageUrl,
  query,
  socketKeyValue,
}: {
  type: 'channel' | 'conversation'
  name: string
  userImageUrl?: string
  query: Record<string, any>
  socketKeyValue: string
}) => {
  return (
    <div className='w-full h-full flex flex-col'>
      <ChatHeader name={name} type={type} userImageUrl={userImageUrl} />
      <MessagesBox socketKeyValue={socketKeyValue} type={type} query={query} />
      <ChatInput query={query} type={type} />
    </div>
  )
}

export default ChatBox
