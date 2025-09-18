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
      if (response.data.success) {
        let fetchedBlogs = response.data.data;
        
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
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
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

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusStyles = {
      published: {
        background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        border: '1px solid #86efac',
        color: '#047857'
      },
      draft: {
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        border: '1px solid #fbbf24',
        color: '#92400e'
      },
      archived: {
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        border: '1px solid #cbd5e1',
        color: '#475569'
      }
    };
    
    const style = statusStyles[status] || statusStyles.draft;
    
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'capitalize',
        ...style
      }}>
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
      <div className="admin-content-card" style={{marginBottom: '2rem'}}>
        <div className="admin-content-card-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <FunnelIcon style={{width: '1.25rem', height: '1.25rem', color: '#6b7280'}} />
            <h3 style={{margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1f2937'}}>
              Search & Filter
            </h3>
          </div>
        </div>
        <div className="admin-content-card-body">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
            {/* Search */}
            <div style={{gridColumn: 'span 2'}}>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
                Search Posts
              </label>
              <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', pointerEvents: 'none'}}>
                  <MagnifyingGlassIcon style={{width: '1.25rem', height: '1.25rem', color: '#9ca3af'}} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    background: 'white',
                    transition: 'all 0.2s ease'
                  }}
                  placeholder="Search by title, excerpt, or author..."
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  background: 'white',
                  transition: 'all 0.2s ease'
                }}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
                Sort By
              </label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  background: 'white',
                  transition: 'all 0.2s ease'
                }}
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
      </div>

      {/* Blog List */}
      <div className="admin-content-card">
        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner"></div>
            <span>Loading blogs...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div style={{padding: '3rem', textAlign: 'center'}}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <PencilIcon style={{width: '2rem', height: '2rem', color: '#9ca3af'}} />
            </div>
            <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>
              No blog posts found
            </h3>
            <p style={{color: '#6b7280', marginBottom: '1.5rem'}}>
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
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead style={{background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderBottom: '2px solid #e2e8f0'}}>
                <tr>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Post
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Author
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Date
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody style={{background: 'white'}}>
                {filteredBlogs.map((blog) => (
                  <tr 
                    key={blog._id} 
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.closest('tr').style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.target.closest('tr').style.background = 'white'}
                  >
                    <td style={{padding: '1.5rem'}}>
                      <div style={{display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                        <div style={{flex: 1, minWidth: 0}}>
                          <div style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '0.5rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {blog.title}
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#64748b',
                            lineHeight: '1.4',
                            marginBottom: '0.5rem'
                          }}>
                            {blog.excerpt.substring(0, 120)}...
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.75rem',
                            color: '#94a3b8'
                          }}>
                            <span style={{
                              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontWeight: '500'
                            }}>
                              {blog.category}
                            </span>
                          </div>
                        </div>
                        {blog.featuredImage && (
                          <img
                            src={blog.featuredImage}
                            alt=""
                            style={{
                              width: '4rem',
                              height: '4rem',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '2px solid #f1f5f9'
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td style={{padding: '1.5rem', whiteSpace: 'nowrap'}}>
                      <div style={{display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#1e293b'}}>
                        <UserIcon style={{width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#94a3b8'}} />
                        {blog.author}
                      </div>
                    </td>
                    <td style={{padding: '1.5rem', whiteSpace: 'nowrap'}}>
                      {getStatusBadge(blog.status)}
                    </td>
                    <td style={{padding: '1.5rem', whiteSpace: 'nowrap'}}>
                      <div style={{display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#1e293b'}}>
                        <CalendarIcon style={{width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#94a3b8'}} />
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </div>
                    </td>
                    <td style={{padding: '1.5rem', whiteSpace: 'nowrap'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                        <Link
                          to={`/blog/${blog._id}`}
                          target="_blank"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '6px',
                            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                            border: '1px solid #cbd5e1',
                            color: '#64748b',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none'
                          }}
                          title="View Post"
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)';
                            e.target.style.color = '#1e293b';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
                            e.target.style.color = '#64748b';
                          }}
                        >
                          <EyeIcon style={{width: '1rem', height: '1rem'}} />
                        </Link>
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '6px',
                            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                            border: '1px solid #93c5fd',
                            color: '#3b82f6',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none'
                          }}
                          title="Edit Post"
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)';
                            e.target.style.color = '#1e40af';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
                            e.target.style.color = '#3b82f6';
                          }}
                        >
                          <PencilIcon style={{width: '1rem', height: '1rem'}} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id, blog.title)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '6px',
                            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                            border: '1px solid #fca5a5',
                            color: '#dc2626',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                          }}
                          title="Delete Post"
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)';
                            e.target.style.color = '#991b1b';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                            e.target.style.color = '#dc2626';
                          }}
                        >
                          <TrashIcon style={{width: '1rem', height: '1rem'}} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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