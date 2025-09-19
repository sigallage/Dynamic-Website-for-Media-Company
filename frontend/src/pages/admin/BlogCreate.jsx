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
    100% { transform: rotate(360de                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#d1d5db', 
                    margin: 0 
                  }}>
                    Review your content and publish when ready, or save as draft for later.
                  </p>  }
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
    <div className="admin-blog-create">
      {/* Enhanced Header */}
      <div className="admin-blog-create-header">
        <div className="admin-blog-create-header-content">
          <div className="admin-blog-create-header-left">
            <button
              onClick={() => navigate('/admin/blogs')}
              className="admin-blog-create-back-btn"
            >
              <ArrowLeftIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
            <div>
              <h1 className="admin-blog-create-title">
                Create New Blog Post
              </h1>
              <p className="admin-blog-create-subtitle">
                Share your insights with the world
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handlePreview}
            className="admin-blog-create-preview-btn"
          >
            <EyeIcon style={{ width: '1.125rem', height: '1.125rem' }} />
            Preview
          </button>
        </div>
      </div>

      {/* Enhanced Form */}
      <div className="admin-blog-create-form">
        <form onSubmit={handleSubmit}>
          <div className="admin-blog-create-form-content">
            <div className="admin-blog-create-form-grid">
            {/* Enhanced Basic Information */}
            <div className="admin-blog-form-section">
              <h3 className="admin-blog-form-section-title">
                <div className="admin-blog-form-section-icon">
                  <DocumentTextIcon style={{ width: '1.25rem', height: '1.25rem', color: '#f9fafb' }} />
                </div>
                Basic Information
              </h3>
              
              <div className="admin-blog-form-fields">
                {/* Enhanced Title */}
                <div className="admin-blog-form-field">
                  <label className="admin-blog-form-label">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter an engaging blog post title..."
                    className="admin-blog-form-input"
                  />
                </div>

                {/* Enhanced Slug */}
                <div className="admin-blog-form-field">
                  <label className="admin-blog-form-label">
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
                      className="admin-blog-form-input"
                      style={{ 
                        paddingLeft: '6rem',
                        fontFamily: 'monospace'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      left: '1.25rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '1rem',
                      color: '#d1d5db',
                      fontFamily: 'monospace',
                      fontWeight: '500'
                    }}>
                      /blog/
                    </div>
                  </div>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#d1d5db', 
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: '#374151',
                    borderRadius: '8px',
                    border: '1px solid #4b5563'
                  }}>
                    This creates the URL: <strong style={{color: '#f9fafb'}}>/blog/{formData.slug}</strong>
                  </p>
                </div>

                {/* Enhanced Excerpt */}
                <div className="admin-blog-form-field">
                  <label className="admin-blog-form-label">
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
                    className="admin-blog-form-textarea"
                  />
                  <div className="admin-blog-form-info">
                    <p className="admin-blog-form-help-text">
                      This appears in search results and social media previews
                    </p>
                    <span className="admin-blog-form-counter">
                      {formData.excerpt.length}/300
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Content */}
            <div className="admin-blog-form-section">
              <h3 className="admin-blog-form-section-title">
                <div className="admin-blog-form-section-icon">
                  <DocumentTextIcon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                Content Editor
              </h3>
              
              <div className="admin-blog-form-field">
                <label className="admin-blog-form-label">
                  Blog Content *
                </label>
                <div className="admin-blog-form-content-editor">
                  <div className="admin-blog-form-content-tip">
                    <strong>Pro Tip:</strong> Use HTML tags for rich formatting: 
                    <code style={{ 
                      background: 'rgba(255, 255, 255, 0.1)', 
                      padding: '0.125rem 0.25rem', 
                      borderRadius: '4px',
                      margin: '0 0.25rem',
                      color: '#f9fafb'
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
                    className="admin-blog-form-content-textarea"
                  />
                </div>
                <div className="admin-blog-form-content-help">
                  <p>
                    <strong>Content Tips:</strong> Write engaging, informative content that provides value. 
                    Break up text with headers, use bullet points for lists, and include examples where relevant.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Metadata */}
            <div className="admin-blog-form-section">
              <h3 className="admin-blog-form-section-title">
                <div className="admin-blog-form-section-icon" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>
                  <TagIcon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                Metadata & Settings
              </h3>
              
              <div className="admin-blog-form-grid-two">
                {/* Enhanced Category */}
                <div className="admin-blog-form-field">
                  <label className="admin-blog-form-label">
                    Category *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="admin-blog-form-select"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Enhanced Status */}
                <div className="admin-blog-form-field">
                  <label className="admin-blog-form-label">
                    Publication Status
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="admin-blog-form-select"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#f59e0b';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#4b5563';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="admin-blog-form-fields" style={{ marginTop: '2rem' }}>
                {/* Enhanced Tags */}
                <div className="admin-blog-form-field">
                  <label className="admin-blog-form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="audit, compliance, tax, strategy (separate with commas)"
                    className="admin-blog-form-input"
                  />
                  <p className="admin-blog-form-help-text" style={{ 
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#d1d5db'
                  }}>
                    Tags help readers find related content and improve SEO
                  </p>
                </div>

                {/* Enhanced Featured Image */}
                <div className="admin-blog-form-field">
                  <label className="admin-blog-form-label" style={{
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
                    className="admin-blog-form-input"
                  />
                  <p className="admin-blog-form-help-text" style={{ 
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#d1d5db'
                  }}>
                    Recommended size: 1200x630px for optimal social media sharing
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Form Actions */}
            <div className="admin-blog-form-section">
              <div className="admin-blog-form-actions">
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    color: '#f9fafb', 
                    margin: 0,
                    marginBottom: '0.5rem'
                  }}>
                    Ready to publish?
                  </h4>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#d1d5db', 
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
                    className="admin-blog-form-btn-secondary"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="admin-blog-form-btn-primary"
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
          </div>
        </form>
      </div>
    </div>
  );
}