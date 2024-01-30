'use client'

import { modalStore } from '@/lib/modalStore'
import { IoSettingsOutline } from 'react-icons/io5'

interface props {
  channelId: string
  channelName: string
}

const ChannelSettingsButton = ({ channelId, channelName }: props) => {
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
