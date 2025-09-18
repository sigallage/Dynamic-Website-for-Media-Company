import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { blogAPI } from '../../services/api';
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  PhotoIcon,
  TagIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Add CSS for animations
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

const categories = [
  { value: 'audit-insights', label: 'Audit Insights' },
  { value: 'industry-news', label: 'Industry News' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'tax-updates', label: 'Tax Updates' },
  { value: 'business-tips', label: 'Business Tips' }
];

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' }
];

export default function BlogCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: 'audit-insights',
    tags: '',
    status: 'draft'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await blogAPI.createBlog(blogData);
      toast.success('Blog post created successfully!');
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error(error.response?.data?.message || 'Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab (you can implement a preview route later)
    toast.info('Preview functionality will be available soon');
  };

  return (
    <div className="admin-dashboard">
      {/* Enhanced Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        color: 'white',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={() => navigate('/admin/blogs')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <ArrowLeftIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
            <div>
              <h1 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                margin: 0, 
                marginBottom: '0.5rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                Create New Blog Post
              </h1>
              <p style={{ 
                fontSize: '1.125rem', 
                opacity: 0.9, 
                margin: 0,
                fontWeight: '400'
              }}>
                Share your insights with the world
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handlePreview}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1.75rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <EyeIcon style={{ width: '1.125rem', height: '1.125rem' }} />
            Preview
          </button>
        </div>
      </div>

      {/* Enhanced Form */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '3rem' }}>
            <div style={{ display: 'grid', gap: '3rem' }}>
            {/* Enhanced Basic Information */}
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                fontSize: '1.375rem', 
                fontWeight: '700', 
                color: '#1e293b', 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <DocumentTextIcon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                Basic Information
              </h3>
              
              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Enhanced Title */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.75rem'
                  }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter an engaging blog post title..."
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'white',
                      transition: 'all 0.3s ease',
                      fontWeight: '500'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Enhanced Slug */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.75rem'
                  }}>
                    URL Slug *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      placeholder="url-friendly-slug"
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        paddingLeft: '6rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: 'white',
                        transition: 'all 0.3s ease',
                        fontFamily: 'monospace'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      left: '1.25rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '1rem',
                      color: '#64748b',
                      fontFamily: 'monospace',
                      fontWeight: '500'
                    }}>
                      /blog/
                    </div>
                  </div>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#64748b', 
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    This creates the URL: <strong>/blog/{formData.slug}</strong>
                  </p>
                </div>

                {/* Enhanced Excerpt */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.75rem'
                  }}>
                    Excerpt *
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Write a compelling summary that will make readers want to read more..."
                    maxLength={300}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'white',
                      transition: 'all 0.3s ease',
                      resize: 'vertical',
                      lineHeight: '1.6'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.5rem'
                  }}>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                      This appears in search results and social media previews
                    </p>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: formData.excerpt.length > 250 ? '#dc2626' : '#64748b',
                      fontWeight: '600'
                    }}>
                      {formData.excerpt.length}/300
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Content */}
            <div style={{
              background: 'linear-gradient(135deg, #fefbff 0%, #f3f4f6 100%)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                fontSize: '1.375rem', 
                fontWeight: '700', 
                color: '#1e293b', 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <DocumentTextIcon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                Content Editor
              </h3>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '0.75rem'
                }}>
                  Blog Content *
                </label>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '1rem 1.25rem',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '0.8rem',
                    color: '#64748b'
                  }}>
                    <strong>Pro Tip:</strong> Use HTML tags for rich formatting: 
                    <code style={{ 
                      background: 'rgba(255, 255, 255, 0.8)', 
                      padding: '0.125rem 0.25rem', 
                      borderRadius: '4px',
                      margin: '0 0.25rem'
                    }}>
                      &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;
                    </code>
                  </div>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={18}
                    placeholder={`Start writing your amazing blog post here...

Example:
<h2>Introduction</h2>
<p>Welcome to this comprehensive guide on...</p>

<h2>Key Points</h2>
<ul>
  <li>First important point</li>
  <li>Second key insight</li>
</ul>

<p><strong>Remember:</strong> Great content provides value to your readers!</p>`}
                    style={{
                      width: '100%',
                      padding: '1.5rem',
                      border: 'none',
                      fontSize: '0.95rem',
                      background: 'white',
                      resize: 'vertical',
                      fontFamily: '"JetBrains Mono", "Fira Code", "Monaco", "Consolas", monospace',
                      lineHeight: '1.7',
                      color: '#1e293b'
                    }}
                    onFocus={(e) => {
                      e.target.parentElement.style.borderColor = '#8b5cf6';
                      e.target.parentElement.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.parentElement.style.borderColor = '#e2e8f0';
                      e.target.parentElement.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(59, 130, 246, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#1e40af', 
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    <strong>Content Tips:</strong> Write engaging, informative content that provides value. 
                    Break up text with headers, use bullet points for lists, and include examples where relevant.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Metadata */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #fbbf24'
            }}>
              <h3 style={{ 
                fontSize: '1.375rem', 
                fontWeight: '700', 
                color: '#1e293b', 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TagIcon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                Metadata & Settings
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {/* Enhanced Category */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.75rem'
                  }}>
                    Category *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem 3rem 1rem 1.25rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: 'white',
                        transition: 'all 0.3s ease',
                        appearance: 'none',
                        fontWeight: '500'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f59e0b';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    <div style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      fontSize: '1.25rem',
                      color: '#64748b'
                    }}>
                      ▼
                    </div>
                  </div>
                </div>

                {/* Enhanced Status */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.75rem'
                  }}>
                    Publication Status
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1rem 3rem 1rem 1.25rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: 'white',
                        transition: 'all 0.3s ease',
                        appearance: 'none',
                        fontWeight: '500'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f59e0b';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                    <div style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      fontSize: '1.25rem',
                      color: '#64748b'
                    }}>
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'grid', gap: '2rem' }}>
                {/* Enhanced Tags */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.75rem'
                  }}>
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="audit, compliance, tax, strategy (separate with commas)"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f59e0b';
                      e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#92400e', 
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(251, 191, 36, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(251, 191, 36, 0.3)'
                  }}>
                    Tags help readers find related content and improve SEO
                  </p>
                </div>

                {/* Enhanced Featured Image */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <PhotoIcon style={{ width: '1rem', height: '1rem', color: '#f59e0b' }} />
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/your-amazing-image.jpg"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'white',
                      transition: 'all 0.3s ease',
                      fontFamily: 'monospace'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f59e0b';
                      e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#92400e', 
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(251, 191, 36, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(251, 191, 36, 0.3)'
                  }}>
                    Recommended size: 1200x630px for optimal social media sharing
                  </p>
                </div>
              </div>
            </div>
            </div>

            {/* Enhanced Form Actions */}
            <div style={{
              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #cbd5e1'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    color: '#1e293b', 
                    margin: 0,
                    marginBottom: '0.5rem'
                  }}>
                    Ready to publish?
                  </h4>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#64748b', 
                    margin: 0 
                  }}>
                    Review your content and publish when ready, or save as draft for later.
                  </p>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/blogs')}
                    style={{
                      padding: '1rem 2rem',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      background: 'white',
                      color: '#64748b',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      minWidth: '120px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f8fafc';
                      e.target.style.borderColor = '#cbd5e1';
                      e.target.style.color = '#1e293b';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.color = '#64748b';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '1rem 2.5rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: loading 
                        ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      transition: 'all 0.3s ease',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      minWidth: '180px',
                      boxShadow: loading 
                        ? 'none' 
                        : '0 10px 25px rgba(102, 126, 234, 0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                      }
                    }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '1rem',
                          height: '1rem',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        Creating...
                      </span>
                    ) : (
                      'Create Blog Post'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}