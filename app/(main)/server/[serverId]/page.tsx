import ServerSidebar from '@/components/UI/Server/ServerSidebar'

const ServerPage = ({ params }: { params: { serverId: string } }) => {
  return (
    <div className='h-full w-full flex'>
      <ServerSidebar serverId={params.serverId} />
    </div>
  )
}

export default ServerPage
