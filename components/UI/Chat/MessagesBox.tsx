'use client'

import useChatQuery from '@/hooks/useChatQuery'
import { DirectMessageWithProfile, MessageWithMemberWithProfile } from '@/types'
import { Fragment } from 'react'
import moment from 'moment'
import Message from './Message'
import useChatSocket from '@/hooks/useChatSocket'

interface props {
  socketKeyValue: string
  type: 'channel' | 'conversation'
  query: Record<string, any>
  profileId: string
  isModerator: boolean
}

const MessagesBox = ({ socketKeyValue, type, query, profileId, isModerator }: props) => {
  const dateFormat = 'D MMM YYYY HH:mm:ss'

  const socketKey = `${type}:${socketKeyValue}:messages`

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatQuery({
    value: socketKeyValue,
    key: `${type}Id`,
    socketKey: socketKey,
  })
  useChatSocket({ socketKey, socketUpdateKey: `${socketKey}:update` })

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const isBottom = e.currentTarget.children[0].getBoundingClientRect().top >= e.currentTarget.scrollHeight
    if (isBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <div onScroll={(e) => handleScroll(e)} className='flex-1 flex flex-col-reverse px-4 py-2 gap-4 overflow-scroll hide-scrollbar'>
      <div></div>
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
