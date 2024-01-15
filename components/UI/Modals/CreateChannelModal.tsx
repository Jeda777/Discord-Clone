'use client'

import { modalStore } from '@/lib/modalStore'
import { createChannelFormDataSchema } from '@/lib/schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { createChannelAction } from '@/app/actions'

const CreateChannelModal = () => {
  const { isOpen, type, close, data } = modalStore()
  const isModalOpen = isOpen && type == 'createChannel'
  const { server } = data
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(createChannelFormDataSchema),
    defaultValues: {
      name: '',
      type: '0',
    },
  })
  const isLoading = form.formState.isSubmitting

  if (isModalOpen && server) {
    const onSubmit = async (data: z.infer<typeof createChannelFormDataSchema>) => {
      const newServer = await createChannelAction({ serverId: server.id, name: data.name, type: data.type })
      form.reset()
      router.refresh()
      close()
    }

    return (
      <div className={`modal visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-8 justify-center bg-secondary-foreground text-secondary'>
          <h1 className='text-xl md:text-2xl text-center font-bold'>Create Channel</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center items-center'>
            <input
              disabled={isLoading}
              className='input input-solid max-w-full'
              {...form.register('name')}
              placeholder='Channel name'
              type='text'
            />
            <select disabled={isLoading} className='select select-block' {...form.register('type')}>
              <option value='0'>Text</option>
              <option value='1'>Audio</option>
              <option value='2'>Video</option>
            </select>
            <button disabled={isLoading} type='submit' className='btn btn-block bg-indigo-500 text-white text-lg font-semibold'>
              Create
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateChannelModal
