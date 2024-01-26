import ChatBox from '@/components/UI/Chat/ChatBox'
import MembersSideBar from '@/components/UI/Server/MembersSideBar'
import ServerSidebar from '@/components/UI/Server/ServerSidebar'
import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'

const ChannelPage = async ({ params }: { params: { serverId: string; channelId: string } }) => {
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

  return (
    <div className='h-full w-full flex'>
      <ServerSidebar server={server} role={role} profileId={profile.id} />
      {channel.type == ChannelType.TEXT && (
        <ChatBox type='channel' name={channel.name} query={{ serverId: server.id, channelId: channel.id }} />
      )}
      <MembersSideBar server={server} role={role} profileId={profile.id} />
    </div>
  )
}

export default ChannelPage
