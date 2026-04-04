import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Settings = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phoneNumber: '',
    location: '',
    notifications: {
      emailNotifications: true,
      applicationReminders: true,
      weeklyDigest: true,
    },
    theme: 'light',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNotificationChange = (key) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const handleSave = () => {
    console.log('Settings saved:', formData)
    // Add save logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="ml-64 px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>
      </div>

      {/* Content */}
      <div className="ml-64 p-8 max-w-4xl">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
          
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email updates about your job search' },
              { key: 'applicationReminders', label: 'Application Reminders', description: 'Get reminded about follow-ups and deadlines' },
              { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Receive a weekly summary of your job search progress' },
            ].map(option => (
              <div key={option.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications[option.key]}
                    onChange={() => handleNotificationChange(option.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Appearance</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
            <div className="flex gap-4">
              {[
                { value: 'light', label: '☀️ Light' },
                { value: 'dark', label: '🌙 Dark' },
              ].map(theme => (
                <button
                  key={theme.value}
                  onClick={() => setFormData(prev => ({ ...prev, theme: theme.value }))}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    formData.theme === theme.value
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            Save Changes
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
