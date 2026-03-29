'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type LanguageContextType = {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Simple translation cache
const translationsCache: Record<string, Record<string, string>> = {}

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState('zh')
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const router = useRouter()
  const pathname = usePathname()
  
  // RTL languages
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  // Load translations
  useEffect(() => {
    async function loadTranslations() {
      // Check if we have cached translations
      if (translationsCache[locale]) {
        setTranslations(translationsCache[locale])
        return
      }
      
      try {
        const messages = await import(`../messages/${locale}.json`)
        const flattened = flattenMessages(messages)
        translationsCache[locale] = flattened
        setTranslations(flattened)
      } catch (e) {
        console.error('Failed to load translations:', e)
      }
    }
    
    loadTranslations()
  }, [locale])

  // Initialize locale from localStorage or detect from path
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && ['zh', 'en', 'ar', 'fr', 'es', 'ru'].includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
  }, [])

  // Update document direction for RTL
  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = locale
  }, [locale, dir])

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    
    // Refresh page to apply new locale
    router.refresh()
  }

  const t = (key: string): string => {
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
