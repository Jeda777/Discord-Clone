import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

const page = async ({ params }: { params: { inviteCode: string } }) => {
  if (!params.inviteCode) return redirect('/')
  const profile = await currentProfile()

  const existingServer = await db.server.findUnique({
    where: { inviteCode: params.inviteCode, members: { some: { profileId: profile.id } } },
  })
  if (existingServer) return redirect(`/server/${existingServer.id}`)

  const server = await db.server.update({
    where: { inviteCode: params.inviteCode },
    data: { members: { create: { profileId: profile.id } } },
  })
  if (server) return redirect(`/server/${server.id}`)

  return null
}

export default page
