import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'
import { RiDashboardFill } from "react-icons/ri";
import { IoIosListBox } from "react-icons/io";
import { MdLogout, MdPsychology } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";

const SideNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: RiDashboardFill, path: "/dashboard" },
    { id: "applications", label: "Applications", icon: IoIosListBox, path: "/dashboard/applications" },
    { id: "analytics", label: "Analytics", icon: IoAnalyticsSharp, path: "/dashboard/analytics" },
    { id: "insights", label: "AI Insights", icon: MdPsychology, path: "/dashboard/insights" },
  ];

  const getActiveNav = () => {
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
      return 'dashboard';
    }
    const segment = location.pathname.split('/')[2];
    return segment || 'dashboard';
  };

  const activeNav = getActiveNav();

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-200 text-sm font-medium z-40 shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-6">
          <h1 className="font-heading font-extrabold text-blue-600 text-2xl tracking-tighter">
            CareerTrack
          </h1>
          <p className="text-xs text-gray-500 font-medium tracking-widest uppercase mt-2">
            Job Tracker
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`text-lg shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                />
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section & Logout */}
        <div className="border-t border-gray-200 px-4 py-4 space-y-3">
          {user && (
            <div className="px-2 py-2">
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Logged in as
              </p>
              <p className="text-gray-900 font-semibold truncate mt-1">
                {user.email}
              </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 ease-in-out group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdLogout className="text-lg shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span className="flex-1 text-left">
              {loading ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar