import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { MemberRole } from '@prisma/client'
import { NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

export const POST = async (req: Request) => {
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse('Unauthorized', { status: 401 })
    const { name, imageUrl } = await req.json()

    const server = await db.server.create({
      data: {
        name: name,
        imageUrl: imageUrl,
        profileId: profile.id,
        inviteCode: uuid(),
        channels: { create: { name: 'General', profileId: profile.id } },
        members: { create: { profileId: profile.id, role: MemberRole.ADMIN } },
      },
    })

    return NextResponse.json(server.id)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
