import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Landing = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  React.useEffect(() => {
    if (user) navigate("/dashboard")
  }, [user, navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#F8FAFC" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "#3B82F6" }}
        >
          <span className="text-white text-sm font-bold">CT</span>
        </div>
        <span className="font-semibold text-lg text-gray-800 tracking-tight">CareerTrack</span>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Manage your career trajectory with <span style={{ color: "#3B82F6" }}>surgical precision.</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of professionals using CareerTrack to turn their application chaos into structured success.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["📌 Track Applications", "📊 Analytics", "🤖 AI Insights", "🗂 Kanban Board"].map((f) => (
            <span
              key={f}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: "#f0f9ff", color: "#3B82F6", border: "1px solid #bfdbfe" }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 rounded-xl text-base font-semibold text-white transition-all"
            style={{
              background: "#3B82F6",
              boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#2563eb")}
            onMouseLeave={(e) => (e.target.style.background = "#3B82F6")}
          >
            Create Account
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl text-base font-semibold transition-all"
            style={{
              background: "white",
              color: "#3B82F6",
              border: "1.5px solid #e2e8f0",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Trust badge */}
      <div
        className="flex items-center gap-3 p-4 rounded-xl"
        style={{ background: "#f0f9ff", border: "1px solid #bfdbfe" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "#3B82F6" }}
        >
          <span className="text-white text-sm">⭐</span>
        </div>
        <div>
          <p className="text-gray-900 text-sm font-semibold">Trusted by Top Talent</p>
          <p className="text-gray-600 text-xs">4.9/5 from 2,000+ reviews</p>
        </div>
      </div>
    </div>
  )
}

export default Landing