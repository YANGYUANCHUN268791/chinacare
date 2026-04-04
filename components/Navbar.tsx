'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from './LanguageProvider'

const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { locale, setLocale, t, dir } = useLanguage()
  const langDropdownRef = useRef<HTMLDivElement>(null)

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang = languages.find(l => l.code === locale) || languages[0]

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="font-bold text-xl text-gray-900">ChinaCare</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/hospitals" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">
              {t('navbar.hospitals')}
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">
              {t('navbar.howItWorks')}
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">
              {t('navbar.pricing')}
            </Link>
            <Link href="/stories" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">
              Stories
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">
              About
            </Link>
          </div>

          {/* CTA Buttons & Language Selector */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/consult" className="text-blue-700 font-medium hover:underline">
              {t('navbar.freeConsultation')}
            </Link>
            <Link
              href="/get-started"
              className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              {t('navbar.getStarted')}
            </Link>
            
            {/* Language Selector */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="text-sm font-medium text-gray-700">{currentLang.name}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code)
                        setLangOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                        locale === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-3">
              <Link href="/hospitals" className="text-gray-700 font-medium py-2">{t('navbar.hospitals')}</Link>
              <Link href="/how-it-works" className="text-gray-700 font-medium py-2">{t('navbar.howItWorks')}</Link>
              <Link href="/pricing" className="text-gray-700 font-medium py-2">{t('navbar.pricing')}</Link>
              <a href="#hospitals" className="text-gray-700 font-medium py-2">{t('navbar.specialties')}</a>
              <a href="#ai-chat" className="text-blue-700 font-medium py-2">{t('navbar.freeConsultation')}</a>
              <Link href="/get-started" className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-center mt-2">
                {t('navbar.getStarted')}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="border-t border-gray-100 mt-3 pt-3">
                <div className="text-xs text-gray-400 mb-2">Language</div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code)
                        setMenuOpen(false)
                      }}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                        locale === lang.code
                          ? 'bg-blue-700 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
