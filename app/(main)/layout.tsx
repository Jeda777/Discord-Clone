import NavigationSidebar from '@/components/UI/Navigation/NavigationSidebar'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full flex'>
      <NavigationSidebar />
      {children}
    </div>
  )
}

export default MainLayout
