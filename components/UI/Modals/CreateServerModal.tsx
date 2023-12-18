'use client'

import { modalStore } from '@/lib/modalStore'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FileUpload from '../FileUpload'

const formSchema = zod.object({
  name: zod.string().min(1),
  imageUrl: zod.string().min(1),
})

const CreateServerModal = () => {
  const { isOpen, close } = modalStore()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit = (data: zod.infer<typeof formSchema>) => {
    console.log(data)
  }
  return (
    <div className={`modal ${isOpen ? 'visible opacity-100' : ''}`} onClick={(e) => (e.target == e.currentTarget ? close() : null)}>
      <div className='modal-overlay modal-content flex flex-col gap-8 justify-center bg-secondary-foreground text-secondary'>
        <h1 className='text-xl md:text-2xl text-center font-bold'>Create Server</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center items-center'>
          <input
            className='input input-solid max-w-full'
            onChange={(e) => form.setValue('name', e.target.value)}
            placeholder='Server name'
            type='text'
          />
          <div>
            <FileUpload endpoint='serverImage' onChange={form.setValue} value={form.getValues()} />
          </div>
          <button type='submit' className='btn btn-block bg-indigo-500 text-white text-lg font-semibold'>
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateServerModal
