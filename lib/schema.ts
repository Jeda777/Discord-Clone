import { z } from 'zod'

const createServerFormDataSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
})

const createChannelFormDataSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
})

export { createServerFormDataSchema, createChannelFormDataSchema }
