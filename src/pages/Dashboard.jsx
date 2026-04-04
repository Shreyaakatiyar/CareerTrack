import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle, IoIosNotifications } from "react-icons/io";

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <section className='md:ml-64 min-h-screen'>
      <header className='sticky top-0 z-50 w-full bg-white backdrop-blur-md shadow-sm text-sm font-medium tracking-tight'>
        <div className='flex items-center justify-between px-6 py-3 w-full'>
          <div className='flex items-center gap-4'>
            <div className='relative group'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400'>
                <IoSearch className='text-lg'/>
              </span>
              <input class="bg-[#f2f6fa] border-none rounded-full pl-10 pr-4 py-2 w-64 focus:ring-2 focus:ring-primary/10 transition-all text-sm" placeholder="Search applications..." type="text"/>
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
    </section>
  )
}

export default Dashboard