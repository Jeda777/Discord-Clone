import CreateServerModal from '@/components/UI/Modals/CreateServerModal'
import NavigationSidebar from '@/components/UI/NavigationSidebar'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full flex'>
      <CreateServerModal />
      <NavigationSidebar />
      {children}
    </div>
  )
}

export default MainLayout
