import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessagesBox from './MessagesBox'

interface props {
  type: 'channel' | 'conversation'
  name: string
  userImageUrl?: string
  query: Record<string, any>
  socketKeyValue: string
  profileId: string
  isModerator: boolean
}

const ChatBox = ({ type, name, userImageUrl, query, socketKeyValue, profileId, isModerator }: props) => {
  return (
    <div className='w-full h-full flex flex-col'>
      <ChatHeader name={name} type={type} userImageUrl={userImageUrl} />
      <MessagesBox socketKeyValue={socketKeyValue} type={type} query={query} profileId={profileId} isModerator={isModerator} />
      <ChatInput query={query} />
    </div>
  )
}

export default ChatBox
