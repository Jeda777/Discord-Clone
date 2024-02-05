import ChatBox from '@/components/UI/Chat/ChatBox'
import ConversationsSidebar from '@/components/UI/Conversations/ConversationsSidebar'
import NavigationSidebar from '@/components/UI/Navigation/NavigationSidebar'
import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

interface props {
  params: { conversationId: string }
}

const ConversationPage = async ({ params }: props) => {
  const profile = await currentProfile()
  const conversation = await db.conversation.findUnique({ where: { id: params.conversationId } })
  if (!conversation) return redirect('/')

  const user = await db.profile.findUnique({ where: { id: conversation.id.replace(profile.id, '') } })
  if (!user) return redirect('/')

  const allConversations = await db.conversation.findMany({ where: { id: { contains: profile.id } } })

  return (
    <div className='h-full w-full flex'>
      <div className='h-full w-full hidden md:flex'>
        <NavigationSidebar />
        {allConversations.length > 0 && <ConversationsSidebar conversations={allConversations} profileId={profile.id} />}
      </div>
      <ChatBox
        type='conversation'
        name={user.name}
        userImageUrl={user.imageUrl}
        query={{ conversationId: conversation.id }}
        socketKeyValue={conversation.id}
        profileId={profile.id}
        isModerator={false}
      />
    </div>
  )
}

export default ConversationPage
