import React from 'react'

const AIInsights = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="ml-64 px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-gray-600 mt-2">Get intelligent recommendations to improve your job search</p>
        </div>
      </div>

      {/* Content */}
      <div className="ml-64 p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Insights Coming Soon</h2>
          <p className="text-gray-600 mb-6">AI-powered recommendations will appear as you add applications and data</p>
          <div className="inline-flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-700">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" clipRule="evenodd" />
            </svg>
            AI analysis requires application data to generate insights
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIInsights
