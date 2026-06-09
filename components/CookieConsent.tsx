"use client"
import { useState, useEffect } from "react"
import { Cookie } from "lucide-react"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent")
    if (stored !== "granted" && stored !== "denied") {
      const timer = setTimeout(() => setVisible(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "granted")
    setVisible(false)
    window.dispatchEvent(new CustomEvent("consent-updated", { detail: "granted" }))
  }

  const reject = () => {
    localStorage.setItem("cookie_consent", "denied")
    setVisible(false)
    window.dispatchEvent(new CustomEvent("consent-updated", { detail: "denied" }))
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        {!showSettings ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
              <div>
                <p className="text-gray-800 font-medium">We value your privacy</p>
                <p className="text-gray-500 text-sm mt-1">
                  We use cookies to improve your experience and analyse site traffic.
                  <a href="/privacy" className="text-blue-600 hover:underline ml-1">Learn more</a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button onClick={reject} className="px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Reject</button>
              <button onClick={accept} className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium">Accept</button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Cookie Preferences</h3>
            <div className="space-y-3 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Essential Cookies</p>
                <p className="text-xs text-gray-500">Always active (language, login state).</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Analytics Cookies</p>
                <p className="text-xs text-gray-500">Google Analytics &amp; Baidu for usage tracking.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={reject} className="px-4 py-2 text-sm text-gray-600 border rounded-lg">Reject All</button>
              <button onClick={accept} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg font-medium">Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
