'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'
import { ALL_HOSPITALS, getHospitalById } from '@/lib/hospitals-data'
import {
  MapPin, Phone, Globe, Star, Calendar, Users, Building2,
  Stethoscope, DollarSign, ChevronLeft, MessageCircle, CheckCircle2
} from 'lucide-react'

export default function HospitalDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const { locale, t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'overview' | 'costs' | 'doctors'>('overview')

  const hospital = getHospitalById(id)
  const isZh = locale === 'zh'

  if (!hospital) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {isZh ? '医院未找到' : 'Hospital Not Found'}
            </h1>
            <p className="text-gray-600 mb-8">
              {isZh ? '请返回医院列表查看所有合作医院。' : 'Please return to the hospital list to browse all partner hospitals.'}
            </p>
            <Link href="/hospitals" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              {isZh ? '返回医院列表' : 'Back to Hospitals'}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const tabs = [
    { key: 'overview' as const, label: isZh ? '概览' : 'Overview' },
    { key: 'costs' as const, label: isZh ? '费用参考' : 'Cost Estimates' },
    { key: 'doctors' as const, label: isZh ? '专家团队' : 'Doctors' },
  ]

  const otherHospitals = ALL_HOSPITALS.filter(h => h.city === hospital.city && h.id !== hospital.id)

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-slate-50">
        {/* Hero Banner */}
        <div className="hero-gradient text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/hospitals" className="inline-flex items-center gap-1 text-blue-200 hover:text-white mb-6 transition">
              <ChevronLeft className="w-4 h-4" />
              {isZh ? '返回医院列表' : 'Back to Hospitals'}
            </Link>
            <div className="flex items-start gap-6">
              <span className="text-6xl">{hospital.flag}</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-extrabold">
                    {isZh ? hospital.nameZh : hospital.name}
                  </h1>
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {isZh ? '合作医院' : 'Partner'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-blue-200 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {isZh ? hospital.cityZh : hospital.city}</span>
                  <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {hospital.phone}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /> {hospital.rating}/5</span>
                  <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {hospital.accreditation}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                <div className="text-2xl font-bold">{hospital.founded}</div>
                <div className="text-xs text-blue-200">{isZh ? '建院年份' : 'Founded'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <Building2 className="w-5 h-5 mx-auto mb-1" />
                <div className="text-2xl font-bold">{hospital.beds}</div>
                <div className="text-xs text-blue-200">{isZh ? '床位数' : 'Beds'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <Users className="w-5 h-5 mx-auto mb-1" />
                <div className="text-2xl font-bold">{hospital.patients}</div>
                <div className="text-xs text-blue-200">{isZh ? '国际患者/年' : 'Intl. Patients/yr'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <Stethoscope className="w-5 h-5 mx-auto mb-1" />
                <div className="text-2xl font-bold">{hospital.specialties.length}</div>
                <div className="text-xs text-blue-200">{isZh ? '重点专科' : 'Specialties'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Description */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      {isZh ? '关于这家医院' : 'About This Hospital'}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {isZh ? hospital.fullDescZh : hospital.fullDesc}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      {isZh ? '重点专科' : 'Key Specialties'}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {(isZh ? hospital.specialtiesZh : hospital.specialties).map((s, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                          <span className="text-gray-800 font-medium">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      {isZh ? '联系信息' : 'Contact Information'}
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-600">{isZh ? hospital.addressZh : hospital.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <a href={`tel:${hospital.phone}`} className="text-blue-600 hover:underline">{hospital.phone}</a>
                        <span className="text-xs text-gray-400">
                          {isZh ? '（国际部可直接用英语咨询）' : '(International Dept - English available)'}
                        </span>
                      </div>
                      {hospital.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-blue-600" />
                          <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {hospital.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Costs Tab */}
              {activeTab === 'costs' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {isZh ? '费用参考（美元）' : 'Estimated Costs (USD)'}
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    {isZh
                      ? '以下费用为预估值，实际费用根据病情和治疗方案而定。中国Care将在付费前提供透明的费用明细。'
                      : 'Prices are estimates. Actual costs vary by condition and treatment plan. ChinaCare provides transparent pricing before any commitment.'}
                  </p>
                  {hospital.costExamples && hospital.costExamples.length > 0 ? (
                    <div className="space-y-4">
                      {hospital.costExamples.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">
                              {isZh ? item.procedureZh : item.procedure}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-blue-600">{item.cost}</span>
                            <p className="text-xs text-gray-400">
                              {isZh ? '含住院费' : 'incl. hospital stay'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <DollarSign className="w-12 h-12 mx-auto mb-2" />
                      <p>{isZh ? '费用信息请咨询我们的客服' : 'Contact us for detailed cost estimates'}</p>
                    </div>
                  )}

                  {/* Comparison Note */}
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">
                      <strong>{isZh ? '省钱提示：' : 'Savings Tip: '}</strong>
                      {isZh
                        ? '同样的治疗在中国通常比美国/英国便宜 60-85%，且无需等待数月。'
                        : 'The same treatment typically costs 60-85% less in China vs US/UK, with no multi-month waiting lists.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Doctors Tab */}
              {activeTab === 'doctors' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {isZh ? '专家团队' : 'Expert Team'}
                  </h2>
                  {hospital.doctors && hospital.doctors.length > 0 ? (
                    <div className="space-y-4">
                      {hospital.doctors.map((doc, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                            {(isZh ? doc.nameZh : doc.name).charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">
                              {isZh ? doc.nameZh : doc.name}
                            </div>
                            <div className="text-sm text-blue-600">
                              {isZh ? doc.titleZh : doc.title}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Stethoscope className="w-12 h-12 mx-auto mb-2" />
                      <p>{isZh ? '专家信息即将更新，请咨询客服了解详情' : 'Doctor profiles coming soon. Contact us for specialist referrals.'}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {isZh ? '想了解这家医院？' : 'Interested in This Hospital?'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {isZh
                    ? '免费获取 AI 智能匹配报告，了解这家医院是否适合您的病情。'
                    : 'Get a free AI-powered match report to see if this hospital fits your needs.'}
                </p>
                <div className="space-y-3">
                  <Link
                    href="/get-started"
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    {isZh ? '免费咨询' : 'Free Consultation'}
                  </Link>
                  <Link
                    href="/pricing"
                    className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    {isZh ? '查看服务套餐' : 'View Service Plans'}
                  </Link>
                  <a
                    href={`tel:${hospital.phone}`}
                    className="flex items-center justify-center gap-2 w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition text-gray-700"
                  >
                    <Phone className="w-4 h-4" />
                    {hospital.phone}
                  </a>
                </div>
              </div>

              {/* Same City Hospitals */}
              {otherHospitals.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    {isZh ? `${hospital.cityZh}的其他医院` : `Other Hospitals in ${hospital.city}`}
                  </h3>
                  <div className="space-y-3">
                    {otherHospitals.map(h => (
                      <Link
                        key={h.id}
                        href={`/hospitals/${h.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        <span className="text-2xl">{h.flag}</span>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">
                            {isZh ? h.nameZh : h.name}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" /> {h.rating}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick AI Chat */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">
                    {isZh ? 'AI 快速咨询' : 'AI Quick Consultation'}
                  </h3>
                </div>
                <p className="text-blue-700 text-sm mb-3">
                  {isZh
                    ? '有问题？直接在首页与 AI 客服对话，获取即时解答。'
                    : 'Have questions? Chat with our AI assistant on the homepage for instant answers.'}
                </p>
                <Link
                  href="/#ai-chat"
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  {isZh ? '开始对话' : 'Start Chat'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
