import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Hospital knowledge base for context injection
const HOSPITAL_CONTEXT = `
You are ChinaCare AI, a medical care planning assistant helping international patients access world-class hospitals in China.

## Your Role
- Help patients understand their medical options in China
- Recommend specific hospitals and departments based on their condition
- Provide realistic cost estimates and timelines
- Guide them through the process of coming to China for treatment
- Be empathetic, professional, and clear

## Key Hospitals You Know
1. **Peking Union Medical College Hospital (北京协和医院)** - Beijing
   - Best for: Oncology, Rare Diseases, Cardiology, Neurology
   - Rating: 4.9/5 | JCI Accredited | Est. 1921
   - International Dept: +86-10-69156114
   - Cost range: Consultation $50-200, Surgery varies widely

2. **Zhongshan Hospital Fudan University (复旦大学附属中山医院)** - Shanghai
   - Best for: Liver Surgery/Transplant, Cardiology, Gastroenterology
   - Rating: 4.8/5 | JCI Accredited | Est. 1937
   - 400+ liver transplants/year — among world's highest
   - Cost: Liver transplant $40,000-80,000

3. **West China Hospital Sichuan University (四川大学华西医院)** - Chengdu
   - Best for: Orthopedics, Neurosurgery, Stomatology
   - Rating: 4.8/5 | ISO Certified | Est. 1892
   - One of world's largest hospitals (4,300+ beds)
   - Cost: Hip replacement $8,000-15,000

4. **Sun Yat-sen University First Affiliated (中山大学附属第一医院)** - Guangzhou
   - Best for: Organ Transplant, Oncology, Nephrology
   - Rating: 4.7/5 | ISO Certified | Est. 1910
   - 10,000+ kidney transplants performed

5. **Ruijin Hospital Shanghai Jiao Tong (上海交通大学医学院附属瑞金医院)** - Shanghai
   - Best for: Hematology (Leukemia), Endocrinology, General Surgery
   - Rating: 4.8/5 | JCI Accredited | Est. 1907
   - "Shanghai Protocol" for APL leukemia: 95%+ cure rate

6. **Huashan Hospital International Medical Center (复旦大学附属华山医院)** - Shanghai
   - Best for: Neurology, Infectious Disease, Dermatology
   - Rating: 4.7/5 | ISO Certified | Est. 1907
   - Serves 80+ nationalities

7. **Beijing Tiantan Hospital (北京天坛医院)** - Beijing
   - Best for: Neurosurgery, Neurology, Stroke
   - Rating: 4.8/5 | JCI Accredited
   - Asia's largest neuroscience center, top 10 globally

8. **Beijing Anzhen Hospital (北京安贞医院)** - Beijing
   - Best for: Cardiac Surgery, Cardiology, Vascular Surgery
   - Rating: 4.8/5 | ISO Certified
   - China's largest cardiac surgery center: 10,000+ surgeries/year
   - Cost: Heart bypass $15,000-35,000

9. **Sun Yat-sen University Cancer Center (中山大学肿瘤防治中心)** - Guangzhou
   - Best for: Oncology, Radiation Therapy, Cancer Surgery
   - Rating: 4.9/5 | ISO Certified
   - #1 globally for nasopharyngeal carcinoma

## Cost Comparison (USD estimates)
- Heart Bypass: China $15k-35k vs USA $100k-200k (save 85%)
- Hip Replacement: China $8k-15k vs USA $30k-50k (save 75%)
- Cancer Treatment: China $10k-40k vs USA $50k-150k (save 80%)
- Liver Transplant: China $40k-80k vs USA $300k-500k (save 87%)

## Process Overview
1. Free consultation → 2. Hospital matching (1-2 days) → 3. Care plan (2-3 days) → 4. Visa & docs (1-2 weeks) → 5. Travel & treatment

## Language Support
You can respond in the same language the patient writes in. Support: Chinese, English, Arabic, French, Spanish, Russian.

## Important Guidelines
- Always recommend consulting with a doctor for actual medical decisions
- Be specific about hospitals and costs when you can
- Mention that ChinaCare provides free initial consultation
- Encourage users to use the "Start Your Journey" button for personalized help
- Keep responses concise but helpful (2-4 paragraphs max)
- Use emojis sparingly but effectively
`

