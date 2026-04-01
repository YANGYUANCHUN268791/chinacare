'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'
import { Building2, Globe, Users, Award, Send, CheckCircle } from 'lucide-react'

export default function HospitalApplyPage() {
  const { locale } = useLanguage()
  const isZh = locale === 'zh'
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalNameEn: '',
    city: '',
    website: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    internationalDept: '',
    beds: '',
    specialties: '',
    intlPatients: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', formData)
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
              {isZh ? '申请已提交！' : 'Application Submitted!'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isZh 
                ? '我们将在 3-5 个工作日内审核您的申请，并通过邮件通知审核结果。'
                : 'We will review your application within 3-5 business days and notify you via email.'
              }
            </p>
            <a 
              href="/hospitals" 
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800"
            >
              {isZh ? '浏览合作医院' : 'Browse Partner Hospitals'}
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
            {isZh ? '医院入驻' : 'Hospital Partnership'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
            {isZh ? '成为 ChinaCare 合作医院' : 'Become a ChinaCare Partner Hospital'}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {isZh 
              ? '加入我们的全球医疗网络，为国际患者提供优质服务。'
              : 'Join our global medical network and serve international patients with excellence.'
            }
          </p>
        </div>

        {/* Benefits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isZh ? '全球曝光' : 'Global Exposure'}
              </h3>
              <p className="text-sm text-gray-500">
                {isZh ? '面向 150+ 国家患者展示' : 'Reach patients from 150+ countries'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isZh ? '优质患者' : 'Quality Patients'}
              </h3>
              <p className="text-sm text-gray-500">
                {isZh ? 'AI 精准匹配病源' : 'AI-matched patient referrals'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isZh ? '专属后台' : 'Dedicated Portal'}
              </h3>
              <p className="text-sm text-gray-500">
                {isZh ? '管理患者、预约、统计' : 'Manage patients, appointments, stats'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isZh ? '品牌背书' : 'Brand Endorsement'}
              </h3>
              <p className="text-sm text-gray-500">
                {isZh ? 'ChinaCare 官方认证' : 'ChinaCare official certification'}
              </p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isZh ? '入驻申请表' : 'Partnership Application'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hospital Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isZh ? '医院名称（中文）' : 'Hospital Name (Chinese)'}
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={isZh ? '北京协和医院' : 'Peking Union Medical College Hospital'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isZh ? '医院名称（英文）' : 'Hospital Name (English)'}
                  </label>
                  <input
                    type="text"
                    name="hospitalNameEn"
                    value={formData.hospitalNameEn}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Peking Union Medical College Hospital"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isZh ? '所在城市' : 'City'}
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{isZh ? '请选择城市' : 'Select city'}</option>
                    <option value="beijing">{isZh ? '北京' : 'Beijing'}</option>
                    <option value="shanghai">{isZh ? '上海' : 'Shanghai'}</option>
                    <option value="guangzhou">{isZh ? '广州' : 'Guangzhou'}</option>
                    <option value="shenzhen">{isZh ? '深圳' : 'Shenzhen'}</option>
                    <option value="chengdu">{isZh ? '成都' : 'Chengdu'}</option>
                    <option value="hangzhou">{isZh ? '杭州' : 'Hangzhou'}</option>
                    <option value="nanjing">{isZh ? '南京' : 'Nanjing'}</option>
                    <option value="wuhan">{isZh ? '武汉' : 'Wuhan'}</option>
                    <option value="xian">{isZh ? '西安' : 'Xi\'an'}</option>
                    <option value="other">{isZh ? '其他' : 'Other'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isZh ? '医院官网' : 'Hospital Website'}
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.hospital.com"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isZh ? '联系人信息' : 'Contact Information'}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isZh ? '联系人姓名' : 'Contact Name'}
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isZh ? '电子邮箱' : 'Email'}
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isZh ? '联系电话' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Hospital Details */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isZh ? '医院详情' : 'Hospital Details'}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isZh ? '是否有国际医疗部？' : 'International Medical Department?'}
                    </label>
                    <select
                      name="internationalDept"
                      value={formData.internationalDept}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{isZh ? '请选择' : 'Select'}</option>
                      <option value="yes">{isZh ? '是，已成立' : 'Yes, established'}</option>
                      <option value="planning">{isZh ? '是，筹备中' : 'Yes, in planning'}</option>
                      <option value="no">{isZh ? '否' : 'No'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isZh ? '床位数' : 'Number of Beds'}
                    </label>
                    <input
                      type="text"
                      name="beds"
                      value={formData.beds}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={isZh ? '例如：3000' : 'e.g., 3000'}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isZh ? '优势专科（用逗号分隔）' : 'Specialties (comma separated)'}
                    </label>
                    <input
                      type="text"
                      name="specialties"
                      value={formData.specialties}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={isZh ? '心脏外科, 肿瘤科, 骨科' : 'Cardiac Surgery, Oncology, Orthopedics'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isZh ? '年国际患者数量' : 'Annual International Patients'}
                    </label>
                    <input
                      type="text"
                      name="intlPatients"
                      value={formData.intlPatients}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={isZh ? '例如：500+' : 'e.g., 500+'}
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isZh ? '补充说明' : 'Additional Information'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={isZh 
                    ? '请描述您对合作的期望和问题...' 
                    : 'Describe your expectations and any questions...'
                  }
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  isZh ? '提交中...' : 'Submitting...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {isZh ? '提交申请' : 'Submit Application'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
