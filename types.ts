import { Profile, Server, ServerMember } from '@prisma/client'

export type ServerWithMembersWithProfiles = Server & {
  members: (ServerMember & { profile: Profile })[]
}
