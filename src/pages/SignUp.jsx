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

  // Validation helpers
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFullName = (name) => {
    return name.trim().length >= 2 && !/\d/.test(name);
  };

  const validatePassword = (pwd) => {
    return pwd.length >= 8;
  };

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
    setError("");

    // Validation checks
    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!validateFullName(fullName)) {
      setError("Full name must be at least 2 characters and contain no numbers.");
      return;
    }
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address (e.g., name@example.com).");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      // Handle Firebase specific errors
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please sign in instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError(err.message.replace("Firebase: ", "").replace(/\(auth\/.*\)/, "").trim());
      }
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
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Google sign-up failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── Left Panel ── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #003d82 0%, #0052cc 50%, #1e5ba5 100%)"
        }}
      >
        {/* Top - Brand */}
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight">CareerTrack</h1>
        </div>

        {/* Middle - Hero Content */}
        <div className="relative z-10">
          <div
            className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(255,255,255,0.15)", color: "#a0d9ff" }}
          >
            THE PROFESSIONAL CHOICE
          </div>

          <h2 className="text-white text-5xl font-bold leading-tight mb-6">
            Elevate your<br />
            professional<br />
            trajectory.
          </h2>

          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Join a network of elite professionals leveraging<br />
            intelligence to navigate their career growth.
          </p>

          {/* Members Badge */}
          <div
            className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: `hsl(${200 + i * 20}, 70%, 50%)`,
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">50k+ Members</p>
              <p className="text-blue-100 text-xs">Growing by 200+ daily</p>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-0 -left-32 w-64 h-64 rounded-full opacity-5"
          style={{ background: "white" }}
        />
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12 bg-[#f5f8fb]">
        <div className="max-w-lg mx-10 ">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create account</h2>
            <p className="text-gray-600">Step into a more powerful professional world.</p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-6 px-4 py-3 rounded-lg text-sm"
              style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Marcus Aurelius"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm border outline-none transition-all"
                style={{
                  borderColor: fullName && !validateFullName(fullName) ? "#dc2626" : "#d1d5db",
                  backgroundColor: "#ffffff"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                onBlur={(e) => (e.target.style.borderColor = fullName && !validateFullName(fullName) ? "#dc2626" : "#d1d5db")}
              />
              {fullName && !validateFullName(fullName) && (
                <p className="text-xs text-red-600 mt-1">At least 2 characters, no numbers</p>
              )}
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Work Email
              </label>
              <input
                type="email"
                placeholder="marcus@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm border outline-none transition-all"
                style={{
                  borderColor: email && !validateEmail(email) ? "#dc2626" : "#d1d5db",
                  backgroundColor: "#ffffff"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                onBlur={(e) => (e.target.style.borderColor = email && !validateEmail(email) ? "#dc2626" : "#d1d5db")}
              />
              {email && !validateEmail(email) && (
                <p className="text-xs text-red-600 mt-1">Please enter a valid email</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm border outline-none transition-all"
                style={{
                  borderColor: password && !validatePassword(password) ? "#dc2626" : "#d1d5db",
                  backgroundColor: "#ffffff"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                onBlur={(e) => (e.target.style.borderColor = password && !validatePassword(password) ? "#dc2626" : "#d1d5db")}
              />
              {password && !validatePassword(password) && (
                <p className="text-xs text-red-600 mt-1">Minimum 8 characters required</p>
              )}

              {/* Security Grade */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 font-semibold">SECURITY GRADE</span>
                    <span className="text-xs font-bold text-gray-700">{strength.label.toUpperCase()}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: strength.width, background: strength.color }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Tip: Add uppercase, numbers, and special characters for stronger security
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all mt-2"
              style={{
                background: loading ? "#6b7280" : "#1f2937",
                cursor: loading ? "not-allowed" : "pointer"
              }}
              onMouseEnter={(e) => !loading && (e.target.style.background = "#111827")}
              onMouseLeave={(e) => !loading && (e.target.style.background = "#1f2937")}
            >
              {loading ? "Creating account..." : "Get Started"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px" style={{ backgroundColor: "#d1d5db" }} />
              <span className="text-xs text-gray-500">OR JOIN WITH</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#d1d5db" }} />
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border transition-all"
              style={{
                borderColor: "#d1d5db",
                backgroundColor: "#ffffff",
                color: "#374151",
                cursor: googleLoading ? "not-allowed" : "pointer"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
              {/* Google SVG */}
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Signing up..." : "Sign up with Google"}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-bold" style={{ color: "#0052cc" }}>
              Sign in
            </Link>
          </p>

          <p className="text-center text-gray-500 text-xs mt-4">
            By registering you agree to our<br/>
            <a href="#" className="underline">Terms of Service</a> & <a href="#" className="underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

  