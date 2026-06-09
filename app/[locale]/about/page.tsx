import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Heart, Users, Globe, Award, Shield, Clock } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Partner Hospitals', labelZh: '合作医院' },
  { value: '50+', valueSuffix: 'K', label: 'Patients Helped', labelZh: '服务患者' },
  { value: '30+', valueSuffix: '%', label: 'Avg. Cost Savings', labelZh: '平均费用节省' },
  { value: '24/7', label: 'Support Available', labelZh: '全天候支持' },
]

const teamValues = [
  {
    icon: Globe,
    title: 'Global Network',
    titleZh: '全球网络',
    desc: 'We partner with China\'s top hospitals that have dedicated international departments, ensuring language support, cultural sensitivity, and world-class medical standards.',
    descZh: '我们与中国顶级医院的国际部合作，确保语言支持、文化包容性和世界级医疗标准。',
  },
  {
    icon: Heart,
    title: 'Patient-First Care',
    titleZh: '患者至上',
    desc: 'Every recommendation we make is based on your specific medical needs, not hospital partnerships or commissions. Your health and outcomes are our only priority.',
    descZh: '我们提供的每一条建议都基于您的具体医疗需求，而非医院合作关系或佣金。您的健康和治疗效果是我们的唯一优先项。',
  },
  {
    icon: Shield,
    title: 'Transparent & Honest',
    titleZh: '透明诚信',
    desc: 'We provide detailed cost estimates before any commitment. No hidden fees, no surprises. You\'ll know exactly what to expect at every step of your medical journey.',
    descZh: '在任何承诺之前，我们提供详细的费用预估。绝无隐藏费用，绝无意外。您将在每一步都清楚知道会发生什么。',
  },
  {
    icon: Clock,
    title: 'Fast Access',
    titleZh: '快速通道',
    desc: 'No long waiting lists. Most patients secure appointments within 1-2 weeks. We handle the paperwork so you can focus on getting better.',
    descZh: '无需漫长等待。大多数患者在1-2周内即可获得预约。我们处理所有文书工作，让您专注于康复。',
  },
  {
    icon: Award,
    title: 'Verified Quality',
    titleZh: '品质验证',
    desc: 'All partner hospitals are JCI-accredited or equivalent. We verify credentials, track outcomes, and only work with institutions that meet international quality standards.',
    descZh: '所有合作医院均通过JCI认证或同等标准认证。我们验证资质、追踪疗效，只与符合国际质量标准的机构合作。',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    titleZh: '专属支持',
    desc: 'From your first inquiry to your return home, you have a dedicated coordinator available 24/7. We\'re with you at every step — in your language.',
    descZh: '从您第一次咨询到您回国，您的专属协调员全天候待命。我们在每一步都陪伴您——使用您的语言。',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            About ChinaCare
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Connecting global patients with world-class medical care in China — 
            with transparency, speed, and compassion.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-extrabold text-blue-700">
                  {stat.value}{stat.valueSuffix || ''}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.labelZh}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <blockquote className="text-xl text-gray-600 leading-relaxed">
            "We believe that where you live should not determine whether you live. 
            Every patient deserves access to the best medical care available — 
            and we are making that a reality for people around the world."
          </blockquote>
          <p className="mt-4 text-gray-500">
            — The ChinaCare Team
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-6">
            ChinaCare was founded with a simple but powerful idea: 
            connect international patients who need world-class medical treatment 
            with China's exceptional healthcare system — at a fraction of the cost 
            they would pay in the US, UK, or Europe.
          </p>
          <p className="mb-6">
            China is home to some of the world's most advanced hospitals, 
            many with decades of experience treating rare and complex conditions. 
            Yet for most international patients, accessing this care has been 
            nearly impossible — language barriers, unfamiliar systems, and 
            lack of trusted guidance stand in the way.
          </p>
          <p className="mb-6">
            ChinaCare changes that. We provide the bridge: 
            AI-powered matching, multilingual support, transparent pricing, 
            and a dedicated team that guides you from the first inquiry 
            through treatment and recovery.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Six core principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamValues.map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <value.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{value.title}</h3>
                <p className="text-sm text-blue-600 mb-3">{value.titleZh}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{value.descZh}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-700 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Your medical journey to China begins with a single step — a free, no-commitment consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-started"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Consultation
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
