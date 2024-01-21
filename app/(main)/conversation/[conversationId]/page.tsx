import ChatBox from '@/components/UI/Chat/ChatBox'
import ConversationsSidebar from '@/components/UI/Conversations/ConversationsSidebar'
import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

const ConversationPage = async ({ params }: { params: { conversationId: string } }) => {
  const profile = await currentProfile()
  const conversation = await db.conversation.findUnique({ where: { id: params.conversationId } })
  if (!conversation) return redirect('/')

  const allConversations = await db.conversation.findMany({ where: { id: { contains: profile.id } } })

  return (
    <div className='h-full w-full flex'>
      {allConversations.length > 0 && <ConversationsSidebar conversations={allConversations} profileId={profile.id} />}
      <ChatBox />
    </div>
  )
}

export default ConversationPage
