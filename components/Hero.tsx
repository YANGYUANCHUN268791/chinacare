'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from './LanguageProvider'

function getReply(input: string, t: (key: string) => string): string {
  const lower = input.toLowerCase()
  if (lower.includes('cardiac') || lower.includes('heart') || lower.includes('心脏') || lower.includes('قلب')) return t('ai.cardiac')
  if (lower.includes('cancer') || lower.includes('oncol') || lower.includes('tumor') || lower.includes('癌') || lower.includes('سرطان')) return t('ai.cancer')
  if (lower.includes('orthop') || lower.includes('bone') || lower.includes('joint') || lower.includes('knee') || lower.includes('hip') || lower.includes('骨') || lower.includes('关节') || lower.includes('عظم')) return t('ai.orthopedic')
  if (lower.includes('tcm') || lower.includes('traditional') || lower.includes('chinese medicine') || lower.includes('中医') || lower.includes('طب صيني')) return t('ai.tcm')
  if (lower.includes('neuro') || lower.includes('brain') || lower.includes('spine') || lower.includes('神经') || lower.includes('大脑') || lower.includes('دماغ')) return t('ai.neuro')
  if (lower.includes('liver') || lower.includes('transplant') || lower.includes('肝') || lower.includes('زراعة') || lower.includes('كبد')) return t('ai.liver')
  return t('ai.default')
}

type Message = { role: 'ai' | 'user'; text: string }

export default function Hero() {
  const { t, locale } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: t('hero.aiGreeting') }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  // Keep chat history for context (OpenAI format)
  const historyRef = useRef<{role:'user'|'assistant'; content:string}[]>([])

  // Update greeting when language changes
  useEffect(() => {
    setMessages([{ role: 'ai', text: t('hero.aiGreeting') }])
    historyRef.current = []
  }, [locale])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Add to history
    historyRef.current.push({ role: 'user', content: text })

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyRef.current,
          locale,
        }),
      })
      const data = await res.json()
      const reply = data.message || getReply(text, t)
      historyRef.current.push({ role: 'assistant', content: reply })
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch {
      // Fallback to rule-based on network error
      const reply = getReply(text, t)
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } finally {
      setLoading(false)
    }
  }

  // Quick tags - use translated versions
  const quickTags = [
    t('hero.quickTags.cardiacSurgery'),
    t('hero.quickTags.oncology'),
    t('hero.quickTags.orthopedics'),
    t('hero.quickTags.tcm'),
    t('hero.quickTags.neurology'),
    t('hero.quickTags.liverTransplant'),
  ]

  return (
    <section className="hero-gradient min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">{t('hero.availableHospitals')}</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              {t('hero.title')}
              <br />
              <span className="text-sky-300">{t('hero.subtitle')}</span>
              <br />
              {t('hero.inChina')}
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-lg">
              {t('hero.description')}
            </p>

            <div className="flex gap-8 mb-10">
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-blue-200 text-sm">{t('hero.partnerHospitals')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-blue-200 text-sm">{t('hero.countriesServed')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-blue-200 text-sm">{t('hero.patientsHelped')}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/get-started"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors text-center shadow-lg"
              >
                {t('hero.startJourney')} →
              </Link>
              <Link
                href="/hospitals"
                className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors text-center"
              >
                {t('hero.browseHospitals')}
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-8 text-blue-200 text-sm">
              <span>✓ {t('hero.freeConsultation')}</span>
              <span>✓ {t('hero.noHiddenFees')}</span>
              <span>✓ {t('hero.support247')}</span>
            </div>
          </div>

          {/* Right: Interactive AI Chat */}
          <div>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">AI Care Planner</div>
                  <div className="text-sm text-gray-500">Powered by ChinaCare AI</div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3 mb-4 max-h-52 overflow-y-auto pr-1">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-3 text-sm ${
                      m.role === 'ai'
                        ? 'bg-blue-50 text-gray-700'
                        : 'bg-gray-100 text-gray-700 ml-8'
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {loading && (
                  <div className="bg-blue-50 rounded-xl p-3 text-sm text-gray-400">
                    <span className="animate-pulse">{t('hero.aiAnalyzing')}</span>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  placeholder={t('ai.inputPlaceholder')}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 disabled:opacity-50 transition-colors"
                >
                  {locale === 'ar' ? 'سأل' : locale === 'zh' ? '发送' : 'Ask'}
                </button>
              </div>

              {/* Quick tags */}
              <div className="mt-3 flex gap-2 flex-wrap">
                {quickTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => sendMessage(tag)}
                    className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center text-white/80 text-sm">
              {t('hero.availableLanguages')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
