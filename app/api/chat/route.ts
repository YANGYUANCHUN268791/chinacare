import { NextRequest, NextResponse } from 'next/server'
import { retrieveRelevantContext } from '@/lib/knowledge-base'

export const runtime = 'nodejs'

const SYSTEM_PROMPT_BASE = `You are ChinaCare AI, a medical care planning assistant helping international patients access world-class hospitals in China.

## Your Role
- Help patients understand their medical options in China
- Recommend specific hospitals and departments based on their condition
- Provide realistic cost estimates and timelines
- Guide them through the process of coming to China for treatment
- Be empathetic, professional, and clear

## Important Guidelines
- Always recommend consulting with a doctor for actual medical decisions
- Be specific about hospitals and costs when you can
- Mention that ChinaCare provides free initial consultation
- Encourage users to use the "Start Your Journey" button for personalized help
- Keep responses concise but helpful (2-4 paragraphs max)
- Use emojis sparingly but effectively
- When answering questions, prioritize the [Reference] context provided below`

export async function POST(req: NextRequest) {
  try {
    const { messages, locale = 'zh' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const userMessage = messages[messages.length - 1]?.content || ''

    // RAG: retrieve relevant context from knowledge base
    const ragContext = retrieveRelevantContext(userMessage, 3)

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      // Fallback: RAG knowledge base only (no LLM)
      return NextResponse.json({
        message: getRAGFallbackResponse(userMessage, locale, ragContext)
      })
    }

    // DeepSeek configuration (OpenAI-compatible API)
    const baseURL = process.env.AI_BASE_URL || 'https://api.deepseek.com/v1'
    const model = process.env.AI_MODEL || 'deepseek-chat'

    const ragSystemPrompt = ragContext
      ? `${SYSTEM_PROMPT_BASE}\n\n## Retrieved Knowledge Context\n${ragContext}`
      : SYSTEM_PROMPT_BASE

    const systemPrompt = ragSystemPrompt + `\n\nCurrent user language preference: ${locale}. Respond in the same language as the user's message.`

    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-6),
        ],
        max_tokens: 600,
        temperature: 0.7,
        stream: false,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('OpenAI error:', err)
      return NextResponse.json({
        message: getRAGFallbackResponse(userMessage, locale, ragContext)
      })
    }

    const data = await response.json()
    const message = data.choices?.[0]?.message?.content

    return NextResponse.json({ message })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { message: getRAGFallbackResponse('', 'zh', '') },
      { status: 200 }
    )
  }
}

// RAG-powered fallback responses (no LLM required)
function getRAGFallbackResponse(input: string, locale: string, ragContext: string): string {
  const localeMessages: Record<string, string> = {
    zh: '感谢您的咨询！根据我们的医疗数据库，我能为您提供以下信息：\n\n',
    en: 'Thank you for your inquiry! Based on our medical knowledge base, here is what I found:\n\n',
    ar: 'شكراً لاستفسارك! استناداً إلى قاعدة بياناتنا الطبية:\n\n',
    fr: 'Merci pour votre demande! Selon notre base de données médicales:\n\n',
    es: '¡Gracias por su consulta! Según nuestra base de datos médica:\n\n',
    ru: 'Спасибо за ваш запрос! Согласно нашей медицинской базе данных:\n\n',
  }

  const closingMessages: Record<string, string> = {
    zh: '\n\n如果您需要更详细的个性化方案，请点击页面上的「开启您的就医之旅」按钮，我们会安排医学顾问免费为您评估。',
    en: '\n\nFor a detailed personalized plan, click "Start Your Journey" and our medical advisor will provide a free assessment.',
    ar: '\n\nللحصول على خطة مفصلة، انقر على "ابدأ رحلتك" للحصول على تقييم مجاني.',
    fr: '\n\nPour un plan détaillé personnalisé, cliquez sur "Démarrer votre voyage" pour un assessment gratuit.',
    es: '\n\nPara un plan detallado personalizado, haga clic en "Comience su viaje" para una evaluación gratuita.',
    ru: '\n\nДля получения подробного плана нажмите "Начать путешествие" для бесплатной оценки.',
  }

  const lang = locale in localeMessages ? locale : 'en'
  const context = ragContext
    ? ragContext.replace(/\[Reference: [^\]]+\]\s*/g, '• ').replace(/---\s*/g, '\n')
    : ''

  return localeMessages[lang] + context + closingMessages[lang]
}
