import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = React.useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#F8FAFC" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "#3B82F6" }}
            >
              <span className="text-white text-sm font-bold">CT</span>
            </div>
            <span className="font-semibold text-lg text-gray-800">CareerTrack</span>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: "#ef4444",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = "#dc2626")}
            onMouseLeave={(e) => !loading && (e.target.style.background = "#ef4444")}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg p-8 max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600 mb-6">
            Logged in as: <span className="font-semibold text-gray-900">{user?.email}</span>
          </p>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg" style={{ background: "#f0f9ff", border: "1px solid #bfdbfe" }}>
              <h3 className="font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-600 text-sm">
                This is your dashboard. More features are coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard