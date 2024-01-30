import { Conversation } from '@prisma/client'
import ConversationItem from './ConversationItem'

interface props {
  conversations: Conversation[]
  profileId: string
}

const ConversationsSidebar = ({ conversations, profileId }: props) => {
  return (
    <div className='h-full bg-secondary text-primary flex flex-col w-44 shrink-0 p-2 gap-2'>
      <p className='text-xl font-semibold'>Conversations</p>
      {conversations.map((c) => (
        <ConversationItem key={c.id} conversationId={c.id} userId={c.id.replace(profileId, '')} />
      ))}
    </div>
  )
}

export default ConversationsSidebar
