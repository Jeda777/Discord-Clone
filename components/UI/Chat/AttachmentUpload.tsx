'use client'

import { UseFormSetValue } from 'react-hook-form'
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import Image from 'next/image'
import { IoClose, IoDocument } from 'react-icons/io5'

interface props {
  onChange: UseFormSetValue<{ content: string }>
  value: string
  isLoading: boolean
}

const AttachmentUpload = ({ onChange, value, isLoading }: props) => {
  const fileType = value?.split('.').pop()

  if (value) {
    return (
      <div className='relative w-52 h-40 flex flex-col'>
        <button
          className='absolute top-0 right-0 z-10 btn btn-rounded btn-xs bg-primary-foreground h-8 w-8 p-0 hover:scale-125'
          onClick={() => onChange('content', '')}
          disabled={isLoading}
        >
          <IoClose className='text-2xl md:text-3xl text-primary ' />
        </button>
        {fileType === 'pdf' ? (
          <IoDocument className='text-secondary text-[120px] w-full' />
        ) : (
          <Image objectFit='contain' className='w-full' fill alt='Upload' src={value} />
        )}
        {fileType === 'pdf' && (
          <a className='w-full text-center font-semibold text-indigo-500' href={value}>
            Link
          </a>
        )}
      </div>
    )
  } else {
    return (
      <UploadDropzone
        endpoint={'messageFile'}
        onClientUploadComplete={(res) => {
          onChange('content', res[0].url)
        }}
      />
    )
  }
}

export default AttachmentUpload
