import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import ThemeProvider from '@/components/providers/ThemeProvider'
import ModalProvider from '@/components/providers/ModalProvider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord Clone',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${font.className} bg-white dark:bg-muted`}>
          <ThemeProvider attribute='class' defaultTheme='dark' storageKey='discord-clone-theme'>
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
