# ChinaCare — Medical Portal for Foreign Patients

A multilingual medical portal website for foreign patients seeking healthcare services in China's top hospitals.

## Features
- **6 Language Support**: Chinese, English, Arabic, French, Spanish, Russian
- **12 Top Hospitals**: Detailed information on China's best medical institutions
- **AI Chat Assistant**: AI-powered conversation interface for patient guidance
- **Booking System**: Multi-language appointment forms
- **Process Guides**: Step-by-step guides for foreign patients

## Tech Stack
- **Framework**: Next.js 15.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js
- **i18n**: Client-side LanguageProvider

## Project Structure
```
app/
├── layout.tsx            // Root layout
├── page.tsx             // Homepage
├── hospitals/
├── processes/
├── booking/
├── chat/
├── contact/
components/              // Reusable components
messages/                // Translation files (6 languages)
```

## Deployment
- **GitHub**: https://github.com/YANGYUANCHUN268791/chinacare
- **Cloudflare Pages**: https://chinacare.pages.dev
- **Railway**: railway.app project
- **Vercel**: Vercel deployment

## Setup & Run
```bash
# Clone repo
git clone https://github.com/YANGYUANCHUN268791/chinacare

# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Production
npm run start
```

## Future Enhancements
- Integration with real OpenAI API for chat
- Hospital API connections for booking system
- Payment gateway integration
- Mobile app version