'use client'

import useChatQuery from '@/hooks/useChatQuery'
import { DirectMessageWithProfile, MessageWithMemberWithProfile } from '@/types'
import { Fragment } from 'react'

const MessagesBox = ({
  socketKeyValue,
  type,
  query,
}: {
  socketKeyValue: string
  type: 'channel' | 'conversation'
  query: Record<string, any>
}) => {
  const socketKey =
    type == 'channel'
      ? `channel:${socketKeyValue}:messages`
      : type == 'conversation'
      ? `conversation:${socketKeyValue}:messages`
      : null

  if (!socketKey) return null

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    value: socketKeyValue,
    key: `${type}Id`,
    socketKey: socketKey,
  })

  console.log(data)

  return (
    <div className='flex-1 flex flex-col-reverse'>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.messages.map((m: MessageWithMemberWithProfile | DirectMessageWithProfile) => (
            <div key={m.id}>{m.content}</div>
          ))}
        </Fragment>
      ))}
    </div>
  )
}

export default MessagesBox
