'use client'
import Link from 'next/link'
import { useLanguage } from './LanguageProvider'

const hospitals = [
  { name: 'Peking Union Medical College Hospital', nameZh: '北京协和医院', city: 'Beijing', flag: '🏛️', specialties: ['Oncology','Cardiology','Neurology','Rare Diseases'], rating: 4.9, patients: '2,000+', founded: '1921', beds: '2,000+', desc: { zh: '中国连续13年排名第一的顶级医疗机构，以复杂疾病和罕见病治疗享誉全球。', en: 'China\'s premier medical institution, ranked #1 nationally for 13 consecutive years. World-renowned for complex and rare disease treatment.', ar: 'المؤسسة الطبية الرائدة في الصين، المصنفة الأولى وطنياً لـ13 عاماً متتالياً. مشهورة عالمياً بعلاج الأمراض المعقدة والنادرة.', fr: 'Institution médicale de premier plan en Chine, classée n°1 nationalement pendant 13 années consécutives. Renommée mondialement pour le traitement des maladies complexes et rares.', es: 'Institución médica líder de China, clasificada #1 a nivel nacional durante 13 años consecutivos. Reconocida mundialmente por el tratamiento de enfermedades complejas y raras.', ru: 'Ведущее медицинское учреждение Китая, занимающее 1-е место в стране 13 лет подряд. Всемирно известно лечением сложных и редких заболеваний.' }, phone: '+86-10-69156114', accreditation: 'JCI' },
  { name: 'Zhongshan Hospital (Fudan University)', nameZh: '复旦大学附属中山医院', city: 'Shanghai', flag: '🏥', specialties: ['Liver Surgery','Cardiology','Gastroenterology'], rating: 4.8, patients: '1,500+', founded: '1937', beds: '2,500+', desc: { zh: '肝移植和心血管领域的领先医院，每年完成400余例肝移植手术，位居全球前列。', en: 'Leading hospital in liver transplantation and cardiovascular care. Performs over 400 liver transplants annually — among the highest globally.', ar: 'مستشفى رائد في زراعة الكبد والرعاية القلبية الوعائية. يجري أكثر من 400 عملية زراعة كبد سنوياً.', fr: 'Hôpital leader en transplantation hépatique et soins cardiovasculaires. Réalise plus de 400 transplantations hépatiques par an.', es: 'Hospital líder en trasplante de hígado y atención cardiovascular. Realiza más de 400 trasplantes de hígado al año.', ru: 'Ведущая больница по трансплантации печени и сердечно-сосудистой помощи. Выполняет более 400 трансплантаций печени в год.' }, phone: '+86-21-64041990', accreditation: 'JCI' },
  { name: 'West China Hospital (Sichuan University)', nameZh: '四川大学华西医院', city: 'Chengdu', flag: '🏨', specialties: ['Orthopedics','Neurosurgery','Stomatology'], rating: 4.8, patients: '1,200+', founded: '1892', beds: '4,300+', desc: { zh: '全球最大医院之一，西部地区排名第一，骨科和神经外科成果卓越，配备尖端机器人手术系统。', en: 'One of the largest hospitals in the world. Ranked #1 in western China. Exceptional orthopedic and neurosurgical outcomes with cutting-edge robotic surgery.', ar: 'واحد من أكبر المستشفيات في العالم. الأول في غرب الصين. نتائج استثنائية في جراحة العظام والأعصاب.', fr: 'L\'un des plus grands hôpitaux du monde. Classé n°1 en Chine occidentale. Résultats exceptionnels en orthopédie et neurochirurgie.', es: 'Uno de los hospitales más grandes del mundo. Clasificado #1 en el oeste de China. Resultados excepcionales en ortopedia y neurocirugía.', ru: 'Один из крупнейших больниц мира. Занимает 1-е место в западном Китае. Исключительные результаты в ортопедии и нейрохирургии.' }, phone: '+86-28-85422114', accreditation: 'ISO' },
  { name: 'Sun Yat-sen University First Affiliated', nameZh: '中山大学附属第一医院', city: 'Guangzhou', flag: '🏩', specialties: ['Organ Transplant','Oncology','Nephrology'], rating: 4.7, patients: '900+', founded: '1910', beds: '3,300+', desc: { zh: '华南地区顶级医院，器官移植领域先驱，已完成超过10,000例肾脏移植手术。', en: 'Top-ranked in southern China. Pioneering organ transplantation with over 10,000 kidney transplants performed.', ar: 'الأعلى تصنيفاً في جنوب الصين. رائد في زراعة الأعضاء مع أكثر من 10,000 عملية زراعة كلى.', fr: 'Mieux classé dans le sud de la Chine. Pionnier de la transplantation d\'organes avec plus de 10 000 transplantations rénales.', es: 'El mejor clasificado en el sur de China. Pionero en trasplante de órganos con más de 10,000 trasplantes de riñón.', ru: 'Лучший рейтинг в южном Китае. Пионер трансплантации органов с более чем 10 000 трансплантаций почек.' }, phone: '+86-20-87755766', accreditation: 'ISO' },
  { name: 'Ruijin Hospital (Shanghai Jiao Tong)', nameZh: '上海交通大学医学院附属瑞金医院', city: 'Shanghai', flag: '🏦', specialties: ['Hematology','Endocrinology','General Surgery'], rating: 4.8, patients: '1,100+', founded: '1907', beds: '1,700+', desc: { zh: '白血病治疗全球领先——开创"上海方案"，APL白血病治愈率超95%，代谢疾病国际权威中心。', en: 'World leader in leukemia treatment — pioneered the "Shanghai Protocol" for APL leukemia with 95%+ cure rate.', ar: 'رائد عالمي في علاج سرطان الدم — رائد في "بروتوكول شنغهاي" لسرطان الدم APL بمعدل شفاء يتجاوز 95٪.', fr: 'Leader mondial dans le traitement de la leucémie — a développé le "Protocole de Shanghai" pour la leucémie APL avec un taux de guérison de 95%+.', es: 'Líder mundial en el tratamiento de leucemia — pionero en el "Protocolo de Shanghai" para leucemia APL con tasa de curación del 95%+.', ru: 'Мировой лидер в лечении лейкемии — разработал «Шанхайский протокол» для ОПЛ с уровнем излечения 95%+.' }, phone: '+86-21-64370045', accreditation: 'JCI' },
  { name: 'Huashan Hospital International Medical Center', nameZh: '复旦大学附属华山医院', city: 'Shanghai', flag: '🌟', specialties: ['Neurology','Infectious Disease','Dermatology'], rating: 4.7, patients: '800+', founded: '1907', beds: '1,700+', desc: { zh: '亚洲顶级神经科中心，设有专属国际医疗中心，英语服务，已服务80余个国籍的患者。', en: 'Premier neurology center ranked among Asia\'s best. Dedicated International Medical Center with English-speaking staff serving 80+ nationalities.', ar: 'مركز أعصاب رائد مصنف بين الأفضل في آسيا. مركز طبي دولي مخصص بموظفين يتحدثون الإنجليزية يخدم أكثر من 80 جنسية.', fr: 'Centre de neurologie de premier plan classé parmi les meilleurs d\'Asie. Centre médical international dédié avec personnel anglophone servant plus de 80 nationalités.', es: 'Centro de neurología líder clasificado entre los mejores de Asia. Centro médico internacional dedicado con personal de habla inglesa que sirve a más de 80 nacionalidades.', ru: 'Ведущий неврологический центр, входящий в число лучших в Азии. Специализированный международный медицинский центр с англоязычным персоналом, обслуживающий более 80 национальностей.' }, phone: '+86-21-52889999', accreditation: 'ISO' },
]

