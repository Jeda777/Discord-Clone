import { z } from 'zod'

export const createServerFormDataSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
})

export const createChannelFormDataSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
})

export const changeChannelFormDataSchema = z.object({
  name: z.string().min(1),
})

export const chatInputFormSchema = z.object({
  content: z.string().min(1),
})
