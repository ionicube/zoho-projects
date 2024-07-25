import type { Metadata } from 'next'
import { ThemeProvider } from '@/theme-provider'
import { Theme } from '@radix-ui/themes'
import './globals.css'
import '@radix-ui/themes/styles.css'

export const metadata: Metadata = {
  title: 'Zoho Projects tool',
  description: 'Zoho Projects tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class'>
          <Theme accentColor='violet'>
            {children}
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
