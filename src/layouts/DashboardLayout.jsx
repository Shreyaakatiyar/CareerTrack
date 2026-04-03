import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideNavbar from '../components/SideNavbar'
import { useAuth } from '../context/AuthContext'

const DashboardLayout = () => {
  const { user } = useAuth()
  const location = useLocation()

  // Determine which nav item is active based on current path
  const getActiveNav = () => {
    if (location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/')) {
      const segment = location.pathname.split('/')[2] || 'dashboard'
      return segment === '' ? 'dashboard' : segment
    }
    return 'dashboard'
  }

  return (
    <div className="relative">
      <SideNavbar activeRoute={getActiveNav()} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
