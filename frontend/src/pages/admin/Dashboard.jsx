import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  EnvelopeIcon,
  UsersIcon,
  EyeIcon,
  PlusIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: { total: 12, recent: 3 },
    services: { total: 6, active: 6 },
    contacts: { total: 28, unread: 5 },
    users: { total: 3, active: 2 }
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'contact',
      message: 'New contact inquiry from John Smith',
      time: '2 hours ago',
      status: 'new'
    },
    {
      id: 2,
      type: 'blog',
      message: 'Blog post "Tax Planning for 2025" was published',
      time: '1 day ago',
      status: 'published'
    },
    {
      id: 3,
      type: 'service',
      message: 'Service "SOX Compliance" was updated',
      time: '2 days ago',
      status: 'updated'
    },
    {
      id: 4,
      type: 'contact',
      message: 'Contact inquiry resolved for ABC Corp',
      time: '3 days ago',
      status: 'resolved'
    }
  ]);

  const quickActions = [
    {
      name: 'Create New Blog Post',
      href: '/admin/blogs/new',
      icon: DocumentTextIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Add New Service',
      href: '/admin/services/new',
      icon: WrenchScrewdriverIcon,
      color: 'bg-green-500'
    },
    {
      name: 'View Contact Inquiries',
      href: '/admin/contacts',
      icon: EnvelopeIcon,
      color: 'bg-yellow-500'
    },
    {
      name: 'Manage Users',
      href: '/admin/users',
      icon: UsersIcon,
      color: 'bg-purple-500'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'blog':
        return DocumentTextIcon;
      case 'service':
        return WrenchScrewdriverIcon;
      case 'contact':
        return EnvelopeIcon;
      default:
        return DocumentTextIcon;
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'new':
        return 'text-blue-600 bg-blue-100';
      case 'published':
        return 'text-green-600 bg-green-100';
      case 'updated':
        return 'text-yellow-600 bg-yellow-100';
      case 'resolved':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to your admin dashboard. Here's what's happening with your website.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Blog Posts</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.blogs.total}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/blogs" className="font-medium text-primary-700 hover:text-primary-900">
                View all posts
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <WrenchScrewdriverIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Services</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.services.total}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/services" className="font-medium text-primary-700 hover:text-primary-900">
                Manage services
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <EnvelopeIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Contact Inquiries</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.contacts.total}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/contacts" className="font-medium text-primary-700 hover:text-primary-900">
                {stats.contacts.unread} unread inquiries
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.users.total}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/users" className="font-medium text-primary-700 hover:text-primary-900">
                Manage users
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className="flex items-center p-3 text-sm font-medium text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <div className={`flex-shrink-0 p-2 rounded-md ${action.color}`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3">{action.name}</span>
                  <PlusIcon className="ml-auto h-5 w-5 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivity.map((activity, activityIdx) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivity.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActivityColor(activity.status)}`}>
                              <Icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">{activity.message}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                to="/admin/analytics"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ChartBarIcon className="h-5 w-5 mr-2 text-gray-400" />
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Website Overview */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Website Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <dt className="text-sm font-medium text-gray-500">This Month's Visits</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">1,247</dd>
              <dd className="mt-1 text-sm text-green-600">+12% from last month</dd>
            </div>
            <div className="text-center">
              <dt className="text-sm font-medium text-gray-500">Page Views</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">4,891</dd>
              <dd className="mt-1 text-sm text-green-600">+8% from last month</dd>
            </div>
            <div className="text-center">
              <dt className="text-sm font-medium text-gray-500">Conversion Rate</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">3.2%</dd>
              <dd className="mt-1 text-sm text-red-600">-2% from last month</dd>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <EyeIcon className="h-5 w-5 mr-2 text-gray-400" />
              View Live Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}