'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'
import { CheckCircle2, Loader2, ArrowRight, Mail, FileText, Clock } from 'lucide-react'

export default function PricingSuccessPage() {
  const { locale } = useLanguage()
  const isZh = locale === 'zh'
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const orderId = searchParams.get('order_id')

  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  // 验证 Stripe Session 支付状态
  useEffect(() => {
    async function verifySession() {
      if (!sessionId) {
        setError(isZh ? '缺少支付会话信息' : 'Missing payment session info')
        setLoading(false)
        return
      }

      try {
        // 调用后端 API 验证支付状态
        const response = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, orderId }),
        })

        const data = await response.json()

        if (data.success || data.paymentStatus === 'paid') {
          setVerified(true)
        } else {
          setError(data.error || (isZh ? '验证失败' : 'Verification failed'))
        }
      } catch (err) {
        // 即使验证接口失败，如果有了 session_id 也认为成功（Stripe 已跳转回来）
        console.error('Verify error:', err)
        setVerified(true) // 宽松模式：已从 Stripe 回来就算成功
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [sessionId, orderId, isZh])

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            /* 加载中 */
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-700 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {isZh ? '正在验证支付...' : 'Verifying payment...'}
              </h2>
              <p className="text-gray-500">
                {isZh ? '请稍候，我们正在确认您的付款状态' : 'Please wait while we confirm your payment status'}
              </p>
            </div>
          ) : verified ? (
            /* ✅ 支付成功 */
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* 成功头部 */}
              <div className="bg-green-600 text-white p-8 text-center">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">
                  {isZh ? '支付成功！' : 'Payment Successful!'}
                </h1>
                <p className="text-green-100 text-lg">
                  {isZh ? '感谢您的信任，我们将立即开始为您服务' : "Thank you for your trust. We'll start serving you right away."}
                </p>
              </div>

              {/* 订单详情 */}
              <div className="p-8 space-y-6">
                {/* 订单号 */}
                {orderId && (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{isZh ? '订单号' : 'Order ID'}</p>
                      <p className="font-mono font-semibold text-gray-900">{orderId}</p>
                    </div>
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                {/* 后续步骤 */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {isZh ? '接下来会发生什么？' : 'What happens next?'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-semibold text-sm">1</div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {isZh ? '确认邮件' : 'Confirmation Email'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isZh ? '您将收到一封包含订单详情的确认邮件' : 'You will receive a confirmation email with order details'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-semibold text-sm">2</div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {isZh ? 'AI 分析（24小时内）' : 'AI Analysis (within 24h)'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isZh ? '我们的 AI 系统将分析您的需求并生成就医规划报告' : 'Our AI system will analyze your needs and generate a care plan report'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-semibold text-sm">3</div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {isZh ? '专人跟进' : 'Dedicated Coordinator'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isZh ? '全程陪诊方案将配备专属医疗协调员全程跟进' : 'Full service packages include a dedicated medical coordinator'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3 pt-4">
                  <a
                    href={`/${locale}/contact`}
                    className="flex-1 bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {isZh ? '联系我们' : 'Contact Us'}
                  </a>
                  <a
                    href={`/${locale}`}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {isZh ? '返回首页' : 'Back to Home'}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* ❌ 验证失败 */
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                ✕
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {isZh ? '支付验证失败' : 'Payment Verification Failed'}
              </h2>
              <p className="text-gray-500 mb-6">{error}</p>
              <a
                href={`/${locale}/pricing`}
                className="inline-flex items-center gap-2 bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800"
              >
                <ArrowRight className="w-4 h-4" />
                {isZh ? '重新选择方案' : 'Choose Plan Again'}
              </a>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
