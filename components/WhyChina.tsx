'use client'
import { useLanguage } from './LanguageProvider'

export default function WhyChina() {
  const { t } = useLanguage()
  
  const reasons = [
    {
      icon: '🏆',
      title: t('whyChina.reasons.0.title'),
      desc: t('whyChina.reasons.0.desc'),
    },
    {
      icon: '💰',
      title: t('whyChina.reasons.1.title'),
      desc: t('whyChina.reasons.1.desc'),
    },
    {
      icon: '⚡',
      title: t('whyChina.reasons.2.title'),
      desc: t('whyChina.reasons.2.desc'),
    },
    {
      icon: '🌐',
      title: t('whyChina.reasons.3.title'),
      desc: t('whyChina.reasons.3.desc'),
    },
    {
      icon: '🧬',
      title: t('whyChina.reasons.4.title'),
      desc: t('whyChina.reasons.4.desc'),
    },
    {
      icon: '🌿',
      title: t('whyChina.reasons.5.title'),
      desc: t('whyChina.reasons.5.desc'),
    },
  ]

  return (
    <section className="py-24 bg-slate-50" id="why-china">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">{t('whyChina.tagline')}</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            {t('whyChina.title')}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {t('whyChina.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm card-hover border border-gray-100">
              <div className="text-4xl mb-4">{r.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
              <p className="text-gray-500 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
