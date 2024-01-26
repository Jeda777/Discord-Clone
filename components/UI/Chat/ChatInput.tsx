'use client'

import { chatInputFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IoAdd } from 'react-icons/io5'
import { z } from 'zod'

const ChatInput = ({ query, type }: { query: Record<string, any>; type: 'channel' | 'conversation' }) => {
  const form = useForm<z.infer<typeof chatInputFormSchema>>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(chatInputFormSchema),
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof chatInputFormSchema>) => {
    console.log(data.content)
    form.reset()
  }

  return (
    <div className='w-full p-2'>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex gap-2 bg-secondary p-2 rounded-3xl items-center'>
        <button type='button' className='bg-muted rounded-full p-1'>
          <IoAdd className='text-3xl text-primary' />
        </button>
        <input
          {...form.register('content')}
          className='input-block focus:outline-none w-full bg-transparent border-none text-primary text-sm'
          placeholder='Send a message...'
          disabled={isLoading}
        />
      </form>
    </div>
  )
}

export default ChatInput
