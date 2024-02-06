import Link from 'next/link'
import { IoChevronBack } from 'react-icons/io5'

interface props {
  type: 'channel' | 'conversation'
  serverId?: string
}

const ReturnButton = ({ type, serverId }: props) => {
  const url = type === 'channel' && serverId ? `/server/${serverId}` : '/'

  return (
    <Link href={url} className='md:hidden'>
      <IoChevronBack className='text-3xl text-primary' />
    </Link>
  )
}

export default ReturnButton
