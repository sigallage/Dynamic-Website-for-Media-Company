import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  EyeIcon,
  UsersIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import '../../styles/adminDashboard.css';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalVisits: 12470,
      pageViews: 48910,
      uniqueVisitors: 8340,
      bounceRate: 32.5,
      avgSessionDuration: '3:45'
    },
    trends: {
      visitsTrend: 12.5,
      pageViewsTrend: 8.3,
      visitorsTrend: 15.2,
      bounceTrend: -5.1
    },
    topPages: [
      { path: '/', title: 'Home', views: 15240, percentage: 31.2 },
      { path: '/services', title: 'Services', views: 8340, percentage: 17.1 },
      { path: '/about', title: 'About Us', views: 6120, percentage: 12.5 },
      { path: '/blog', title: 'Blog', views: 4980, percentage: 10.2 },
      { path: '/contact', title: 'Contact', views: 3890, percentage: 8.0 }
    ],
    contentStats: {
      blogPosts: 24,
      services: 6,
      contactInquiries: 89,
      publishedPosts: 18
    },
    recentActivity: [
      { type: 'blog', action: 'New blog post published', time: '2 hours ago' },
      { type: 'contact', action: '3 new contact inquiries', time: '4 hours ago' },
      { type: 'visitor', action: 'Peak traffic reached', time: '6 hours ago' },
      { type: 'service', action: 'Service pricing updated', time: '1 day ago' }
    ]
  });

  const getTrendIcon = (trend) => {
    return trend > 0 ? (
      <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
    );
  };

  const getTrendColor = (trend) => {
    return trend > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Analytics Dashboard</h1>
        <p className="admin-page-subtitle">
          Website performance and content analytics overview
        </p>
      </div>

      {/* Overview Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <h3>Total Visits</h3>
            <div className="admin-stat-icon blue">
              <EyeIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="admin-stat-numbers">
            <div className="admin-stat-main">
              {analyticsData.overview.totalVisits.toLocaleString()}
            </div>
            <div className="admin-stat-trend">
              {getTrendIcon(analyticsData.trends.visitsTrend)}
              <span className={`admin-trend-value ${analyticsData.trends.visitsTrend > 0 ? 'positive' : 'negative'}`}>
                {Math.abs(analyticsData.trends.visitsTrend)}%
              </span>
              <span className="admin-trend-label">vs last month</span>
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <h3>Page Views</h3>
            <div className="admin-stat-icon green">
              <ChartBarIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="admin-stat-numbers">
            <div className="admin-stat-main">
              {analyticsData.overview.pageViews.toLocaleString()}
            </div>
            <div className="admin-stat-trend">
              {getTrendIcon(analyticsData.trends.pageViewsTrend)}
              <span className={`admin-trend-value ${analyticsData.trends.pageViewsTrend > 0 ? 'positive' : 'negative'}`}>
                {Math.abs(analyticsData.trends.pageViewsTrend)}%
              </span>
              <span className="admin-trend-label">vs last month</span>
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <h3>Unique Visitors</h3>
            <div className="admin-stat-icon purple">
              <UsersIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="admin-stat-numbers">
            <div className="admin-stat-main">
              {analyticsData.overview.uniqueVisitors.toLocaleString()}
            </div>
            <div className="admin-stat-trend">
              {getTrendIcon(analyticsData.trends.visitorsTrend)}
              <span className={`admin-trend-value ${analyticsData.trends.visitorsTrend > 0 ? 'positive' : 'negative'}`}>
                {Math.abs(analyticsData.trends.visitorsTrend)}%
              </span>
              <span className="admin-trend-label">vs last month</span>
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <h3>Bounce Rate</h3>
            <div className="admin-stat-icon orange">
              <ArrowTrendingDownIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="admin-stat-numbers">
            <div className="admin-stat-main">
              {analyticsData.overview.bounceRate}%
            </div>
            <div className="admin-stat-trend">
              {getTrendIcon(analyticsData.trends.bounceTrend)}
              <span className={`admin-trend-value ${analyticsData.trends.bounceTrend > 0 ? 'negative' : 'positive'}`}>
                {Math.abs(analyticsData.trends.bounceTrend)}%
              </span>
              <span className="admin-trend-label">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-analytics-grid">
        {/* Top Pages */}
        <div className="admin-top-pages">
          <div className="admin-top-pages-header">
            <h3>Top Pages</h3>
          </div>
          <div className="admin-top-pages-content">
            {analyticsData.topPages.map((page, index) => (
              <div key={page.path} className="admin-page-item">
                <div className="admin-page-info">
                  <span className="admin-page-rank">
                    {index + 1}.
                  </span>
                  <div className="admin-page-details">
                    <div className="admin-page-title">
                      {page.title}
                    </div>
                    <div className="admin-page-path">{page.path}</div>
                  </div>
                </div>
                <div className="admin-page-stats">
                  <div className="admin-page-numbers">
                    <div className="admin-page-views">
                      {page.views.toLocaleString()}
                    </div>
                    <div className="admin-page-percentage">{page.percentage}%</div>
                  </div>
                  <div className="admin-page-progress">
                    <div
                      className="admin-page-progress-bar"
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Statistics */}
        <div className="admin-content-overview">
          <div className="admin-content-overview-header">
            <h3>Content Overview</h3>
          </div>
          <div className="admin-content-grid">
            <div className="admin-content-metric blog">
              <div className="admin-content-icon">
                <DocumentTextIcon className="h-8 w-8" />
              </div>
              <div className="admin-content-number">
                {analyticsData.contentStats.blogPosts}
              </div>
              <div className="admin-content-label">Total Blog Posts</div>
            </div>
            <div className="admin-content-metric service">
              <div className="admin-content-icon">
                <ChartBarIcon className="h-8 w-8" />
              </div>
              <div className="admin-content-number">
                {analyticsData.contentStats.services}
              </div>
              <div className="admin-content-label">Active Services</div>
            </div>
            <div className="admin-content-metric contact">
              <div className="admin-content-icon">
                <EnvelopeIcon className="h-8 w-8" />
              </div>
              <div className="admin-content-number">
                {analyticsData.contentStats.contactInquiries}
              </div>
              <div className="admin-content-label">Contact Inquiries</div>
            </div>
            <div className="admin-content-metric published">
              <div className="admin-content-icon">
                <EyeIcon className="h-8 w-8" />
              </div>
              <div className="admin-content-number">
                {analyticsData.contentStats.publishedPosts}
              </div>
              <div className="admin-content-label">Published Posts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-recent-activity">
        <h3>Recent Activity</h3>
        <div>
          {analyticsData.recentActivity.map((activity, index) => (
            <div key={index} className="admin-activity-item">
              <div className={`admin-activity-dot ${activity.type}`}></div>
              <div className="admin-activity-content">
                <div className="admin-activity-action">{activity.action}</div>
                <div className="admin-activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="admin-performance-insights">
        <h3>Performance Insights</h3>
        <div className="admin-performance-grid">
          <div className="admin-performance-metric">
            <div className="admin-performance-value">
              {analyticsData.overview.avgSessionDuration}
            </div>
            <div className="admin-performance-label">Average Session Duration</div>
          </div>
          <div className="admin-performance-metric">
            <div className="admin-performance-value">
              {(analyticsData.overview.pageViews / analyticsData.overview.uniqueVisitors).toFixed(1)}
            </div>
            <div className="admin-performance-label">Pages per Session</div>
          </div>
          <div className="admin-performance-metric">
            <div className="admin-performance-value">
              {((analyticsData.overview.uniqueVisitors / analyticsData.overview.totalVisits) * 100).toFixed(1)}%
            </div>
            <div className="admin-performance-label">New Visitor Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}