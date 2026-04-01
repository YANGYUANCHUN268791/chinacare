'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/components/LanguageProvider'
import { User, Calendar, FileText, MessageSquare, Settings, LogOut, Bell, Clock, CheckCircle, AlertCircle } from 'lucide-react'

// Mock user data (will be replaced with Clerk auth)
const mockUser = {
  name: 'Ahmed Al-Rashidi',
  email: 'ahmed@example.com',
  avatar: 'A',
  joinDate: '2026-03-15',
  appointments: [
    {
      id: 1,
      hospital: 'Beijing Anzhen Hospital',
      department: 'Cardiac Surgery',
      date: '2026-04-10',
      status: 'confirmed',
    },
    {
      id: 2,
      hospital: 'Peking Union Medical College Hospital',
      department: 'Cardiology',
      date: '2026-03-20',
      status: 'completed',
    },
  ],
  documents: [
    { id: 1, name: 'Medical Report', uploadDate: '2026-03-15', type: 'pdf' },
    { id: 2, name: 'X-Ray Images', uploadDate: '2026-03-16', type: 'image' },
  ],
  messages: [
    { id: 1, from: 'Dr. Wang', preview: 'Your test results are ready...', date: '2026-03-18', unread: true },
    { id: 2, from: 'ChinaCare Support', preview: 'Your appointment has been confirmed...', date: '2026-03-16', unread: false },
  ],
}

export default function DashboardPage() {
  const { locale } = useLanguage()
  const isZh = locale === 'zh'
  const [activeTab, setActiveTab] = useState('overview')
  const [user] = useState(mockUser)

  const tabs = [
    { id: 'overview', icon: User, label: isZh ? '概览' : 'Overview' },
    { id: 'appointments', icon: Calendar, label: isZh ? '预约' : 'Appointments' },
    { id: 'documents', icon: FileText, label: isZh ? '文档' : 'Documents' },
    { id: 'messages', icon: MessageSquare, label: isZh ? '消息' : 'Messages' },
    { id: 'settings', icon: Settings, label: isZh ? '设置' : 'Settings' },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold text-white">{user.avatar}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    )
                  })}
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    {isZh ? '退出登录' : 'Sign Out'}
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Welcome Card */}
                  <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                      {isZh ? `欢迎回来，${user.name}！` : `Welcome back, ${user.name}!`}
                    </h1>
                    <p className="text-blue-100">
                      {isZh 
                        ? '您的下一次预约将在 4月10日 于北京安贞医院进行。'
                        : 'Your next appointment is on April 10th at Beijing Anzhen Hospital.'
                      }
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-700" />
                        </div>
                        <span className="text-gray-500">{isZh ? '预约' : 'Appointments'}</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">2</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-700" />
                        </div>
                        <span className="text-gray-500">{isZh ? '文档' : 'Documents'}</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">{user.documents.length}</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-purple-700" />
                        </div>
                        <span className="text-gray-500">{isZh ? '消息' : 'Messages'}</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">1</div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {isZh ? '最近活动' : 'Recent Activity'}
                    </h3>
                    <div className="space-y-4">
                      {user.appointments.map((apt) => (
                        <div key={apt.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            apt.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {apt.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{apt.hospital}</p>
                            <p className="text-sm text-gray-500">{apt.department}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">{apt.date}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              apt.status === 'completed' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {apt.status === 'completed' 
                                ? (isZh ? '已完成' : 'Completed') 
                                : (isZh ? '已确认' : 'Confirmed')
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {isZh ? '我的预约' : 'My Appointments'}
                    </h3>
                    <a 
                      href="/get-started"
                      className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800"
                    >
                      {isZh ? '新建预约' : 'New Appointment'}
                    </a>
                  </div>
                  <div className="space-y-4">
                    {user.appointments.map((apt) => (
                      <div key={apt.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{apt.hospital}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            apt.status === 'completed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {apt.status === 'completed' 
                              ? (isZh ? '已完成' : 'Completed') 
                              : (isZh ? '已确认' : 'Confirmed')
                            }
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{apt.department}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {apt.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {isZh ? '我的文档' : 'My Documents'}
                    </h3>
                    <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
                      {isZh ? '上传文档' : 'Upload Document'}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {user.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <FileText className="w-8 h-8 text-blue-700" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.uploadDate}</p>
                        </div>
                        <button className="text-blue-700 text-sm font-medium hover:underline">
                          {isZh ? '下载' : 'Download'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {isZh ? '消息' : 'Messages'}
                  </h3>
                  <div className="space-y-3">
                    {user.messages.map((msg) => (
                      <div key={msg.id} className={`flex items-center gap-4 p-4 rounded-lg ${
                        msg.unread ? 'bg-blue-50' : 'bg-gray-50'
                      }`}>
                        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                          {msg.from[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{msg.from}</p>
                            {msg.unread && (
                              <span className="w-2 h-2 bg-blue-700 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">{msg.preview}</p>
                        </div>
                        <p className="text-xs text-gray-400">{msg.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {isZh ? '账户设置' : 'Account Settings'}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isZh ? '姓名' : 'Name'}
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isZh ? '电子邮箱' : 'Email'}
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">
                          {isZh ? '邮件通知' : 'Email Notifications'}
                        </span>
                      </div>
                      <button className="w-12 h-6 bg-blue-700 rounded-full relative">
                        <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                      </button>
                    </div>
                    <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800">
                      {isZh ? '保存更改' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
