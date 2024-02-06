'use client'

import { useState, useEffect } from 'react'
import '@livekit/components-styles'
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from '@livekit/components-react'
import { Track } from 'livekit-client'
import { Profile } from '@prisma/client'

interface props {
  channelId: string
  profile: Profile
  audio: boolean
  video: boolean
}

const MediaRoom = ({ channelId, profile, audio, video }: props) => {
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!profile) return
    ;(async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${channelId}&username=${profile.name}`)
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [channelId, profile])

  if (token === '') {
    return <div className='w-full h-full'>Getting token...</div>
  }

  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme='default'
      style={{ height: 'calc(100% - 56px - 61px)' }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen 
        share tracks and to leave the room. */}
      <ControlBar controls={{ leave: false }} />
    </LiveKitRoom>
  )
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  )
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
        as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  )
}

export default MediaRoom
