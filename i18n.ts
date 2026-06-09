import { getRequestConfig } from 'next-intl/server'
import { routing } from './lib/routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    throw new Error('Invalid locale')
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
