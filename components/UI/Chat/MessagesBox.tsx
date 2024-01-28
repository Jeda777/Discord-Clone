'use client'

import useChatQuery from '@/hooks/useChatQuery'
import { DirectMessageWithProfile, MessageWithMemberWithProfile } from '@/types'
import { Fragment } from 'react'
import moment from 'moment'
import Message from './Message'
import useChatSocket from '@/hooks/useChatSocket'

const MessagesBox = ({
  socketKeyValue,
  type,
  query,
  profileId,
  isModerator,
}: {
  socketKeyValue: string
  type: 'channel' | 'conversation'
  query: Record<string, any>
  profileId: string
  isModerator: boolean
}) => {
  const dateFormat = 'D MMM YYYY HH:mm:ss'

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
  useChatSocket({ socketKey, socketUpdateKey: `${socketKey}:update` })

  return (
    <div className='flex-1 flex flex-col-reverse px-4 py-2 gap-4 overflow-scroll hide-scrollbar'>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {type == 'channel' &&
            group.items.map((m: MessageWithMemberWithProfile) => (
              <Message
                key={m.id}
                id={m.id}
                content={m.content}
                fileUrl={m.fileUrl}
                time={moment(m.createdAt).format(`${dateFormat}`)}
                deleted={m.deleted}
                isUpdated={m.createdAt !== m.updatedAt}
                profile={m.member.profile}
                currentProfileId={profileId}
                isModerator={isModerator}
                query={query}
              />
            ))}
          {type == 'conversation' &&
            group.items.map((m: DirectMessageWithProfile) => (
              <Message
                key={m.id}
                id={m.id}
                content={m.content}
                fileUrl={m.fileUrl}
                time={moment(m.createdAt).format(`${dateFormat}`)}
                deleted={m.deleted}
                isUpdated={m.createdAt !== m.updatedAt}
                profile={m.profile}
                currentProfileId={profileId}
                isModerator={isModerator}
                query={query}
              />
            ))}
        </Fragment>
      ))}
    </div>
  )
}

export default MessagesBox
