import ServerHeader from './ServerHeader'
import ServerChannel from './ServerChannel'
import { ServerWithChannelsWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'

interface props {
  server: ServerWithChannelsWithMembersWithProfiles
  role: MemberRole
  profileId: string
}

const ServerSidebar = async ({ server, role, profileId }: props) => {
  return (
    <div className='h-full bg-secondary text-primary flex flex-col w-60 items-end p-2 gap-2'>
      <ServerHeader server={server} role={role} profileId={profileId} />
      <div className='bg-foreground w-full h-0.5 md:h-[3px] rounded-lg self-center -mt-2'></div>
      <div className='flex flex-col w-full'>
        {server.channels.map((c) => (
          <ServerChannel
            key={`${server.id}${c.id}`}
            serverId={server.id}
            channelId={c.id}
            channelName={c.name}
            channelType={c.type}
            role={role}
          />
        ))}
      </div>
    </div>
  )
}

export default ServerSidebar
