'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const ALL_HOSPITALS = [
  { id: 1, name: 'Peking Union Medical College Hospital', nameZh: '北京协和医院', city: 'Beijing', region: 'north', specialties: ['Oncology', 'Cardiology', 'Neurology', 'Rare Diseases'], rating: 4.9, patients: '2,000+', beds: '2,000+', founded: '1921', accreditation: 'JCI', intlDept: true, desc: 'China\'s #1 ranked hospital for 13 consecutive years. World-renowned for complex and rare disease treatment.', phone: '+86-10-69156114', flag: '🏛️' },
  { id: 2, name: 'Zhongshan Hospital (Fudan University)', nameZh: '复旦大学附属中山医院', city: 'Shanghai', region: 'east', specialties: ['Liver Surgery', 'Cardiology', 'Gastroenterology'], rating: 4.8, patients: '1,500+', beds: '2,500+', founded: '1937', accreditation: 'JCI', intlDept: true, desc: 'World leader in liver transplantation. Performs 400+ liver transplants annually.', phone: '+86-21-64041990', flag: '🏥' },
  { id: 3, name: 'West China Hospital (Sichuan University)', nameZh: '四川大学华西医院', city: 'Chengdu', region: 'west', specialties: ['Orthopedics', 'Neurosurgery', 'Stomatology'], rating: 4.8, patients: '1,200+', beds: '4,300+', founded: '1892', accreditation: 'ISO', intlDept: true, desc: 'One of the world\'s largest hospitals. #1 in western China for orthopedics and neurosurgery.', phone: '+86-28-85422114', flag: '🏨' },
  { id: 4, name: 'Sun Yat-sen University First Affiliated', nameZh: '中山大学附属第一医院', city: 'Guangzhou', region: 'south', specialties: ['Organ Transplant', 'Oncology', 'Nephrology'], rating: 4.7, patients: '900+', beds: '3,300+', founded: '1910', accreditation: 'ISO', intlDept: true, desc: 'Top-ranked in southern China. Over 10,000 kidney transplants performed.', phone: '+86-20-87755766', flag: '🏩' },
  { id: 5, name: 'Ruijin Hospital (Shanghai Jiao Tong)', nameZh: '上海交通大学医学院附属瑞金医院', city: 'Shanghai', region: 'east', specialties: ['Hematology', 'Endocrinology', 'General Surgery'], rating: 4.8, patients: '1,100+', beds: '1,700+', founded: '1907', accreditation: 'JCI', intlDept: true, desc: 'Pioneered the "Shanghai Protocol" for leukemia with 95%+ cure rate.', phone: '+86-21-64370045', flag: '🏦' },
  { id: 6, name: 'Huashan Hospital International', nameZh: '复旦大学附属华山医院', city: 'Shanghai', region: 'east', specialties: ['Neurology', 'Infectious Disease', 'Dermatology'], rating: 4.7, patients: '800+', beds: '1,700+', founded: '1907', accreditation: 'ISO', intlDept: true, desc: 'Premier neurology center. International Medical Center serving 80+ nationalities.', phone: '+86-21-52889999', flag: '🌟' },
  { id: 7, name: 'Beijing Tiantan Hospital', nameZh: '首都医科大学附属北京天坛医院', city: 'Beijing', region: 'north', specialties: ['Neurosurgery', 'Neurology', 'Stroke'], rating: 4.8, patients: '700+', beds: '1,650+', founded: '1956', accreditation: 'JCI', intlDept: true, desc: 'Ranked among world\'s top 10 for neurological care. Asia\'s largest neuroscience center.', phone: '+86-10-59976699', flag: '🧠' },
  { id: 8, name: 'Beijing Anzhen Hospital', nameZh: '首都医科大学附属北京安贞医院', city: 'Beijing', region: 'north', specialties: ['Cardiac Surgery', 'Cardiology', 'Vascular Surgery'], rating: 4.8, patients: '1,000+', beds: '1,500+', founded: '1984', accreditation: 'ISO', intlDept: true, desc: 'China\'s largest cardiac surgery center. Performs 10,000+ cardiac surgeries annually.', phone: '+86-10-64456114', flag: '❤️' },
  { id: 9, name: 'Sun Yat-sen University Cancer Center', nameZh: '中山大学肿瘤防治中心', city: 'Guangzhou', region: 'south', specialties: ['Oncology', 'Radiation Therapy', 'Cancer Surgery'], rating: 4.9, patients: '1,300+', beds: '1,800+', founded: '1964', accreditation: 'ISO', intlDept: true, desc: 'China\'s top cancer center. Ranked #1 for nasopharyngeal carcinoma treatment globally.', phone: '+86-20-87343088', flag: '🎗️' },
  { id: 10, name: 'Zhejiang University First Affiliated', nameZh: '浙江大学医学院附属第一医院', city: 'Hangzhou', region: 'east', specialties: ['Liver Transplant', 'Infectious Disease', 'Organ Transplant'], rating: 4.7, patients: '600+', beds: '3,600+', founded: '1947', accreditation: 'ISO', intlDept: true, desc: 'National leader in liver transplantation and infectious disease. Pioneered COVID-19 treatment protocols.', phone: '+86-571-87236666', flag: '🏯' },
  { id: 11, name: 'Tongji Hospital (Huazhong University)', nameZh: '华中科技大学同济医学院附属同济医院', city: 'Wuhan', region: 'central', specialties: ['Cardiology', 'Oncology', 'Organ Transplant'], rating: 4.7, patients: '500+', beds: '4,000+', founded: '1900', accreditation: 'ISO', intlDept: true, desc: 'Central China\'s premier medical center. Renowned for cardiac and organ transplant programs.', phone: '+86-27-83663300', flag: '🏫' },
  { id: 12, name: 'Peking University People\'s Hospital', nameZh: '北京大学人民医院', city: 'Beijing', region: 'north', specialties: ['Hematology', 'Orthopedics', 'Trauma Surgery'], rating: 4.7, patients: '800+', beds: '2,000+', founded: '1918', accreditation: 'ISO', intlDept: true, desc: 'World-leading bone marrow transplant center. Pioneered haploidentical transplantation.', phone: '+86-10-88324422', flag: '🏤' },
]

