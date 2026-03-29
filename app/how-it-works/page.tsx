'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'

export default function HowItWorksPage() {
  const { locale, t } = useLanguage()
  const isZh = locale === 'zh'

  const steps = isZh ? [
    {
      num: '01',
      icon: '💬',
      title: '初步咨询',
      duration: '24小时',
      color: 'bg-blue-50 border-blue-200',
      accent: 'text-blue-700',
      details: [
        '通过在线表单或AI聊天提交您的医疗需求',
        '我们的就医协调员在24小时内审核您的案例',
        '如有需要，我们会询问更多细节',
        '完全免费 — 无需任何承诺',
      ],
    },
    {
      num: '02',
      icon: '🏥',
      title: '医院匹配',
      duration: '1–2天',
      color: 'bg-purple-50 border-purple-200',
      accent: 'text-purple-700',
      details: [
        'AI + 专家团队分析您的病情',
        '匹配2–3家最适合的医院和专科医生',
        '考虑您的预算、时间安排和偏好',
        '确认国际部的床位可用性',
      ],
    },
    {
      num: '03',
      icon: '📋',
      title: '就医方案交付',
      duration: '2–3天',
      color: 'bg-green-50 border-green-200',
      accent: 'text-green-700',
      details: [
        '收到详细的就医方案文档',
        '医院简介、医生资质、治疗方案',
        '透明费用预估（无隐藏费用）',
        '从入院到出院的时间安排',
      ],
    },
    {
      num: '04',
      icon: '📄',
      title: '签证与文件',
      duration: '1–2周',
      color: 'bg-orange-50 border-orange-200',
      accent: 'text-orange-700',
      details: [
        '我们为您准备医疗签证邀请函',
        '指导您完成签证申请流程',
        '翻译并认证您的病历资料',
        '协调医院完成入院前准备',
      ],
    },
    {
      num: '05',
      icon: '✈️',
      title: '出行与到达',
      duration: '您的出行日',
      color: 'bg-sky-50 border-sky-200',
      accent: 'text-sky-700',
      details: [
        '安排机场接机（可选）',
        '预订医院附近酒店',
        '提供当地SIM卡和交通指引',
        '指定地面协调员全程陪护',
      ],
    },
    {
      num: '06',
      icon: '🩺',
      title: '治疗与康复',
      duration: '视病情而定',
      color: 'bg-red-50 border-red-200',
      accent: 'text-red-700',
      details: [
        '所有预约配备专业医疗翻译',
        '就医协调员每日跟进',
        '家属住宿协助',
        '提供治疗后随访方案',
      ],
    },
  ] : [
    {
      num: '01',
      icon: '💬',
      title: 'Initial Consultation',
      duration: '24 hours',
      color: 'bg-blue-50 border-blue-200',
      accent: 'text-blue-700',
      details: [
        'Submit your medical needs via our online form or AI chat',
        'Our care coordinator reviews your case within 24 hours',
        'We ask clarifying questions if needed',
        'Completely free — no commitment required',
      ],
    },
    {
      num: '02',
      icon: '🏥',
      title: 'Hospital Matching',
      duration: '1–2 days',
      color: 'bg-purple-50 border-purple-200',
      accent: 'text-purple-700',
      details: [
        'AI + human experts analyze your condition',
        'Match with 2–3 best-fit hospitals and specialists',
        'Consider your budget, timeline, and preferences',
        'Verify availability with international departments',
      ],
    },
    {
      num: '03',
      icon: '📋',
      title: 'Care Plan Delivery',
      duration: '2–3 days',
      color: 'bg-green-50 border-green-200',
      accent: 'text-green-700',
      details: [
        'Receive detailed care plan document',
        'Hospital profiles, specialist bios, treatment approach',
        'Transparent cost estimates (no hidden fees)',
        'Timeline from arrival to discharge',
      ],
    },
    {
      num: '04',
      icon: '📄',
      title: 'Visa & Documentation',
      duration: '1–2 weeks',
      color: 'bg-orange-50 border-orange-200',
      accent: 'text-orange-700',
      details: [
        'We prepare your medical visa invitation letter',
        'Guide you through the visa application process',
        'Translate and certify your medical records',
        'Coordinate with hospital for pre-admission',
      ],
    },
    {
      num: '05',
      icon: '✈️',
      title: 'Travel & Arrival',
      duration: 'Your travel day',
      color: 'bg-sky-50 border-sky-200',
      accent: 'text-sky-700',
      details: [
        'Airport pickup arranged (optional)',
        'Hotel near hospital pre-booked',
        'Local SIM card and transport guidance',
        'On-ground coordinator assigned to you',
      ],
    },
    {
      num: '06',
      icon: '🩺',
      title: 'Treatment & Recovery',
      duration: 'Varies by condition',
      color: 'bg-red-50 border-red-200',
      accent: 'text-red-700',
      details: [
        'Dedicated interpreter at all appointments',
        'Daily check-ins from your care coordinator',
        'Family accommodation assistance',
        'Post-treatment follow-up plan provided',
      ],
    },
  ]

  const faqs = isZh ? [
    { q: '我需要会说中文吗？', a: '不需要。所有合作医院的国际部都有英语工作人员。我们还会为所有预约提供专业医疗翻译。' },
    { q: 'ChinaCare的服务费用是多少？', a: '我们的初步咨询和就医方案完全免费。只有当您确认治疗时才收取服务费——通常是医疗费用的5-10%，这通常会被比您本国更低的费用所抵消。' },
    { q: '我需要什么签证？', a: '大多数患者申请医疗签证（M签证）或旅游签证（L签证）。我们提供医院官方邀请函以支持您的签证申请。' },
    { q: '我需要在中国停留多长时间？', a: '这取决于您的治疗。咨询可以在1-3天内完成。手术通常需要2-4周，包括恢复期。我们会在您的就医方案中给出精确的时间安排。' },
    { q: '如果治疗过程中出现问题怎么办？', a: '所有合作医院都拥有完整的医疗责任保险。您的就医协调员在您停留期间24/7待命。我们还会在出发前帮助您安排旅行保险。' },
  ] : [
    { q: 'Do I need to speak Chinese?', a: 'No. All partner hospitals have English-speaking staff in their international departments. We also provide professional medical interpreters for all appointments.' },
    { q: 'How much does ChinaCare\'s service cost?', a: 'Our initial consultation and care plan are completely free. We charge a service fee only when you confirm your treatment — typically 5–10% of the medical cost, which is often offset by the savings compared to your home country.' },
    { q: 'What visa do I need?', a: 'Most patients apply for a medical visa (M visa) or tourist visa (L visa). We provide an official invitation letter from the hospital to support your visa application.' },
    { q: 'How long will I need to stay in China?', a: 'It depends on your treatment. Consultations can be done in 1–3 days. Surgeries typically require 2–4 weeks including recovery. We\'ll give you a precise timeline in your care plan.' },
    { q: 'What if something goes wrong during treatment?', a: 'All partner hospitals carry full medical liability insurance. Your care coordinator is available 24/7 during your stay. We also help you arrange travel insurance before departure.' },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="hero-gradient py-20 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl font-extrabold mb-4">{t('howItWorks.title')}</h1>
            <p className="text-xl text-blue-200">{t('howItWorks.subtitle')}</p>
          </div>
        </div>

        {/* Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="space-y-6">
              {steps.map((s, i) => (
                <div key={i} className={`border-2 ${s.color} rounded-2xl p-6 flex gap-6`}>
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl">
                      {s.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-bold text-sm ${s.accent}`}>{isZh ? '步骤' : 'Step'} {s.num}</span>
                      <span className="bg-white text-gray-500 text-xs px-2 py-0.5 rounded-full border">⏱ {s.duration}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                    <ul className="space-y-1.5">
                      {s.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className={`mt-0.5 ${s.accent}`}>✓</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">❓ {f.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 hero-gradient text-white text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold mb-4">
              {isZh ? '准备好开始了吗？' : 'Ready to Get Started?'}
            </h2>
            <p className="text-blue-200 mb-8">
              {isZh ? '免费咨询，无需承诺，24小时内回复。' : 'Free consultation. No commitment. Response within 24 hours.'}
            </p>
            <Link href="/get-started"
              className="bg-white text-blue-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors inline-block">
              {isZh ? '开始就医之旅 →' : 'Start Your Journey →'}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
