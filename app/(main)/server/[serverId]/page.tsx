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

  return (
    <div className='h-full w-full flex'>
      <ServerSidebar serverInfo={server} role={role} />
    </div>
  )
}

export default ServerPage
