'use client'

import { deleteChannelAction, updateChannelAction } from '@/app/actions'
import { modalStore } from '@/lib/modalStore'
import { changeChannelFormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const EditChannelModal = () => {
  const router = useRouter()
  const { close, type, isOpen, data } = modalStore()
  const isModalOpen = isOpen && type == 'editChannel'
  const { channelId, channelName } = data

  const form = useForm({
    resolver: zodResolver(changeChannelFormDataSchema),
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (channelName) {
      form.setValue('name', channelName)
    }
  }, [channelName, form])

  const isLoading = form.formState.isSubmitting

  if (isModalOpen && channelId && channelName) {
    const onSubmit = async (data: z.infer<typeof changeChannelFormDataSchema>) => {
      const newServer = await updateChannelAction({ data, channelId })
      form.reset()
      router.refresh()
      close()
    }
    const onDelete = async () => {
      const newServer = await deleteChannelAction(channelId)
      form.reset()
      router.refresh()
      close()
    }

    return (
      <div className={`modal visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-2 justify-center bg-background text-primary w-96'>
          <h1 className='text-xl md:text-2xl text-center font-bold mb-4'>Channel Settings</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center items-center'>
            <h2 className='text-lg md:text-xl text-center font-bold'>Change channel name</h2>
            <input
              disabled={isLoading}
              className='input input-solid max-w-full'
              {...form.register('name')}
              placeholder='Server name'
              type='text'
            />
            <button disabled={isLoading} type='submit' className='btn btn-block bg-indigo-500 text-white text-lg font-semibold'>
              Change
            </button>
          </form>
          <h2 className='text-lg md:text-xl text-center font-bold mt-4'>You can delete channel</h2>
          <button className='btn btn-block text-lg bg-destructive text-white font-semibold' onClick={onDelete}>
            Delete
          </button>
          <button className='btn btn-block bg-indigo-500 text-white text-lg font-semibold mt-8' onClick={() => close()}>
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default EditChannelModal
