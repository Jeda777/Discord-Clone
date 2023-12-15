import { UserButton } from '@clerk/nextjs'
import React from 'react'
import ThemeButton from './ThemeButton'

const NavigationSidebar = () => {
  return (
    <div className='bg-background flex flex-col w-min p-2 h-full'>
      <div id='servers-list' className='flex flex-col gap-1 overflow-x-auto hide-scrollbar h-full'></div>
      <div className='my-1.5 bg-foreground w-8 md:w-10 h-0.5 md:h-[3px] rounded-lg'></div>
      <div id='sidebar-settings' className='flex flex-col gap-1'>
        <ThemeButton />
        <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 md:w-10 md:h-10' } }} />
      </div>
    </div>
  )
}

export default NavigationSidebar
