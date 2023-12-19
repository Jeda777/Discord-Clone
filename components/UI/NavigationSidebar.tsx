import { UserButton, redirectToSignIn } from '@clerk/nextjs'
import ThemeButton from './ThemeButton'
import NavigationButton from './NavigationButton'
import NavigationHome from './NavigationHome'
import CreateServerButton from './CreateServerButton'
import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'

const NavigationSidebar = async () => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
    <div className='bg-background flex flex-col w-min p-2 h-full gap-1.5'>
      <NavigationHome />
      <div className='bg-foreground w-8 md:w-10 h-0.5 md:h-[3px] rounded-lg'></div>
      <div id='servers-list' className='flex flex-col gap-1 overflow-y-scroll hide-scrollbar h-full'>
        <CreateServerButton />
        {servers.map((server) => (
          <NavigationButton id={server.id} name={server.name} imageSrc={server.imageUrl} key={server.id} />
        ))}
      </div>
      <div className='bg-foreground w-8 md:w-10 h-0.5 md:h-[3px] rounded-lg'></div>
      <div id='sidebar-settings' className='flex flex-col gap-1'>
        <ThemeButton />
        <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 md:w-10 md:h-10' } }} />
      </div>
    </div>
  )
}

export default NavigationSidebar
