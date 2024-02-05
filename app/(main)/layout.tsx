import NavigationSidebar from '@/components/UI/Navigation/NavigationSidebar'

interface props {
  children: React.ReactNode
}

const MainLayout = async ({ children }: props) => {
  return (
    <div className='h-full flex'>
      <NavigationSidebar />
      {children}
    </div>
  )
}

export default MainLayout
