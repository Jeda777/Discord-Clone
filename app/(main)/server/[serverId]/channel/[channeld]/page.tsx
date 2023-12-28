import ServerSidebar from '@/components/UI/Server/ServerSidebar'

const ChannelPage = async ({ params }: { params: { serverId: string; channelId: string } }) => {
  return (
    <div className='h-full w-full'>
      <ServerSidebar serverId={params.serverId} />
    </div>
  )
}

export default ChannelPage
