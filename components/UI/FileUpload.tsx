'use client'

import { UseFormSetValue } from 'react-hook-form'
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'

const FileUpload = ({
  endpoint,
  onChange,
  value,
}: {
  endpoint: 'messageFile' | 'serverImage'
  onChange: UseFormSetValue<{ name: string; imageUrl: string }>
  value: { name: string; imageUrl: string }
}) => {
  if (value.imageUrl) {
    return (
      <div className='relative w-32 h-32'>
        <button
          className='absolute top-0 right-0 z-10 btn btn-rounded btn-xs bg-primary-foreground h-8 w-8 p-0 hover:scale-125'
          onClick={() => onChange('imageUrl', '')}
        >
          <IoClose className='text-2xl md:text-3xl text-primary ' />
        </button>

        <Image className='w-full h-auto rounded-full' fill alt='Upload' src={value.imageUrl} />
      </div>
    )
  } else {
    return (
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange('imageUrl', res[0].url)
        }}
      />
    )
  }
}

export default FileUpload
