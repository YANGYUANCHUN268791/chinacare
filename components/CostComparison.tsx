'use client'
import { useLanguage } from './LanguageProvider'

const procedures = [
  { icon: '❤️', key: 'heartBypass', usa: '$100,000–$200,000', uk: '$40,000–$80,000', china: '$15,000–$35,000', savingPct: '85%' },
  { icon: '🦴', key: 'hipReplacement', usa: '$30,000–$50,000', uk: '$15,000–$25,000', china: '$8,000–$15,000', savingPct: '75%' },
  { icon: '🎗️', key: 'cancerChemo', usa: '$50,000–$150,000', uk: '$30,000–$80,000', china: '$10,000–$40,000', savingPct: '80%' },
  { icon: '🏥', key: 'liverTransplant', usa: '$300,000–$500,000', uk: '$120,000–$200,000', china: '$40,000–$80,000', savingPct: '87%' },
]

const PROCEDURE_NAMES: Record<string, Record<string, string>> = {
  heartBypass:    { zh: '心脏搭桥手术', en: 'Heart Bypass Surgery', ar: 'جراحة مجازة القلب', fr: 'Pontage coronarien', es: 'Bypass coronario', ru: 'Аортокоронарное шунтирование' },
  hipReplacement: { zh: '髋关节置换', en: 'Hip Replacement', ar: 'استبدال مفصل الورك', fr: 'Remplacement de hanche', es: 'Reemplazo de cadera', ru: 'Замена тазобедренного сустава' },
  cancerChemo:    { zh: '癌症治疗（化疗）', en: 'Cancer Treatment (Chemo)', ar: 'علاج السرطان (كيمياء)', fr: 'Traitement du cancer (chimio)', es: 'Tratamiento del cáncer (quimio)', ru: 'Лечение рака (химиотерапия)' },
  liverTransplant:{ zh: '肝移植', en: 'Liver Transplant', ar: 'زراعة الكبد', fr: 'Transplantation hépatique', es: 'Trasplante de hígado', ru: 'Трансплантация печени' },
}

const SAVING_LABEL: Record<string, string> = {
  zh: '最高节省', en: 'Save up to', ar: 'وفر حتى', fr: 'Économisez jusqu\'à', es: 'Ahorra hasta', ru: 'Экономия до'
}

export default function CostComparison() {
  const { t, locale } = useLanguage()

  return (
    <section className="py-24 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sky-300 font-semibold text-sm uppercase tracking-wider">{t('costComparison.tagline')}</span>
          <h2 className="text-4xl font-extrabold text-white mt-2 mb-4">{t('costComparison.title')}</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">{t('costComparison.subtitle')}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-blue-300 text-sm">
                <th className="text-left pb-4 pr-6">{t('costComparison.procedure')}</th>
                <th className="text-center pb-4 px-4">🇺🇸 {t('costComparison.usa')}</th>
                <th className="text-center pb-4 px-4">🇬🇧 {t('costComparison.uk')}</th>
                <th className="text-center pb-4 px-4 text-sky-300 font-bold">🇨🇳 {t('costComparison.china')}</th>
                <th className="text-center pb-4 pl-4">{t('costComparison.savings')}</th>
              </tr>
            </thead>
            <tbody>
              {procedures.map((p) => (
                <tr key={p.key} className="border-t border-blue-800">
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.icon}</span>
                      <span className="font-medium">{PROCEDURE_NAMES[p.key]?.[locale] ?? PROCEDURE_NAMES[p.key]?.en}</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4 text-blue-300">{p.usa}</td>
                  <td className="text-center py-4 px-4 text-blue-300">{p.uk}</td>
                  <td className="text-center py-4 px-4">
                    <span className="bg-sky-500/20 text-sky-300 font-bold px-3 py-1 rounded-lg">{p.china}</span>
                  </td>
                  <td className="text-center py-4 pl-4">
                    <span className="bg-green-500/20 text-green-400 font-bold text-sm px-3 py-1 rounded-full">
                      {SAVING_LABEL[locale] ?? SAVING_LABEL.en} {p.savingPct}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-blue-400 text-sm mt-8">{t('costComparison.footnote')}</p>
      </div>
    </section>
  )
}
