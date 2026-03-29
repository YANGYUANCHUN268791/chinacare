import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import WhyChina from '@/components/WhyChina'
import HospitalHighlights from '@/components/HospitalHighlights'
import CostComparison from '@/components/CostComparison'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyChina />
      <CostComparison />
      <HospitalHighlights />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
