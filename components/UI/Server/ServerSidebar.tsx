import { $Enums, Server } from '@prisma/client'
import ServerHeader from './ServerHeader'

const ServerSidebar = ({ serverInfo, role }: { serverInfo: Server; role: $Enums.MemberRole | undefined }) => {
  return (
    <div className='h-full bg-secondary text-primary flex flex-col w-44 items-end p-2'>
      <ServerHeader id={serverInfo.id} name={serverInfo.name} role={role} />
    </div>
  )
}

export default ServerSidebar
