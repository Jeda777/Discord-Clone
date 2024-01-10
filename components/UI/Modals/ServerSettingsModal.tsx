'use client'

import { modalStore } from '@/lib/modalStore'
import { createServerFormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import FileUpload from '../FileUpload'
import { useEffect } from 'react'

const ServerSettingsModal = () => {
  const router = useRouter()
  const { open, close, type, isOpen, data } = modalStore()
  const isModalOpen = isOpen && type == 'editServer'
  const { server } = data

  const form = useForm({
    resolver: zodResolver(createServerFormDataSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name)
      form.setValue('imageUrl', server.imageUrl)
    }
  }, [server, form])

  const isLoading = form.formState.isSubmitting

  //   const onSubmit = async (data: z.infer<typeof createServerFormDataSchema>) => {
  //     const serverId = await updateServerAction(data)
  //     form.reset()
  //     router.push(`/server/${serverId}`)
  //     router.refresh()
  //     close()
  //   }

  if (isModalOpen)
    return (
      <div className={`modal z-[70] visible opacity-100`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
        <div className='modal-overlay modal-content flex flex-col gap-4 justify-center bg-background text-primary w-96'>
          <h1 className='text-xl md:text-2xl text-center font-bold mb-4'>{server?.name} Settings</h1>
          <form /*onSubmit={form.handleSubmit(onSubmit)}*/ className='flex flex-col gap-4 justify-center items-center'>
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
              Change
            </button>
          </form>
          <button className='btn btn-block text-lg bg-destructive text-white font-semibold' onClick={() => close()}>
            Close
          </button>
        </div>
      </div>
    )
  return null
}

export default ServerSettingsModal
