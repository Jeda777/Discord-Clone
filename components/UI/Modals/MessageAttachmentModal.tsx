import { modalStore } from '@/lib/modalStore'
import React from 'react'
import { chatInputFormSchema } from '@/lib/schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import AttachmentUpload from '../Chat/AttachmentUpload'
import axios from 'axios'
import qs from 'query-string'

const MessageAttachmentModal = () => {
  const { isOpen, type, close, data } = modalStore()
  const isModalOpen = isOpen && type == 'messageAttachment'
  const { query } = data

  const form = useForm({
    resolver: zodResolver(chatInputFormSchema),
    defaultValues: {
      content: '',
    },
  })
  const isLoading = form.formState.isSubmitting

  if (isModalOpen && query) {
    const onSubmit = async (data: z.infer<typeof chatInputFormSchema>) => {
      try {
        const url = qs.stringifyUrl({ url: '/api/socket/messages', query })
        await axios.post(url, { content: data.content, fileUrl: data.content })
        form.reset()
        close()
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <div className={`modal visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-8 justify-center bg-secondary-foreground text-secondary'>
          <h1 className='text-xl md:text-2xl text-center font-bold'>Add an attachment</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center items-center'>
            <div>
              <AttachmentUpload onChange={form.setValue} value={form.watch().content} isLoading={isLoading} />
            </div>
            <button disabled={isLoading} type='submit' className='btn btn-block bg-indigo-500 text-white text-lg font-semibold'>
              Send
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default MessageAttachmentModal
