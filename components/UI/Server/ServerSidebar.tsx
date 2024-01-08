import ServerHeader from './ServerHeader'
import ServerChannel from './ServerChannel'
import { ServerWithChannelsWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'

const ServerSidebar = async ({ server, role }: { server: ServerWithChannelsWithMembersWithProfiles; role: MemberRole }) => {
  return (
    <div className='h-full bg-secondary text-primary flex flex-col w-44 items-end p-2 gap-2'>
      <ServerHeader server={server} role={role} />
      <div className='bg-foreground w-full h-0.5 md:h-[3px] rounded-lg self-center -mt-2'></div>
      <div className='flex flex-col w-full'>
        {server.channels.map((c) => (
          <ServerChannel
            key={`${server.id}${c.id}`}
            serverId={server.id}
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
