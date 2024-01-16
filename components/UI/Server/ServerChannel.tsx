import { ChannelType, MemberRole } from '@prisma/client'
import Link from 'next/link'
import { IoVideocam, IoVolumeMedium, IoChatboxEllipses } from 'react-icons/io5'
import ChannelSettingsButton from './ChannelSettingsButton'

const ServerChannel = ({
  serverId,
  channelId,
  channelName,
  channelType,
  role,
}: {
  serverId: string
  channelId: string
  channelName: string
  channelType: ChannelType
  role: MemberRole
}) => {
  const iconMap = {
    [ChannelType.TEXT]: IoChatboxEllipses,
    [ChannelType.AUDIO]: IoVolumeMedium,
    [ChannelType.VIDEO]: IoVideocam,
  }
  const Icon = iconMap[channelType]

  const isModerator = role === MemberRole.ADMIN || role === MemberRole.MODERATOR

  return (
    <div className='flex gap-4 items-center group'>
      <Link href={`/server/${serverId}/channel/${channelId}`} className='flex items-center gap-2'>
        <Icon className='md:text-xl text-primary' />
        {channelName}
      </Link>
      {isModerator && <ChannelSettingsButton channelId={channelId} channelName={channelName} />}
    </div>
  )
}

export default ServerChannel
