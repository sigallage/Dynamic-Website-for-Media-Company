import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAuthData, clearAuthData } from '../utils/auth';
import '../styles/adminLayout.css';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  EnvelopeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PowerIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Blogs', href: '/admin/blogs', icon: DocumentTextIcon, badge: 12 },
  { name: 'Services', href: '/admin/services', icon: WrenchScrewdriverIcon },
  { name: 'Contacts', href: '/admin/contacts', icon: EnvelopeIcon, badge: 5 },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const getInitials = (name) => {
  if (!name) return 'A';
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const authData = getAuthData();
  const user = authData?.user || {};

  const handleLogout = () => {
    clearAuthData();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Mobile menu */}
      <div className={`admin-mobile-overlay ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        
        <div className="admin-sidebar">
          <div className="admin-close-btn">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          
          <div className="admin-sidebar-header">
            <div className="admin-sidebar-logo">
              <BuildingOfficeIcon className="h-4 w-4" />
            </div>
            <h1 className="admin-sidebar-title">Elite Audit</h1>
          </div>
          
          <nav className="admin-nav">
            <div className="admin-nav-list">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    'admin-nav-item',
                    location.pathname === item.href ? 'active' : 'inactive'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="admin-nav-icon" />
                  {item.name}
                  {item.badge && (
                    <span className="admin-nav-badge">{item.badge}</span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="admin-sidebar-desktop">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="admin-sidebar-header">
            <div className="admin-sidebar-logo">
              <BuildingOfficeIcon className="h-4 w-4" />
            </div>
            <h1 className="admin-sidebar-title">Elite Audit</h1>
          </div>
          
          <nav className="admin-nav">
            <div className="admin-nav-list">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    'admin-nav-item',
                    location.pathname === item.href ? 'active' : 'inactive'
                  )}
                >
                  <item.icon className="admin-nav-icon" />
                  {item.name}
                  {item.badge && (
                    <span className="admin-nav-badge">{item.badge}</span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="admin-main-content">
        {/* Top navigation */}
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
          
          <div className="admin-topbar-content">
            <div className="admin-topbar-left">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  {/* Search functionality can be added here */}
                </div>
              </div>
            </div>
            
            <div className="admin-topbar-right">
              <div className="admin-user-profile">
                <div className="admin-user-welcome">
                  <div className="admin-user-avatar">
                    {getInitials(user.name || user.email)}
                  </div>
                  <span>Welcome, {user.name || user.email?.split('@')[0] || 'Admin'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="admin-logout-btn"
                  title="Logout"
                >
                  <PowerIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="admin-page-content">
          <div className="admin-content-wrapper">
            <div className="admin-content-container">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}