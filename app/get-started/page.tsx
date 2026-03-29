'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const SPECIALTIES = [
  'Oncology / Cancer', 'Cardiology / Heart', 'Orthopedics / Bone & Joint',
  'Neurology / Brain & Spine', 'Liver / Organ Transplant', 'Hematology / Blood',
  'Endocrinology / Diabetes', 'Traditional Chinese Medicine', 'General Surgery', 'Other',
]

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Saudi Arabia',
  'UAE', 'Nigeria', 'Philippines', 'Indonesia', 'Malaysia', 'Thailand',
  'Russia', 'France', 'Germany', 'Other',
]

type Step = 1 | 2 | 3 | 4

function GetStartedPageInner() {
  const searchParams = useSearchParams()
  const preselectedHospital = searchParams.get('hospital') || ''

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
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Request Received!</h1>
            <p className="text-gray-500 text-lg mb-6">
              Thank you, <strong>{form.firstName}</strong>! Our care coordinator will contact you within <strong>24 hours</strong> with a personalized care plan.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 text-left mb-8">
              <h3 className="font-bold text-gray-900 mb-3">What happens next:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ We review your medical needs</li>
                <li>✅ Match you with the best hospitals & specialists</li>
                <li>✅ Prepare a detailed care plan with costs</li>
                <li>✅ Contact you via email: <strong>{form.email}</strong></li>
              </ul>
            </div>
            <a href="/" className="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors inline-block">
              Back to Home
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
            <h1 className="text-3xl font-extrabold mb-2">Start Your Medical Journey</h1>
            <p className="text-blue-200">Free consultation — no commitment required</p>
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
                <h2 className="text-xl font-bold text-gray-900 mb-1">Personal Information</h2>
                <p className="text-gray-500 text-sm mb-6">Tell us a bit about yourself</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input value={form.firstName} onChange={e => update('firstName', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input value={form.lastName} onChange={e => update('lastName', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Smith" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
                    <input value={form.phone} onChange={e => update('phone', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 234 567 8900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input type="number" value={form.age} onChange={e => update('age', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="45" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence *</label>
                  <select value={form.country} onChange={e => update('country', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select your country</option>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Medical Needs */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Medical Needs</h2>
                <p className="text-gray-500 text-sm mb-6">Tell us about your condition</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medical Specialty *</label>
                  <select value={form.specialty} onChange={e => update('specialty', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select specialty</option>
                    {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Describe Your Condition *</label>
                  <textarea value={form.condition} onChange={e => update('condition', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Please describe your diagnosis, symptoms, or treatment needed. Include any relevant medical history..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'urgent', label: '🚨 Urgent', desc: 'Within 2 weeks' },
                      { value: 'soon', label: '⚡ Soon', desc: '1–3 months' },
                      { value: 'planning', label: '📅 Planning', desc: '3+ months' },
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
                <h2 className="text-xl font-bold text-gray-900 mb-1">Preferences</h2>
                <p className="text-gray-500 text-sm mb-6">Help us find the best match for you</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Hospital (optional)</label>
                  <input value={form.hospital} onChange={e => update('hospital', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Peking Union Medical College Hospital" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (USD)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'under10k', label: 'Under $10,000' },
                      { value: '10k-30k', label: '$10,000 – $30,000' },
                      { value: '30k-80k', label: '$30,000 – $80,000' },
                      { value: 'over80k', label: 'Over $80,000' },
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planned Travel Month</label>
                  <input type="month" value={form.travelMonth} onChange={e => update('travelMonth', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Review & Submit</h2>
                <p className="text-gray-500 text-sm mb-6">Please review your information before submitting</p>
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                    { label: 'Email', value: form.email },
                    { label: 'Country', value: form.country },
                    { label: 'Specialty', value: form.specialty },
                    { label: 'Urgency', value: form.urgency },
                    { label: 'Budget', value: form.budget },
                  ].map(item => item.value && (
                    <div key={item.label} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea value={form.additionalInfo} onChange={e => update('additionalInfo', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Anything else you'd like us to know?" />
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
                  🔒 Your information is kept strictly confidential and used only to match you with appropriate medical care.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button onClick={() => setStep(s => (s - 1) as Step)}
                  className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  ← Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button onClick={() => setStep(s => (s + 1) as Step)}
                  className="bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-colors">
                  Continue →
                </button>
              ) : (
                <button onClick={handleSubmit}
                  className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-colors">
                  Submit Request ✓
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full"/></div>}>
      <GetStartedPageInner />
    </Suspense>
  )
}