export default function HospitalHighlights() {
  const { t, locale } = useLanguage()
  const loc = locale as 'zh' | 'en' | 'ar' | 'fr' | 'es' | 'ru'

  return (
    <section className="py-24 bg-white" id="hospitals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">{t('hospitals.tagline')}</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">{t('hospitals.title')}</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t('hospitals.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((h, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-6 card-hover bg-white flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{h.flag}</div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-bold text-gray-900 text-sm">{h.rating}</span>
                  </div>
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">{h.accreditation}</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-0.5">{h.name}</h3>
              <div className="text-gray-400 text-xs mb-2">{h.nameZh} · Est. {h.founded}</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gray-500 text-sm">📍 {h.city}</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {t('hospitals.intlDept')} ✓
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-1">{h.desc[loc] ?? h.desc.en}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {h.specialties.map(s => (
                  <span key={s} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-lg">{s}</span>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 mt-auto">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>🛏️ {h.beds} {t('hospitals.beds')}</span>
                  <span>🌍 {h.patients} {t('hospitals.intlPatients')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">📞 {h.phone}</span>
                  <Link href="/hospitals" className="text-blue-700 text-sm font-medium hover:underline">
                    {t('hospitals.viewDetails')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/hospitals" className="inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-700 hover:text-white transition-colors">
            {t('hospitals.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
