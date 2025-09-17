import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  EyeIcon,
  UsersIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  TrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

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
      <TrendingUpIcon className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
    );
  };

  const getTrendColor = (trend) => {
    return trend > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Website performance and content analytics overview
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Visits</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.totalVisits.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <EyeIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getTrendIcon(analyticsData.trends.visitsTrend)}
            <span className={`ml-1 text-sm font-medium ${getTrendColor(analyticsData.trends.visitsTrend)}`}>
              {Math.abs(analyticsData.trends.visitsTrend)}%
            </span>
            <span className="ml-1 text-sm text-gray-600">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.pageViews.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <ChartBarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getTrendIcon(analyticsData.trends.pageViewsTrend)}
            <span className={`ml-1 text-sm font-medium ${getTrendColor(analyticsData.trends.pageViewsTrend)}`}>
              {Math.abs(analyticsData.trends.pageViewsTrend)}%
            </span>
            <span className="ml-1 text-sm text-gray-600">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.uniqueVisitors.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <UsersIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getTrendIcon(analyticsData.trends.visitorsTrend)}
            <span className={`ml-1 text-sm font-medium ${getTrendColor(analyticsData.trends.visitorsTrend)}`}>
              {Math.abs(analyticsData.trends.visitorsTrend)}%
            </span>
            <span className="ml-1 text-sm text-gray-600">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.bounceRate}%
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <ArrowTrendingDownIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getTrendIcon(analyticsData.trends.bounceTrend)}
            <span className={`ml-1 text-sm font-medium ${getTrendColor(analyticsData.trends.bounceTrend)}`}>
              {Math.abs(analyticsData.trends.bounceTrend)}%
            </span>
            <span className="ml-1 text-sm text-gray-600">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Pages */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Pages</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {index + 1}.
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {page.title}
                        </p>
                        <p className="text-sm text-gray-500">{page.path}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {page.views.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">{page.percentage}%</p>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${page.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Statistics */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Content Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <DocumentTextIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">
                  {analyticsData.contentStats.blogPosts}
                </p>
                <p className="text-sm text-gray-600">Total Blog Posts</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <ChartBarIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {analyticsData.contentStats.services}
                </p>
                <p className="text-sm text-gray-600">Active Services</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <EnvelopeIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">
                  {analyticsData.contentStats.contactInquiries}
                </p>
                <p className="text-sm text-gray-600">Contact Inquiries</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <EyeIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">
                  {analyticsData.contentStats.publishedPosts}
                </p>
                <p className="text-sm text-gray-600">Published Posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                  activity.type === 'blog' ? 'bg-blue-500' :
                  activity.type === 'contact' ? 'bg-green-500' :
                  activity.type === 'visitor' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Performance Insights</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {analyticsData.overview.avgSessionDuration}
              </div>
              <div className="text-sm text-gray-600">Average Session Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {(analyticsData.overview.pageViews / analyticsData.overview.uniqueVisitors).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Pages per Session</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {((analyticsData.overview.uniqueVisitors / analyticsData.overview.totalVisits) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">New Visitor Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}