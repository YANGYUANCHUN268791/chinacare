'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'
import { CheckCircle, Loader2, Mail } from 'lucide-react'

export default function PaymentSuccessPage() {
  const { locale } = useLanguage()
  const isZh = locale === 'zh'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Verify the payment with Stripe
    const verifyPayment = async () => {
      const sessionId = new URLSearchParams(window.location.search).get('session_id')
      
      if (!sessionId) {
        setError(true)
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        if (response.ok) {
          setLoading(false)
        } else {
          setError(true)
          setLoading(false)
        }
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }

    verifyPayment()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-700 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">{isZh ? '正在验证支付...' : 'Verifying payment...'}</p>
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
              {isZh ? '支付验证失败' : 'Payment Verification Failed'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isZh 
                ? '您的支付可能未完成，请联系客服。'
                : 'Your payment may not have been completed. Please contact support.'
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
            {isZh ? '支付成功！' : 'Payment Successful!'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {isZh 
              ? '感谢您的信任。我们将在 24 小时内通过邮件发送您的就医规划报告。'
              : 'Thank you for your trust. We will send your care planning report via email within 24 hours.'
            }
          </p>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-left">
              <Mail className="w-5 h-5 text-blue-700 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                {isZh 
                  ? '请检查您的邮箱（包括垃圾邮件）获取报告。'
                  : 'Please check your email (including spam) for the report.'
                }
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <a 
              href="/hospitals" 
              className="block w-full bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800"
            >
              {isZh ? '浏览合作医院' : 'Browse Partner Hospitals'}
            </a>
            <a 
              href="/" 
              className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200"
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