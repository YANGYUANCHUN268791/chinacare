'use client'
import Link from 'next/link'
import { useLanguage } from './LanguageProvider'

export default function CTASection() {
  const { t } = useLanguage()
  return (
    <section className="py-24 hero-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
          {t('cta.title')}
          <br />
          <span className="text-sky-300">{t('cta.titleHighlight')}</span>
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/get-started" className="bg-white text-blue-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
            {t('cta.getFreePlan')} →
          </Link>
          <Link href="/consult" className="border-2 border-white/60 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
            {t('cta.talkToCoordinator')}
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
          <span>✓ {t('cta.freeConsultation')}</span>
          <span>✓ {t('cta.noWaitingLists')}</span>
          <span>✓ {t('cta.multilingualSupport')}</span>
          <span>✓ {t('cta.transparentPricing')}</span>
        </div>
      </div>
    </section>
  )
}
