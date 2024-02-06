'use client'

import { useRouter } from 'next/navigation'
import { IoHome } from 'react-icons/io5'

const NavigationHome = () => {
  const router = useRouter()
  return (
    <span className='tooltip tooltip-right rounded-full transition-all duration-200 w-10 h-10' data-tooltip='Home'>
      <button className='btn btn-circle bg-secondary w-10 h-10' onClick={() => router.push('/')}>
        <IoHome className='text-2xl text-primary' />
      </button>
    </span>
  )
}

export default NavigationHome
