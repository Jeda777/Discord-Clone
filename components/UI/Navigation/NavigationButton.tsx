'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NavigationButton = ({ imageSrc, name, id }: { imageSrc: string; name: string; id: string }) => {
  const router = useRouter()
  return (
    <span
      className={`tooltip static tooltip-right tooltip-position rounded-full transition-all duration-200 w-8 h-8 md:w-10 md:h-10`}
      data-tooltip={name}
      onPointerEnter={(e) => {
        const elementPosition = e.currentTarget.getBoundingClientRect()
        const topPosition = elementPosition.top + elementPosition.height / 2
        const leftPosition = elementPosition.right - 2
        e.currentTarget.style.setProperty('--top', `${topPosition}px`)
        e.currentTarget.style.setProperty('--left', `${leftPosition}px`)
      }}
    >
      <button
        className='btn btn-circle bg-primary-foreground border-border border-2 w-8 h-8 md:w-10 md:h-10'
        onClick={() => router.push(`server/${id}`)}
      >
        <Image className='rounded-full' alt='Server icon' fill src={imageSrc} />
      </button>
    </span>
  )
}

export default NavigationButton
