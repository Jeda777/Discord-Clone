'use client'

import { modalStore } from '@/lib/modalStore'
import { IoAdd } from 'react-icons/io5'

const CreateServerButton = () => {
  const { open } = modalStore()
  return (
    <span
      className={`tooltip static tooltip-right tooltip-position rounded-full transition-all duration-200 w-8 h-8 md:w-10 md:h-10`}
      data-tooltip='Create Server'
      onPointerEnter={(e) => {
        const elementPosition = e.currentTarget.getBoundingClientRect()
        const topPosition = elementPosition.top + elementPosition.height / 2
        const leftPosition = elementPosition.right - 2
        e.currentTarget.style.setProperty('--top', `${topPosition}px`)
        e.currentTarget.style.setProperty('--left', `${leftPosition}px`)
      }}
    >
      <button className='btn btn-circle bg-secondary w-8 h-8 md:w-10 md:h-10' onClick={() => open('createServer')}>
        <IoAdd className='text-2xl md:text-4xl text-primary' />
      </button>
    </span>
  )
}

export default CreateServerButton
