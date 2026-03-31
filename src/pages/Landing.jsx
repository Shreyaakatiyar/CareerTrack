import React, { useState, useEffect } from 'react'

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
      border: '#E5E7EB',
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
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#ffffff', color: '#111827' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-sticky { position: sticky; top: 0; z-index: 50; transition: box-shadow 0.2s, background 0.2s; }
        .nav-scrolled { background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); box-shadow: 0 1px 0 #e5e7eb; }
        .btn-primary { background: #0052cc; color: #fff; border: none; cursor: pointer; font-family: inherit; font-weight: 600; transition: background 0.15s, transform 0.1s; }
        .btn-primary:hover { background: #0041a3; transform: translateY(-1px); }
        .btn-outline { background: transparent; color: #374151; border: 1.5px solid #d1d5db; cursor: pointer; font-family: inherit; font-weight: 600; transition: background 0.15s, transform 0.1s; }
        .btn-outline:hover { background: #f9fafb; transform: translateY(-1px); }
        .feature-card { transition: transform 0.2s, box-shadow 0.2s; }
        .feature-card:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
        .job-row { transition: background 0.15s; }
        .job-row:hover { background: #f9fafb; }
        .fade-in { animation: fadeIn 0.6s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-1 { animation-delay: 0.1s; }
        .fade-in-2 { animation-delay: 0.2s; }
        .fade-in-3 { animation-delay: 0.35s; }
      `}</style>

      {/* Nav */}
      <nav className={`nav-sticky ${scrolled ? 'nav-scrolled' : ''}`} style={{ background: scrolled ? undefined : '#fff', borderBottom: scrolled ? undefined : '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: '#0052cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/>
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>ApplyFlow</span>
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            {['Product','Features','Pricing'].map(l => (
              <a key={l} href="#" style={{ fontSize: 14, fontWeight: 500, color: '#6B7280', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#111827'}
                onMouseLeave={e => e.target.style.color = '#6B7280'}
              >{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-outline" style={{ padding: '8px 18px', borderRadius: 9, fontSize: 14 }} onClick={() => navigate('/login')}>Login</button>
            <button className="btn-primary" style={{ padding: '8px 18px', borderRadius: 9, fontSize: 14 }} onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div className="fade-in fade-in-1">
            <p style={{ fontSize: 11, fontWeight: 700, color: '#0052cc', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>✦</span> THE FUTURE OF JOB TRACKING
            </p>
            <h1 style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.1, color: '#0A0A0A', marginBottom: 22, letterSpacing: '-0.02em' }}>
              Work on what<br />matters.
            </h1>
            <p style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
              The intentional curator for your career. Manage applications, track progress, and land your next role with surgical precision.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-primary" style={{ padding: '12px 24px', borderRadius: 10, fontSize: 15 }} onClick={() => navigate('/signup')}>
                Get Started for Free
              </button>
              <button className="btn-outline" style={{ padding: '12px 24px', borderRadius: 10, fontSize: 15 }} onClick={() => navigate('/login')}>
                Book a Demo
              </button>
            </div>
          </div>

          {/* App Preview Card */}
          <div className="fade-in fade-in-2" style={{ background: '#F8FAFC', border: '1.5px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 4px 40px rgba(0,0,0,0.06)' }}>
            {/* Window chrome */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F87171', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FCD34D', display: 'inline-block' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
              <div style={{ flex: 1, marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Active Applications</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    <svg key="s" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
                    <svg key="f" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg>
                  ]}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {jobs.map((job, i) => (
                <div key={i} className="job-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#fff', borderRadius: 12, border: '1px solid #F3F4F6', cursor: 'pointer' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: job.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                    {job.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{job.title}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{job.company}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: job.statusColor, background: job.statusBg, padding: '3px 9px', borderRadius: 6, display: 'block' }}>{job.status.toUpperCase()}</span>
                    <p style={{ fontSize: 10, color: '#D1D5DB', marginTop: 3 }}>{job.ago}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 14 }}>
              {[['12', 'Applied'],['4', 'Interviews'],['1', 'Offer']].map(([n, l]) => (
                <div key={l} style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{n}</p>
                  <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 1 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools / Bento Grid */}
      <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 14 }}>Tools designed for focus.</h2>
            <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
              Stop managing spreadsheets. Start managing your future with our unified application ecosystem.
            </p>
          </div>

          {/* Bento grid — row 1: Kanban (1) + AI (2), row 2: Analytics (1) + Resume (1) + empty(1) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {/* Kanban Pipeline */}
            <div className="feature-card" style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 18, padding: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0052cc', marginBottom: 14 }}>
                {features[0].icon}
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Kanban Pipeline</p>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{features[0].desc}</p>
              <a href="#" style={{ display: 'inline-block', marginTop: 16, fontSize: 13, fontWeight: 600, color: '#0052cc', textDecoration: 'none' }}>Explore Pipeline →</a>
              {features[0].preview}
            </div>

            {/* AI Insights — spans 2 cols */}
            <div className="feature-card" style={{ background: '#0052cc', borderRadius: 18, padding: 24, gridColumn: 'span 2' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 14 }}>⚡</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>AI Insights</p>
              <p style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.6, maxWidth: 280 }}>{features[1].desc}</p>
              <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '14px 16px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#bfdbfe', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Job Fit Analysis</p>
                <p style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginTop: 4, letterSpacing: '-0.02em' }}>94% Match</p>
                <p style={{ fontSize: 12, color: '#bfdbfe', marginTop: 4 }}>Focus on your experience with "System Scalability" to stand out.</p>
              </div>
            </div>

            {/* Smart Analytics */}
            <div className="feature-card" style={{ background: '#D97706', borderRadius: 18, padding: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 14 }}>
                {features[2].icon}
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Smart Analytics</p>
              <p style={{ fontSize: 13, color: '#fef3c7', lineHeight: 1.6 }}>{features[2].desc}</p>
              {features[2].preview}
            </div>

            {/* Resume Management */}
            <div className="feature-card" style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 18, padding: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0052cc', marginBottom: 14 }}>
                {features[3].icon}
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Resume Management</p>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{features[3].desc}</p>
              {features[3].preview}
            </div>

            {/* Empty / decorative card */}
            <div style={{ background: '#F3F4F6', borderRadius: 18, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: 13, color: '#D1D5DB', fontWeight: 600, textAlign: 'center' }}>More tools<br/>coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kanban Board Section */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#0052cc', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>THE KANBAN BOARD</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 20 }}>Visualize your trajectory.</h2>
            <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.7, marginBottom: 24 }}>
              Our "nested" Kanban layout mimics physical trays, giving your brain a tangible sense of progress. Drag, drop, and refine your pipeline with ease.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {['Custom column stages','Automated status tracking','Bulk application actions'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0052cc', flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: '#374151' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kanban preview */}
          <div style={{ background: '#F8FAFC', border: '1.5px solid #E5E7EB', borderRadius: 20, padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['Applied', 'Interview', 'Offer', 'Rejected'].map((col, i) => (
              <div key={col} style={{ background: '#fff', border: '1.5px solid #F3F4F6', borderRadius: 12, padding: 12 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {Array.from({ length: [3,2,1,1][i] }).map((_, j) => (
                    <div key={j} style={{ height: 28, borderRadius: 8, background: '#F9FAFB', border: '1px solid #F3F4F6' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1100, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ background: '#0052cc', borderRadius: 24, padding: '72px 48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Ready to curate your next move?</h2>
          <p style={{ fontSize: 16, color: '#bfdbfe', marginBottom: 32, maxWidth: 460, margin: '0 auto 32px' }}>
            Join thousands of professionals who have simplified their search with ApplyFlow.
          </p>
          <button
            className="btn-primary"
            style={{ padding: '14px 32px', borderRadius: 12, fontSize: 15, background: '#fff', color: '#0052cc' }}
            onMouseEnter={e => e.target.style.background = '#EFF6FF'}
            onMouseLeave={e => e.target.style.background = '#fff'}
            onClick={() => navigate('/signup')}
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #E5E7EB', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 32 }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 6 }}>ApplyFlow</p>
              <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6 }}>© 2024 ApplyFlow. The intentional curator for your career.</p>
            </div>
            {[
              { title: 'Product', links: ['Features','Pricing','Careers'] },
              { title: 'Company', links: ['Privacy','Terms','Support'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p style={{ fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 12 }}>{title}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none' }}
                      onMouseEnter={e => e.target.style.color = '#111827'}
                      onMouseLeave={e => e.target.style.color = '#6B7280'}
                    >{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>ApplyFlow © 2024. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Twitter','LinkedIn'].map(s => (
                <a key={s} href="#" style={{ fontSize: 12, color: '#9CA3AF', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#374151'}
                  onMouseLeave={e => e.target.style.color = '#9CA3AF'}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing