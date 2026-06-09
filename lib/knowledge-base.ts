// lib/knowledge-base.ts - Medical tourism knowledge base for RAG

export interface KnowledgeEntry {
  id: string
  category: 'hospital' | 'treatment' | 'pricing' | 'visa' | 'process' | 'faq'
  question: string
  keywords: string[]
  answer: string
}

export const knowledgeBase: KnowledgeEntry[] = [
  // ========== 医院信息 ==========
  {
    id: 'h1',
    category: 'hospital',
    question: 'What are the top hospitals in China for international patients?',
    keywords: ['top hospital', 'best hospital', 'recommend hospital', 'which hospital', 'hospital list', '医院', 'hospital'],
    answer: `China has several world-class hospitals for international patients:
1. Peking Union Medical College Hospital (Beijing) - Top comprehensive hospital, excellent for rare diseases
2. Fuda Cancer Hospital (Guangzhou) - JCI accredited, minimally invasive cancer treatment
3. Tongji Hospital (Wuhan) - Leading in organ transplantation and precision medicine
4. Puhua International Hospital (Beijing) - Specialized in neurosurgery
5. Wuhan Union Hospital - Strong in liver transplantation and urology
6. Xiangya Hospital (Changsha) - Top-tier comprehensive hospital`
  },
  {
    id: 'h2',
    category: 'hospital',
    question: 'Tell me about Peking Union Medical College Hospital',
    keywords: ['peking union', 'PUMCH', 'Beijing top hospital', '协和', '北京协和'],
    answer: `Peking Union Medical College Hospital (PUMCH) is China's top comprehensive hospital:
- Established 1921, over 100 years of history
- Ranked #1 in China multiple years
- International patient department with English-speaking staff
- Specializes in: rare diseases, complex diagnosis, endocrinology, dermatology
- Location: Beijing, near Tiananmen Square
- Average cost: $8,000-$15,000 for consultation and basic treatment`
  },
  {
    id: 'h3',
    category: 'hospital',
    question: 'Tell me about Fuda Cancer Hospital',
    keywords: ['fuda', 'cancer hospital', 'Guangzhou cancer', 'minimally invasive'],
    answer: `Fuda Cancer Hospital (Guangzhou) is a JCI-accredited specialist cancer center:
- Specializes in cryosurgery and nanoknife
- Founded by Dr. Niu Lizhi, pioneer in cryosurgery
- Treats 10,000+ international patients annually
- Success rate: 85%+ for various cancer types
- Cost: $15,000-$40,000 depending on treatment plan`
  },

  // ========== 治疗项目 ==========
  {
    id: 't1',
    category: 'treatment',
    question: 'What medical treatments are available in China?',
    keywords: ['treatment', 'medical service', 'procedure', 'what can treat', '治疗'],
    answer: `China offers a wide range of medical treatments:
1. Cancer treatment: Cryosurgery, nanoknife, precision radiotherapy, immunotherapy ($15,000-$50,000)
2. Organ transplantation: Liver ($40,000-$60,000), Kidney ($25,000-$35,000), Heart ($60,000-$80,000)
3. Neurosurgery: Brain tumor, epilepsy, Parkinson's ($20,000-$50,000)
4. Orthopedics: Joint replacement, spine surgery ($10,000-$25,000)
5. Cardiovascular: Heart bypass, stent placement ($15,000-$30,000)
6. IVF and fertility: ($5,000-$8,000 per cycle)`
  },
  {
    id: 't2',
    category: 'treatment',
    question: 'How much does organ transplantation cost?',
    keywords: ['organ transplant', 'liver transplant', 'kidney transplant', 'transplant cost', '器官移植'],
    answer: `Organ transplantation costs in China:
- Liver: $40,000-$60,000 (US: $300,000-$500,000)
- Kidney: $25,000-$35,000 (US: $200,000-$300,000)
- Heart: $60,000-$80,000 (US: $500,000+)
- Waiting time: 2-8 weeks after matching
- Includes: surgery, hospital stay, medications for 3 months
- Top hospitals: Tongji Hospital (Wuhan), Wuhan Union Hospital`
  },

  // ========== 价格 ==========
  {
    id: 'p1',
    category: 'pricing',
    question: 'How much does treatment cost compared to the US?',
    keywords: ['cost', 'price', 'how much', 'affordable', 'compare', '费用', '价格'],
    answer: `Medical costs in China are 70-90% lower than the US:
- Cancer treatment: $15,000-$50,000 vs US $150,000-$500,000
- Organ transplant: $40,000-$80,000 vs US $300,000-$800,000
- Heart surgery: $15,000-$30,000 vs US $100,000-$300,000
- IVF: $5,000-$8,000 vs US $15,000-$25,000
- Hospital stay: $100-$300/night (private room)
- No insurance needed - transparent pricing`
  },
  {
    id: 'p2',
    category: 'pricing',
    question: 'Are there package deals?',
    keywords: ['package', 'all inclusive', 'bundle', '套餐'],
    answer: `Yes, we offer all-inclusive medical tourism packages:
Basic Package ($3,000-$5,000): Airport pickup, hotel 14 nights, translator
Standard Package ($5,000-$8,000): + VIP hotel, dedicated translator, TCM consultation
Premium Package ($10,000+): + Luxury hotel, 24/7 translator, tours, follow-up care
Note: Treatment costs are separate from packages.`
  },

  // ========== 签证 ==========
  {
    id: 'v1',
    category: 'visa',
    question: 'Do I need a visa for medical treatment?',
    keywords: ['visa', 'entry', 'travel document', 'medical visa', '签证'],
    answer: `Yes, most patients need a visa:
1. Tourist Visa (L): Easiest, 30-90 days, can extend in China
2. Medical Visa (M): Requires hospital invitation letter
3. Visa-free: 144-hour transit (select cities)
We provide hospital invitation letter for M visa application.
Processing time: 4-7 working days at Chinese embassy.`
  },

  // ========== 流程 ==========
  {
    id: 'pr1',
    category: 'process',
    question: 'How does the medical tourism process work?',
    keywords: ['process', 'how it works', 'steps', '流程'],
    answer: `5-step process:
Step 1: Free Consultation - Submit records, get assessment (1-3 days)
Step 2: Hospital Selection - Choose hospital, get invitation letter (3-7 days)
Step 3: Travel Arrangement - Book flights, accommodation (your schedule)
Step 4: Treatment in China - Hospital admission, treatment, recovery (1-4 weeks)
Step 5: Follow-up - Discharge summary, remote follow-up arranged`
  },
  {
    id: 'pr2',
    category: 'process',
    question: 'Do you provide translator services?',
    keywords: ['translator', 'interpret', 'language', 'English speaking', '翻译'],
    answer: `Yes, comprehensive translator services:
- English-speaking coordinators for each patient
- Medical translators (English, Arabic, French, Spanish, Russian)
- 24/7 WhatsApp/WeChat support
- Accompany to hospital appointments
Basic package includes hospital visit translator.
Standard/Premium: dedicated translator (8h/day or 24/7).`
  },

  // ========== 常见问题 ==========
  {
    id: 'f1',
    category: 'faq',
    question: 'Is it safe to have treatment in China?',
    keywords: ['safe', 'safety', 'quality', 'standard', '安全'],
    answer: `Yes, safe when choosing accredited hospitals:
- JCI-accredited: Fuda Cancer Hospital, Beijing international hospitals
- Doctors often trained in US/Europe/Japan
- Success rates comparable to Western hospitals
- Lower infection rates than many developing countries
We only partner with accredited hospitals and verify doctor credentials.`
  },
  {
    id: 'f2',
    category: 'faq',
    question: 'Can I get a second opinion before traveling?',
    keywords: ['second opinion', 'consultation before travel', 'preliminary', '第二意见'],
    answer: `Yes! FREE preliminary consultation:
1. Submit medical records online
2. Medical team reviews within 24-48 hours
3. Receive: assessibility, hospital recommendation, cost estimate
4. Optional: Video consultation with doctor ($100-$200)
Helps you decide before spending on travel. No obligation.`
  }
]

