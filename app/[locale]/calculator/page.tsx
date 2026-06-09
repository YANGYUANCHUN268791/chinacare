'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'
import { Calculator, DollarSign, Plane, Hotel, User, Stethoscope, FileText, Car } from 'lucide-react'

const procedures = [
  { id: 'heart-bypass', name: { zh: '心脏搭桥手术', en: 'Heart Bypass Surgery' }, cost: { min: 15000, max: 35000 }, hospital: 'Beijing Anzhen' },
  { id: 'hip-replacement', name: { zh: '髋关节置换', en: 'Hip Replacement' }, cost: { min: 8000, max: 15000 }, hospital: 'West China Hospital' },
  { id: 'knee-replacement', name: { zh: '膝关节置换', en: 'Knee Replacement' }, cost: { min: 10000, max: 18000 }, hospital: 'West China Hospital' },
  { id: 'chemotherapy', name: { zh: '癌症化疗（疗程）', en: 'Cancer Chemotherapy (course)' }, cost: { min: 10000, max: 40000 }, hospital: 'PUMC / SYSUCC' },
  { id: 'liver-transplant', name: { zh: '肝脏移植', en: 'Liver Transplant' }, cost: { min: 40000, max: 80000 }, hospital: 'Zhongshan Hospital' },
  { id: 'kidney-transplant', name: { zh: '肾脏移植', en: 'Kidney Transplant' }, cost: { min: 30000, max: 60000 }, hospital: 'SYSU First Affiliated' },
  { id: 'spine-surgery', name: { zh: '脊柱手术', en: 'Spine Surgery' }, cost: { min: 12000, max: 25000 }, hospital: 'West China Hospital' },
  { id: 'neurosurgery', name: { zh: '神经外科手术', en: 'Neurosurgery' }, cost: { min: 15000, max: 35000 }, hospital: 'Beijing Tiantan' },
  { id: 'ivf', name: { zh: '试管婴儿（IVF）', en: 'IVF Treatment' }, cost: { min: 8000, max: 15000 }, hospital: 'Various' },
  { id: 'dental-implants', name: { zh: '种植牙（单颗）', en: 'Dental Implant (single)' }, cost: { min: 800, max: 2000 }, hospital: 'Various' },
]

const cities = [
  { id: 'beijing', name: { zh: '北京', en: 'Beijing' }, hotelCost: 80 },
  { id: 'shanghai', name: { zh: '上海', en: 'Shanghai' }, hotelCost: 100 },
  { id: 'guangzhou', name: { zh: '广州', en: 'Guangzhou' }, hotelCost: 60 },
  { id: 'chengdu', name: { zh: '成都', en: 'Chengdu' }, hotelCost: 50 },
  { id: 'hangzhou', name: { zh: '杭州', en: 'Hangzhou' }, hotelCost: 70 },
]

