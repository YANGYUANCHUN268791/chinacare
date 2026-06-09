# ChinaCare 模拟支付系统 - 部署完成总结

**时间**: 2026-06-08
**Commit**: 405cb2d (本地已提交，push 待网络恢复)

## 新增/修改文件

### 新增
- `models/Order.ts` — 订单模型（MongoDB），含 13 字段
- `app/api/checkout/route.ts` — 模拟支付 API（POST 创建订单）
- `app/api/checkout/verify/route.ts` — 订单验证 API（POST 验证 order_id）

### 修改
- `app/pricing/page.tsx` — 重新设计定价页（3 方案卡片 + 结账表单 + FAQ）
- `app/pricing/success/page.tsx` — 改为订单确认页（显示订单号、服务、金额）
- `app/api/contact/route.ts` — 修复 `connectToDatabase` 导入方式
- `app/contact/page.tsx` — 修复 `t()` 函数调用签名
- `components/ContactForm.tsx` — 修复 `t()` 函数调用签名

## 功能说明

### 定价方案
1. **AI 咨询报告** — $49 一次性
2. **全程陪诊服务** — $299 一次性（最受欢迎）
3. **企业/机构合作** — 定制价格，跳转联系表单

### 支付流程
1. 用户在 `/pricing` 选择方案
2. 填写个人信息（姓名、邮箱、电话、国家、病情）
3. 点击「确认支付」（模拟支付，不产生真实扣款）
4. 生成订单号，写入 MongoDB
5. 跳转 `/pricing/success?order_id=xxx`
6. 成功页显示订单详情

### 关键技术决策
- **模拟支付代替 Stripe** — 不需要 API Key，订单记录在 MongoDB
- **Order 模型** — 独立于 Contact 模型，包含支付和服务追踪字段
- **修复 `connectToDatabase`** — db.ts 导出的是 named export，所有 API 统一使用 `{ connectToDatabase } from '@/lib/db'`
- **修复 `t()` 调用** — LanguageProvider 的 t() 只接受 1 个参数，改为 `t('key') || 'fallback'`

## 服务器部署步骤

SSH 连接后执行：
```bash
cd ~/chinacare
git pull
npm install
npm run build
pm2 restart chinacare --update-env
pm2 logs chinacare --lines 20
```

⚠️ GitHub push 因网络问题失败，需手动重试 `git push`

## 验证
- 访问 https://healthroute.xyz/pricing 查看定价页
- 选择方案 → 填写信息 → 点击支付 → 查看成功页
- MongoDB Atlas 可查看 Order 集合中的订单记录