const CITIES = ['All Cities', 'Beijing', 'Shanghai', 'Guangzhou', 'Chengdu', 'Hangzhou', 'Wuhan']
const SPECIALTIES = ['All Specialties', 'Oncology', 'Cardiology', 'Orthopedics', 'Neurology', 'Liver Surgery', 'Organ Transplant', 'Hematology']

export default function HospitalsPage() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('All Cities')
  const [specialty, setSpecialty] = useState('All Specialties')
  const [jciOnly, setJciOnly] = useState(false)

  const filtered = ALL_HOSPITALS.filter(h => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchCity = city === 'All Cities' || h.city === city
    const matchSpec = specialty === 'All Specialties' || h.specialties.includes(specialty)
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
            <h1 className="text-4xl font-extrabold mb-3">Hospital Directory</h1>
            <p className="text-blue-200 text-lg">Browse China's top hospitals with international medical departments</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 border border-gray-100">
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="🔍 Search hospitals, cities, specialties..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              />
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <select
                value={specialty}
                onChange={e => setSpecialty(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                id="jci"
                checked={jciOnly}
                onChange={e => setJciOnly(e.target.checked)}
                className="w-4 h-4 accent-blue-700"
              />
              <label htmlFor="jci" className="text-sm text-gray-600 cursor-pointer">JCI Accredited only</label>
              <span className="ml-auto text-sm text-gray-400">{filtered.length} hospitals found</span>
            </div>
          </div>

          {/* Hospital Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(h => (
              <div key={h.id} className="bg-white rounded-2xl border border-gray-200 p-6 card-hover flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{h.flag}</span>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="font-bold text-gray-900 text-sm">{h.rating}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${h.accreditation === 'JCI' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {h.accreditation}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{h.name}</h3>
                <div className="text-gray-400 text-xs mb-2">{h.nameZh} · Est. {h.founded}</div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-500 text-xs">📍 {h.city}</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Intl. Dept ✓</span>
                </div>

                <p className="text-gray-500 text-sm mb-3 flex-1 leading-relaxed">{h.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {h.specialties.map(s => (
                    <span key={s} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-lg">{s}</span>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <span className="text-gray-400 text-xs">🌍 {h.patients} intl/yr</span>
                  <Link
                    href={`/get-started?hospital=${encodeURIComponent(h.name)}`}
                    className="bg-blue-700 text-white text-xs px-4 py-1.5 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🔍</div>
              <div className="text-lg font-medium">No hospitals found</div>
              <div className="text-sm mt-1">Try adjusting your filters</div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
