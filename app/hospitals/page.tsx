'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'

const ALL_HOSPITALS = [
  { id: 1, name: 'Peking Union Medical College Hospital', nameZh: '北京协和医院', city: 'Beijing', cityZh: '北京', region: 'north', specialties: ['Oncology', 'Cardiology', 'Neurology', 'Rare Diseases'], specialtiesZh: ['肿瘤科', '心脏科', '神经科', '罕见病'], rating: 4.9, patients: '2,000+', beds: '2,000+', founded: '1921', accreditation: 'JCI', intlDept: true, desc: 'China\'s #1 ranked hospital for 13 consecutive years.', descZh: '连续13年全国排名第一的医院。', phone: '+86-10-69156114', flag: '🏛️' },
  { id: 2, name: 'Zhongshan Hospital (Fudan University)', nameZh: '复旦大学附属中山医院', city: 'Shanghai', cityZh: '上海', region: 'east', specialties: ['Liver Surgery', 'Cardiology', 'Gastroenterology'], specialtiesZh: ['肝胆外科', '心脏科', '消化科'], rating: 4.8, patients: '1,500+', beds: '2,500+', founded: '1937', accreditation: 'JCI', intlDept: true, desc: 'World leader in liver transplantation.', descZh: '全球肝移植领域的领先者。', phone: '+86-21-64041990', flag: '🏥' },
  { id: 3, name: 'West China Hospital (Sichuan University)', nameZh: '四川大学华西医院', city: 'Chengdu', cityZh: '成都', region: 'west', specialties: ['Orthopedics', 'Neurosurgery', 'Stomatology'], specialtiesZh: ['骨科', '神经外科', '口腔科'], rating: 4.8, patients: '1,200+', beds: '4,300+', founded: '1892', accreditation: 'ISO', intlDept: true, desc: 'One of the world\'s largest hospitals.', descZh: '全球最大的医院之一。', phone: '+86-28-85422114', flag: '🏨' },
  { id: 4, name: 'Sun Yat-sen University First Affiliated', nameZh: '中山大学附属第一医院', city: 'Guangzhou', cityZh: '广州', region: 'south', specialties: ['Organ Transplant', 'Oncology', 'Nephrology'], specialtiesZh: ['器官移植', '肿瘤科', '肾内科'], rating: 4.7, patients: '900+', beds: '3,300+', founded: '1910', accreditation: 'ISO', intlDept: true, desc: 'Top-ranked in southern China.', descZh: '华南地区排名第一的医院。', phone: '+86-20-87755766', flag: '🏩' },
  { id: 5, name: 'Ruijin Hospital (Shanghai Jiao Tong)', nameZh: '上海瑞金医院', city: 'Shanghai', cityZh: '上海', region: 'east', specialties: ['Hematology', 'Endocrinology', 'General Surgery'], specialtiesZh: ['血液科', '内分泌科', '普外科'], rating: 4.8, patients: '1,100+', beds: '1,700+', founded: '1907', accreditation: 'JCI', intlDept: true, desc: 'Pioneered the "Shanghai Protocol" for leukemia.', descZh: '开创了白血病治疗的"上海方案"。', phone: '+86-21-64370045', flag: '🏦' },
  { id: 6, name: 'Huashan Hospital International', nameZh: '复旦大学附属华山医院', city: 'Shanghai', cityZh: '上海', region: 'east', specialties: ['Neurology', 'Infectious Disease', 'Dermatology'], specialtiesZh: ['神经科', '感染科', '皮肤科'], rating: 4.7, patients: '800+', beds: '1,700+', founded: '1907', accreditation: 'ISO', intlDept: true, desc: 'Premier neurology center.', descZh: '顶尖的神经科中心。', phone: '+86-21-52889999', flag: '🌟' },
  { id: 7, name: 'Beijing Tiantan Hospital', nameZh: '北京天坛医院', city: 'Beijing', cityZh: '北京', region: 'north', specialties: ['Neurosurgery', 'Neurology', 'Stroke'], specialtiesZh: ['神经外科', '神经科', '卒中中心'], rating: 4.8, patients: '700+', beds: '1,650+', founded: '1956', accreditation: 'JCI', intlDept: true, desc: 'Ranked among world\'s top 10 for neurological care.', descZh: '全球神经科治疗前十。', phone: '+86-10-59976699', flag: '🧠' },
  { id: 8, name: 'Beijing Anzhen Hospital', nameZh: '北京安贞医院', city: 'Beijing', cityZh: '北京', region: 'north', specialties: ['Cardiac Surgery', 'Cardiology', 'Vascular Surgery'], specialtiesZh: ['心脏外科', '心脏科', '血管外科'], rating: 4.8, patients: '1,000+', beds: '1,500+', founded: '1984', accreditation: 'ISO', intlDept: true, desc: 'China\'s largest cardiac surgery center.', descZh: '中国最大的心脏外科中心。', phone: '+86-10-64456114', flag: '❤️' },
  { id: 9, name: 'Sun Yat-sen University Cancer Center', nameZh: '中山大学肿瘤防治中心', city: 'Guangzhou', cityZh: '广州', region: 'south', specialties: ['Oncology', 'Radiation Therapy', 'Cancer Surgery'], specialtiesZh: ['肿瘤科', '放射治疗', '肿瘤外科'], rating: 4.9, patients: '1,300+', beds: '1,800+', founded: '1964', accreditation: 'ISO', intlDept: true, desc: 'China\'s top cancer center.', descZh: '中国顶尖的肿瘤中心。', phone: '+86-20-87343088', flag: '🎗️' },
  { id: 10, name: 'Zhejiang University First Affiliated', nameZh: '浙江大学附属第一医院', city: 'Hangzhou', cityZh: '杭州', region: 'east', specialties: ['Liver Transplant', 'Infectious Disease', 'Organ Transplant'], specialtiesZh: ['肝移植', '感染科', '器官移植'], rating: 4.7, patients: '600+', beds: '3,600+', founded: '1947', accreditation: 'ISO', intlDept: true, desc: 'National leader in liver transplantation.', descZh: '全国肝移植领域的领导者。', phone: '+86-571-87236666', flag: '🏯' },
  { id: 11, name: 'Tongji Hospital (Huazhong University)', nameZh: '华中科技大学同济医院', city: 'Wuhan', cityZh: '武汉', region: 'central', specialties: ['Cardiology', 'Oncology', 'Organ Transplant'], specialtiesZh: ['心脏科', '肿瘤科', '器官移植'], rating: 4.7, patients: '500+', beds: '4,000+', founded: '1900', accreditation: 'ISO', intlDept: true, desc: 'Central China\'s premier medical center.', descZh: '华中地区顶尖的医疗中心。', phone: '+86-27-83663300', flag: '🏫' },
  { id: 12, name: 'Peking University People\'s Hospital', nameZh: '北京大学人民医院', city: 'Beijing', cityZh: '北京', region: 'north', specialties: ['Hematology', 'Orthopedics', 'Trauma Surgery'], specialtiesZh: ['血液科', '骨科', '创伤外科'], rating: 4.7, patients: '800+', beds: '2,000+', founded: '1918', accreditation: 'ISO', intlDept: true, desc: 'World-leading bone marrow transplant center.', descZh: '全球领先的骨髓移植中心。', phone: '+86-10-88324422', flag: '🏤' },
]

