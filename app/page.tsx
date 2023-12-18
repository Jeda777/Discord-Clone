import CreateServerModal from '@/components/UI/Modals/CreateServerModal'
import NavigationSidebar from '@/components/UI/NavigationSidebar'
import { setupProfile } from '@/lib/setupProfile'

const Home = async () => {
  const profile = await setupProfile()
  return (
    <div className='h-full'>
      <CreateServerModal />
      <NavigationSidebar />
    </div>
  )
}

export default Home
