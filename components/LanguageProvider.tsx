'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type LanguageContextType = {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Import all translations at build time
import zhMessages from '../messages/zh.json'
import enMessages from '../messages/en.json'
import arMessages from '../messages/ar.json'
import frMessages from '../messages/fr.json'
import esMessages from '../messages/es.json'
import ruMessages from '../messages/ru.json'

const allMessages: Record<string, Record<string, unknown>> = {
  zh: zhMessages,
  en: enMessages,
  ar: arMessages,
  fr: frMessages,
  es: esMessages,
  ru: ruMessages,
}

// Flatten nested object to dot-notation keys
function flattenMessages(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  
  for (const key in obj) {
    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key
    
    if (typeof value === 'string') {
      result[newKey] = value
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenMessages(value as Record<string, unknown>, newKey))
    }
  }
  
  return result
}

// Pre-compute all flattened translations
const translationsCache: Record<string, Record<string, string>> = {
  zh: flattenMessages(zhMessages),
  en: flattenMessages(enMessages),
  ar: flattenMessages(arMessages),
  fr: flattenMessages(frMessages),
  es: flattenMessages(esMessages),
  ru: flattenMessages(ruMessages),
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState('zh')
  const [mounted, setMounted] = useState(false)
  
  // RTL languages
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  // Initialize locale from localStorage after mount
  useEffect(() => {
    setMounted(true)
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && ['zh', 'en', 'ar', 'fr', 'es', 'ru'].includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
  }, [])

  // Update document direction for RTL
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = dir
      document.documentElement.lang = locale
    }
  }, [locale, dir, mounted])

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }

  const t = (key: string): string => {
    const translations = translationsCache[locale] || translationsCache['zh']
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
