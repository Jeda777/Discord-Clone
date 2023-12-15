import NavigationSidebar from '@/components/UI/NavigationSidebar'
import { setupProfile } from '@/lib/setupProfile'

const Home = async () => {
  const profile = await setupProfile()
  return (
    <div className='h-full'>
      <NavigationSidebar />
    </div>
  )
}

export default Home
