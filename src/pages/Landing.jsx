import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdWork, MdViewKanban, MdPsychology, MdAutoAwesome, MdAnalytics, MdDescription} from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";

const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-15px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleUpFade {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  .animate-fade-in-up    { animation: fadeInUp 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity:0; }
  .animate-fade-in-down  { animation: fadeInDown 0.6s ease-out forwards; opacity:0; }
  .animate-fade-in-left  { animation: fadeInLeft 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity:0; }
  .animate-fade-in-right { animation: fadeInRight 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity:0; }
  .animate-slide-in-left  { animation: slideInLeft 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity:0; }
  .animate-slide-in-right { animation: slideInRight 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity:0; }
  .animate-scale-up { animation: scaleUpFade 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity:0; }
  .animate-float    { animation: float 3s ease-in-out infinite; }

  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
  .stagger-6 { animation-delay: 0.6s; }

  /* Hero cards: hidden below lg, shown as a stacked preview on md */
  .hero-cards-wrapper {
    display: none;
  }
  @media (min-width: 1280px) {
    .hero-cards-wrapper {
      display: block;
    }
  }

  /* Mobile hero stat pills */
  .hero-stats {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (min-width: 1024px) {
    .hero-stats { justify-content: flex-start; }
  }
`;

const Landing = () => {
  const navigate = useNavigate();
  const [visibleElements, setVisibleElements] = useState({});

  useEffect(() => {
    const observers = {};
    const elements = document.querySelectorAll('[data-animate]');
    const createObserver = (element) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('data-animate');
              setVisibleElements((prev) => ({ ...prev, [id]: true }));
              observers[id]?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      return observer;
    };
    elements.forEach((element) => {
      const id = element.getAttribute('data-animate');
      const observer = createObserver(element);
      observers[id] = observer;
      observer.observe(element);
    });
    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect?.());
    };
  }, []);

  return (
    <>
      <style>{animationStyles}</style>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm shadow-sm animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="text-lg sm:text-xl font-bold tracking-tighter text-gray-900">
            CareerTrack
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate('/login')}
              className="secondary-cta secondary-cta-hover font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="primary-cta primary-cta-hover font-semibold text-sm px-4 py-1.5 rounded-lg transition-all duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-14 sm:pt-16">

        {/* Hero */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-12 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          data-animate="hero-text"
        >
          {/* Left copy */}
          <div className="space-y-5 sm:space-y-7 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mx-auto lg:mx-0 ${visibleElements['hero-text'] ? 'animate-fade-in-up' : ''}`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
              <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">Now with AI Insights</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.1] text-gray-900 ${visibleElements['hero-text'] ? 'animate-fade-in-left stagger-1' : ''}`}>
              Track Your <span className="text-blue-600">Career</span>.<br className="hidden sm:block" />
              Land Better <span className="text-blue-600">Opportunities</span>.
            </h1>

            <p className={`text-base sm:text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed ${visibleElements['hero-text'] ? 'animate-fade-in-left stagger-2' : ''}`}>
              Manage applications, track progress, and stay ahead with a
              streamlined system designed to simplify your job search.
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start ${visibleElements['hero-text'] ? 'animate-fade-in-left stagger-3' : ''}`}>
              <button
                onClick={() => navigate('/signup')}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 py-3.5 rounded-xl transition-all duration-200 w-full sm:w-auto"
              >
                Start Tracking →
              </button>
            </div>

            {/* Social proof pills — visible on all screens */}
            <div className={`hero-stats ${visibleElements['hero-text'] ? 'animate-fade-in-up stagger-4' : ''}`}>
              {[
                { val: '50K+', label: 'Users' },
                { val: '3×',   label: 'More interviews' },
                { val: '4.9★', label: 'Rating' },
              ].map(({ val, label }) => (
                <div key={val} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 py-2">
                  <span className="font-bold text-sm text-gray-900">{val}</span>
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero cards — desktop only */}
          <div className="hero-cards-wrapper relative h-96 w-full" data-animate="hero-images">
            {/* card 1 */}
            <div className={`absolute top-0 right-0 w-72 p-4 bg-white rounded-xl shadow-2xl z-20 border border-gray-200 ${visibleElements['hero-images'] ? 'animate-slide-in-right stagger-1' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <MdWork className="text-blue-600 text-lg" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold truncate">Frontend Developer</div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Linear · Applied</div>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-3/4"></div>
              </div>
              <div className="mt-2 text-[10px] text-right font-medium text-blue-600">Interview Scheduled</div>
            </div>
            {/* card 2 */}
            <div className={`absolute top-1/3 -left-10 w-64 p-4 bg-white rounded-xl shadow-2xl z-10 border border-gray-200 -rotate-3 ${visibleElements['hero-images'] ? 'animate-slide-in-left stagger-2' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="text-xs font-bold text-gray-600">Daily Activity</div>
                <IoIosTrendingUp className="text-gray-600" />
              </div>
              <div className="flex gap-1 h-20 items-end">
                <div className="w-full bg-blue-200 h-1/2 rounded-t-sm"></div>
                <div className="w-full bg-blue-400 h-3/4 rounded-t-sm"></div>
                <div className="w-full bg-blue-600 h-full rounded-t-sm"></div>
                <div className="w-full bg-blue-500 h-2/3 rounded-t-sm"></div>
                <div className="w-full bg-blue-300 h-1/3 rounded-t-sm"></div>
              </div>
            </div>
            {/* card 3 */}
            <div className={`absolute bottom-10 right-5 w-80 p-6 bg-white rounded-xl shadow-2xl z-30 border border-gray-200 rotate-2 ${visibleElements['hero-images'] ? 'animate-slide-in-right stagger-3' : ''}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop"
                    alt="Profile"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">Albert Dera</div>
                  <div className="text-xs text-gray-500">Tracked 14 applications today</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-gray-100 rounded-lg text-xs font-medium flex items-center gap-2">
                  <FaCircleCheck className="text-blue-600 shrink-0" />
                  <span>Resume optimized for ATS</span>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-xs font-medium flex items-center gap-2">
                  <FaCircleCheck className="text-blue-600 shrink-0" />
                  <span>3 New insights from AI</span>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 blur-[120px] rounded-full -z-10"></div>
          </div>

          {/* Mobile hero preview card — shown only on small screens */}
          <div className="xl:hidden w-full max-w-sm mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MdWork className="text-blue-600 text-lg" />
                </div>
                <div>
                  <div className="text-sm font-bold">Frontend Developer</div>
                  <div className="text-xs text-gray-500">Linear · Applied</div>
                </div>
                <span className="ml-auto text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Active</span>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span className="text-blue-600 font-medium">Interview Scheduled</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { label: 'Applied', val: '24', color: 'bg-blue-50 text-blue-700' },
                  { label: 'Interviews', val: '6', color: 'bg-purple-50 text-purple-700' },
                  { label: 'Offers', val: '2', color: 'bg-green-50 text-green-700' },
                ].map(({ label, val, color }) => (
                  <div key={label} className={`${color} rounded-xl p-3 text-center`}>
                    <div className="font-bold text-lg">{val}</div>
                    <div className="text-xs opacity-70">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20"
          data-animate="features"
        >
          <div className={`text-center mb-10 sm:mb-14 space-y-3 ${visibleElements['features'] ? 'animate-fade-in-up' : ''}`}>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Powerful Features to Simplify<br className="hidden sm:block" /> Your Job Search
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
              Everything you need to track applications, stay organized, and
              make smarter career decisions — all in one place.
            </p>
          </div>

          {/* Bento grid — stacks to single col on mobile, 2 cols on tablet, bento on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">

            {/* Kanban — full width mobile/tablet, 8 cols desktop */}
            <div
              className={`sm:col-span-2 lg:col-span-8 bg-gray-100 rounded-2xl p-6 sm:p-8 overflow-hidden relative group ${visibleElements['features'] ? 'animate-fade-in-left stagger-1' : ''} hover:shadow-xl transition-shadow duration-300`}
              data-animate="feature-1"
            >
              <div className="relative z-10 lg:w-1/2">
                <MdViewKanban className="text-blue-600 mb-3 text-3xl sm:text-4xl" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Kanban Pipeline</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  A visual trajectory of your career. Drag and drop from 'Applied' to 'Offer Accepted' with ease.
                </p>
              </div>
              {/* Kanban preview */}
              <div className="absolute -right-4 top-8 w-full lg:w-[58%] h-[70%] flex gap-3 rotate-3 opacity-30 lg:opacity-100 group-hover:rotate-0 transition-transform duration-500 pointer-events-none">
                <div className="flex-1 bg-white/50 rounded-xl p-3 border border-gray-200 shadow">
                  <div className="h-3 w-1/2 bg-gray-300 rounded-full mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-20 bg-gray-200 rounded-lg p-2"><div className="w-7 h-7 rounded bg-blue-200 mb-1"></div><div className="h-1.5 w-3/4 bg-gray-300 rounded"></div></div>
                    <div className="h-20 bg-gray-200 rounded-lg p-2"><div className="w-7 h-7 rounded bg-purple-200 mb-1"></div><div className="h-1.5 w-1/2 bg-gray-300 rounded"></div></div>
                  </div>
                </div>
                <div className="flex-1 bg-white/50 rounded-xl p-3 border border-gray-200 shadow mt-6">
                  <div className="h-3 w-1/3 bg-blue-300 rounded-full mb-3"></div>
                  <div className="h-20 bg-gray-200 rounded-lg p-2"><div className="w-7 h-7 rounded bg-orange-200 mb-1"></div><div className="h-1.5 w-full bg-gray-300 rounded"></div></div>
                </div>
              </div>
            </div>

            {/* AI Insights — full width mobile, 4 cols desktop */}
            <div
              className={`sm:col-span-1 lg:col-span-4 bg-blue-600 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden group ${visibleElements['features'] ? 'animate-fade-in-right stagger-2' : ''} hover:shadow-xl transition-shadow duration-300`}
              data-animate="feature-2"
            >
              <MdPsychology className="text-white mb-3 text-3xl sm:text-4xl" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">AI Insights</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Unlock hidden patterns in job descriptions. Our AI tells you exactly what they're looking for.
              </p>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 group-hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <MdAutoAwesome className="text-sm" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Job Fit Analysis</span>
                </div>
                <div className="text-2xl font-bold">94% Match</div>
                <div className="mt-1 text-[11px] opacity-70">Focus on "System Scalability"</div>
              </div>
            </div>

            {/* Analytics — full width mobile, 5 cols desktop */}
            <div
              className={`sm:col-span-1 lg:col-span-5 bg-orange-500 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden group ${visibleElements['features'] ? 'animate-fade-in-left stagger-3' : ''} hover:shadow-xl transition-shadow duration-300`}
              data-animate="feature-3"
            >
              <MdAnalytics className="text-white mb-3 text-3xl sm:text-4xl" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Smart Analytics</h3>
              <p className="text-orange-100 text-sm leading-relaxed mb-20">
                Know where your efforts pay off. Real-time data on conversion rates from application to interview.
              </p>
              <div className="absolute bottom-0 left-6 right-6 h-24 flex items-end gap-1.5">
                <div className="flex-1 bg-white/20 h-1/2 rounded-t-lg"></div>
                <div className="flex-1 bg-white/40 h-3/4 rounded-t-lg"></div>
                <div className="flex-1 bg-white/60 h-full rounded-t-lg"></div>
                <div className="flex-1 bg-white/30 h-1/3 rounded-t-lg"></div>
                <div className="flex-1 bg-white/50 h-2/3 rounded-t-lg"></div>
              </div>
            </div>

            {/* Resume management — full width mobile, 7 cols desktop */}
            <div
              className={`sm:col-span-2 lg:col-span-7 bg-gray-100 rounded-2xl p-6 sm:p-8 overflow-hidden relative group ${visibleElements['features'] ? 'animate-fade-in-right stagger-4' : ''} hover:shadow-xl transition-shadow duration-300`}
              data-animate="feature-4"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center h-full">
                <div className="sm:w-1/2">
                  <MdDescription className="text-blue-600 mb-3 text-3xl sm:text-4xl" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Resume Management</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    One master profile, infinite tailored versions. We sync your data across every submission.
                  </p>
                </div>
                <div className="sm:w-1/2 w-full bg-white/60 p-5 rounded-2xl shadow-inner group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-8 px-4 hover:bg-white/40 transition-colors duration-300">
                    <FaFileUpload className="text-blue-600 text-3xl mb-2 animate-float" />
                    <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">Drop New Version</div>
                    <div className="text-xs text-gray-400 mt-1">PDF or DOCX</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20"
          data-animate="cta"
        >
          <div className={`bg-gray-800 rounded-2xl sm:rounded-[2.5rem] p-8 sm:p-14 md:p-20 text-center space-y-5 sm:space-y-7 relative overflow-hidden ${visibleElements['cta'] ? 'animate-scale-up' : ''} hover:shadow-2xl transition-shadow duration-300`}>
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,#2170e4_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#924700_0%,transparent_50%)]" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white relative z-10 leading-tight">
              Take Control of Your<br className="hidden sm:block" /> Job Search Today
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto relative z-10">
              Start tracking your applications, stay organized, and move closer to your next opportunity with confidence.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="cursor-pointer font-semibold text-base px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300 w-full sm:w-auto"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate('/login')}
                className="cursor-pointer font-semibold text-base px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-300 border border-white/20 w-full sm:w-auto"
              >
                Sign In
              </button>
            </div>
            {/* Mini trust row */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
              {['No credit card required', 'Free forever plan', '50K+ users'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <FaCircleCheck className="text-blue-500 text-xs" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="flex items-center justify-center px-4 pb-10 sm:pb-14">
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            © 2026 CareerTrack · All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Landing;