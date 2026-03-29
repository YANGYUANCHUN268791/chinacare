// i18n config — translations handled client-side via LanguageProvider
// See components/LanguageProvider.tsx and messages/*.json
export const locales = ['zh', 'en', 'ar', 'fr', 'es', 'ru'] as const
export const defaultLocale = 'zh'
export type Locale = typeof locales[number]
