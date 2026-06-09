import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AlertTriangle, FileWarning, Info, Scale, Stethoscope, Shield } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Medical Disclaimer</h1>
            <p className="text-gray-500">Last updated: June 2026</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <FileWarning className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800">Important Notice</p>
                  <p className="text-amber-700 text-sm mt-1">
                    The information provided on ChinaCare (healthroute.xyz) is for informational and educational purposes only.
                    It is NOT a substitute for professional medical advice, diagnosis, or treatment.
                  </p>
                </div>
              </div>
            </div>

            <Section icon={Info} title="No Doctor-Patient Relationship">
              <p>Your use of ChinaCare does not create a doctor-patient relationship between you and any healthcare provider listed on our platform. We are a medical tourism facilitation platform, not a healthcare provider. Any medical decisions should be made in consultation with qualified healthcare professionals.</p>
            </Section>

            <Section icon={Stethoscope} title="AI Chat Service Limitations">
              <p>Our AI chat service provides preliminary information and hospital matching based on your self-reported symptoms and conditions. It is not a diagnostic tool and should never be used:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>In medical emergencies – please call your local emergency services immediately</li>
                <li>As a replacement for professional medical consultation</li>
                <li>To self-diagnose or self-medicate</li>
              </ul>
            </Section>

            <Section icon={Scale} title="Cost Estimates">
              <p>All cost estimates provided on our platform are approximate ranges based on historical data. Actual costs vary depending on:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Specific medical condition and treatment plan</li>
                <li>Length of hospital stay</li>
                <li>Choice of hospital and specialist</li>
                <li>Complications or additional procedures</li>
              </ul>
            </Section>

            <Section icon={Shield} title="Hospital Information">
              <p>We strive to keep hospital listings, accreditations, and doctor profiles accurate and up to date. However, we cannot guarantee the completeness or timeliness of third-party information. We recommend verifying credentials directly with the hospital before making medical decisions.</p>
            </Section>

            <Section icon={FileWarning} title="Emergency Situations">
              <p className="font-bold text-red-600">If you are experiencing a medical emergency, call your local emergency number immediately. Do not use ChinaCare for emergency situations.</p>
              <p className="mt-2">ChinaCare is not equipped to handle urgent medical needs and delays caused by using our platform could result in serious harm.</p>
            </Section>

            <Section icon={AlertTriangle} title="Limitation of Liability">
              <p>To the fullest extent permitted by law, ChinaCare and its operators shall not be liable for any damages arising from:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Reliance on information provided on this platform</li>
                <li>Medical treatment received through partner hospitals</li>
                <li>Delays or complications in medical travel arrangements</li>
                <li>Any indirect, incidental, or consequential damages</li>
              </ul>
            </Section>

            <div className="bg-gray-50 rounded-xl p-5 mt-4">
              <p className="text-sm text-gray-500">
                By using ChinaCare, you acknowledge that you have read and understood this disclaimer.
                If you have questions, please contact us at support@healthroute.xyz.
              </p>
            </div>
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
