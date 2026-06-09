import { Suspense } from 'react'
import { Metadata } from 'next'
import AdminLayout from '../layout'
import { OrdersTable } from './OrdersTable'

export const metadata: Metadata = {
  title: 'Orders - ChinaCare Admin',
}

export default function OrdersPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment Orders</h1>
      <Suspense fallback={<div className="text-gray-500">Loading orders...</div>}>
        <OrdersTable />
      </Suspense>
    </AdminLayout>
  )
}
