import React, { useState, useEffect } from 'react';
import { MdWork } from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";

// Mock navigate for standalone preview
const useNavigate = () => (path) => console.log('Navigate to:', path)

const Landing = () => {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jobs = [
    {
      title: 'Product Designer',
      company: 'Linear • Remote',
      status: 'Interviewing',
      statusColor: '#3B82F6',
      statusBg: '#EFF6FF',
      ago: 'Applied 2d ago',
      icon: 'L',
      iconBg: '#5E6AD2',
    },
    {
      title: 'Senior Frontend Engineer',
      company: 'Stripe • San Francisco',
      status: 'Applied',
      statusColor: '#6B7280',
      statusBg: '#F3F4F6',
      ago: 'Applied 5d ago',
      icon: 'S',
      iconBg: '#635BFF',
    },
  ]

  const features = [
    {
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      ),
      label: 'Kanban Pipeline',
      desc: 'A visual trajectory of your career. Drag and drop your way from "Applied" to "Offer Accepted" with ease.',
      link: 'Explore Pipeline →',
      bg: '#fff',
      color: '#111827',
      descColor: '#6B7280',
      span: 1,
      preview: (
        <div className="mt-4 space-y-2">
          {['Applied', 'Interview', 'Offer'].map((col, i) => (
            <div key={i} className="h-2 rounded-full" style={{ background: '#F3F4F6', width: `${[80,55,35][i]}%` }}>
              <div className="h-2 rounded-full" style={{ background: '#0052cc', width: `${[60,40,30][i]}%`, opacity: 0.5 }} />
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <span style={{ fontSize: 18 }}>⚡</span>,
      label: 'AI Insights',
      desc: 'Unlock hidden patterns in job descriptions. Our AI tells you exactly what they a`re looking for.',
      bg: '#0052cc',
      border: 'transparent',
      color: '#fff',
      descColor: '#bfdbfe',
      span: 2,
      preview: (
        <div className="mt-4 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <p className="text-xs font-semibold" style={{ color: '#bfdbfe', letterSpacing: '0.08em' }}>JOB FIT ANALYSIS</p>
          <p className="text-3xl font-bold text-white mt-1">94% Match</p>
          <p className="text-xs mt-1" style={{ color: '#bfdbfe' }}>Focus on your experience with "System Scalability" to stand out.</p>
        </div>
      ),
    },
    {
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-7"/>
        </svg>
      ),
      label: 'Smart Analytics',
      desc: 'Know where your efforts pay off. Real-time data on conversion rates from application to interview.',
      bg: '#D97706',
      border: 'transparent',
      color: '#fff',
      descColor: '#fef3c7',
      span: 1,
      preview: (
        <div className="mt-4 flex items-end gap-1.5 h-12">
          {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 1].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h*100}%`, background: 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      ),
    },
    {
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
      ),
      label: 'Resume Management',
      desc: 'One master profile, infinite tailored versions. We sync your data across every submission.',
      bg: '#fff',
      border: '#E5E7EB',
      color: '#111827',
      descColor: '#6B7280',
      span: 1,
      preview: (
        <div className="mt-4 border-2 border-dashed rounded-lg p-3 text-center" style={{ borderColor: '#E5E7EB' }}>
          <p className="text-xs font-semibold" style={{ color: '#9CA3AF' }}>DROP NEW VERSION</p>
        </div>
      ),
    },
  ]

  return (
    <>
    <nav className='fixed top-0 w-full z-50 glass-nav shadow-sm'>
      <div className='max-w-auto mx-10 px-2 h-16 flex items-center justify-between'>
        <div className='text-xl font-bold tracking-tighter text-desc font-heading'>CareerTrack</div>
          <div className='flex items-center space-x-4'>
            <button className='secondary-cta font-semibold text-sm scale-85 secondary-cta-hover transition-all duration-300'>Login</button>
            <button className='primary-cta font-semibold text-sm scale-85 primary-cta-hover transition-all duration-300'>SignUp</button>
          </div>
      </div>
    </nav>

    <main className='pt-16'>
      
      {/* hero section */}
      <section className='max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-16 items-center'>
        <div className='space-y-8'>
          <h1 className='text-5xl md:text-7xl font-headline font-extrabold tracking-tighter leading-tight text-on-surface'>Track Your <span className='text-primary'>Career</span>. Land Better <span className='text-primary'>Oppurtunities</span>.</h1>
          <p className='text-xl text-desc max-w-lg leading-relaxed'>Manage applications, track progress, and stay ahead with a streamlined system designed to simplify your job search.</p>
          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <button className='primary-cta primary-cta-hover text-lg font-medium transition-all duration-300 scale-100 w-64'>Start Tracking</button>
          </div>
        </div>

        {/* Hero image */}
        <div className='relative h-125 hidden md:block'>
          {/* card 1 */}
          <div className='absolute top-0 right-0 w-72 p-4 bg-white rounded-xl shadow-2xl z-20 border border-[#c2c6d6]/10'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                <MdWork className='text-primary'/>
              </div>
              <div>
                <div className='text-sm font-bold'>Frontend Developer</div>
                <div className='text-[10px] text-desc/50 font-label uppercase'>Linear . Applied</div>
              </div>
            </div>
            <div className='h-2 w-full bg-surface-variant rounded-full overflow-hidden'>
              <div className='h-full bg-primary w-3/4'></div>
            </div>
            <div className='mt-2 text-[10px] text-right font-medium text-primary'>Interview Scheduled</div>
          </div>
          {/* card 2 */}
          <div className='absolute top-1/3 -left-10 w-64 p-4 bg-white rounded-xl shadow-2xl z-10 border border-[#c2c6d6]/10 transform -rotate-3'>
            <div className='flex justify-between items-start mb-4'>
              <div className='text-xs font-bold text-desc'>Daily Activity</div>
              <IoIosTrendingUp/>
            </div>
            <div className='flex gap-1 h-20 items-end'>
              <div className='w-full bg-primary/20 h-1/2 rounded-t-sm'></div>
              <div className='w-full bg-primary/40 h-3/4 rounded-t-sm'></div>
              <div className='w-full bg-primary h-full rounded-t-sm'></div>
              <div className='w-full bg-primary/60 h-2/3 rounded-t-sm'></div>
              <div className='w-full bg-primary/30 h-1/3 rounded-t-sm'></div>
            </div>
          </div>
          {/* card 3 */}
          <div className='absolute bottom-10 right-5 w-80 p-6 bg-white rounded-xl shadow-2xl z-30 border border-[#c2c6d6]/10 transform rotate-2'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 rounded-full overflow-hidden bg-surface'>
                <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" data-alt="Profile-picture" />
              </div>
              <div>
                <div className='font-bold text-base'>Albert Dera</div>
                <div className='text-xs text-desc/50'>Tracked 14 applications today</div>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='p-2 bg-surface-variant/50 rounded-lg text-[11px] font-medium flex items-center gap-2'>
                <FaCircleCheck className='text-primary'/>
                <span>Resume optimized for ATS</span>
              </div>
              <div className='p-2 bg-surface-variant/50 rounded-lg text-[11px] font-medium flex items-center gap-2'>
                <FaCircleCheck className='text-primary'/>
                <span>3 New insights from AI assistant</span>
              </div>
            </div>
          </div>
          <div classname="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
        </div>
      </section>
    </main>
    </>
  )
}

export default Landing