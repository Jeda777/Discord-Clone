import MembersSideBar from '@/components/UI/Server/MembersSideBar'
import ServerSidebar from '@/components/UI/Server/ServerSidebar'
import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

const ConversationPage = async ({ params }: { params: { conversationId: string } }) => {
  const profile = await currentProfile()
  const conversation = await db.conversation.findUnique({ where: { id: params.conversationId } })
  if (!conversation) return redirect('/')

  return <div className='h-full w-full flex'></div>
}

export default ConversationPage
