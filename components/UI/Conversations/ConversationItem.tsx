import { db } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'

const ConversationItem = async ({ conversationId, userId }: { conversationId: string; userId: string }) => {
  const user = await db.profile.findUnique({ where: { id: userId } })

  if (user) {
    return (
      <Link href={`/conversation/${conversationId}`} className='flex items-center gap-2'>
        <Image alt='user profile image' src={user.imageUrl} width={32} height={32} className='rounded-full' />
        <p className='overflow-clip text-lg'>{user.name}</p>
      </Link>
    )
  }
}

export default ConversationItem
