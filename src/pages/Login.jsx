import { useState } from "react";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  // Validation helpers
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setError("");

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up first.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed login attempts. Please try again later.");
      } else {
        setError(err.message.replace("Firebase: ", "").replace(/\(auth\/.*\)/, "").trim());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetSuccess(false);

    if (!forgotEmail.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!validateEmail(forgotEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setForgotLoading(true);
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setResetSuccess(true);
      setForgotEmail("");
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetSuccess(false);
      }, 3000);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <header className="absolute top-0 z-50 w-full">
        <div className="flex items-center justify-between px-8 py-6 w-full max-w-360 mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-white font-headline mix-blend-difference">
            CareerTrack
          </div>
        </div>
      </header>
      <div className="hidden lg:flex w-1/2 hero-gradient relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[20%] left-0 w-full h-px data-flow-line"></div>
          <div className="absolute top-[40%] left-0 w-full h-px data-flow-line"></div>
          <div className="absolute top-[60%] left-0 w-full h-px data-flow-line"></div>
          <div className="absolute top-[80%] left-0 w-full h-px data-flow-line"></div>
          <div className="absolute left-[20%] top-0 h-full w-px data-flow-line opacity-50"></div>
          <div className="absolute left-[40%] top-0 h-full w-px data-flow-line opacity-50"></div>
          <div className="absolute left-[60%] top-0 h-full w-px data-flow-line opacity-50"></div>
          <div className="absolute left-[80%] top-0 h-full w-px data-flow-line opacity-50"></div>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-48 -right-24 w-125 h-125 bg-indigo-600/30 rounded-full blur-[150px]"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8">
            The Professional Choice
          </div>
          <h2 className="text-6xl font-extrabold text-white leading-tight font-headline tracking-tight mb-8">
            Elevate your professional trajectory.
          </h2>
          <p className="text-xl text-blue-100 font-body leading-relaxed opacity-90 mb-12">
            Manage applications, track progress, and stay ahead with a
            streamlined system designed to simplify your job search.
          </p>
          <div className="glass-panel p-8 rounded-2xl flex items-center gap-6 max-w-md">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-white font-bold">
                <IoMdAdd />
              </div>
            </div>
            <div>
              <div class="text-blue-900 font-bold text-lg">50k+ Members</div>
              <div class="text-blue-800/70 text-sm">Growing by 200+ daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12">
        <div className="max-w-lg mx-10">
          {/* Forgot Password Modal */}
          {showForgotPassword && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Reset Your Password
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>

                {resetSuccess ? (
                  <div
                    className="px-4 py-3 rounded-lg text-sm mb-4"
                    style={{
                      background: "#ecfdf5",
                      color: "#065f46",
                      border: "1px solid #86efac",
                    }}
                  >
                    ✓ Password reset email sent! Check your inbox.
                  </div>
                ) : (
                  <>
                    {error && (
                      <div
                        className="mb-4 px-4 py-3 rounded-lg text-sm"
                        style={{
                          background: "#fee2e2",
                          color: "#991b1b",
                          border: "1px solid #fecaca",
                        }}
                      >
                        ⚠️ {error}
                      </div>
                    )}

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg text-sm border outline-none transition-all mb-4"
                      style={{
                        borderColor:
                          forgotEmail && !validateEmail(forgotEmail)
                            ? "#dc2626"
                            : "#d1d5db",
                        backgroundColor: "#ffffff",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          forgotEmail && !validateEmail(forgotEmail)
                            ? "#dc2626"
                            : "#d1d5db")
                      }
                    />

                    <button
                      onClick={handleForgotPassword}
                      disabled={forgotLoading}
                      className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all mb-2"
                      style={{
                        background: forgotLoading ? "#6b7280" : "#1f2937",
                        cursor: forgotLoading ? "not-allowed" : "pointer",
                      }}
                      onMouseEnter={(e) =>
                        !forgotLoading &&
                        (e.target.style.background = "#111827")
                      }
                      onMouseLeave={(e) =>
                        !forgotLoading &&
                        (e.target.style.background = "#1f2937")
                      }
                    >
                      {forgotLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setError("");
                    setResetSuccess(false);
                  }}
                  className="w-full py-2 rounded-lg text-sm font-semibold border transition-all"
                  style={{
                    borderColor: "#d1d5db",
                    backgroundColor: "#ffffff",
                    color: "#374151",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ffffff")
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
            <p className="text-gray-600">
              Welcome back! Sign in to continue tracking your applications
            </p>
          </div>

          {/* Error */}
          {error && !showForgotPassword && (
            <div
              className="mb-6 px-4 py-3 rounded-lg text-sm"
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                border: "1px solid #fecaca",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm border outline-none transition-all"
                style={{
                  borderColor:
                    email && !validateEmail(email) ? "#dc2626" : "#d1d5db",
                  backgroundColor: "#ffffff",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                onBlur={(e) =>
                  (e.target.style.borderColor =
                    email && !validateEmail(email) ? "#dc2626" : "#d1d5db")
                }
              />
              {email && !validateEmail(email) && (
                <p className="text-xs text-red-600 mt-1">
                  Please enter a valid email
                </p>
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
                  borderColor: "#d1d5db",
                  backgroundColor: "#ffffff",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-xs mt-2 font-semibold"
                style={{ color: "#0052cc" }}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all mt-4"
              style={{
                background: loading ? "#6b7280" : "#1f2937",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) =>
                !loading && (e.target.style.background = "#111827")
              }
              onMouseLeave={(e) =>
                !loading && (e.target.style.background = "#1f2937")
              }
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "#d1d5db" }}
              />
              <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "#d1d5db" }}
              />
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border transition-all"
              style={{
                borderColor: "#d1d5db",
                backgroundColor: "#ffffff",
                color: "#374151",
                cursor: googleLoading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9fafb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#ffffff")
              }
            >
              {/* Google SVG */}
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {googleLoading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold"
              style={{ color: "#0052cc" }}
            >
              Sign up
            </Link>
          </p>

          <p className="text-center text-gray-500 text-xs mt-4">
            By signing in you agree to our
            <br />
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

  