'use client'
import Script from 'next/script'

// Google Analytics + 百度统计 组件
// 替换下面的 ID 即可生效

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''  // 格式: G-XXXXXXXXXX
const BAIDU_ID = process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID || ''  // 格式: 纯数字ID

export function Analytics() {
  return (
    <>
      {/* Google Analytics */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* 百度统计 */}
      {BAIDU_ID && (
        <Script id="baidu-tongji" strategy="afterInteractive">
          {`
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?${BAIDU_ID}";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          `}
        </Script>
      )}
    </>
  )
}
