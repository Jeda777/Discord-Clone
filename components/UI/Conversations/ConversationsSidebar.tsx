import { Conversation } from '@prisma/client'

const ConversationsSidebar = ({ conversations }: { conversations: Conversation[] }) => {
  return <div className='h-full bg-secondary text-primary flex flex-col w-44 items-end p-2 gap-2'>ConversationsSidebar</div>
}

export default ConversationsSidebar
