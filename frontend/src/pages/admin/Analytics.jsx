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

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const getTrendIcon = (trend) => {
    return trend > 0 ? (
      <ArrowTrendingUpIcon className="trend-icon" />
    ) : (
      <ArrowTrendingDownIcon className="trend-icon" />
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

      {/* Enhanced Analytics Cards */}
      <div className="admin-analytics-section">
        <div className="admin-section-header">
          <h2>Website Analytics Overview</h2>
          <p>Comprehensive insights into your website performance</p>
        </div>
        
        <div className="admin-analytics-grid">
          <div className="admin-analytics-card">
            <div className="admin-analytics-header">
              <h3>TOTAL VISITS</h3>
              <div className={`admin-analytics-trend ${analyticsData.trends.visitsTrend > 0 ? 'up' : 'down'}`}>
                {getTrendIcon(analyticsData.trends.visitsTrend)}
              </div>
            </div>
            <div className="admin-analytics-number">
              {formatNumber(analyticsData.overview.totalVisits)}
            </div>
            <div className={`admin-analytics-change ${analyticsData.trends.visitsTrend > 0 ? 'positive' : 'negative'}`}>
              {Math.abs(analyticsData.trends.visitsTrend)}% vs last month
            </div>
          </div>

          <div className="admin-analytics-card">
            <div className="admin-analytics-header">
              <h3>PAGE VIEWS</h3>
              <div className={`admin-analytics-trend ${analyticsData.trends.pageViewsTrend > 0 ? 'up' : 'down'}`}>
                {getTrendIcon(analyticsData.trends.pageViewsTrend)}
              </div>
            </div>
            <div className="admin-analytics-number">
              {formatNumber(analyticsData.overview.pageViews)}
            </div>
            <div className={`admin-analytics-change ${analyticsData.trends.pageViewsTrend > 0 ? 'positive' : 'negative'}`}>
              {Math.abs(analyticsData.trends.pageViewsTrend)}% vs last month
            </div>
          </div>

          <div className="admin-analytics-card">
            <div className="admin-analytics-header">
              <h3>UNIQUE VISITORS</h3>
              <div className={`admin-analytics-trend ${analyticsData.trends.visitorsTrend > 0 ? 'up' : 'down'}`}>
                {getTrendIcon(analyticsData.trends.visitorsTrend)}
              </div>
            </div>
            <div className="admin-analytics-number">
              {formatNumber(analyticsData.overview.uniqueVisitors)}
            </div>
            <div className={`admin-analytics-change ${analyticsData.trends.visitorsTrend > 0 ? 'positive' : 'negative'}`}>
              {Math.abs(analyticsData.trends.visitorsTrend)}% vs last month
            </div>
          </div>

          <div className="admin-analytics-card">
            <div className="admin-analytics-header">
              <h3>BOUNCE RATE</h3>
              <div className={`admin-analytics-trend ${analyticsData.trends.bounceTrend < 0 ? 'up' : 'down'}`}>
                {getTrendIcon(-analyticsData.trends.bounceTrend)}
              </div>
            </div>
            <div className="admin-analytics-number">
              {analyticsData.overview.bounceRate}%
            </div>
            <div className={`admin-analytics-change ${analyticsData.trends.bounceTrend < 0 ? 'positive' : 'negative'}`}>
              {Math.abs(analyticsData.trends.bounceTrend)}% vs last month
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Card for Session Duration */}
      <div className="admin-analytics-section">
        <div className="admin-analytics-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
          <div className="admin-analytics-card">
            <div className="admin-analytics-header">
              <h3>AVG SESSION</h3>
              <div className="admin-analytics-trend up">
                <ArrowTrendingUpIcon className="trend-icon" />
              </div>
            </div>
            <div className="admin-analytics-number" style={{fontSize: '1.875rem'}}>
              {analyticsData.overview.avgSessionDuration}
            </div>
            <div className="admin-analytics-change positive">
              +8.2% vs last month
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
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