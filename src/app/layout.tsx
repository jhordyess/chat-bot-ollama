import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Chat Bot App',
  description: 'A simple chat bot app using Next.js and Gemini API',
  icons: {
    shortcut:
      'https://res.cloudinary.com/jhordyess/image/upload/v1667836186/global/favicon.svg.svg',
    icon: 'https://res.cloudinary.com/jhordyess/image/upload/v1667836186/global/favicon.svg.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
