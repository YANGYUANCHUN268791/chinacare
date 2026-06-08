'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'
import { CheckCircle, Loader2, Mail, Copy, Check } from 'lucide-react'

export default function PaymentSuccessPage() {
  const { locale } = useLanguage()
  const isZh = locale === 'zh'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [orderInfo, setOrderInfo] = useState<{
    orderId: string
    planName: string
    amount: number
    currency: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const verifyOrder = async () => {
      const orderId = new URLSearchParams(window.location.search).get('order_id')

      if (!orderId) {
        setError(true)
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        })

        if (response.ok) {
          const data = await response.json()
          setOrderInfo({
            orderId: data.orderId,
            planName: data.planName,
            amount: data.amount,
            currency: data.currency,
          })
          setLoading(false)
        } else {
          setError(true)
          setLoading(false)
        }
      } catch {
        setError(true)
        setLoading(false)
      }
    }

    verifyOrder()
  }, [])

  const copyOrderId = () => {
    if (orderInfo) {
      navigator.clipboard.writeText(orderInfo.orderId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-700 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">{isZh ? '正在验证订单...' : 'Verifying order...'}</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 max-w-md mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {isZh ? '订单验证失败' : 'Order Verification Failed'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isZh
                ? '您的订单可能未完成，请联系客服。'
                : 'Your order may not have been completed. Please contact support.'
              }
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800"
            >
              {isZh ? '联系客服' : 'Contact Support'}
            </a>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16 max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isZh ? '订单确认！' : 'Order Confirmed!'}
          </h1>

          <p className="text-gray-600 mb-6">
            {isZh
              ? '感谢您的信任。我们将在 24 小时内通过邮件与您联系。'
              : 'Thank you for your trust. We will contact you via email within 24 hours.'
            }
          </p>

          {/* Order Details */}
          {orderInfo && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{isZh ? '订单号' : 'Order ID'}</span>
                <span className="font-mono font-medium text-gray-900 flex items-center gap-1">
                  {orderInfo.orderId}
                  <button onClick={copyOrderId} className="text-blue-600 hover:text-blue-800">
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{isZh ? '服务' : 'Service'}</span>
                <span className="font-medium text-gray-900">{orderInfo.planName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{isZh ? '金额' : 'Amount'}</span>
                <span className="font-bold text-green-600">
                  ${orderInfo.amount / 100}.00 {orderInfo.currency}
                </span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-left">
              <Mail className="w-5 h-5 text-blue-700 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                {isZh
                  ? '请检查您的邮箱（包括垃圾邮件）获取确认信息。'
                  : 'Please check your email (including spam) for confirmation.'
                }
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href="/hospitals"
              className="block w-full bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 text-center"
            >
              {isZh ? '浏览合作医院' : 'Browse Partner Hospitals'}
            </a>
            <a
              href="/"
              className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 text-center"
            >
              {isZh ? '返回首页' : 'Return Home'}
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
