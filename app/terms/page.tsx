import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { FileText, UserCheck, CreditCard, Ban, Gavel, Mail } from "lucide-react"

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-500">Last updated: June 2026</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">

            <Section icon={FileText} title="1. Acceptance of Terms">
              <p>By accessing or using ChinaCare (healthroute.xyz), you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform. We reserve the right to update these terms at any time; continued use constitutes acceptance of changes.</p>
            </Section>

            <Section icon={UserCheck} title="2. Services Description">
              <p>ChinaCare is a medical tourism facilitation platform that connects international patients with hospitals in China. Our services include:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>AI-powered hospital matching and care planning</li>
                <li>Contact form submission to partner hospitals</li>
                <li>Cost estimate information</li>
                <li>Multilingual support and visa guidance</li>
              </ul>
              <p className="mt-2">We facilitate connections but do not provide medical treatment directly.</p>
            </Section>

            <Section icon={CreditCard} title="3. Payments & Refunds">
              <p>Service plans purchased through ChinaCare are subject to the following:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>All prices are listed in USD and may not include applicable taxes</li>
                <li>Payment for service plans is processed through our platform; actual medical costs are paid directly to hospitals</li>
                <li>Service plan refunds are handled on a case-by-case basis within 14 days of purchase if no matching has begun</li>
                <li>We are not responsible for disputes between patients and hospitals regarding medical fees</li>
              </ul>
            </Section>

            <Section icon={Ban} title="4. User Obligations">
              <p>You agree to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Provide accurate and truthful medical information</li>
                <li>Not use the platform for any illegal purposes</li>
                <li>Not attempt to manipulate, hack, or disrupt our services</li>
                <li>Not submit false or misleading inquiries</li>
                <li>Comply with all applicable laws, including medical visa requirements</li>
              </ul>
            </Section>

            <Section icon={Gavel} title="5. Governing Law">
              <p>These terms are governed by the laws of the People&apos;s Republic of China. Any disputes shall be resolved through arbitration in Beijing, China. For users in the EU/EEA, nothing in this section deprives you of the protection of mandatory consumer protection laws in your country of residence.</p>
            </Section>

            <Section icon={Mail} title="6. Contact">
              <p>For questions about these terms:</p>
              <p className="mt-1">Email: support@healthroute.xyz</p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="text-gray-600 leading-relaxed ml-2">{children}</div>
    </div>
  )
}
