import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { DirectMessage } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const batch = 20

  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse('Unauthorized', { status: 401 })

    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get('cursor')

    const conversationId = searchParams.get('conversationId')
    if (!conversationId) return new NextResponse('Conversation Id missing', { status: 400 })

    let messages: DirectMessage[]

    if (cursor) {
      messages = await db.directMessage.findMany({
        take: batch,
        skip: 1,
        cursor: { id: cursor },
        where: { conversationId },
        include: { profile: true },
        orderBy: { createdAt: 'desc' },
      })
    } else {
      messages = await db.directMessage.findMany({
        take: batch,
        where: { conversationId },
        include: { profile: true },
        orderBy: { createdAt: 'desc' },
      })
    }

    let nextCursor = null
    if (messages.length === batch) {
      nextCursor = messages[batch - 1].id
    }

    return NextResponse.json({ items: messages, nextCursor })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
