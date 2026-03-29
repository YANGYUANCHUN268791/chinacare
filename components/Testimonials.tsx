'use client'
import { useLanguage } from './LanguageProvider'

const testimonials = [
  {
    name: 'Ahmed Al-Rashidi',
    country: { zh: '沙特阿拉伯 🇸🇦', en: 'Saudi Arabia 🇸🇦', ar: 'المملكة العربية السعودية 🇸🇦', fr: 'Arabie Saoudite 🇸🇦', es: 'Arabia Saudita 🇸🇦', ru: 'Саудовская Аравия 🇸🇦' },
    condition: { zh: '心脏手术', en: 'Cardiac Surgery', ar: 'جراحة القلب', fr: 'Chirurgie cardiaque', es: 'Cirugía cardíaca', ru: 'Кардиохирургия' },
    quote: {
      zh: '我在沙特等了8个月才排到搭桥手术。ChinaCare在10天内就帮我进入了北京顶级心脏中心。医疗水平卓越，费用节省了60%。',
      en: 'I waited 8 months in Saudi Arabia for a bypass surgery date. ChinaCare got me into Beijing\'s top cardiac center in 10 days. The care was exceptional and cost 60% less.',
      ar: 'انتظرت 8 أشهر في السعودية لموعد جراحة القلب. أدخلتني ChinaCare إلى أفضل مركز قلب في بكين خلال 10 أيام. كانت الرعاية استثنائية وبتكلفة أقل بنسبة 60٪.',
      fr: 'J\'ai attendu 8 mois en Arabie Saoudite pour une date de pontage. ChinaCare m\'a fait entrer dans le meilleur centre cardiaque de Pékin en 10 jours. Les soins étaient exceptionnels et 60% moins chers.',
      es: 'Esperé 8 meses en Arabia Saudita para una fecha de bypass. ChinaCare me llevó al mejor centro cardíaco de Beijing en 10 días. La atención fue excepcional y costó un 60% menos.',
      ru: 'Я ждал 8 месяцев в Саудовской Аравии на операцию шунтирования. ChinaCare устроила меня в лучший кардиоцентр Пекина за 10 дней. Уход был исключительным, а стоимость на 60% ниже.',
    },
    avatar: 'A', color: 'bg-orange-500',
  },
  {
    name: 'Maria Santos',
    country: { zh: '菲律宾 🇵🇭', en: 'Philippines 🇵🇭', ar: 'الفلبين 🇵🇭', fr: 'Philippines 🇵🇭', es: 'Filipinas 🇵🇭', ru: 'Филиппины 🇵🇭' },
    condition: { zh: '肿瘤科（乳腺癌）', en: 'Oncology (Breast Cancer)', ar: 'الأورام (سرطان الثدي)', fr: 'Oncologie (Cancer du sein)', es: 'Oncología (Cáncer de mama)', ru: 'Онкология (рак груди)' },
    quote: {
      zh: 'AI规划师立即理解了我的诊断，并为我匹配了上海的专科医生。整个团队都会说英语，让我感到完全放心。',
      en: 'The AI planner immediately understood my diagnosis and matched me with a specialist in Shanghai. The whole team spoke English and made me feel completely at ease.',
      ar: 'فهم مخطط الذكاء الاصطناعي تشخيصي فورًا وطابقني مع متخصص في شنغهاي. تحدث الفريق بأكمله الإنجليزية وجعلني أشعر بالراحة التامة.',
      fr: 'Le planificateur IA a immédiatement compris mon diagnostic et m\'a mis en relation avec un spécialiste à Shanghai. Toute l\'équipe parlait anglais et m\'a mise complètement à l\'aise.',
      es: 'El planificador de IA entendió inmediatamente mi diagnóstico y me conectó con un especialista en Shanghai. Todo el equipo hablaba inglés y me hizo sentir completamente tranquila.',
      ru: 'ИИ-планировщик сразу понял мой диагноз и подобрал мне специалиста в Шанхае. Вся команда говорила по-английски и сделала меня полностью спокойной.',
    },
    avatar: 'M', color: 'bg-pink-500',
  },
  {
    name: 'James Okonkwo',
    country: { zh: '尼日利亚 🇳🇬', en: 'Nigeria 🇳🇬', ar: 'نيجيريا 🇳🇬', fr: 'Nigéria 🇳🇬', es: 'Nigeria 🇳🇬', ru: 'Нигерия 🇳🇬' },
    condition: { zh: '肝移植', en: 'Liver Transplant', ar: 'زراعة الكبد', fr: 'Transplantation hépatique', es: 'Trasplante de hígado', ru: 'Трансплантация печени' },
    quote: {
      zh: '中山医院的肝移植团队是世界级的。ChinaCare处理了一切——签证、住宿、翻译。我现在已完全康复。',
      en: 'Zhongshan Hospital\'s liver transplant team is world-class. ChinaCare handled everything — visa, accommodation, translation. I\'m now fully recovered.',
      ar: 'فريق زراعة الكبد في مستشفى جونغشان عالمي المستوى. تولت ChinaCare كل شيء — التأشيرة والإقامة والترجمة. أنا الآن تعافيت تمامًا.',
      fr: 'L\'équipe de transplantation hépatique de l\'hôpital Zhongshan est de classe mondiale. ChinaCare a tout géré — visa, hébergement, traduction. Je suis maintenant complètement rétabli.',
      es: 'El equipo de trasplante de hígado del Hospital Zhongshan es de clase mundial. ChinaCare manejó todo — visa, alojamiento, traducción. Ahora me he recuperado completamente.',
      ru: 'Команда по трансплантации печени больницы Чжуншань — мирового класса. ChinaCare взяла на себя всё — визу, проживание, перевод. Теперь я полностью восстановился.',
    },
    avatar: 'J', color: 'bg-green-600',
  },
]

export default function Testimonials() {
  const { t, locale } = useLanguage()
  const loc = locale as keyof typeof testimonials[0]['country']

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">{t('testimonials.tagline')}</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">{t('testimonials.title')}</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.country[loc] ?? item.country.en}</div>
                </div>
              </div>
              <div className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
                {item.condition[loc] ?? item.condition.en}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm italic">
                "{item.quote[loc] ?? item.quote.en}"
              </p>
              <div className="flex mt-4">
                {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-lg">★</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
