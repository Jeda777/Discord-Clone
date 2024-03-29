'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface props {
  imageSrc: string
  name: string
  id: string
}

const NavigationButton = ({ imageSrc, name, id }: props) => {
  const router = useRouter()
  return (
    <span
      className={`tooltip static tooltip-right tooltip-position rounded-full transition-all duration-200 w-10 h-10`}
      data-tooltip={name}
      onPointerEnter={(e) => {
        const elementPosition = e.currentTarget.getBoundingClientRect()
        const topPosition = elementPosition.top + elementPosition.height / 2
        const leftPosition = elementPosition.right - 2
        e.currentTarget.style.setProperty('--top', `${topPosition}px`)
        e.currentTarget.style.setProperty('--left', `${leftPosition}px`)
      }}
    >
      <button className='btn btn-circle bg-secondary w-10 h-10' onClick={() => router.push(`/server/${id}`)}>
        <Image className='rounded-full' alt='Server icon' fill src={imageSrc} />
      </button>
    </span>
  )
}

export default NavigationButton
