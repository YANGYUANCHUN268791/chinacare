# ChinaCare — 外国人来华就医门户网站

## 项目结构

```
china-medical-portal/
├── app/
│   ├── layout.tsx        # 根布局
│   ├── page.tsx          # 首页
│   └── globals.css       # 全局样式
├── components/
│   ├── Navbar.tsx        # 导航栏
│   ├── Hero.tsx          # 首屏（含AI对话卡片）
│   ├── HowItWorks.tsx    # 流程说明
│   ├── WhyChina.tsx      # 为什么选中国
│   ├── HospitalHighlights.tsx  # 医院展示
│   ├── Testimonials.tsx  # 患者故事
│   ├── CTASection.tsx    # 行动召唤
│   └── Footer.tsx        # 页脚
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── postcss.config.js
```

## 本地运行

### 前提：需要 Node.js 18+

如果没有安装，下载地址：https://nodejs.org/

### 启动步骤

```bash
# 1. 进入项目目录
cd china-medical-portal

# 2. 安装依赖（首次运行）
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器打开
# http://localhost:3000
```

## 部署到 Vercel（免费）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 按提示操作，几分钟后获得公网 URL
```

## 下一步开发计划

- [ ] 医院列表页（/hospitals）
- [ ] 医院详情页（/hospitals/[id]）
- [ ] AI问诊页面（/consult）
- [ ] 预约表单（/get-started）
- [ ] 多语言支持（英/阿/法/西/俄）
- [ ] 后台管理系统
- [ ] 支付集成

## 完整方案

见 PLAN.md
