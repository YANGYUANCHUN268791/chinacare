import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh', 'en', 'ar', 'fr', 'es', 'ru'],
  defaultLocale: 'en',
})
