'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'
import { Check, Sparkles, Heart, Building2 } from 'lucide-react'

const plans = [
  {
    id: 'consultation',
    icon: Sparkles,
    name: { zh: 'AI 咨询报告', en: 'AI Consultation Report' },
    price: { zh: '$49', en: '$49' },
    period: { zh: '一次性', en: 'one-time' },
    description: { 
      zh: 'AI 生成的个性化就医规划报告', 
      en: 'Personalized AI-generated care planning report' 
    },
    features: [
      { zh: 'AI 病情分析与医院匹配', en: 'AI diagnosis analysis & hospital matching', included: true },
      { zh: '2-3 家推荐医院详情', en: '2-3 recommended hospital details', included: true },
      { zh: '预估费用明细', en: 'Estimated cost breakdown', included: true },
      { zh: '就医流程时间线', en: 'Treatment timeline', included: true },
      { zh: '签证申请指导', en: 'Visa guidance', included: true },
      { zh: '真人客服跟进', en: 'Human coordinator follow-up', included: false },
    ],
    popular: false,
  },
  {
    id: 'full-service',
    icon: Heart,
    name: { zh: '全程陪诊服务', en: 'Full Service Package' },
    price: { zh: '$299', en: '$299' },
    period: { zh: '一次性', en: 'one-time' },
    description: { 
      zh: '从咨询到康复的全方位服务', 
      en: 'End-to-end service from consultation to recovery' 
    },
    features: [
      { zh: 'AI 咨询报告所有内容', en: 'All AI Consultation Report benefits', included: true },
      { zh: '真人医疗协调员', en: 'Dedicated medical coordinator', included: true },
      { zh: '医院预约直通车', en: 'Hospital appointment booking', included: true },
      { zh: '住宿预订协助', en: 'Accommodation booking assistance', included: true },
      { zh: '全程翻译服务', en: 'Full translation service', included: true },
      { zh: '机场接送机', en: 'Airport pickup/dropoff', included: true },
      { zh: '术后随访指导', en: 'Post-treatment follow-up guidance', included: true },
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    icon: Building2,
    name: { zh: '企业/机构合作', en: 'Enterprise Partnership' },
    price: { zh: '联系询价', en: 'Contact Us' },
    period: { zh: '定制', en: 'custom' },
    description: { 
      zh: '为医疗机构、保险公司、旅行社等提供定制服务', 
      en: 'Custom solutions for medical institutions, insurance companies, travel agencies' 
    },
    features: [
      { zh: '专属客户经理', en: 'Dedicated account manager', included: true },
      { zh: 'API 接口对接', en: 'API integration', included: true },
      { zh: '批量患者转介', en: 'Batch patient referrals', included: true },
      { zh: '定制化报告', en: 'Customized reports', included: true },
      { zh: '优先客服通道', en: 'Priority support channel', included: true },
      { zh: '专属折扣', en: 'Exclusive discounts', included: true },
    ],
    popular: false,
  },
]

export default function PricingPage() {
  const { locale, t } = useLanguage()
  const isZh = locale === 'zh'
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    if (planId === 'enterprise') {
      window.location.href = '/contact'
      return
    }
    
    setLoading(planId)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })
      
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Payment error. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Payment error. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
            {isZh ? '透明定价' : 'Transparent Pricing'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
            {isZh ? '选择适合您的服务' : 'Choose Your Care Plan'}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {isZh 
              ? '没有隐藏费用，没有额外收费。只有透明的价格和专业的服务。'
              : 'No hidden fees, no surprise charges. Just transparent pricing and professional care.'
            }
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon
              const isLoading = loading === plan.id
              
              return (
                <div 
                  key={plan.id}
                  className={`relative bg-white rounded-2xl p-8 ${
                    plan.popular 
                      ? 'ring-2 ring-blue-700 shadow-xl scale-105' 
                      : 'border border-gray-200 shadow-sm'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-sm font-medium px-4 py-1 rounded-full">
                      {isZh ? '最受欢迎' : 'Most Popular'}
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      plan.popular ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {plan.name[isZh ? 'zh' : 'en']}
                    </h3>
                    <div className="mb-2">
                      <span className="text-4xl font-extrabold text-gray-900">
                        {plan.price[isZh ? 'zh' : 'en']}
                      </span>
                      {plan.period[isZh ? 'zh' : 'en'] !== '定制' && plan.period[isZh ? 'zh' : 'en'] !== 'custom' && (
                        <span className="text-gray-500 ml-1">/ {plan.period[isZh ? 'zh' : 'en']}</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">
                      {plan.description[isZh ? 'zh' : 'en']}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature[isZh ? 'zh' : 'en']}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isLoading}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-blue-700 text-white hover:bg-blue-800'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading 
                      ? (isZh ? '处理中...' : 'Processing...')
                      : plan.id === 'enterprise'
                        ? (isZh ? '联系我们' : 'Contact Us')
                        : (isZh ? '立即购买' : 'Get Started')
                    }
                  </button>
                </div>
              )
            })}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-4">
              {isZh ? '安全支付由 Stripe 提供保障' : 'Secure payments powered by Stripe'}
            </p>
            <div className="flex justify-center gap-4 opacity-50">
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isZh ? '支付安全吗？' : 'Is payment secure?'}
                </h3>
                <p className="text-gray-600">
                  {isZh 
                    ? '是的，我们使用 Stripe 处理支付，这是全球最安全的支付平台之一。您的信用卡信息永远不会存储在我们的服务器上。'
                    : 'Yes, we use Stripe for all payments, one of the world\'s most secure payment platforms. Your credit card information is never stored on our servers.'
                  }
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isZh ? '可以退款吗？' : 'Can I get a refund?'}
                </h3>
                <p className="text-gray-600">
                  {isZh 
                    ? '如果您对服务不满意，我们提供 30 天内全额退款。请联系我们的客服。'
                    : 'We offer a full refund within 30 days if you\'re not satisfied with our service. Please contact our support team.'
                  }
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isZh ? '服务流程是怎样的？' : 'How does the service work?'}
                </h3>
                <p className="text-gray-600">
                  {isZh 
                    ? '付款后，我们的 AI 系统将在 24 小时内生成您的就医规划报告。全程陪诊服务将配备专属协调员全程跟进。'
                    : 'After payment, our AI system will generate your care planning report within 24 hours. Full service packages include a dedicated coordinator throughout your journey.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