/**
 * Retrieve relevant context from knowledge base using keyword matching
 * Returns top K most relevant entries as concatenated text
 */
export function retrieveRelevantContext(query: string, topK: number = 3): string {
  const stopWords = new Set([
    'what', 'is', 'are', 'the', 'in', 'for', 'to', 'a', 'an', 'and', 'or',
    'how', 'do', 'does', 'can', 'i', 'you', 'your', 'my', 'me', 'we', 'our',
    'this', 'that', 'of', 'on', 'at', 'by', 'with', 'from', 'be', 'have',
    'has', 'had', 'it', 'they', 'their', 'will', 'would', 'could', 'should',
    '的', '是', '在', '了', '和', '我', '有', '这', '个', '他', '她', '它',
    '吗', '呢', '吧', '啊', '嗯', '哦', 'what is', 'how to', 'can i', 'should i'
  ])

  // Tokenize query
  const queryTokens = query.toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !stopWords.has(w))

  // Score each knowledge entry
  const scores = knowledgeBase.map(entry => {
    let score = 0
    const searchText = `${entry.question} ${entry.keywords.join(' ')} ${entry.answer}`.toLowerCase()

    // Exact keyword match (highest weight)
    for (const kw of entry.keywords) {
      if (query.toLowerCase().includes(kw.toLowerCase())) {
        score += 10
      }
    }

    // Token match
    for (const token of queryTokens) {
      if (searchText.includes(token.toLowerCase())) {
        score += 2
      }
    }

    // Partial match for medical terms (length > 4)
    for (const token of queryTokens) {
      if (token.length > 4) {
        for (const kw of entry.keywords) {
          if (kw.toLowerCase().includes(token.toLowerCase().substring(0, token.length - 2))) {
            score += 1
          }
        }
      }
    }

    return { entry, score }
  })

  // Sort by score and return top K
  const topResults = scores
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => `[Reference: ${s.entry.category}] ${s.entry.answer}`)

  return topResults.join('\n\n---\n\n')
}
