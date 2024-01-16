'use client'

import { modalStore } from '@/lib/modalStore'
import { IoSettingsOutline } from 'react-icons/io5'

const ChannelSettingsButton = ({ channelId, channelName }: { channelId: string; channelName: string }) => {
  const { open } = modalStore()

  return (
    <button
      className='flex opacity-0 group-hover:opacity-100 transition-all'
      onClick={() => open('editChannel', { channelId, channelName })}
    >
      <IoSettingsOutline className='md:text-xl text-primary' />
    </button>
  )
}

export default ChannelSettingsButton
