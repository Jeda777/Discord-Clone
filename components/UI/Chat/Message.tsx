'use client'

import { Profile } from '@prisma/client'

const Message = ({
  id,
  content,
  fileUrl,
  time,
  deleted,
  isUpdated,
  profile,
  currentProfileId,
  isModerator,
}: {
  id: string
  content: string
  fileUrl: string | null
  time: string
  deleted: boolean
  isUpdated: boolean
  profile: Profile
  currentProfileId: string
  isModerator: boolean
}) => {
  const isOwned = profile.id === currentProfileId
  const canDelete = isOwned || isModerator

  return <div>{content}</div>
}

export default Message
