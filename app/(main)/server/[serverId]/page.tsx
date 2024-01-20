import MembersSideBar from '@/components/UI/Server/MembersSideBar'
import ServerSidebar from '@/components/UI/Server/ServerSidebar'
import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

const ServerPage = async ({ params }: { params: { serverId: string } }) => {
  const profile = await currentProfile()
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })
  if (!server) return redirect('/')

  const role = server.members.find((member) => member.profileId === profile.id)?.role
  if (!role) return redirect('/')

  return (
    <div className='h-full w-full flex'>
      <ServerSidebar server={server} role={role} profileId={profile.id} />
      <div className='w-full'></div>
      <MembersSideBar server={server} role={role} profileId={profile.id} />
    </div>
  )
}

export default ServerPage
