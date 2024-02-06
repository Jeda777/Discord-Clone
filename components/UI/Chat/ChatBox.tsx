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
  serverId?: string
}

const ChatBox = ({ type, name, userImageUrl, query, socketKeyValue, profileId, isModerator, serverId }: props) => {
  return (
    <div className='w-full h-full flex flex-col'>
      <ChatHeader name={name} type={type} userImageUrl={userImageUrl} serverId={serverId} />
      <MessagesBox socketKeyValue={socketKeyValue} type={type} query={query} profileId={profileId} isModerator={isModerator} />
      <ChatInput query={query} />
    </div>
  )
}

export default ChatBox
