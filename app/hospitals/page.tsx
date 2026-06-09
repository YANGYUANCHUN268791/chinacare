'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'

import { ALL_HOSPITALS } from '@/lib/hospitals-data'

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
                      href={`/hospitals/${hospital.id}`}
                      className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      {isZh ? '查看详情' : 'View Details'}
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