export async function POST(req: NextRequest) {
  try {
    const { messages, locale = 'zh' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      // Fallback to smart rule-based responses when no API key
      return NextResponse.json({
        message: getFallbackResponse(messages[messages.length - 1]?.content || '', locale)
      })
    }

    const systemPrompt = HOSPITAL_CONTEXT + `\n\nCurrent user language preference: ${locale}. Respond in the same language as the user's message.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-6), // Keep last 6 messages for context
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: false,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('OpenAI error:', err)
      // Graceful fallback
      return NextResponse.json({
        message: getFallbackResponse(messages[messages.length - 1]?.content || '', locale)
      })
    }

    const data = await response.json()
    const message = data.choices?.[0]?.message?.content || getFallbackResponse('', locale)

    return NextResponse.json({ message })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { message: getFallbackResponse('', 'zh') },
      { status: 200 } // Return 200 with fallback instead of 500
    )
  }
}

// Smart fallback responses when OpenAI is not configured
function getFallbackResponse(input: string, locale: string): string {
  const lower = input.toLowerCase()

  const responses: Record<string, Record<string, string>> = {
    cardiac: {
      zh: '❤️ 对于心脏疾病，我推荐**北京安贞医院**（中国最大心脏外科中心，每年完成10,000+台手术）或**上海中山医院**（JCI认证）。心脏搭桥手术费用约$15,000-35,000，比美国节省85%。通常2周内可安排预约。需要我为您准备详细方案吗？',
      en: '❤️ For cardiac conditions, I recommend **Beijing Anzhen Hospital** (China\'s largest cardiac surgery center, 10,000+ surgeries/year) or **Zhongshan Hospital Shanghai** (JCI accredited). Heart bypass costs $15,000-35,000 — 85% less than the US. Appointments typically within 2 weeks. Shall I prepare a detailed care plan?',
      ar: '❤️ لأمراض القلب، أوصي بـ**مستشفى بكين أنزين** (أكبر مركز لجراحة القلب في الصين) أو **مستشفى جونغشان شنغهاي**. تكلفة جراحة القلب $15,000-35,000 — أقل بنسبة 85% من الولايات المتحدة.',
      fr: '❤️ Pour les maladies cardiaques, je recommande l\'**Hôpital Anzhen de Pékin** ou l\'**Hôpital Zhongshan de Shanghai** (accrédité JCI). Le pontage coronarien coûte 15 000-35 000 $ — 85% moins cher qu\'aux États-Unis.',
      es: '❤️ Para enfermedades cardíacas, recomiendo el **Hospital Anzhen de Beijing** o el **Hospital Zhongshan de Shanghai** (acreditado JCI). El bypass cardíaco cuesta $15,000-35,000 — 85% menos que en EE.UU.',
      ru: '❤️ При сердечных заболеваниях рекомендую **Пекинскую больницу Аньчжэнь** или **Больницу Чжуншань в Шанхае** (аккредитация JCI). Шунтирование стоит $15,000-35,000 — на 85% дешевле, чем в США.',
    },
    cancer: {
      zh: '🎗️ 对于肿瘤治疗，**北京协和医院**和**中山大学肿瘤防治中心**（鼻咽癌全球排名第一）是顶级选择。化疗费用约$10,000-40,000，比美国节省80%。许多治疗方案在其他国家尚未开放。请告诉我具体癌症类型，我为您精准匹配。',
      en: '🎗️ For oncology, **Peking Union Medical College Hospital** and **Sun Yat-sen University Cancer Center** (ranked #1 globally for nasopharyngeal carcinoma) are top choices. Chemotherapy costs $10,000-40,000 — 80% less than the US. Please share your specific cancer type for a precise match.',
      ar: '🎗️ للأورام، **مستشفى بيكينغ يونيون** و**مركز السرطان بجامعة سون يات-سن** هما الخياران الأفضل. تكلفة العلاج الكيميائي $10,000-40,000 — أقل بنسبة 80% من الولايات المتحدة.',
      fr: '🎗️ Pour l\'oncologie, l\'**Hôpital PUMC** et le **Centre du Cancer de l\'Université Sun Yat-sen** sont les meilleurs choix. La chimiothérapie coûte 10 000-40 000 $ — 80% moins cher qu\'aux États-Unis.',
      es: '🎗️ Para oncología, el **Hospital PUMC** y el **Centro de Cáncer de la Universidad Sun Yat-sen** son las mejores opciones. La quimioterapia cuesta $10,000-40,000 — 80% menos que en EE.UU.',
      ru: '🎗️ По онкологии лучший выбор — **Больница ПУМК** и **Онкологический центр Университета Сунь Ятсена**. Химиотерапия стоит $10,000-40,000 — на 80% дешевле, чем в США.',
    },
    default: {
      zh: '👋 感谢您的咨询！我可以帮您匹配中国最适合的医院和专科医生。请告诉我：\n\n1. 您的主要病情或诊断是什么？\n2. 您希望在哪个城市就医（北京/上海/广州/成都）？\n3. 您的预算范围大概是多少？\n\n我将为您准备个性化的就医方案，包括医院推荐、费用预估和就医流程。',
      en: '👋 Thank you for reaching out! I can help match you with the best hospitals and specialists in China. Please tell me:\n\n1. What is your main condition or diagnosis?\n2. Which city do you prefer (Beijing/Shanghai/Guangzhou/Chengdu)?\n3. What is your approximate budget?\n\nI\'ll prepare a personalized care plan with hospital recommendations, cost estimates, and next steps.',
      ar: '👋 شكراً لتواصلك! يمكنني مساعدتك في إيجاد أفضل المستشفيات والمتخصصين في الصين. أخبرني:\n\n1. ما هي حالتك الطبية الرئيسية؟\n2. أي مدينة تفضل؟\n3. ما هي ميزانيتك التقريبية؟',
      fr: '👋 Merci de nous contacter ! Je peux vous aider à trouver les meilleurs hôpitaux et spécialistes en Chine. Dites-moi :\n\n1. Quelle est votre condition principale ?\n2. Quelle ville préférez-vous ?\n3. Quel est votre budget approximatif ?',
      es: '👋 ¡Gracias por contactarnos! Puedo ayudarte a encontrar los mejores hospitales y especialistas en China. Dime:\n\n1. ¿Cuál es tu condición principal?\n2. ¿Qué ciudad prefieres?\n3. ¿Cuál es tu presupuesto aproximado?',
      ru: '👋 Спасибо за обращение! Я помогу подобрать лучшие больницы и специалистов в Китае. Расскажите:\n\n1. Каков ваш основной диагноз?\n2. Какой город предпочитаете?\n3. Каков ваш примерный бюджет?',
    }
  }

  let category = 'default'
  if (lower.includes('cardiac') || lower.includes('heart') || lower.includes('心脏') || lower.includes('قلب') || lower.includes('cœur') || lower.includes('corazón') || lower.includes('сердц')) category = 'cardiac'
  else if (lower.includes('cancer') || lower.includes('oncol') || lower.includes('tumor') || lower.includes('癌') || lower.includes('سرطان') || lower.includes('tumeur') || lower.includes('рак')) category = 'cancer'

  const localeKey = locale in responses[category] ? locale : 'en'
  return responses[category][localeKey]
}
