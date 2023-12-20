import { currentProfile } from '@/lib/currentProfile'

const Home = async () => {
  const profile = await currentProfile()
  return <div className='h-full w-full'></div>
}

export default Home