export default function CalculatorPage() {
  const { locale, t } = useLanguage()
  const isZh = locale === 'zh'
  
  const [selectedProcedure, setSelectedProcedure] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [companionCount, setCompanionCount] = useState(0)
  const [stayDays, setStayDays] = useState(7)
  const [includeServices, setIncludeServices] = useState({
    translation: false,
    pickup: false,
    consultation: true,
  })

  const procedure = procedures.find(p => p.id === selectedProcedure)
  const city = cities.find(c => c.id === selectedCity)

  const calculateEstimate = () => {
    if (!procedure || !city) return null

    const treatmentCost = (procedure.cost.min + procedure.cost.max) / 2
    const hotelCost = city.hotelCost * stayDays * (1 + companionCount)
    const translationCost = includeServices.translation ? 50 * stayDays : 0
    const pickupCost = includeServices.pickup ? 100 : 0
    const consultationCost = includeServices.consultation ? 49 : 0
    
    const subtotal = treatmentCost + hotelCost + translationCost + pickupCost + consultationCost
    const contingency = subtotal * 0.1 // 10% buffer
    const total = subtotal + contingency

    return {
      treatment: treatmentCost,
      hotel: hotelCost,
      translation: translationCost,
      pickup: pickupCost,
      consultation: consultationCost,
      contingency,
      total,
    }
  }

  const estimate = calculateEstimate()

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
            {isZh ? '费用估算' : 'Cost Calculator'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
            {isZh ? '预估您的中国就医费用' : 'Estimate Your Medical Costs in China'}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {isZh 
              ? '根据您的治疗项目、城市和停留时间，获取个性化费用预估。'
              : 'Get a personalized cost estimate based on your procedure, city, and stay duration.'
            }
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-700" />
                {isZh ? '填写信息' : 'Enter Details'}
              </h2>

              <div className="space-y-6">
                {/* Procedure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Stethoscope className="w-4 h-4 inline mr-1" />
                    {isZh ? '治疗项目 *' : 'Procedure *'}
                  </label>
                  <select
                    value={selectedProcedure}
                    onChange={(e) => setSelectedProcedure(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{isZh ? '请选择治疗项目' : 'Select a procedure'}</option>
                    {procedures.map(p => (
                      <option key={p.id} value={p.id}>
                        {isZh ? p.name.zh : p.name.en} (${p.cost.min.toLocaleString()}-${p.cost.max.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Plane className="w-4 h-4 inline mr-1" />
                    {isZh ? '就医城市 *' : 'City *'}
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{isZh ? '请选择城市' : 'Select a city'}</option>
                    {cities.map(c => (
                      <option key={c.id} value={c.id}>
                        {isZh ? c.name.zh : c.name.en} (~${c.hotelCost}/night)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stay Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Hotel className="w-4 h-4 inline mr-1" />
                    {isZh ? '预计停留天数' : 'Estimated Stay (days)'}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    value={stayDays}
                    onChange={(e) => setStayDays(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600 mt-1">
                    {stayDays} {isZh ? '天' : 'days'}
                  </div>
                </div>

                {/* Companions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    {isZh ? '陪同人数' : 'Companions'}
                  </label>
                  <div className="flex gap-4">
                    {[0, 1, 2].map(num => (
                      <button
                        key={num}
                        onClick={() => setCompanionCount(num)}
                        className={`flex-1 py-2 rounded-lg border ${
                          companionCount === num 
                            ? 'bg-blue-700 text-white border-blue-700' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {num} {isZh ? '人' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Services */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {isZh ? '增值服务' : 'Additional Services'}
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeServices.consultation}
                        onChange={(e) => setIncludeServices({...includeServices, consultation: e.target.checked})}
                        className="w-5 h-5 text-blue-700 rounded"
                      />
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{isZh ? 'AI 咨询报告 ($49)' : 'AI Consultation Report ($49)'}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeServices.translation}
                        onChange={(e) => setIncludeServices({...includeServices, translation: e.target.checked})}
                        className="w-5 h-5 text-blue-700 rounded"
                      />
                      <span className="text-gray-700">{isZh ? '全程翻译服务 ($50/天)' : 'Full Translation Service ($50/day)'}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeServices.pickup}
                        onChange={(e) => setIncludeServices({...includeServices, pickup: e.target.checked})}
                        className="w-5 h-5 text-blue-700 rounded"
                      />
                      <Car className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{isZh ? '机场接送 ($100)' : 'Airport Pickup ($100)'}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimate Result */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                {isZh ? '费用预估' : 'Cost Estimate'}
              </h2>

              {!estimate ? (
                <div className="text-center py-12 text-gray-500">
                  <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>{isZh ? '请选择治疗项目和城市查看预估费用' : 'Select a procedure and city to see the estimate'}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Selected Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">{isZh ? procedure?.name.zh : procedure?.name.en}</p>
                    <p className="text-sm text-gray-500">{isZh ? city?.name.zh : city?.name.en} · {stayDays} {isZh ? '天' : 'days'}</p>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{isZh ? '治疗费用（预估）' : 'Treatment (estimated)'}</span>
                      <span className="font-medium">${estimate.treatment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{isZh ? '住宿费用' : 'Accommodation'}</span>
                      <span className="font-medium">${estimate.hotel.toLocaleString()}</span>
                    </div>
                    {includeServices.consultation && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{isZh ? 'AI 咨询报告' : 'AI Consultation'}</span>
                        <span className="font-medium">${estimate.consultation}</span>
                      </div>
                    )}
                    {includeServices.translation && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{isZh ? '翻译服务' : 'Translation'}</span>
                        <span className="font-medium">${estimate.translation.toLocaleString()}</span>
                      </div>
                    )}
                    {includeServices.pickup && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{isZh ? '机场接送' : 'Airport Pickup'}</span>
                        <span className="font-medium">${estimate.pickup}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{isZh ? '应急预留（10%）' : 'Contingency (10%)'}</span>
                      <span className="font-medium">${estimate.contingency.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">{isZh ? '预估总费用' : 'Estimated Total'}</span>
                      <span className="text-3xl font-bold text-blue-700">${estimate.total.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {isZh 
                        ? '此费用为预估，实际费用可能因病情、医院选择等因素有所不同。'
                        : 'This is an estimate. Actual costs may vary based on condition and hospital choice.'
                      }
                    </p>
                  </div>

                  {/* Comparison */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      {isZh 
                        ? `💰 相比美国/欧洲，预计节省 ${Math.round((1 - estimate.total / (estimate.total * 4)) * 100)}% 费用`
                        : `💰 Save ~${Math.round((1 - estimate.total / (estimate.total * 4)) * 100)}% compared to US/Europe`
                      }
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="/contact"
                    className="block w-full bg-blue-700 text-white text-center py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    {isZh ? '获取详细方案' : 'Get Detailed Plan'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
