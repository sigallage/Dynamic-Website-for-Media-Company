import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/adminDashboard.css';
import {
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  EnvelopeIcon,
  UsersIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats] = useState({
    blogs: { total: 12, recent: 3 },
    services: { total: 6, active: 6 },
    contacts: { total: 28, unread: 5 },
    users: { total: 3, active: 2 }
  });

  const [analytics] = useState({
    totalVisits: { value: 12470, change: 12.5, trending: 'up' },
    pageViews: { value: 48910, change: 8.3, trending: 'up' },
    uniqueVisitors: { value: 8340, change: 15.2, trending: 'up' },
    bounceRate: { value: 32.5, change: -5.8, trending: 'down' }
  });

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="admin-dashboard">
      {/* Dashboard Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your website.</p>
        </div>
        <div className="admin-dashboard-actions">
          <button className="admin-btn admin-btn-primary">
            <PlusIcon className="admin-btn-icon" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="admin-analytics-section">
        <div className="admin-section-header">
          <h2>Website Analytics</h2>
          <p>Your website performance overview</p>
        </div>
        
        <div className="admin-analytics-grid">
          <div className="admin-analytics-card">
            <div className="admin-analytics-header">
              <h3>TOTAL VISITS</h3>
              <div className="admin-analytics-trend up">
                <ArrowTrendingUpIcon className="trend-icon" />
              </div>
            </div>
            <div className="admin-analytics-number">
              {formatNumber(analytics.totalVisits.value)}
            </div>
            <div className="admin-analytics-change positive">
              {analytics.totalVisits.change}% vs last month
            </div>
          </div>

          <div className="admin-analytics-card">
            <div className="admin-analytics-header">
              <h3>PAGE VIEWS</h3>
              <div className="admin-analytics-trend up">
                <ArrowTrendingUpIcon className="trend-icon" />
              </div>
            </div>
            <div className="admin-analytics-number">
              {formatNumber(analytics.pageViews.value)}
            </div>
            <div className="admin-analytics-change positive">
              {analytics.pageViews.change}% vs last month
            </div>
          </div>

          <div className="admin-analytics-card">
            <div className="admin-analytics-header">
              <h3>UNIQUE VISITORS</h3>
              <div className="admin-analytics-trend up">
                <ArrowTrendingUpIcon className="trend-icon" />
              </div>
            </div>
            <div className="admin-analytics-number">
              {formatNumber(analytics.uniqueVisitors.value)}
            </div>
            <div className="admin-analytics-change positive">
              {analytics.uniqueVisitors.change}% vs last month
            </div>
          </div>

          <div className="admin-analytics-card">
            <div className="admin-analytics-header">
              <h3>BOUNCE RATE</h3>
              <div className="admin-analytics-trend down">
                <ArrowTrendingDownIcon className="trend-icon" />
              </div>
            </div>
            <div className="admin-analytics-number">
              {analytics.bounceRate.value}%
            </div>
            <div className="admin-analytics-change negative">
              {Math.abs(analytics.bounceRate.change)}% vs last month
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper blogs">
            <DocumentTextIcon className="admin-stat-icon" />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-header">
              <h3>Blog Posts</h3>
            </div>
            <div className="admin-stat-numbers">
              <span className="admin-stat-main">{stats.blogs.total}</span>
              <span className="admin-stat-sub">{stats.blogs.recent} this week</span>
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper services">
            <WrenchScrewdriverIcon className="admin-stat-icon" />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-header">
              <h3>Services</h3>
            </div>
            <div className="admin-stat-numbers">
              <span className="admin-stat-main">{stats.services.total}</span>
              <span className="admin-stat-sub">{stats.services.active} active</span>
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper contacts">
            <EnvelopeIcon className="admin-stat-icon" />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-header">
              <h3>Contacts</h3>
            </div>
            <div className="admin-stat-numbers">
              <span className="admin-stat-main">{stats.contacts.total}</span>
              <span className="admin-stat-sub">{stats.contacts.unread} unread</span>
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper users">
            <UsersIcon className="admin-stat-icon" />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-header">
              <h3>Users</h3>
            </div>
            <div className="admin-stat-numbers">
              <span className="admin-stat-main">{stats.users.total}</span>
              <span className="admin-stat-sub">{stats.users.active} active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="admin-content-grid">
        <div className="admin-section">
          <div className="admin-section-header">
            <h2>Quick Actions</h2>
            <p>Common tasks and shortcuts</p>
          </div>
          <div className="admin-quick-actions-grid">
            <Link to="/admin/blogs" className="admin-quick-action blue">
              <div className="admin-quick-action-icon">
                <DocumentTextIcon className="admin-icon" />
              </div>
              <div className="admin-quick-action-content">
                <h4>New Blog Post</h4>
                <p>Create a new blog article</p>
              </div>
            </Link>
            
            <Link to="/admin/services" className="admin-quick-action green">
              <div className="admin-quick-action-icon">
                <WrenchScrewdriverIcon className="admin-icon" />
              </div>
              <div className="admin-quick-action-content">
                <h4>Add Service</h4>
                <p>Add a new service offering</p>
              </div>
            </Link>
            
            <Link to="/admin/contacts" className="admin-quick-action purple">
              <div className="admin-quick-action-icon">
                <EnvelopeIcon className="admin-icon" />
              </div>
              <div className="admin-quick-action-content">
                <h4>View Contacts</h4>
                <p>Manage contact inquiries</p>
              </div>
            </Link>
            
            <Link to="/admin/analytics" className="admin-quick-action orange">
              <div className="admin-quick-action-icon">
                <ChartBarIcon className="admin-icon" />
              </div>
              <div className="admin-quick-action-content">
                <h4>Analytics</h4>
                <p>View detailed analytics</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
