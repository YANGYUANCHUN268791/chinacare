import { Suspense } from 'react'
import { Metadata } from 'next'
import AdminLayout from '../layout'
import { ContactsTable } from './ContactsTable'

export const metadata: Metadata = {
  title: 'Contacts - ChinaCare Admin',
}

export default function ContactsPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Contact Submissions</h1>
      <Suspense fallback={<div className="text-gray-500">Loading contacts...</div>}>
        <ContactsTable />
      </Suspense>
    </AdminLayout>
  )
}
