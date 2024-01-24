'use client'

import { IoAdd } from 'react-icons/io5'

const ChatInput = () => {
  return (
    <div className='w-full p-2'>
      <form className='w-full flex gap-2 bg-secondary p-2 rounded-3xl items-center'>
        <button type='button' className='bg-muted rounded-full p-1'>
          <IoAdd className='text-3xl text-primary' />
        </button>
        <input
          className='input-block focus:outline-none w-full bg-transparent border-none text-primary text-sm'
          placeholder='Send a message...'
        />
      </form>
    </div>
  )
}

export default ChatInput
