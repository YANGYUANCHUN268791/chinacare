'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'
import { Check, Sparkles, Heart, Building2, CreditCard, Lock, Loader2, Shield } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const plans = [
  {
    id: 'consultation',
    icon: Sparkles,
    name: { zh: 'AI 咨询报告', en: 'AI Consultation Report' },
    price: { zh: '$49', en: '$49' },
    priceValue: 49,
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
    priceValue: 299,
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
    priceValue: 0,
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

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Japan', 'South Korea', 'Singapore', 'UAE', 'Saudi Arabia',
  'Russia', 'Brazil', 'India', 'Thailand', 'Malaysia', 'Indonesia',
  'Philippines', 'Vietnam', 'Nigeria', 'Kenya', 'South Africa', 'Other'
]

// Stripe 可发布密钥（客户端使用，暴露在前端是安全的）
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function PricingPage() {
  const { locale } = useLanguage()
  const isZh = locale === 'zh'
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    conditionDescription: '',
  })
  const [error, setError] = useState('')

  const activePlan = plans.find(p => p.id === selectedPlan)

  const handleSelectPlan = (planId: string) => {
    if (planId === 'enterprise') {
      window.location.href = '/contact'
      return
    }
    setSelectedPlan(planId)
    setError('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlan) return

    setProcessing(true)
    setError('')

    try {
      // 调用后端 API 创建 Stripe Checkout Session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: selectedPlan, ...formData, locale }),
      })

      const data = await response.json()

      if (data.success && data.url) {
        // ✅ 成功：跳转到 Stripe 托管的支付页面
        const stripe = await stripePromise
        if (stripe) {
          // 使用 stripe.redirectToCheckout 跳转（比 window.location.href 更可靠）
          const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
          if (error) {
            console.error('Stripe redirect error:', error)
            setError(isZh ? '跳转支付页面失败，请重试' : 'Failed to redirect to payment. Please try again.')
          }
        } else {
          // fallback（备用方案）：直接跳转 URL
          window.location.href = data.url
        }
      } else {
        setError(data.error || (isZh ? '创建订单失败，请重试' : 'Failed to create order. Please try again.'))
      }
    } catch (err) {
      setError(isZh ? '网络错误，请重试' : 'Network error. Please try again.')
    } finally {
      setProcessing(false)
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon

              return (
                <div
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`relative bg-white rounded-2xl p-8 cursor-pointer transition-all hover:shadow-lg ${
                    selectedPlan === plan.id
                      ? 'ring-3 ring-blue-700 shadow-xl'
                      : plan.popular
                        ? 'border-2 border-blue-200 shadow-sm'
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

                  {selectedPlan === plan.id ? (
                    <div className="w-full py-3 px-6 rounded-lg font-semibold bg-blue-700 text-white text-center">
                      {isZh ? '已选择 ✓' : 'Selected ✓'}
                    </div>
                  ) : (
                    <div className={`w-full py-3 px-6 rounded-lg font-semibold text-center ${
                      plan.popular
                        ? 'bg-blue-700 text-white hover:bg-blue-800'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}>
                      {plan.id === 'enterprise'
                        ? (isZh ? '联系我们' : 'Contact Us')
                        : (isZh ? '选择此方案' : 'Select Plan')
                    }
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Checkout Form */}
          {selectedPlan && activePlan && (
            <div className="mt-12 max-w-lg mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Form Header */}
                <div className="bg-blue-700 text-white p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="w-5 h-5" />
                    <h2 className="text-lg font-bold">
                      {isZh ? '确认订单' : 'Confirm Your Order'}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">{activePlan.name[isZh ? 'zh' : 'en']}</span>
                    <span className="text-2xl font-extrabold">{activePlan.price[isZh ? 'zh' : 'en']}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isZh ? '名' : 'First Name'} *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isZh ? '姓' : 'Last Name'} *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {isZh ? '电话' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {isZh ? '国家/地区' : 'Country'} *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{isZh ? '请选择国家' : 'Select country'}</option>
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {isZh ? '病情描述' : 'Condition Description'}
                    </label>
                    <textarea
                      name="conditionDescription"
                      value={formData.conditionDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={isZh ? '简要描述您的病情或需求...' : 'Briefly describe your condition or needs...'}
                    />
                  </div>

                  {/* Stripe Payment Notice */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        {isZh ? '安全支付（Stripe）' : 'Secure Payment (Stripe)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <p>{isZh ? '您将被重定向到 Stripe 安全支付页面完成付款' : 'You will be redirected to Stripe secure checkout to complete payment'}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {isZh ? '支持 Visa、Mastercard、Amex 等主流信用卡' : 'Supports Visa, Mastercard, Amex and more'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{isZh ? 'SSL 加密' : 'SSL Encrypted'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        <span>PCI DSS</span>
                      </div>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {isZh ? '处理中...' : 'Processing...'}
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        {isZh
                          ? `确认支付 ${activePlan.price[isZh ? 'zh' : 'en']}`
                          : `Pay ${activePlan.price[isZh ? 'zh' : 'en']}`
                        }
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-4">
              {isZh ? '安全支付保障' : 'Secure payment guarantee'}
            </p>
            <div className="flex items-center justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>{isZh ? 'SSL 加密' : 'SSL Encrypted'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{isZh ? '30 天退款保证' : '30-day Refund'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{isZh ? '24 小时响应' : '24h Response'}</span>
              </div>
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
                    ? '是的，正式上线后我们将使用 Stripe 处理支付，这是全球最安全的支付平台之一。您的信用卡信息永远不会存储在我们的服务器上。'
                    : 'Yes, after launch we will use Stripe for all payments, one of the world\'s most secure payment platforms. Your credit card information is never stored on our servers.'
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
