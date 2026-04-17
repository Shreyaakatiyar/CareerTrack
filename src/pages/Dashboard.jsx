import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle, IoIosNotifications } from "react-icons/io";
import { TbFileDescriptionFilled } from "react-icons/tb";
import { MdForum, MdCancel, MdEdit, MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { useState } from 'react'
import ApplicationTrendChart from '../components/ApplicationTrendChart'
import ApplicationStatusChart from '../components/ApplicationStatusChart'
import AddApplicationModal from '../components/AddApplicationModal'
import { useApplications } from '../context/ApplicationsContext'
import { IoMdMore } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingApp, setEditingApp] = useState(null)
  const { addApplication, applications, updateApplication, deleteApplication } = useApplications()

  // Filter applications based on search query
  const filteredApplications = applications.filter(app => {
    const query = searchQuery.toLowerCase()
    return (
      app.companyName.toLowerCase().includes(query) ||
      app.jobRole.toLowerCase().includes(query)
    )
  })

  // Calculate stats from real data
  const totalApplications = applications.length
  const interviews = applications.filter(app => app.status === 'Interviewing').length
  const rejections = applications.filter(app => app.status === 'Rejected').length
  const offers = applications.filter(app => app.status === 'Offer').length

  return (
    <>
    <section className='md:ml-64 min-h-screen'>
      <header className='sticky top-0 z-50 w-full bg-white backdrop-blur-md shadow-sm text-sm font-medium tracking-tight'>
        <div className='flex items-center justify-between px-6 py-3 w-full'>
          <div className='flex items-center gap-4'>
            <div className='relative group'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400'>
                <IoSearch className='text-lg'/>
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#f2f6fa] border-none rounded-full pl-10 pr-4 py-2 w-100 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                placeholder="Search applications..."
                type="text"
              />
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <button className='p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors active:scale-95'>
              <IoIosNotifications className='h-5 w-5 cursor-pointer'/>
            </button>
            <button onClick={() => setIsModalOpen(true)} className='p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors active:scale-95'>
              <IoIosAddCircle className='h-5 w-5 cursor-pointer'/>
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden ml-2 border border-slate-100 cursor-pointer hover:shadow-lg transition-shadow hover:scale-110 transform duration-200" onClick={() => navigate('/dashboard/profile')}>
              <img alt="User profile avatar" className="h-full w-full object-cover" data-alt="Professional male headshot portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAllt-xhTe3g03jrm0XTBYkB50f4tNaK3dIXNHiHpr6O99Xy8TpQGM6A2Cn54Qlj_AwK3JgRFlOktrbRovPkQH-uuNpwc3MqoY-xGcaBy-H5aFhlcHrxY_cNIXPwyTaoX2TpdBxS9iL6ylcnExFt7edjrUfyF6_S28VSY3zux2qVMvMevr_55U9676HprCruNoo_Bsu3Ne_59MFMKbZgOATfBwBy12So70wakT1ho31MXgKOJmtVTWiR5LJ9spKEE-tzmYaBU0fQ4s"/>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 h-px"></div>
      </header>
      <div className='px-10 py-10 max-w-7xl mx-auto'>
        {searchQuery ? (
          // Search Results View
          <div>
            <div className='mb-8 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <button 
                  onClick={() => setSearchQuery('')}
                  className='p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-600'
                  title="Go back to dashboard"
                >
                  <MdArrowBack className='text-xl' />
                </button>
                <div>
                  <h2 className="font-heading text-2xl font-extrabold text-desc">Search Results</h2>
                  <p className="text-desc/60 text-sm">Found {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} matching "{searchQuery}"</p>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] overflow-hidden'>
              <div className='divide-y divide-slate-50'>
                {filteredApplications.length === 0 ? (
                  <div className="px-8 py-12 text-center">
                    <p className="text-slate-500 text-sm">No applications found matching "{searchQuery}"</p>
                  </div>
                ) : (
                  filteredApplications.map((app) => {
                    const statusColors = {
                      'Applied': 'bg-blue-100 text-blue-800',
                      'Interviewing': 'bg-purple-100 text-purple-800',
                      'Offer': 'bg-green-100 text-green-800',
                      'Rejected': 'bg-red-100 text-red-800'
                    }
                    
                    const formatDate = (dateString) => {
                      const date = new Date(dateString)
                      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    }

                    return (
                      <div key={app.id} className='px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors'>
                        <div className='flex items-center gap-6 flex-1'>
                          <div className="h-12 w-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-xl shadow-sm border border-blue-200 flex items-center justify-center text-white font-bold text-lg">
                            {app.companyName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-on-surface">{app.jobRole}</h4>
                            <p className="text-on-surface-variant text-sm">{app.companyName}</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-8'>
                          <div className="text-right">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Applied Date</p>
                            <p className="text-sm text-desc">{formatDate(app.dateApplied)}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}`}>
                            {app.status}
                          </span>
                          <div className='flex items-center gap-2'>
                            <button 
                              onClick={() => {
                                setEditingApp(app)
                                setIsModalOpen(true)
                              }}
                              className='p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors'
                              title="Edit application"
                            >
                              <MdEdit className='text-lg' />
                            </button>
                            <button 
                              onClick={async () => {
                                if (window.confirm('Delete this application?')) {
                                  await deleteApplication(app.id)
                                }
                              }}
                              className='p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors'
                              title="Delete application"
                            >
                              <MdDelete className='text-lg' />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          // Normal Dashboard View
          <div>
            <div className='mb-12'>
              <h2 className="font-heading text-3xl font-bold text-desc tracking-tight mb-2">Track your applications efficiently</h2>
              <p className="text-desc/60 text-md">Good morning, {user?.displayName || 'there'}. You have {interviews} interviews scheduled.</p>
            </div>

            {/* stats */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
              {/* applications */}
              <div className='bg-white p-6 rounded-2xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] hover:scale-[1.02] transition-transform'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
                    <TbFileDescriptionFilled/>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Active</span>
                </div>
                <p className="text-desc text-sm font-medium mb-1">Total Applications</p>
                <p className="font-heading text-3xl font-bold">{totalApplications}</p> 
              </div>
              {/* interviews  */}
              <div className='bg-white p-6 rounded-2xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] hover:scale-[1.02] transition-transform'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='p-2 bg-purple-50 text-purple-600 rounded-lg'>
                    <MdForum/>
                  </div>
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Active</span>
                </div>
                <p className="text-desc text-sm font-medium mb-1">Interviews</p>
                <p className="font-heading text-3xl font-bold">{interviews}</p> 
              </div>
              {/* rejections */}
              <div className='bg-white p-6 rounded-2xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] hover:scale-[1.02] transition-transform'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='p-2 bg-rose-50 text-rose-600 rounded-lg'>
                    <MdCancel/>
                  </div>
                </div>
                <p className="text-desc text-sm font-medium mb-1">Rejections</p>
                <p className="font-heading text-3xl font-bold">{rejections}</p> 
              </div>
              {/* offers */}
              <div className='bg-white p-6 rounded-2xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] hover:scale-[1.02] transition-transform'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='p-2 bg-primary/10 text-primary rounded-lg'>
                    <FaStar/>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">New!</span>
                </div>
                <p className="text-desc text-sm font-medium mb-1">Offers</p>
                <p className="font-heading text-3xl font-bold">{offers}</p> 
              </div>
            </div>

            {/* charts and analytics */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
              {/* trend line chart */}
              <div className='lg:col-span-2 bg-white p-8 rounded-2xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)]'>
                <div className='flex items-center justify-between mb-8'>
                  <div>
                    <h3 className="font-heading text-xl font-bold">Application Trends</h3>
                    <p className="text-desc text-sm">Monthly submission activity</p>
                  </div>
                  <select className="px-2 py-2 bg-neutral-100 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
                <div className='h-64 flex items-end justify-between gap-4 px-2'>
                  <ApplicationTrendChart applications={applications} />
                </div>
              </div>

              {/* status doughnut chart */}
              <div className='bg-white p-8 rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)]'>
                <div className='mb-8'>
                  <h3 className="font-heading text-xl font-bold">Application Status</h3>
                  <p className="text-desc text-sm">Summary of all applications</p>
                </div>
                <div className='h-64'>
                  <ApplicationStatusChart applications={applications} />
                </div>
              </div>
            </div>
            {/* recent applications */}
            <div className='bg-white rounded-2xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] overflow-hidden'>
              <div className="px-8 py-6 flex items-center justify-between border-b border-slate-50">
                <h3 className="font-headline text-xl font-bold">Recent Applications</h3>
                <button onClick={() => navigate('/dashboard/applications')} className="text-primary text-sm font-semibold hover:underline cursor-pointer">View all applications</button>
              </div>
              <div className='divide-y divide-slate-50'>
                {applications.length === 0 ? (
                  <div className="px-8 py-12 text-center">
                    <p className="text-slate-500 text-sm">No applications yet. Add one to get started!</p>
                  </div>
                ) : (
                  applications
                    .slice()
                    .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
                    .slice(0, 3)
                    .map((app) => {
                      const statusColors = {
                        'Applied': 'bg-blue-100 text-blue-800',
                        'Interviewing': 'bg-purple-100 text-purple-800',
                        'Offer': 'bg-green-100 text-green-800',
                        'Rejected': 'bg-red-100 text-red-800'
                      }
                      
                      const formatDate = (dateString) => {
                        const date = new Date(dateString)
                        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                      }

                      return (
                        <div key={app.id} className='px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors'>
                          <div className='flex items-center gap-6 flex-1'>
                            <div className="h-12 w-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-xl shadow-sm border border-blue-200 flex items-center justify-center text-white font-bold text-lg">
                              {app.companyName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-bold text-on-surface">{app.jobRole}</h4>
                              <p className="text-on-surface-variant text-sm">{app.companyName}</p>
                            </div>
                          </div>
                          <div className='flex items-center gap-12'>
                            <div className="text-right">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Applied Date</p>
                              <p className="text-sm text-desc">{formatDate(app.dateApplied)}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}`}>
                              {app.status}
                            </span>
                          </div>
                        </div>
                      )
                    })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    <AddApplicationModal 
      isOpen={isModalOpen} 
      onClose={() => {
        setIsModalOpen(false)
        setEditingApp(null)
      }}
      editingApp={editingApp}
      onSave={async (formData) => {
        if (editingApp) {
          await updateApplication(editingApp.id, formData)
        } else {
          await addApplication(formData)
        }
        setIsModalOpen(false)
        setEditingApp(null)
      }}
    />
    </>
  )
}

export default Dashboard