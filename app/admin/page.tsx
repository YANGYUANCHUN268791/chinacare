import { Suspense } from 'react'
import { Metadata } from 'next'
import AdminLayout from './layout'
import { DashboardStats } from './DashboardStats'

export const metadata: Metadata = {
  title: 'Admin Dashboard - ChinaCare',
}

export default function AdminPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <Suspense fallback={<div className="text-gray-500">Loading stats...</div>}>
        <DashboardStats />
      </Suspense>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <RecentContacts />
        <RecentOrders />
      </div>
    </AdminLayout>
  )
}

function RecentContacts() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Contacts</h2>
      <p className="text-gray-500 text-sm">View latest contact form submissions</p>
      <div className="mt-4">
        <a href="/admin/contacts" className="text-blue-600 hover:underline text-sm">
          View all →
        </a>
      </div>
    </div>
  )
}

function RecentOrders() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <p className="text-gray-500 text-sm">View latest payment orders</p>
      <div className="mt-4">
        <a href="/admin/orders" className="text-blue-600 hover:underline text-sm">
          View all →
        </a>
      </div>
    </div>
  )
}
