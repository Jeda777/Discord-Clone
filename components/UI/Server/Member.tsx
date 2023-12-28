import Image from 'next/image'
import { IoEllipsisHorizontal } from 'react-icons/io5'

const Member = ({ id, name, imageUrl }: { id: string; name: string; imageUrl: string }) => {
  return (
    <div className='card p-2 flex-row items-center w-64'>
      <Image alt='Member avatar' src={imageUrl} width={32} height={32} className='rounded-full aspect-square' />
      <p className='text-lg font-semibold overflow-clip'>{name}</p>
      <button className='ml-auto shrink-0'>
        <IoEllipsisHorizontal className='text-2xl text-secondary' />
      </button>
    </div>
  )
}

export default Member
