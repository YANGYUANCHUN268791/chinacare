import { connectToDatabase } from '@/lib/db'
import Contact from '@/models/Contact'
import Order from '@/models/Order'

export async function DashboardStats() {
  await connectToDatabase()

  const [contactCount, orderCount, pendingContacts, totalRevenue] = await Promise.all([
    Contact.countDocuments(),
    Order.countDocuments(),
    Contact.countDocuments({ status: 'new' }),
    Order.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
  ])

  const stats = [
    { label: 'Total Contacts', value: contactCount, color: 'bg-blue-500' },
    { label: 'New Contacts', value: pendingContacts, color: 'bg-green-500' },
    { label: 'Total Orders', value: orderCount, color: 'bg-purple-500' },
    { label: 'Revenue (USD)', value: `$${(totalRevenue[0]?.total || 0).toLocaleString()}`, color: 'bg-yellow-500' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
          <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white mb-3`}>
            <span className="text-xl font-bold">{stat.value.toString().charAt(0)}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-sm text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
