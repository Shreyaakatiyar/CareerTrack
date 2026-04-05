import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle, IoIosNotifications } from "react-icons/io";
import { TbFileDescriptionFilled } from "react-icons/tb";
import { MdForum, MdCancel } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import ApplicationTrendChart from '../components/ApplicationTrendChart'
import ApplicationStatusChart from '../components/ApplicationStatusChart'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

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
              <input class="bg-[#f2f6fa] border-none rounded-full pl-10 pr-4 py-2 w-100 focus:ring-2 focus:ring-primary/10 transition-all text-sm" placeholder="Search applications..." type="text"/>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <button className='p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors active:scale-95'>
              <IoIosNotifications className='h-5 w-5 cursor-pointer'/>
            </button>
            <button className='p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors active:scale-95'>
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
        <div className='mb-12'>
          <h2 className="font-heading text-3xl font-extrabold text-desc tracking-tight mb-2">Track your applications efficiently</h2>
          <p className="text-desc/60 text-md">Good morning, Alex. You have 3 interviews scheduled for this week.</p>
        </div>

        {/* stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
          {/* applications */}
          <div className='bg-white p-6 rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] hover:scale-[1.02] transition-transform'>
            <div className='flex justify-between items-start mb-4'>
              <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
                <TbFileDescriptionFilled/>
              </div>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p class="text-desc text-sm font-medium mb-1">Total Applications</p>
            <p class="font-heading text-3xl font-bold">128</p> 
          </div>
          {/* interviews  */}
          <div className='bg-white p-6 rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] hover:scale-[1.02] transition-transform'>
            <div className='flex justify-between items-start mb-4'>
              <div className='p-2 bg-purple-50 text-purple-600 rounded-lg'>
                <MdForum/>
              </div>
              <span class="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Active</span>
            </div>
            <p class="text-desc text-sm font-medium mb-1">Interviews</p>
            <p class="font-heading text-3xl font-bold">14</p> 
          </div>
          {/* rejections */}
          <div className='bg-white p-6 rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] hover:scale-[1.02] transition-transform'>
            <div className='flex justify-between items-start mb-4'>
              <div className='p-2 bg-rose-50 text-rose-600 rounded-lg'>
                <MdCancel/>
              </div>
            </div>
            <p class="text-desc text-sm font-medium mb-1">Rejections</p>
            <p class="font-heading text-3xl font-bold">42</p> 
          </div>
          {/* offers */}
          <div className='bg-white p-6 rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] hover:scale-[1.02] transition-transform'>
            <div className='flex justify-between items-start mb-4'>
              <div className='p-2 bg-primary/10 text-primary rounded-lg'>
                <FaStar/>
              </div>
              <span class="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">New!</span>
            </div>
            <p class="text-desc text-sm font-medium mb-1">Offers</p>
            <p class="font-heading text-3xl font-bold">2</p> 
          </div>
        </div>

        {/* charts and analytics */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
          {/* trend line chart */}
          <div className='lg:col-span-2 bg-white p-8 rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)]'>
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
              <ApplicationTrendChart />
            </div>
          </div>

          {/* status doughnut chart */}
          <div className='bg-white p-8 rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)]'>
            <div className='mb-8'>
              <h3 className="font-heading text-xl font-bold">Application Status</h3>
              <p className="text-desc text-sm">Summary of all applications</p>
            </div>
            <div className='h-64'>
              <ApplicationStatusChart />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Dashboard