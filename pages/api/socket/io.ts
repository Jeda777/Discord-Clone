import { NextApiResponseServerIo } from '@/types'
import { NextApiRequest } from 'next'
import { Server as ServerIo } from 'socket.io'
import { Server as NetServer } from 'http'

export const config = {
  api: {
    bodyParser: false,
  },
}

const socketHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = '/api/socket/io'
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIo(httpServer, {
      path: path,
      addTrailingSlash: false,
      cors: { origin: process.env.NEXT_PUBLIC_SITE_URL!, methods: ['GET', 'POST', 'PATCH'] },
    })
    res.socket.server.io = io
  }

  res.end()
}
export default socketHandler
