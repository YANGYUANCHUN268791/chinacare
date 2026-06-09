import { Suspense } from 'react'
import AdminLoginForm from './AdminLoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  )
}
