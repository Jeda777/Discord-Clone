'use client'

import { chatInputFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IoAdd } from 'react-icons/io5'
import { z } from 'zod'
import axios from 'axios'
import qs from 'query-string'
import { modalStore } from '@/lib/modalStore'

const ChatInput = ({ query }: { query: Record<string, any> }) => {
  const { open } = modalStore()

  const form = useForm<z.infer<typeof chatInputFormSchema>>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(chatInputFormSchema),
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof chatInputFormSchema>) => {
    try {
      const url = qs.stringifyUrl({ url: '/api/socket/messages', query })
      await axios.post(url, data)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full p-2'>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex gap-2 bg-secondary p-2 rounded-3xl items-center'>
        <button type='button' className='bg-muted rounded-full p-1' onClick={() => open('messageAttachment', { query })}>
          <IoAdd className='text-3xl text-primary' />
        </button>
        <input
          {...form.register('content')}
          className='input-block focus:outline-none w-full bg-transparent border-none text-primary text-sm'
          placeholder='Send a message...'
          disabled={isLoading}
          type='text'
        />
      </form>
    </div>
  )
}

export default ChatInput
