// 事件追踪工具 - 同时支持 Google Analytics 和百度统计

type EventParams = {
  action: string
  category: string
  label?: string
  value?: number
}

/**
 * 追踪自定义事件（同时发送到 GA 和百度统计）
 *
 * 使用示例：
 *   trackEvent({ action: 'submit', category: 'contact_form' })
 *   trackEvent({ action: 'click', category: 'ai_chat', label: 'cardiac' })
 *   trackEvent({ action: 'view', category: 'hospital_detail', label: 'pumch', value: 1 })
 */
export function trackEvent({ action, category, label, value }: EventParams) {
  // Google Analytics 4 (gtag)
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label || '',
      value: value || 0,
    })
  }

  // 百度统计 (_hmt.push)
  if (typeof window !== 'undefined' && typeof (window as any)._hmt !== 'undefined') {
    ;(window as any)._hmt.push(['_trackEvent', category, action, label || '', value || 0])
  }
}

// 预定义事件常量
export const Events = {
  // AI 聊天
  AI_CHAT_START: { action: 'start', category: 'ai_chat' },
  AI_CHAT_SEND: { action: 'send', category: 'ai_chat' },
  AI_CHAT_QUICK_TAG: (tag: string) => ({ action: 'quick_tag', category: 'ai_chat', label: tag }),

  // 表单
  CONTACT_FORM_START: { action: 'start', category: 'contact_form' },
  CONTACT_FORM_SUBMIT: { action: 'submit', category: 'contact_form' },

  // 预约
  APPOINTMENT_START: { action: 'start', category: 'appointment' },
  APPOINTMENT_SUBMIT: { action: 'submit', category: 'appointment' },

  // 医院浏览
  HOSPITAL_VIEW: (name: string) => ({ action: 'view', category: 'hospital', label: name }),
  HOSPITAL_CLICK: (name: string) => ({ action: 'click', category: 'hospital', label: name }),

  // 导航
  NAV_CLICK: (page: string) => ({ action: 'click', category: 'navigation', label: page }),

  // 语言切换
  LANGUAGE_SWITCH: (lang: string) => ({ action: 'switch', category: 'language', label: lang }),

  // CTA
  CTA_CLICK: (type: string) => ({ action: 'click', category: 'cta', label: type }),
}
