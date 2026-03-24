import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: "", color: "", width: "0%" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { label: "Weak", color: "#ef4444", width: "25%" };
    if (score === 2) return { label: "Fair", color: "#f97316", width: "50%" };
    if (score === 3) return { label: "Good", color: "#3B82F6", width: "75%" };
    return { label: "Strong", color: "#22c55e", width: "100%" };
  };

  const strength = getPasswordStrength(password);

  const handleSignup = async () => {
    if (!email || !password || !fullName) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message.replace("Firebase: ", "").replace(/\(auth\/.*\)/, "").trim());
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message.replace("Firebase: ", "").replace(/\(auth\/.*\)/, "").trim());
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#F8FAFC" }}>
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[48%] p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #3B82F6 60%, #6177A5 100%)" }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-32 -left-16 w-56 h-56 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-5"
          style={{ background: "white" }}
        />

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <span className="text-white text-sm font-bold">CT</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">CareerTrack</span>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-70"
            style={{ color: "#bfdbfe" }}
          >
            The Professional Choice
          </p>
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            Manage your career trajectory with{" "}
            <span style={{ color: "#fcd34d" }}>surgical precision.</span>
          </h1>
          <p className="text-blue-100 text-base leading-relaxed opacity-80">
            Join 50,000+ professionals using CareerTrack to turn their application chaos into structured success.
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2 mt-8">
            {["📌 Track Applications", "📊 Analytics", "🤖 AI Insights", "🗂 Kanban Board"].map((f) => (
              <span
                key={f}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(4px)" }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Trust badge */}
        <div
          className="relative z-10 flex items-center gap-3 p-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#3B82F6" }}
          >
            <span className="text-white text-sm">⭐</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Trusted by Top Talent</p>
            <p className="text-blue-200 text-xs">4.9/5 from 2,000+ reviews</p>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-16">
        {/* Mobile brand */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#3B82F6" }}
          >
            <span className="text-white text-sm font-bold">CT</span>
          </div>
          <span className="font-semibold text-lg text-gray-800 tracking-tight">CareerTrack</span>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
            <p className="text-gray-500 text-sm">Start tracking your applications today</p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-5 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
              style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
            >
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Sarah Jenkins"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  border: "1.5px solid #e2e8f0",
                  background: "white",
                  color: "#1e293b",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="sarah@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  border: "1.5px solid #e2e8f0",
                  background: "white",
                  color: "#1e293b",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  border: "1.5px solid #e2e8f0",
                  background: "white",
                  color: "#1e293b",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              {/* Strength bar */}
              {password && (
                <div className="mt-2">
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: strength.width, background: strength.color }}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: strength.color }}>
                    Strength: {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all mt-1"
              style={{
                background: loading ? "#93c5fd" : "#3B82F6",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
              }}
              onMouseEnter={(e) => !loading && (e.target.style.background = "#2563eb")}
              onMouseLeave={(e) => !loading && (e.target.style.background = "#3B82F6")}
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 transition-all"
              style={{
                border: "1.5px solid #e2e8f0",
                background: "white",
                color: "#374151",
                cursor: googleLoading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              {/* Google SVG */}
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Signing in…" : "Sign up with Google"}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold" style={{ color: "#3B82F6" }}>
              Log in
            </Link>
          </p>

          <p className="text-center text-gray-400 text-xs mt-4">
            By clicking "Create Account", you agree to our{" "}
            <a href="#" className="underline">Terms of Service</a> and{" "}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;