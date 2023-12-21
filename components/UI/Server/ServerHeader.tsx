import { $Enums, MemberRole } from '@prisma/client'

const ServerHeader = ({ id, name, role }: { id: string; name: string; role: $Enums.MemberRole | undefined }) => {
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <div className='dropdown'>
      <button className='p-2'>{name}</button>
      <div className='dropdown-menu dropdown-menu-bottom-right bg-background'>
        {/* //TODO implement inviting */}
        {isModerator && <button className='dropdown-item'>Invite Friends</button>}
        {/* //TODO implement server settings */}
        {isAdmin && <button className='dropdown-item'>Server Settings</button>}
        {/* //TODO implement manage members */}
        {isAdmin && <button className='dropdown-item'>Members</button>}
        {/* //TODO implement channel creation */}
        {isModerator && <button className='dropdown-item'>Create Channel</button>}
        {/* //TODO implement server delete */}
        {isAdmin && <button className='dropdown-item dropdown-item-destructive'>Delete Server</button>}
        {/* //TODO implement leave server */}
        <button className='dropdown-item dropdown-item-destructive'>Leave Server</button>
      </div>
    </div>
  )
}

export default ServerHeader
