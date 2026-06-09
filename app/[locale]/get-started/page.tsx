'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'

function GetStartedPageInner() {
  const { locale } = useLanguage()
  const isZh = locale === 'zh'
  const searchParams = useSearchParams()
  const preselectedHospital = searchParams.get('hospital') || ''

  const SPECIALTIES = isZh ? [
    '肿瘤科', '心脏科', '骨科', '神经科', '肝移植', '血液科',
    '内分泌/糖尿病', '中医', '普外科', '其他',
  ] : [
    'Oncology / Cancer', 'Cardiology / Heart', 'Orthopedics / Bone & Joint',
    'Neurology / Brain & Spine', 'Liver / Organ Transplant', 'Hematology / Blood',
    'Endocrinology / Diabetes', 'Traditional Chinese Medicine', 'General Surgery', 'Other',
  ]

  const COUNTRIES = isZh ? [
    '美国', '英国', '加拿大', '澳大利亚', '沙特阿拉伯',
    '阿联酋', '尼日利亚', '菲律宾', '印度尼西亚', '马来西亚', '泰国',
    '俄罗斯', '法国', '德国', '其他',
  ] : [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Saudi Arabia',
    'UAE', 'Nigeria', 'Philippines', 'Indonesia', 'Malaysia', 'Thailand',
    'Russia', 'France', 'Germany', 'Other',
  ]

  const texts = isZh ? {
    title: '开始您的就医之旅',
    subtitle: '免费咨询 — 无需任何承诺',
    step1Title: '个人信息',
    step1Desc: '请填写您的基本信息',
    firstName: '名字 *',
    lastName: '姓氏 *',
    email: '电子邮箱 *',
    phone: '电话 / WhatsApp',
    age: '年龄',
    country: '所在国家 *',
    selectCountry: '请选择国家',
    step2Title: '医疗需求',
    step2Desc: '请描述您的病情',
    specialty: '医疗专科 *',
    selectSpecialty: '请选择专科',
    condition: '病情描述 *',
    conditionPlaceholder: '请描述您的诊断、症状或所需治疗。包括相关的病史...',
    urgency: '紧急程度 *',
    urgent: '🚨 紧急',
    urgentDesc: '2周内',
    soon: '⚡ 较快',
    soonDesc: '1-3个月',
    planning: '📅 计划中',
    planningDesc: '3个月以上',
    step3Title: '偏好设置',
    step3Desc: '帮助我们为您匹配最佳医院',
    preferredHospital: '首选医院（可选）',
    hospitalPlaceholder: '例如：北京协和医院',
    budget: '预算范围（美元）',
    budgetUnder10k: '1万美元以下',
    budget10k30k: '1万-3万美元',
    budget30k80k: '3万-8万美元',
    budgetOver80k: '8万美元以上',
    travelMonth: '计划出行月份',
    step4Title: '确认提交',
    step4Desc: '请核对您的信息',
    name: '姓名',
    additionalInfo: '补充信息',
    additionalPlaceholder: '还有什么需要我们了解的？',
    privacy: '🔒 您的信息将严格保密，仅用于为您匹配合适的医疗服务。',
    back: '← 上一步',
    continue: '下一步 →',
    submit: '提交申请 ✓',
    successTitle: '申请已收到！',
    successSubtitle: '感谢您，{name}！我们的就医协调员将在24小时内与您联系，提供个性化的就医方案。',
    nextSteps: '接下来：',
    step1: '✅ 我们审核您的医疗需求',
    step2: '✅ 为您匹配最佳医院和专家',
    step3: '✅ 准备详细的就医方案和费用',
    step4: '✅ 通过邮件联系您：{email}',
    backHome: '返回首页',
  } : {
    title: 'Start Your Medical Journey',
    subtitle: 'Free consultation — no commitment required',
    step1Title: 'Personal Information',
    step1Desc: 'Tell us a bit about yourself',
    firstName: 'First Name *',
    lastName: 'Last Name *',
    email: 'Email Address *',
    phone: 'Phone / WhatsApp',
    age: 'Age',
    country: 'Country of Residence *',
    selectCountry: 'Select your country',
    step2Title: 'Medical Needs',
    step2Desc: 'Tell us about your condition',
    specialty: 'Medical Specialty *',
    selectSpecialty: 'Select specialty',
    condition: 'Describe Your Condition *',
    conditionPlaceholder: 'Please describe your diagnosis, symptoms, or treatment needed. Include any relevant medical history...',
    urgency: 'Urgency Level *',
    urgent: '🚨 Urgent',
    urgentDesc: 'Within 2 weeks',
    soon: '⚡ Soon',
    soonDesc: '1–3 months',
    planning: '📅 Planning',
    planningDesc: '3+ months',
    step3Title: 'Preferences',
    step3Desc: 'Help us find the best match for you',
    preferredHospital: 'Preferred Hospital (optional)',
    hospitalPlaceholder: 'e.g. Peking Union Medical College Hospital',
    budget: 'Budget Range (USD)',
    budgetUnder10k: 'Under $10,000',
    budget10k30k: '$10,000 – $30,000',
    budget30k80k: '$30,000 – $80,000',
    budgetOver80k: 'Over $80,000',
    travelMonth: 'Planned Travel Month',
    step4Title: 'Review & Submit',
    step4Desc: 'Please review your information before submitting',
    name: 'Name',
    additionalInfo: 'Additional Information',
    additionalPlaceholder: "Anything else you'd like us to know?",
    privacy: '🔒 Your information is kept strictly confidential and used only to match you with appropriate medical care.',
    back: '← Back',
    continue: 'Continue →',
    submit: 'Submit Request ✓',
    successTitle: 'Request Received!',
    successSubtitle: 'Thank you, {name}! Our care coordinator will contact you within 24 hours with a personalized care plan.',
    nextSteps: 'What happens next:',
    step1: '✅ We review your medical needs',
    step2: '✅ Match you with the best hospitals & specialists',
    step3: '✅ Prepare a detailed care plan with costs',
    step4: '✅ Contact you via email: {email}',
    backHome: 'Back to Home',
  }

  type Step = 1 | 2 | 3 | 4

  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    age: '',
    specialty: '',
    condition: '',
    urgency: '',
    hospital: preselectedHospital,
    budget: '',
    travelMonth: '',
    additionalInfo: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="max-w-lg mx-auto px-4 text-center py-20">
            <div className="text-7xl mb-6">🎉</div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{texts.successTitle}</h1>
            <p className="text-gray-500 text-lg mb-6">
              {texts.successSubtitle.replace('{name}', form.firstName)}
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 text-left mb-8">
              <h3 className="font-bold text-gray-900 mb-3">{texts.nextSteps}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>{texts.step1}</li>
                <li>{texts.step2}</li>
                <li>{texts.step3}</li>
                <li>{texts.step4.replace('{email}', form.email)}</li>
              </ul>
            </div>
            <a href="/" className="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors inline-block">
              {texts.backHome}
            </a>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-slate-50">
        <div className="hero-gradient py-12 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-extrabold mb-2">{texts.title}</h1>
            <p className="text-blue-200">{texts.subtitle}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          {/* Progress */}
          <div className="flex items-center justify-between mb-10">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step >= s ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > s ? '✓' : s}
                </div>
                {s < 4 && <div className={`flex-1 h-1 mx-2 rounded ${step > s ? 'bg-blue-700' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{texts.step1Title}</h2>
                <p className="text-gray-500 text-sm mb-6">{texts.step1Desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{texts.firstName}</label>
                    <input value={form.firstName} onChange={e => update('firstName', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{texts.lastName}</label>
                    <input value={form.lastName} onChange={e => update('lastName', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{texts.email}</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{texts.phone}</label>
                    <input value={form.phone} onChange={e => update('phone', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{texts.age}</label>
                    <input type="number" value={form.age} onChange={e => update('age', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{texts.country}</label>
                  <select value={form.country} onChange={e => update('country', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">{texts.selectCountry}</option>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Medical Needs */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{texts.step2Title}</h2>
                <p className="text-gray-500 text-sm mb-6">{texts.step2Desc}</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{texts.specialty}</label>
                  <select value={form.specialty} onChange={e => update('specialty', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">{texts.selectSpecialty}</option>
                    {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{texts.condition}</label>
                  <textarea value={form.condition} onChange={e => update('condition', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={texts.conditionPlaceholder} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{texts.urgency}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'urgent', label: texts.urgent, desc: texts.urgentDesc },
                      { value: 'soon', label: texts.soon, desc: texts.soonDesc },
                      { value: 'planning', label: texts.planning, desc: texts.planningDesc },
                    ].map(opt => (
                      <button key={opt.value}
                        onClick={() => update('urgency', opt.value)}
                        className={`border-2 rounded-xl p-3 text-center transition-colors ${
                          form.urgency === opt.value
                            ? 'border-blue-700 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}>
                        <div className="font-medium text-sm">{opt.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{texts.step3Title}</h2>
                <p className="text-gray-500 text-sm mb-6">{texts.step3Desc}</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{texts.preferredHospital}</label>
                  <input value={form.hospital} onChange={e => update('hospital', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={texts.hospitalPlaceholder} />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{texts.budget}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'under10k', label: texts.budgetUnder10k },
                      { value: '10k-30k', label: texts.budget10k30k },
                      { value: '30k-80k', label: texts.budget30k80k },
                      { value: 'over80k', label: texts.budgetOver80k },
                    ].map(opt => (
                      <button key={opt.value}
                        onClick={() => update('budget', opt.value)}
                        className={`border-2 rounded-xl p-3 text-sm font-medium transition-colors ${
                          form.budget === opt.value
                            ? 'border-blue-700 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-600 hover:border-blue-300'
                        }`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{texts.travelMonth}</label>
                  <input type="month" value={form.travelMonth} onChange={e => update('travelMonth', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{texts.step4Title}</h2>
                <p className="text-gray-500 text-sm mb-6">{texts.step4Desc}</p>
                <div className="space-y-3 mb-6">
                  {[
                    { label: texts.name, value: `${form.firstName} ${form.lastName}` },
                    { label: texts.email, value: form.email },
                    { label: texts.country, value: form.country },
                    { label: texts.specialty, value: form.specialty },
                    { label: texts.urgency, value: form.urgency },
                    { label: texts.budget, value: form.budget },
                  ].map(item => item.value && (
                    <div key={item.label} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{texts.additionalInfo}</label>
                  <textarea value={form.additionalInfo} onChange={e => update('additionalInfo', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={texts.additionalPlaceholder} />
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
                  {texts.privacy}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button onClick={() => setStep(s => (s - 1) as Step)}
                  className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  {texts.back}
                </button>
              ) : <div />}

              {step < 4 ? (
                <button onClick={() => setStep(s => (s + 1) as Step)}
                  className="bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-colors">
                  {texts.continue}
                </button>
              ) : (
                <button onClick={handleSubmit}
                  className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-colors">
                  {texts.submit}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function GetStartedPage() {
  return (
    <Suspense fallback={<div className="pt-16 min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <GetStartedPageInner />
    </Suspense>
  )
}
