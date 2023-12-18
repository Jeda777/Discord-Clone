'use client'

import { useRouter } from 'next/navigation'

const NavigationButton = ({ Image, name, id }: { Image: string; name: string; id: string }) => {
  const router = useRouter()
  return (
    <span
      className={`tooltip static tooltip-right tooltip-position rounded-full transition-all duration-200 w-8 h-8 md:w-10 md:h-10`}
      data-tooltip={name}
      onPointerEnter={(e) => {
        const elementPosition = e.currentTarget.getBoundingClientRect()
        console.log(elementPosition)
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
        <img className='rounded-full' src={Image} />
      </button>
    </span>
  )
}

export default NavigationButton
