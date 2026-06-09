import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Shield, Mail, Database, Eye, FileText, AlertTriangle } from "lucide-react"

const sections = [
  {
    icon: FileText,
    title: "1. Information We Collect",
    content: [
      "Personal information you provide: name, email, phone number, medical condition details, country of residence, age, and travel preferences when you submit a contact form or create an account.",
      "Usage information: pages visited, time spent, referral source, and interactions with our AI chat service.",
      "Cookies and similar technologies: we use Google Analytics and Baidu Tongji to understand how visitors use our site."
    ]
  },
  {
    icon: Database,
    title: "2. How We Use Your Information",
    content: [
      "To match you with appropriate hospitals and medical specialists in China.",
      "To provide personalized care plans and cost estimates.",
      "To communicate with you about your inquiry, appointments, and follow-up care.",
      "To improve our AI recommendation engine and website experience.",
      "To comply with legal obligations and protect our rights."
    ]
  },
  {
    icon: Eye,
    title: "3. Data Sharing & Third Parties",
    content: [
      "We share your medical information only with partner hospitals you select, with your explicit consent.",
      "We use third-party services for analytics (Google Analytics, Baidu Tongji) – opt out via our Cookie Consent banner.",
      "We do not sell your personal data to third parties.",
      "Your data may be transferred to and processed in China, where our servers and partner hospitals are located."
    ]
  },
  {
    icon: Shield,
    title: "4. Data Security",
    content: [
      "We implement industry-standard encryption (SSL/TLS) for all data in transit.",
      "Medical data is stored in encrypted MongoDB databases with restricted access.",
      "Access controls limit employee and system access to personal data on a need-to-know basis."
    ]
  },
  {
    icon: AlertTriangle,
    title: "5. Your Rights (GDPR & CCPA)",
    content: [
      "Right to access: request a copy of your personal data we hold.",
      "Right to rectification: correct inaccurate or incomplete data.",
      "Right to erasure ('Right to be Forgotten'): request deletion of your data.",
      "Right to restrict processing: limit how we use your data.",
      "Right to data portability: receive your data in a structured format.",
      "Right to object: opt out of processing for marketing or analytics.",
      "To exercise any of these rights, contact us at privacy@healthroute.xyz."
    ]
  },
  {
    icon: Mail,
    title: "6. Contact Us",
    content: [
      "Email: privacy@healthroute.xyz",
      "For data protection matters, we respond to all GDPR and CCPA requests within 30 days.",
      "If you are in the EU/EEA, you also have the right to lodge a complaint with your local data protection authority."
    ]
  }
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-500">Last updated: June 2026</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">
            <p className="text-gray-600 leading-relaxed">
              ChinaCare (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
              This policy explains how we collect, use, and safeguard your personal data when you use our platform at healthroute.xyz.
              It applies to all users worldwide, including those in the European Economic Area (EEA), UK, and California.
            </p>

            {sections.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{s.title}</h2>
                  </div>
                  <ul className="space-y-2 ml-2">
                    {s.content.map((c, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-600">
                        <span className="text-blue-600 mt-1.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
