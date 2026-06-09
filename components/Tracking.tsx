"use client"
import { useState, useEffect } from "react"
import Script from "next/script"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""
const BAIDU_ID = process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID || ""

export default function Tracking() {
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    const check = () => {
      setConsent(localStorage.getItem("cookie_consent"))
    }
    check()
    window.addEventListener("consent-updated", check)
    window.addEventListener("storage", check)
    return () => {
      window.removeEventListener("consent-updated", check)
      window.removeEventListener("storage", check)
    }
  }, [])

  if (consent !== "granted") return null

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "${GA_ID}", { page_path: window.location.pathname });
          `}</Script>
        </>
      )}
      {BAIDU_ID && (
        <Script id="baidu-tongji" strategy="afterInteractive">{`
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${BAIDU_ID}";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
        `}</Script>
      )}
    </>
  )
}