export default function HospitalsPage() {
  const { locale, t } = useLanguage()
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('All Cities')
  const [specialty, setSpecialty] = useState('All Specialties')
  const [jciOnly, setJciOnly] = useState(false)

  const isZh = locale === 'zh'
  
  const CITIES = isZh 
    ? ['全部城市', '北京', '上海', '广州', '成都', '杭州', '武汉']
    : ['All Cities', 'Beijing', 'Shanghai', 'Guangzhou', 'Chengdu', 'Hangzhou', 'Wuhan']
  
  const SPECIALTIES = isZh
    ? ['全部专科', '肿瘤科', '心脏科', '骨科', '神经科', '肝胆外科', '器官移植', '血液科']
    : ['All Specialties', 'Oncology', 'Cardiology', 'Orthopedics', 'Neurology', 'Liver Surgery', 'Organ Transplant', 'Hematology']

  const filtered = ALL_HOSPITALS.filter(h => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.nameZh.includes(search) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.cityZh.includes(search)
    const matchCity = city === 'All Cities' || city === '全部城市' || h.city === city || h.cityZh === city
    const matchSpec = specialty === 'All Specialties' || specialty === '全部专科' || 
      h.specialties.includes(specialty) || h.specialtiesZh.includes(specialty)
    const matchJci = !jciOnly || h.accreditation === 'JCI'
    return matchSearch && matchCity && matchSpec && matchJci
  })

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-slate-50">
        {/* Header */}
        <div className="hero-gradient py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold mb-3">{t('hospitals.title')}</h1>
            <p className="text-blue-200 text-lg">{t('hospitals.subtitle')}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder={isZh ? "搜索医院..." : "Search hospitals..."}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={jciOnly}
                  onChange={(e) => setJciOnly(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-600">JCI {isZh ? '认证' : 'Accredited'}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Hospital Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(hospital => (
              <div key={hospital.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-3xl">{hospital.flag}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      ⭐ {hospital.rating}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {isZh ? hospital.nameZh : hospital.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    📍 {isZh ? hospital.cityZh : hospital.city}
                  </p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {isZh ? hospital.descZh : hospital.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(isZh ? hospital.specialtiesZh : hospital.specialties).slice(0, 3).map((s, i) => (
                      <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                    <span>{t('hospitals.beds')}: {hospital.beds}</span>
                    <span>{t('hospitals.accreditation')}: {hospital.accreditation}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href="/get-started"
                      className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      {isZh ? '立即预约' : 'Book Now'}
                    </Link>
                    <a
                      href={`tel:${hospital.phone}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                    >
                      📞
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {isZh ? '未找到匹配的医院' : 'No hospitals found matching your criteria.'}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
