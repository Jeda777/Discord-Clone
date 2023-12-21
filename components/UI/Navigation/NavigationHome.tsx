'use client'

import { useRouter } from 'next/navigation'
import { IoHome } from 'react-icons/io5'

const NavigationHome = () => {
  const router = useRouter()
  return (
    <span className='tooltip tooltip-right rounded-full transition-all duration-200 w-8 h-8 md:w-10 md:h-10' data-tooltip='Home'>
      <button className='btn btn-circle bg-secondary w-8 h-8 md:w-10 md:h-10' onClick={() => router.push('/')}>
        <IoHome className='text-xl md:text-2xl text-primary' />
      </button>
    </span>
  )
}

export default NavigationHome
