import ChatBox from '@/components/UI/Chat/ChatBox'
import ConversationsSidebar from '@/components/UI/Conversations/ConversationsSidebar'
import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

const ConversationPage = async ({ params }: { params: { conversationId: string } }) => {
  const profile = await currentProfile()
  const conversation = await db.conversation.findUnique({ where: { id: params.conversationId } })
  if (!conversation) return redirect('/')

  const user = await db.profile.findUniqueOrThrow({ where: { id: conversation.id.replace(profile.id, '') } })

  const allConversations = await db.conversation.findMany({ where: { id: { contains: profile.id } } })

  return (
    <div className='h-full w-full flex'>
      {allConversations.length > 0 && <ConversationsSidebar conversations={allConversations} profileId={profile.id} />}
      <ChatBox
        type='conversation'
        name={user.name}
        userImageUrl={user.imageUrl}
        query={{ conversationId: conversation.id }}
        socketKeyValue={conversation.id}
      />
    </div>
  )
}

export default ConversationPage
