import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import TrackingPixels from "@/components/tracking-pixels"

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <TrackingPixels />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
