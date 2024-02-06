'use client'

import { useTheme } from 'next-themes'

import { IoMoon, IoSunny } from 'react-icons/io5'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  return (
    <button
      className='btn btn-circle bg-secondary w-10 h-10'
      onClick={() => {
        theme == 'light' ? setTheme('dark') : theme == 'dark' ? setTheme('light') : console.error('Theme not recognized')
      }}
    >
      {theme == 'light' ? <IoSunny className='text-2xl text-primary' /> : <IoMoon className='text-2xl text-primary' />}
    </button>
  )
}

export default ThemeButton
