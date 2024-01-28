'use client'

import { chatInputFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import qs from 'query-string'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { IoCheckmark, IoClose } from 'react-icons/io5'

const MessageUpdatingInput = ({
  id,
  content,
  query,
  setUpdating,
}: {
  id: string
  content: string
  query: Record<string, any>
  setUpdating: Dispatch<SetStateAction<boolean>>
}) => {
  const form = useForm<z.infer<typeof chatInputFormSchema>>({
    defaultValues: {
      content: content,
    },
    resolver: zodResolver(chatInputFormSchema),
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof chatInputFormSchema>) => {
    try {
      const url = qs.stringifyUrl({ url: `/api/socket/messages/${id}`, query })
      await axios.patch(url, data)
      form.reset()
      setUpdating(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onCancel = () => {
    form.reset()
    setUpdating(false)
  }

  return (
    <div className='w-full'>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex gap-2 bg-secondary p-2 rounded-3xl items-center'>
        <input
          {...form.register('content')}
          className='input-block focus:outline-none w-full bg-transparent border-none text-primary text-sm'
          placeholder='Change a message...'
          disabled={isLoading}
          type='text'
        />
        <button type='button' onClick={onCancel}>
          <IoClose className='text-destructive text-2xl' />
        </button>
        <button>
          <IoCheckmark className='text-emerald-500 text-2xl' />
        </button>
      </form>
    </div>
  )
}

export default MessageUpdatingInput
