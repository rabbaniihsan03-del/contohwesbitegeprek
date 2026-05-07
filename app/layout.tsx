import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Geprek rabbdev | Ayam Geprek Premium',
  description: 'Nikmati sensasi ayam geprek pedas dengan sambal khas homemade. Geprek Nusantara - Ayam Geprek yang Bikin Nagih!',
  keywords: ['ayam geprek', 'geprek pedas', 'makanan pedas', 'street food', 'UMKM', 'kuliner Indonesia'],
  authors: [{ name: 'Geprek Nusantara' }],
  creator: 'Geprek Nusantara',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://contohwebsiteumkm.vercel.app',
    title: 'Geprek rabbdev | Ayam Geprek Premium',
    description: 'Nikmati sensasi ayam geprek pedas dengan sambal khas homemade',
    siteName: 'Geprek rabbdev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geprek rabbdev | Ayam Geprek Premium',
    description: 'Nikmati sensasi ayam geprek pedas dengan sambal khas homemade',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
