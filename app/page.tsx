import ThemeButton from '@/components/UI/ThemeButton'
import { setupProfile } from '@/lib/setupProfile'
import { UserButton } from '@clerk/nextjs'

const Home = async () => {
  const profile = await setupProfile()
  return (
    <div>
      <UserButton />
      <ThemeButton />
    </div>
  )
}

export default Home
