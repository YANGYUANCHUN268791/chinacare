import type { Metadata } from 'next'
import Tracking from '@/components/Tracking'
import CookieConsent from '@/components/CookieConsent'

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'ar' }, { locale: 'fr' }, { locale: 'es' }, { locale: 'ru' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    metadataBase: new URL('https://healthroute.xyz'),
    title: {
      default: locale === 'zh'
        ? 'ChinaCare — 中国世界级医疗服务'
        : 'ChinaCare — World-Class Medical Care in China',
      template: '%s | ChinaCare',
    },
    description: locale === 'zh'
      ? '连接全球患者与中国顶级医院。AI智能规划、多语言支持、签证指导，全程就医服务。'
      : "Access China's top hospitals with international departments. AI-powered care planning, multilingual support, visa guidance, and end-to-end journey assistance for global patients.",
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Tracking />
      <CookieConsent />
      {children}
    </>
  )
}
