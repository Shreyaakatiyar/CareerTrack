import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdWork } from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { MdViewKanban } from "react-icons/md";
import { MdPsychology } from "react-icons/md";
import { MdAutoAwesome } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";

const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleUpFade {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(33, 112, 228, 0.3);
    }
    50% {
      box-shadow: 0 0 30px rgba(33, 112, 228, 0.5);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }

  .animate-fade-in-down {
    animation: fadeInDown 0.6s ease-out forwards;
    opacity: 0;
  }

  .animate-fade-in-left {
    animation: fadeInLeft 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }

  .animate-fade-in-right {
    animation: fadeInRight 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }

  .animate-scale-up {
    animation: scaleUpFade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
  .stagger-6 { animation-delay: 0.6s; }

  @media (max-width: 1248px) {
    [data-animate="hero-images"] {
      display: none !important;
    }
  }
`

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
      
      <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm animate-fade-in-down bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="text-lg sm:text-xl font-bold tracking-tighter text-gray-900 font-heading">
            CareerTrack
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="secondary-cta font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 secondary-cta-hover transition-all duration-300"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="primary-cta font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 primary-cta-hover transition-all duration-300"
            >
              SignUp
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* hero section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:items-start">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left" data-animate="hero-text">
            <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight text-gray-900 ${visibleElements['hero-text'] ? 'animate-fade-in-left' : ''}`}>
              Track Your <span className="text-blue-600">Career</span>. Land
              Better <span className="text-blue-600">Opportunities</span>.
            </h1>
            <p className={`text-base sm:text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed ${visibleElements['hero-text'] ? 'animate-fade-in-left stagger-1' : ''}`}>
              Manage applications, track progress, and stay ahead with a
              streamlined system designed to simplify your job search.
            </p>
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 ${visibleElements['hero-text'] ? 'animate-fade-in-left stagger-2' : ''}`}>
              <button 
                onClick={() => navigate('/dashboard')}
                className="primary-cta primary-cta-hover text-base sm:text-lg font-medium transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-64"
              >
                Start Tracking
              </button>
            </div>
          </div>

          {/* Hero image - hidden below 1249px width */}
          <div className="relative h-96 w-full" data-animate="hero-images">
            {/* card 1 */}
            <div className={`absolute top-0 right-0 w-72 p-4 bg-white rounded-xl shadow-2xl z-20 border border-gray-200 ${visibleElements['hero-images'] ? 'animate-slide-in-right stagger-1' : ''} hover:shadow-3xl transition-shadow duration-300`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <MdWork className="text-blue-600 text-lg" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold truncate">Frontend Developer</div>
                  <div className="text-[8px] sm:text-[10px] text-gray-500 font-label uppercase">
                    Linear . Applied
                  </div>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-3/4 transition-all duration-500"></div>
              </div>
              <div className="mt-2 text-[8px] sm:text-[10px] text-right font-medium text-blue-600">
                Interview Scheduled
              </div>
            </div>
            {/* card 2 */}
            <div className={`absolute top-1/3 -left-10 w-64 p-4 bg-white rounded-xl shadow-2xl z-10 border border-gray-200 transform -rotate-3 ${visibleElements['hero-images'] ? 'animate-slide-in-left stagger-2' : ''} hover:shadow-3xl transition-shadow duration-300`}>
              <div className="flex justify-between items-start mb-4">
                <div className="text-[8px] sm:text-xs font-bold text-gray-600">
                  Daily Activity
                </div>
                <IoIosTrendingUp className="text-sm sm:text-base text-gray-600" />
              </div>
              <div className="flex gap-1 h-20 items-end">
                <div className="w-full bg-blue-200 h-1/2 rounded-t-sm hover:bg-blue-400 transition-colors duration-300"></div>
                <div className="w-full bg-blue-400 h-3/4 rounded-t-sm hover:bg-blue-600 transition-colors duration-300"></div>
                <div className="w-full bg-blue-600 h-full rounded-t-sm hover:bg-blue-800 transition-colors duration-300"></div>
                <div className="w-full bg-blue-500 h-2/3 rounded-t-sm hover:bg-blue-700 transition-colors duration-300"></div>
                <div className="w-full bg-blue-300 h-1/3 rounded-t-sm hover:bg-blue-500 transition-colors duration-300"></div>
              </div>
            </div>
            {/* card 3 */}
            <div className={`absolute bottom-10 right-5 w-80 p-6 bg-white rounded-xl shadow-2xl z-30 border border-gray-200 transform rotate-2 ${visibleElements['hero-images'] ? 'animate-slide-in-right stagger-3' : ''} hover:shadow-3xl transition-shadow duration-300`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile-picture"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base text-gray-900">Albert Dera</div>
                  <div className="text-[8px] sm:text-xs text-gray-500">
                    Tracked 14 applications today
                  </div>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="p-2 bg-gray-100 rounded-lg text-[9px] sm:text-[11px] font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300">
                  <FaCircleCheck className="text-blue-600 shrink-0" />
                  <span>Resume optimized for ATS</span>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-[9px] sm:text-[11px] font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300">
                  <FaCircleCheck className="text-blue-600 shrink-0" />
                  <span>3 New insights from AI</span>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-blue-100 blur-[120px] rounded-full -z-10"></div>
          </div>
        </section>

        {/* Features section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24" data-animate="features">
          <div className={`text-center mb-12 sm:mb-16 space-y-4 ${visibleElements['features'] ? 'animate-fade-in-up' : ''}`}>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-headline font-bold tracking-tight text-gray-900">
              Powerful Features to Simplify Your Job Search
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg">
              Everything you need to track applications, stay organized, and
              make smarter career decisions — all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 sm:gap-6 h-auto md:h-200">
            {/* kanban pipeline */}
            <div className={`md:col-span-8 md:row-span-1 bg-gray-100 rounded-2xl sm:rounded-4xl p-6 sm:p-8 overflow-hidden relative group ${visibleElements['features'] ? 'animate-fade-in-left stagger-1' : ''} hover:shadow-xl transition-shadow duration-300`} data-animate="feature-1">
              <div className="relative z-10 md:w-1/2">
                <MdViewKanban className="text-blue-600 mb-4 text-2xl sm:text-4xl" />
                <h3 className="text-xl sm:text-2xl font-headline font-bold mb-3 text-gray-900">
                  Kanban Pipeline
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                  A visual trajectory of your career. Drag and drop your way
                  from 'Applied' to 'Offer Accepted' with ease.
                </p>
              </div>
              <div className="absolute -right-5 sm:-right-5 top-10 w-full md:w-[60%] h-full flex gap-4 rotate-3 opacity-40 md:opacity-100 group-hover:rotate-0 transition-transform duration-500">
                <div className="flex-1 bg-white/40 rounded-xl p-3 sm:p-4 shadow-lg border border-gray-200">
                  <div className="h-3 sm:h-4 w-1/2 bg-gray-300 rounded-full mb-3 sm:mb-4"></div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="h-16 sm:h-24 bg-gray-300 rounded-lg p-2 sm:p-3">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 rounded bg-blue-200 mb-1 sm:mb-2"></div>
                      <div className="h-1.5 sm:h-2 w-3/4 bg-gray-400 rounded"></div>
                    </div>
                    <div className="h-16 sm:h-24 bg-gray-300 rounded-lg p-2 sm:p-3">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 rounded bg-purple-200 mb-1 sm:mb-2"></div>
                      <div className="h-1.5 sm:h-2 w-1/2 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white/40 rounded-xl p-3 sm:p-4 shadow-lg border border-gray-200 mt-6 sm:mt-8">
                  <div className="h-3 sm:h-4 w-1/3 bg-blue-300 rounded-full mb-3 sm:mb-4"></div>
                  <div className="h-16 sm:h-24 bg-gray-300 rounded-lg p-2 sm:p-3">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 rounded bg-orange-200 mb-1 sm:mb-2"></div>
                    <div className="h-1.5 sm:h-2 w-full bg-gray-400 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ai insights */}
            <div className={`md:col-span-4 md:row-span-1 bg-blue-600 rounded-2xl sm:rounded-4xl p-6 sm:p-8 text-white relative overflow-hidden group ${visibleElements['features'] ? 'animate-fade-in-right stagger-2' : ''} hover:shadow-xl transition-shadow duration-300`} data-animate="feature-2">
              <div className="relative z-10">
                <MdPsychology className="text-white mb-4 text-2xl sm:text-4xl" />
                <h3 className="text-xl sm:text-2xl font-headline font-bold mb-3">
                  AI Insights
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mb-6">
                  Unlock hidden patterns in job descriptions. Our AI tells you
                  exactly what they're looking for.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transform group-hover:-translate-y-2 transition-transform duration-300 hover:scale-105">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <MdAutoAwesome className="text-xs" />
                  <div className="text-[8px] sm:text-[10px] font-label uppercase tracking-widest">
                    Job Fit Analysis
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-headline font-bold">
                  94% Match
                </div>
                <div className="mt-1 sm:mt-2 text-[8px] sm:text-[10px] opacity-70">
                  Focus on "System Scalability"
                </div>
              </div>
            </div>

            {/* analytics */}
            <div className={`md:col-span-5 md:row-span-1 bg-orange-500 rounded-2xl sm:rounded-4xl p-6 sm:p-8 text-white relative overflow-hidden group ${visibleElements['features'] ? 'animate-fade-in-left stagger-3' : ''} hover:shadow-xl transition-shadow duration-300`} data-animate="feature-3">
              <div className="relative z-10">
                <MdAnalytics className="text-white mb-4 text-2xl sm:text-4xl" />
                <h3 className="text-xl sm:text-2xl font-headline font-bold mb-3">
                  Smart Analytics</h3>
                <p className="text-orange-100 text-xs sm:text-sm leading-relaxed">
                  Know where your efforts pay off. Real-time data on conversion
                  rates from application to interview.
                </p>
              </div>
              <div className="absolute -bottom-5 left-4 sm:left-8 right-4 sm:right-8 h-24 sm:h-32 flex items-end gap-1 sm:gap-2 group-hover:gap-2 sm:group-hover:gap-3 transition-all">
                <div className="flex-1 bg-white/20 h-1/2 rounded-t-lg hover:bg-white/40 transition-colors duration-300"></div>
                <div className="flex-1 bg-white/40 h-3/4 rounded-t-lg hover:bg-white/60 transition-colors duration-300"></div>
                <div className="flex-1 bg-white/60 h-full rounded-t-lg hover:bg-white/80 transition-colors duration-300"></div>
                <div className="flex-1 bg-white/30 h-1/3 rounded-t-lg hover:bg-white/50 transition-colors duration-300"></div>
                <div className="flex-1 bg-white/50 h-2/3 rounded-t-lg hover:bg-white/70 transition-colors duration-300"></div>
              </div>
            </div>

            {/* resume management */}
            <div className={`md:col-span-7 md:row-span-1 bg-gray-100 rounded-2xl sm:rounded-4xl p-6 sm:p-8 overflow-hidden relative group ${visibleElements['features'] ? 'animate-fade-in-right stagger-4' : ''} hover:shadow-xl transition-shadow duration-300`} data-animate="feature-4">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center h-full">
                <div className="md:w-1/2">
                  <MdDescription className='text-blue-600 mb-4 text-2xl sm:text-4xl'/>
                  <h3 className="text-xl sm:text-2xl font-headline font-bold mb-3 text-gray-900">
                    Resume Management
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    One master profile, infinite tailored versions. We sync your
                    data across every submission.
                  </p>
                </div>
                <div className="md:w-1/2 w-full h-full bg-white/60 p-4 sm:p-6 rounded-t-2xl shadow-inner bento-inner-shadow translate-y-4 group-hover:translate-y-2 transition-transform duration-300">
                  <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center p-3 sm:p-4 hover:bg-white/30 transition-colors duration-300">
                    <FaFileUpload className='text-blue-600 text-2xl sm:text-3xl mb-2 animate-float'/>
                    <div className="text-[8px] sm:text-[10px] font-bold text-gray-700 uppercase font-label">
                      Drop New Version
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* cta section */}
        <section className='max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24' data-animate="cta">
          <div className={`bg-gray-800 rounded-2xl sm:rounded-[3rem] p-6 sm:p-12 md:p-24 text-center space-y-6 sm:space-y-8 relative overflow-hidden ${visibleElements['cta'] ? 'animate-scale-up' : ''} hover:shadow-2xl transition-shadow duration-300`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,#2170e4_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#924700_0%,transparent_50%)]" ></div>
            <h2 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white relative z-10'>Take Control of Your <br/> Job Search Today</h2>
            <p className='text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mx-auto relative z-10'>Start tracking your applications, stay organized, and move closer to your next opportunity with confidence.</p>
            <div className='relative z-10'>
              <button onClick={() => navigate('/signup')} className='font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300'>Get Started</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className='flex items-center justify-center px-4'>
          <p className='font-label text-xs sm:text-sm text-gray-500 max-w-xs pb-12 sm:pb-16 text-center'>@2026 CareerTrack</p>
        </div>
      </footer>
    </>
  )
}

export default Landing