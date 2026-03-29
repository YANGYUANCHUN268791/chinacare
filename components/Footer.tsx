'use client'
import Link from 'next/link'
import { useLanguage } from './LanguageProvider'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <span className="font-bold text-xl text-white">ChinaCare</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">{t('footer.brand')}</p>
            <div className="text-sm">
              {t('footer.availableLanguages')}<br />
              {t('footer.support')}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.hospitals')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/hospitals/beijing" className="hover:text-white transition-colors">{t('footer.beijing')}</Link></li>
              <li><Link href="/hospitals/shanghai" className="hover:text-white transition-colors">{t('footer.shanghai')}</Link></li>
              <li><Link href="/hospitals/guangzhou" className="hover:text-white transition-colors">{t('footer.guangzhou')}</Link></li>
              <li><Link href="/hospitals/chengdu" className="hover:text-white transition-colors">{t('footer.chengdu')}</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition-colors">{t('footer.allHospitals')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.specialties')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/specialties/oncology" className="hover:text-white transition-colors">{t('footer.oncology')}</Link></li>
              <li><Link href="/specialties/cardiology" className="hover:text-white transition-colors">{t('footer.cardiology')}</Link></li>
              <li><Link href="/specialties/orthopedics" className="hover:text-white transition-colors">{t('footer.orthopedics')}</Link></li>
              <li><Link href="/specialties/neurology" className="hover:text-white transition-colors">{t('footer.neurology')}</Link></li>
              <li><Link href="/specialties/tcm" className="hover:text-white transition-colors">{t('footer.tcm')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">{t('footer.howItWorks')}</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">{t('footer.pricing')}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{t('footer.blog')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">{t('footer.copyright')}</div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">{t('footer.disclaimer')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
