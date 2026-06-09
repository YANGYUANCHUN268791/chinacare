import { connectToDatabase } from '@/lib/db'
import Contact from '@/models/Contact'

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-green-100 text-green-800',
    contacted: 'bg-blue-100 text-blue-800',
    scheduled: 'bg-purple-100 text-purple-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.new}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export async function ContactsTable() {
  await connectToDatabase()

  const contacts = await Contact.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .lean()

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
        No contact submissions yet
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Specialty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Country</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((contact: any) => (
              <tr key={contact._id.toString()} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline text-sm">
                    {contact.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                  {contact.phone || '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                  {contact.specialty || '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                  {contact.country || '-'}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={contact.status || 'new'} />
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {formatDate(contact.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
