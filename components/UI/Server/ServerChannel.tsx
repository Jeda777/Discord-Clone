import { ChannelType } from '@prisma/client'
import Link from 'next/link'
import { IoVideocam, IoVolumeMedium, IoChatboxEllipses } from 'react-icons/io5'

const ServerChannel = ({
  serverId,
  channelId,
  channelName,
  channelType,
}: {
  serverId: string
  channelId: string
  channelName: string
  channelType: ChannelType
}) => {
  const iconMap = {
    [ChannelType.TEXT]: IoChatboxEllipses,
    [ChannelType.AUDIO]: IoVolumeMedium,
    [ChannelType.VIDEO]: IoVideocam,
  }
  const Icon = iconMap[channelType]
  return (
    <Link href={`/server/${serverId}/channel/${channelId}`} className='flex items-center gap-2'>
      <Icon className='md:text-xl text-primary' />
      {channelName}
    </Link>
  )
}

export default ServerChannel
