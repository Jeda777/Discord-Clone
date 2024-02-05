import ConversationsSidebar from '@/components/UI/Conversations/ConversationsSidebar'
import NavigationSidebar from '@/components/UI/Navigation/NavigationSidebar'
import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'

const Home = async () => {
  const profile = await currentProfile()

  const allConversations = await db.conversation.findMany({ where: { id: { contains: profile.id } } })

  return (
    <div className='h-full w-full flex'>
      <NavigationSidebar />
      {allConversations.length > 0 && <ConversationsSidebar conversations={allConversations} profileId={profile.id} />}
    </div>
  )
}

export default Home
