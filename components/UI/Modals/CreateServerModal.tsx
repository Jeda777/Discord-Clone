'use client'

import { modalStore } from '@/lib/modalStore'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FileUpload from '../FileUpload'
import { useRouter } from 'next/navigation'
import { createServerFormDataSchema } from '@/lib/schema'
import { createServerAction } from '@/app/actions'

const CreateServerModal = () => {
  const { isOpen, type, close } = modalStore()
  const isModalOpen = isOpen && type == 'createServer'
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(createServerFormDataSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof createServerFormDataSchema>) => {
    const serverId = await createServerAction(data)
    form.reset()
    router.push(`/server/${serverId}`)
    router.refresh()
    close()
  }

  if (isModalOpen)
    return (
      <div className={`modal visible opacity-100}`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-8 justify-center bg-secondary-foreground text-secondary'>
          <h1 className='text-xl md:text-2xl text-center font-bold'>Create Server</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center items-center'>
            <input
              disabled={isLoading}
              className='input input-solid max-w-full'
              onChange={(e) => form.setValue('name', e.target.value)}
              value={form.watch().name}
              placeholder='Server name'
              type='text'
            />
            <div>
              <FileUpload endpoint='serverImage' onChange={form.setValue} value={form.watch().imageUrl} isLoading={isLoading} />
            </div>
            <button disabled={isLoading} type='submit' className='btn btn-block bg-indigo-500 text-white text-lg font-semibold'>
              Create
            </button>
          </form>
        </div>
      </div>
    )
}

export default CreateServerModal
