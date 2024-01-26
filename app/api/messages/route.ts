import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { Message } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const batch = 20

  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse('Unauthorized', { status: 401 })

    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get('cursor')

    const channelId = searchParams.get('channelId')
    if (!channelId) return new NextResponse('Channel Id missing', { status: 400 })

    let messages: Message[]

    if (cursor) {
      messages = await db.message.findMany({
        take: batch,
        skip: 1,
        cursor: { id: cursor },
        where: { channelId },
        include: { member: { include: { profile: true } } },
        orderBy: { createdAt: 'desc' },
      })
    } else {
      messages = await db.message.findMany({
        take: batch,
        where: { channelId },
        include: { member: { include: { profile: true } } },
        orderBy: { createdAt: 'desc' },
      })
    }

    let nextCursor = null
    if (messages.length === batch) {
      nextCursor = messages[batch - 1].id
    }

    return NextResponse.json({ messages, nextCursor })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
