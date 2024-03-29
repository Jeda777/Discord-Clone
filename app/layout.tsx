import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import ThemeProvider from '@/components/providers/ThemeProvider'
import ModalProvider from '@/components/providers/ModalProvider'
import { SocketProvider } from '@/components/providers/SocketProvider'
import QueryProvider from '@/components/providers/QueryProvider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord Clone',
  description: 'Generated by create next app',
}

interface props {
  children: React.ReactNode
}

export default function RootLayout({ children }: props) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${font.className} bg-white dark:bg-muted`}>
          <ThemeProvider attribute='class' defaultTheme='dark' storageKey='discord-clone-theme'>
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
