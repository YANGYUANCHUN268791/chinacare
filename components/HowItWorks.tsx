'use client'
import { useLanguage } from './LanguageProvider'

export default function HowItWorks() {
  const { t } = useLanguage()
  
  const steps = [
    {
      step: '01',
      icon: '💬',
      title: t('howItWorks.steps.0.title'),
      desc: t('howItWorks.steps.0.desc'),
    },
    {
      step: '02',
      icon: '🏥',
      title: t('howItWorks.steps.1.title'),
      desc: t('howItWorks.steps.1.desc'),
    },
    {
      step: '03',
      icon: '📋',
      title: t('howItWorks.steps.2.title'),
      desc: t('howItWorks.steps.2.desc'),
    },
    {
      step: '04',
      icon: '✈️',
      title: t('howItWorks.steps.3.title'),
      desc: t('howItWorks.steps.3.desc'),
    },
  ]

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">{t('howItWorks.tagline')}</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-100 z-0" style={{width: 'calc(100% - 2rem)', left: '50%'}} />
              )}
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {s.icon}
                </div>
                <div className="text-blue-700 font-bold text-sm mb-2">Step {s.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
