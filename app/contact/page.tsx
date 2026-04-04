'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const { locale, t } = useLanguage()
  const isZh = locale === 'zh'
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    condition: '',
    preferredCity: '',
    budget: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isZh ? '提交成功！' : 'Submitted Successfully!'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isZh 
                ? '我们的医疗协调员将在 24 小时内与您联系，为您制定个性化就医方案。'
                : 'Our medical coordinator will contact you within 24 hours to create your personalized care plan.'
              }
            </p>
            <a 
              href="/" 
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800"
            >
              {isZh ? '返回首页' : 'Back to Home'}
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
      
      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
            {isZh ? '联系我们' : 'Contact Us'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
            {isZh ? '开启您的中国就医之旅' : 'Start Your Medical Journey to China'}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {isZh 
              ? '填写以下信息，我们的专业团队将为您匹配最适合的医院和治疗方案。'
              : 'Fill in the information below, and our professional team will match you with the best hospitals and treatment plans.'
            }
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-blue-700 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">
                  {isZh ? '联系方式' : 'Contact Information'}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{isZh ? '电话咨询' : 'Phone'}</p>
                      <p className="text-blue-100">+86 400-XXX-XXXX</p>
                      <p className="text-sm text-blue-200">{isZh ? '24/7 全天候服务' : '24/7 Available'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{isZh ? '电子邮件' : 'Email'}</p>
                      <p className="text-blue-100">contact@healthroute.xyz</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{isZh ? '工作时间' : 'Working Hours'}</p>
                      <p className="text-blue-100">{isZh ? '周一至周日' : 'Monday - Sunday'}</p>
                      <p className="text-sm text-blue-200">00:00 - 24:00 (CST)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{isZh ? '办公地址' : 'Office'}</p>
                      <p className="text-blue-100">{isZh ? '中国 · 北京/上海' : 'Beijing/Shanghai, China'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isZh ? '您的姓名 *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={isZh ? '请输入姓名' : 'Enter your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isZh ? '电子邮箱 *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={isZh ? '请输入邮箱' : 'Enter your email'}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isZh ? '联系电话' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={isZh ? '包含国家区号' : 'Include country code'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isZh ? '所在国家/地区 *' : 'Country/Region *'}
                      </label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={isZh ? '如：沙特阿拉伯' : 'e.g., Saudi Arabia'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isZh ? '病情描述 / 就医需求 *' : 'Medical Condition / Needs *'}
                    </label>
                    <textarea
                      name="condition"
                      required
                      rows={4}
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={isZh 
                        ? '请简要描述您的病情、诊断结果或就医需求...' 
                        : 'Please briefly describe your condition, diagnosis, or medical needs...'
                      }
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isZh ? '首选城市' : 'Preferred City'}
                      </label>
                      <select
                        name="preferredCity"
                        value={formData.preferredCity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">{isZh ? '请选择（可选）' : 'Select (optional)'}</option>
                        <option value="beijing">{isZh ? '北京' : 'Beijing'}</option>
                        <option value="shanghai">{isZh ? '上海' : 'Shanghai'}</option>
                        <option value="guangzhou">{isZh ? '广州' : 'Guangzhou'}</option>
                        <option value="chengdu">{isZh ? '成都' : 'Chengdu'}</option>
                        <option value="hangzhou">{isZh ? '杭州' : 'Hangzhou'}</option>
                        <option value="other">{isZh ? '其他/不确定' : 'Other/Unsure'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isZh ? '预算范围（美元）' : 'Budget Range (USD)'}
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">{isZh ? '请选择（可选）' : 'Select (optional)'}</option>
                        <option value="under-10k">{isZh ? '10,000 以下' : 'Under $10,000'}</option>
                        <option value="10k-30k">{isZh ? '10,000 - 30,000' : '$10,000 - $30,000'}</option>
                        <option value="30k-50k">{isZh ? '30,000 - 50,000' : '$30,000 - $50,000'}</option>
                        <option value="50k-100k">{isZh ? '50,000 - 100,000' : '$50,000 - $100,000'}</option>
                        <option value="over-100k">{isZh ? '100,000 以上' : 'Over $100,000'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isZh ? '补充说明' : 'Additional Notes'}
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={isZh 
                        ? '如有其他需求或问题，请在此说明...' 
                        : 'Any other requirements or questions...'
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {isZh ? '提交中...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {isZh ? '提交咨询申请' : 'Submit Inquiry'}
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    {isZh 
                      ? '提交即表示您同意我们的隐私政策。您的信息将被严格保密。'
                      : 'By submitting, you agree to our Privacy Policy. Your information will be kept confidential.'
                    }
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
