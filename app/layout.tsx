import "./globals.css"
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import { LanguageProvider } from '@/components/LanguageProvider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
