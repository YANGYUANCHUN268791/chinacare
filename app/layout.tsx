import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://healthroute.xyz'),
  title: {
    default: 'ChinaCare — World-Class Medical Care in China',
    template: '%s | ChinaCare',
  },
  description: 'Access China\'s top hospitals with international departments. AI-powered care planning, multilingual support, visa guidance, and end-to-end journey assistance for global patients.',
  keywords: [
    'China medical tourism',
    'international hospitals China',
    'medical care China foreigners',
    'healthcare China',
    'China hospital international department',
    'medical visa China',
    'cancer treatment China',
    'cardiac surgery China',
    'affordable healthcare China',
    'medical travel China',
    'health route China',
  ],
  authors: [{ name: 'ChinaCare' }],
  creator: 'ChinaCare',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ChinaCare',
    title: 'ChinaCare — World-Class Medical Care in China',
    description: 'Connect with China\'s top hospitals. AI-powered care planning, multilingual support, and full journey assistance.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ChinaCare - Medical Tourism Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChinaCare — World-Class Medical Care in China',
    description: 'Connect with China\'s top hospitals. AI-powered care planning for global patients.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
