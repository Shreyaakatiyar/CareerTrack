import React from 'react'
import { useAuth } from '../context/AuthContext'
import SideNavbar from '../components/SideNavbar'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <SideNavbar/>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="ml-64 px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.email?.split('@')[0]}</h1>
          <p className="text-gray-600 mt-2">Here's an overview of your job search journey</p>
        </div>
      </div>

      {/* Content */}
      <div className="ml-64 p-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Interview Rate</p>
                <p className="text-3xl font-bold text-green-600">0%</p>
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Response Rate</p>
                <p className="text-3xl font-bold text-purple-600">0%</p>
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm text-white p-8">
          <h2 className="text-2xl font-bold mb-3">Get Started with CareerTrack</h2>
          <p className="text-blue-100 mb-6">Track your job applications, get AI-powered insights, and land your dream job faster.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/dashboard/applications" className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/20">
              <h3 className="font-semibold mb-1">📝 Add Applications</h3>
              <p className="text-sm text-blue-100">Start tracking your job applications</p>
            </a>
            <a href="/dashboard/analytics" className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/20">
              <h3 className="font-semibold mb-1">📊 View Analytics</h3>
              <p className="text-sm text-blue-100">Understand your job search metrics</p>
            </a>
            <a href="/dashboard/insights" className="block p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/20">
              <h3 className="font-semibold mb-1">🤖 AI Insights</h3>
              <p className="text-sm text-blue-100">Get smart recommendations</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard