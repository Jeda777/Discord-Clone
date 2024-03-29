import ChatBox from '@/components/UI/Chat/ChatBox'
import ChatHeader from '@/components/UI/Chat/ChatHeader'
import NavigationSidebar from '@/components/UI/Navigation/NavigationSidebar'
import MediaRoom from '@/components/UI/Server/MediaRoom'
import MembersSideBar from '@/components/UI/Server/MembersSideBar'
import ServerSidebar from '@/components/UI/Server/ServerSidebar'
import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { ChannelType, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'

interface props {
  params: { serverId: string; channelId: string }
}

const ChannelPage = async ({ params }: props) => {
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

  const channel = server.channels.find((c) => c.id === params.channelId)
  if (!channel) return redirect(`/server/${params.serverId}`)

  const role = server.members.find((member) => member.profileId === profile.id)?.role
  if (!role) return redirect('/')

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <div className='h-full w-full flex'>
      <div className='h-full hidden md:flex'>
        <NavigationSidebar />
        <ServerSidebar server={server} role={role} profileId={profile.id} />
      </div>

      {channel.type == ChannelType.TEXT ? (
        <ChatBox
          type='channel'
          name={channel.name}
          query={{ serverId: server.id, channelId: channel.id }}
          socketKeyValue={channel.id}
          profileId={profile.id}
          isModerator={isModerator}
          serverId={server.id}
        />
      ) : (
        <div className='overflow-hidden w-full h-full flex-col'>
          <ChatHeader name={channel.name} type='channel' serverId={server.id} />
          <MediaRoom audio={true} video={channel.type === 'VIDEO'} channelId={channel.id} profile={profile} />
        </div>
      )}
      <MembersSideBar server={server} role={role} profileId={profile.id} />
    </div>
  )
}

export default ChannelPage
