import ThemeButton from '@/components/UI/ThemeButton'
import { UserButton } from '@clerk/nextjs'

const Home = () => {
  return (
    <div>
      <UserButton />
      <ThemeButton />
    </div>
  )
}

export default Home
