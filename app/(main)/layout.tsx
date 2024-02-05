interface props {
  children: React.ReactNode
}

const MainLayout = async ({ children }: props) => {
  return <div className='h-full flex'>{children}</div>
}

export default MainLayout
