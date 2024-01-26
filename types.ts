import { Channel, Message, Profile, Server, ServerMember, DirectMessage } from '@prisma/client'
import { Socket, Server as NetServer } from 'net'
import { NextApiResponse } from 'next'
import { Server as SocketIoServer } from 'socket.io'

export type ServerWithMembersWithProfiles = Server & {
  members: (ServerMember & { profile: Profile })[]
}
export type ServerWithChannelsWithMembersWithProfiles = Server & {
  members: (ServerMember & { profile: Profile })[]
} & { channels: Channel[] }
export type MessageWithMemberWithProfile = Message & { member: ServerMember & { profile: Profile } }
export type DirectMessageWithProfile = DirectMessage & { profile: Profile }
export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer
    }
  }
}
