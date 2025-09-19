import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { blogAPI } from '../../services/api';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  UserIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import '../../styles/adminDashboard.css';

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchBlogs();
  }, [statusFilter, sortBy, sortOrder]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAllBlogs();
      console.log('BlogManagement API response:', response.data);
      
      // Handle the actual API response format: { blogs, totalPages, currentPage, total }
      if (response.data && response.data.blogs) {
        let fetchedBlogs = response.data.blogs || [];
        console.log('All blogs from API:', fetchedBlogs);
        
        // Apply filters
        if (statusFilter !== 'all') {
          fetchedBlogs = fetchedBlogs.filter(blog => blog.status === statusFilter);
        }
        
        // Apply sorting
        fetchedBlogs.sort((a, b) => {
          const aValue = a[sortBy];
          const bValue = b[sortBy];
          
          if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
        
        setBlogs(fetchedBlogs);
      } else if (response.data && response.data.success && response.data.data) {
        // Handle alternative format: { success: true, data: [...] }
        let fetchedBlogs = response.data.data || [];
        console.log('All blogs from API (alternative format):', fetchedBlogs);
        
        // Apply filters
        if (statusFilter !== 'all') {
          fetchedBlogs = fetchedBlogs.filter(blog => blog.status === statusFilter);
        }
        
        // Apply sorting
        fetchedBlogs.sort((a, b) => {
          const aValue = a[sortBy];
          const bValue = b[sortBy];
          
          if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
        
        setBlogs(fetchedBlogs);
      } else {
        console.log('Unexpected API response format:', response.data);
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        await blogAPI.deleteBlog(id);
        toast.success('Blog post deleted successfully');
        fetchBlogs(); // Refresh the list
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog post');
      }
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const authorText = typeof blog.author === 'object' ? (blog.author.name || blog.author.id || '') : blog.author;
    return (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      authorText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusBadge = (status) => {
    return (
      <span className={`admin-blog-status-badge admin-blog-status-${status}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>Blog Management</h1>
          <p>Create, edit, and manage your blog posts</p>
        </div>
        <div className="admin-dashboard-actions">
          <Link
            to="/admin/blogs/new"
            className="admin-btn admin-btn-primary"
          >
            <PlusIcon className="admin-btn-icon" />
            New Blog Post
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-blog-filters">
        <div className="admin-blog-filters-header">
          <FunnelIcon style={{width: '1.25rem', height: '1.25rem', color: '#f9fafb'}} />
          <h3 className="admin-blog-filters-title">Search & Filter</h3>
        </div>
        <div className="admin-blog-filters-grid">
          {/* Search */}
          <div>
            <label className="admin-blog-filter-label">
              Search Posts
            </label>
            <div className="admin-blog-search-container">
              <MagnifyingGlassIcon className="admin-blog-search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-blog-search-input"
                placeholder="Search by title, excerpt, or author..."
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="admin-blog-filter-label">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-blog-filter-select"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="admin-blog-filter-label">
              Sort By
            </label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="admin-blog-filter-select"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="publishedAt-desc">Recently Published</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="admin-blog-table-container">
        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner"></div>
            <span>Loading blogs...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="admin-blog-empty-state">
            <div className="admin-blog-empty-icon">
              <PencilIcon style={{width: '2rem', height: '2rem', color: '#9ca3af'}} />
            </div>
            <h3 className="admin-blog-empty-title">
              No blog posts found
            </h3>
            <p className="admin-blog-empty-description">
              {searchTerm || statusFilter !== 'all' 
                ? 'No posts match your current search criteria.'
                : 'Get started by creating your first blog post.'
              }
            </p>
            <Link to="/admin/blogs/new" className="admin-btn admin-btn-primary">
              <PlusIcon className="admin-btn-icon" />
              Create First Post
            </Link>
          </div>
        ) : (
          <table className="admin-blog-table">
            <thead className="admin-blog-table-header">
              <tr>
                <th>Post</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="admin-blog-table-row">
                    <td className="admin-blog-table-cell">
                      <div className="admin-blog-post-info">
                        <div style={{display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                          <div style={{flex: 1, minWidth: 0}}>
                            <Link 
                              to={`/admin/blogs/edit/${blog._id}`}
                              className="admin-blog-post-title"
                            >
                              {blog.title}
                            </Link>
                            <div className="admin-blog-post-excerpt">
                              {blog.excerpt.substring(0, 120)}...
                            </div>
                            <div className="admin-blog-post-meta">
                              <TagIcon style={{width: '0.875rem', height: '0.875rem'}} />
                              <span>{typeof blog.category === 'object' ? blog.category.name || blog.category.id || 'Uncategorized' : blog.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="admin-blog-table-cell">
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <UserIcon style={{width: '1rem', height: '1rem', color: '#9ca3af'}} />
                        <span>{typeof blog.author === 'object' ? blog.author.name || blog.author.id || 'Unknown' : blog.author}</span>
                      </div>
                    </td>
                    <td className="admin-blog-table-cell">
                      <span className={`admin-blog-status-badge admin-blog-status-${blog.status}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="admin-blog-table-cell">
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <CalendarIcon style={{width: '1rem', height: '1rem', color: '#9ca3af'}} />
                        <span className="admin-blog-date">
                          {formatDate(blog.publishedAt || blog.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="admin-blog-table-cell">
                      <div className="admin-blog-actions">
                        <Link
                          to={`/blog/${blog._id}`}
                          target="_blank"
                          className="admin-blog-action-btn view"
                          title="View Post"
                        >
                          <EyeIcon style={{width: '1rem', height: '1rem'}} />
                        </Link>
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          className="admin-blog-action-btn edit"
                          title="Edit Post"
                        >
                          <PencilIcon style={{width: '1rem', height: '1rem'}} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id, blog.title)}
                          className="admin-blog-action-btn delete"
                          title="Delete Post"
                        >
                          <TrashIcon style={{width: '1rem', height: '1rem'}} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      {/* Stats */}
      <div className="admin-stats-grid" style={{marginTop: '2rem'}}>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper blogs">
              <PencilIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Published Posts</div>
              <div className="admin-stat-value">
                {blogs.filter(b => b.status === 'published').length}
              </div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper services">
              <EyeIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Draft Posts</div>
              <div className="admin-stat-value">
                {blogs.filter(b => b.status === 'draft').length}
              </div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper contacts">
              <TrashIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Total Posts</div>
              <div className="admin-stat-value">
                {blogs.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}