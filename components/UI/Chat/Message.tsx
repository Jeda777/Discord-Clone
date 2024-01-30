'use client'

import { modalStore } from '@/lib/modalStore'
import { Profile } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'
import { IoDocument, IoEllipsisVertical } from 'react-icons/io5'
import MessageUpdatingInput from './MessageUpdatingInput'

interface props {
  id: string
  content: string
  fileUrl: string | null
  time: string
  deleted: boolean
  isUpdated: boolean
  profile: Profile
  currentProfileId: string
  isModerator: boolean
  query: Record<string, any>
}

const Message = ({ id, content, fileUrl, time, deleted, isUpdated, profile, currentProfileId, isModerator, query }: props) => {
  const [updating, setUpdating] = useState(false)

  const { open } = modalStore()

  const isOwned = profile.id === currentProfileId
  const canDelete = isOwned || isModerator

  return (
    <div className='flex gap-3'>
      <Image width={40} height={40} alt='Profile image' src={profile.imageUrl} className='rounded-full h-min' />
      <div className='flex flex-col gap-1'>
        <div className='flex gap-2 items-center'>
          <p className='text-primary text-sm font-bold opacity-70'>
            {profile.name}
            {isOwned && <span> (you)</span>}
          </p>
          <p className='text-primary text-xs font-semibold opacity-70 self-end'>{time}</p>
          {isUpdated && !deleted && <p className='text-primary text-xs font-semibold opacity-70 self-end'>Updated</p>}
          {canDelete && !deleted && !updating && (
            <div className='dropdown h-[14px] flex'>
              <button>
                <IoEllipsisVertical className='text-sm text-primary font-semibold opacity-70 hover:opacity-100' />
              </button>
              <div className='dropdown-menu dropdown-menu-bottom-left bg-background'>
                {!fileUrl && (
                  <button className='dropdown-item text-sm text-primary' onClick={() => setUpdating(true)}>
                    Change
                  </button>
                )}
                <button
                  className='dropdown-item text-sm text-primary'
                  onClick={() => open('deleteMessage', { messageId: id, query })}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
        {!deleted && (
          <div>
            {' '}
            {!fileUrl && !updating && <p className='text-primary'>{content}</p>}
            {!fileUrl && updating && <MessageUpdatingInput content={content} id={id} query={query} setUpdating={setUpdating} />}
            {fileUrl && fileUrl.split('.').pop() === 'pdf' && (
              <a href={fileUrl} target='_blank'>
                <IoDocument className='text-primary text-8xl' />
              </a>
            )}
            {fileUrl && fileUrl.split('.').pop() !== 'pdf' && (
              <Image alt='attached image' width={1920} height={1080} src={fileUrl} className='w-60 h-auto mt-1' />
            )}
          </div>
        )}
        {deleted && <p className='text-primary opacity-70'>Message deleted</p>}
      </div>
    </div>
  )
}

export default Message
