import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Star, Quote, ArrowRight } from 'lucide-react'

const stories = [
  {
    name: 'Ahmed A.',
    nameZh: '艾哈迈德',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    condition: 'Cardiac Surgery — Heart Bypass',
    conditionZh: '心脏外科 — 心脏搭桥手术',
    hospital: 'Beijing Anzhen Hospital',
    city: 'Beijing',
    rating: 5,
    quote: "I was told I'd wait 8 months for heart surgery in the UK. Through ChinaCare, I was in Beijing within 3 weeks. The surgery was excellent, the doctors were world-class, and I saved over $80,000.",
    quoteZh: "在英国，我被告知需要等待8个月才能进行心脏手术。通过ChinaCare，我在3周内就到了北京。手术非常成功，医生是世界级的，我节省了超过8万美元。",
    photo: 'AS',
    initialsColor: 'bg-green-100 text-green-700',
    date: '2025',
  },
  {
    name: 'Maria S.',
    nameZh: '玛丽亚',
    country: 'Russia',
    countryFlag: '🇷🇺',
    condition: 'Liver Transplant Evaluation',
    conditionZh: '肝脏移植评估',
    hospital: 'Zhongshan Hospital, Fudan University',
    city: 'Shanghai',
    rating: 5,
    quote: "As a mother, I was desperate. My son needed a liver transplant and we couldn't afford the wait or the cost in Europe. ChinaCare connected us with Zhongshan Hospital in Shanghai. The medical team was extraordinary.",
    quoteZh: "作为一位母亲，我曾绝望不已。我的儿子需要肝脏移植，我们在欧洲既负担不起等待时间，也负担不起费用。ChinaCare为我们联系了上海中山医院。医疗团队非常出色。",
    photo: 'MS',
    initialsColor: 'bg-purple-100 text-purple-700',
    date: '2025',
  },
  {
    name: 'James K.',
    nameZh: '詹姆斯',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    condition: 'Spine Surgery — Herniated Disc',
    conditionZh: '脊柱手术 — 椎间盘突出',
    hospital: 'West China Hospital, Sichuan University',
    city: 'Chengdu',
    rating: 5,
    quote: "I had chronic back pain for 6 years. After connecting with ChinaCare's team, I was matched with West China Hospital's orthopedic department. The surgery was minimally invasive and I was walking within 2 days.",
    quoteZh: "我患有慢性背痛已有6年。通过ChinaCare的团队，我被推荐到了四川大学华西医院的骨科。手术是微创的，我两天内就能下床行走了。",
    photo: 'JK',
    initialsColor: 'bg-blue-100 text-blue-700',
    date: '2024',
  },
  {
    name: 'Fatima H.',
    nameZh: '法蒂玛',
    country: 'UAE',
    countryFlag: '🇦🇪',
    condition: 'IVF Treatment — Fertility',
    conditionZh: '试管婴儿治疗',
    hospital: 'Shanghai First Maternity & Infant Hospital',
    city: 'Shanghai',
    rating: 5,
    quote: "After 4 failed IVF attempts in the UAE and Europe, we came to China through ChinaCare. The cost was 40% less than what we paid before, and the care was exceptional. We are now expecting twins.",
    quoteZh: "在阿联酋和欧洲经历了4次试管婴儿失败后，我们通过ChinaCare来到中国。费用比我们之前支付的减少了40%，而且护理非常出色。我们现在即将迎来双胞胎。",
    photo: 'FH',
    initialsColor: 'bg-pink-100 text-pink-700',
    date: '2025',
  },
  {
    name: 'Dr. Oluwaseun B.',
    nameZh: '奥卢瓦塞恩医生',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    condition: 'Oncology — Radiation Therapy',
    conditionZh: '肿瘤科 — 放射治疗',
    hospital: 'Sun Yat-sen University Cancer Center',
    city: 'Guangzhou',
    rating: 5,
    quote: "As a physician myself, I'm highly selective about where I refer patients. I referred a colleague's wife to Guangzhou for targeted radiation therapy. The outcomes exceeded expectations. ChinaCare's coordination was seamless.",
    quoteZh: "作为医生，我对转诊医院非常挑剔。我将一位同事的妻子转诊到广州进行靶向放射治疗。结果超出了预期。ChinaCare的协调工作无缝衔接。",
    photo: 'OB',
    initialsColor: 'bg-amber-100 text-amber-700',
    date: '2024',
  },
  {
    name: 'Carlos M.',
    nameZh: '卡洛斯',
    country: 'Mexico',
    countryFlag: '🇲🇽',
    condition: 'Hip Replacement — Orthopedics',
    conditionZh: '髋关节置换 — 骨科',
    hospital: 'Peking Union Medical College Hospital',
    city: 'Beijing',
    rating: 5,
    quote: "I needed a hip replacement but my insurance in Mexico only covered a fraction. ChinaCare found me an excellent hospital in Beijing, handled all the logistics including visa, accommodation, and translation. Life-changing experience.",
    quoteZh: "我需要髋关节置换，但墨西哥的保险只能覆盖一小部分费用。ChinaCare为我找到了北京一家优秀的医院，处理了签证、住宿和翻译等所有后勤事务。改变人生的体验。",
    photo: 'CM',
    initialsColor: 'bg-teal-100 text-teal-700',
    date: '2025',
  },
]

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Patient Stories</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Real experiences from patients who found world-class medical care in China through ChinaCare.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-blue-200">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">All stories verified · Average rating 4.9/5</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-700">4.9/5</p>
              <p className="text-xs text-gray-500 mt-1">Average Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">95%+</p>
              <p className="text-xs text-gray-500 mt-1">Would Recommend</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">30+</p>
              <p className="text-xs text-gray-500 mt-1">Countries Served</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-full ${story.initialsColor} flex items-center justify-center text-lg font-bold flex-shrink-0`}>
                  {story.photo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{story.countryFlag}</span>
                    <span className="font-bold text-gray-900">{story.name}</span>
                    <span className="text-sm text-gray-400">·</span>
                    <span className="text-sm text-gray-500">{story.country}</span>
                  </div>
                  <p className="text-sm text-gray-500">{story.city} · {story.date}</p>
                  <div className="flex mt-1">
                    {Array.from({ length: story.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <Quote className="w-8 h-8 text-blue-100 flex-shrink-0" />
              </div>

              {/* Condition */}
              <div className="bg-blue-50 rounded-lg px-4 py-2 mb-4 inline-block">
                <p className="text-xs font-medium text-blue-700">{story.condition}</p>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-600 leading-relaxed mb-4 italic">
                "{story.quote}"
              </blockquote>

              {/* Hospital */}
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Treated at</p>
                  <p className="text-sm font-medium text-gray-700">{story.hospital}</p>
                </div>
                <a
                  href="/contact"
                  className="text-sm text-blue-700 font-medium hover:text-blue-800 flex items-center gap-1"
                >
                  Get matched <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your Story Today</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of patients from around the world who have found exceptional care in China.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-started"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Consultation
            </a>
            <a
              href="/calculator"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Estimate My Costs
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
