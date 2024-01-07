import { Channel, Profile, Server, ServerMember } from '@prisma/client'

export type ServerWithMembersWithProfiles = Server & {
  members: (ServerMember & { profile: Profile })[]
}
export type ServerWithChannelsWithMembersWithProfiles = Server & {
  members: (ServerMember & { profile: Profile })[]
} & { channels: Channel[] }
