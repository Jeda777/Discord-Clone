import { db } from '@/lib/db'
import ServerHeader from './ServerHeader'
import { currentProfile } from '@/lib/currentProfile'
import { redirect } from 'next/navigation'
import ServerChannel from './ServerChannel'

const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const profile = await currentProfile()
  const server = await db.server.findUnique({
    where: {
      id: serverId,
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
    <div className='h-full bg-secondary text-primary flex flex-col w-44 items-end p-2 gap-2'>
      <ServerHeader id={server.id} name={server.name} role={role} />
      <div className='bg-foreground w-full h-0.5 md:h-[3px] rounded-lg self-center -mt-2'></div>
      <div className='flex flex-col w-full'>
        {server.channels.map((c) => (
          <ServerChannel
            key={`${serverId}${c.id}`}
            serverId={serverId}
            channelId={c.id}
            channelName={c.name}
            channelType={c.type}
          />
        ))}
      </div>
    </div>
  )
}

export default ServerSidebar
