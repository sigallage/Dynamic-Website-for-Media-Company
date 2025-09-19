import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CalendarIcon, ClockIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline';
import { blogAPI } from '../services/api';
import '../styles/blog.css';

const categories = [
  { id: 'all', name: 'All Posts' },
  { id: 'audit-insights', name: 'Audit Insights' },
  { id: 'industry-news', name: 'Industry News' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'tax-updates', name: 'Tax Updates' },
  { id: 'business-tips', name: 'Business Tips' }
];

// Fallback mock data for better UX when API is unavailable
const mockBlogs = [
  {
    id: 1,
    title: 'New SOX Compliance Requirements for 2024',
    slug: 'new-sox-compliance-requirements-2024',
    excerpt: 'Understanding the latest Sarbanes-Oxley compliance requirements and how they impact your business operations and financial reporting.',
    content: 'Full content would be here...',
    category: 'compliance',
    tags: ['SOX', 'Compliance', 'Financial Reporting'],
    author: { name: 'Sarah Johnson' },
    publishedDate: '2024-03-15',
    views: 1245,
    featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 2,
    title: 'Tax Planning Strategies for Small Businesses',
    slug: 'tax-planning-strategies-small-businesses',
    excerpt: 'Discover effective tax planning strategies that can help small businesses reduce their tax burden while maintaining compliance.',
    content: 'Full content would be here...',
    category: 'tax-updates',
    tags: ['Tax Planning', 'Small Business', 'Strategy'],
    author: { name: 'Michael Chen' },
    publishedDate: '2024-03-10',
    views: 892,
    featuredImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 3,
    title: 'The Future of Financial Auditing: Technology Trends',
    slug: 'future-financial-auditing-technology-trends',
    excerpt: 'Exploring how artificial intelligence, automation, and data analytics are transforming the audit industry.',
    content: 'Full content would be here...',
    category: 'audit-insights',
    tags: ['Technology', 'AI', 'Audit Innovation'],
    author: { name: 'Emily Rodriguez' },
    publishedDate: '2024-03-08',
    views: 1567,
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 4,
    title: 'Understanding Internal Controls: A Complete Guide',
    slug: 'understanding-internal-controls-complete-guide',
    excerpt: 'A comprehensive guide to implementing and maintaining effective internal controls in your organization.',
    content: 'Full content would be here...',
    category: 'business-tips',
    tags: ['Internal Controls', 'Risk Management', 'Best Practices'],
    author: { name: 'David Thompson' },
    publishedDate: '2024-03-05',
    views: 734,
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 5,
    title: 'Industry Update: New Accounting Standards',
    slug: 'industry-update-new-accounting-standards',
    excerpt: 'Latest updates on new accounting standards and their implications for businesses across different industries.',
    content: 'Full content would be here...',
    category: 'industry-news',
    tags: ['GAAP', 'Standards', 'Industry Update'],
    author: { name: 'Sarah Johnson' },
    publishedDate: '2024-03-01',
    views: 456,
    featuredImage: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=800&h=400&fit=crop',
    status: 'published'
  },
  {
    id: 6,
    title: 'Preparing for Year-End Audit: Essential Checklist',
    slug: 'preparing-year-end-audit-essential-checklist',
    excerpt: 'A comprehensive checklist to help organizations prepare for their year-end audit and ensure a smooth process.',
    content: 'Full content would be here...',
    category: 'audit-insights',
    tags: ['Year-End Audit', 'Checklist', 'Preparation'],
    author: { name: 'Emily Rodriguez' },
    publishedDate: '2024-02-28',
    views: 1123,
    featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    status: 'published'
  }
];

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const blogsPerPage = 6;

  useEffect(() => {
    fetchBlogs();
    
    // Handle URL parameters
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    setSelectedCategory(category);
    setSearchTerm(search);
  }, [searchParams]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching blogs from API...');
      const response = await blogAPI.getAllBlogs();
      console.log('API response:', response.data);
      
      // Handle the actual API response format: { blogs, totalPages, currentPage, total }
      if (response.data && response.data.blogs) {
        const allBlogs = response.data.blogs || [];
        console.log('All blogs from API:', allBlogs);
        
        // These are already filtered for published status by the backend
        if (allBlogs.length > 0) {
          setBlogs(allBlogs);
          setFilteredBlogs(allBlogs);
          console.log('Using API blogs:', allBlogs.length, 'blogs found');
        } else {
          // No published blogs found, use mock data
          setBlogs(mockBlogs);
          setFilteredBlogs(mockBlogs);
          console.log('Using mock blogs (no published blogs found)');
        }
      } else if (response.data && response.data.success && response.data.data) {
        // Handle alternative format: { success: true, data: [...] }
        const allBlogs = response.data.data || [];
        console.log('All blogs from API (alternative format):', allBlogs);
        
        const publishedBlogs = allBlogs.filter(blog => blog.status === 'published');
        console.log('Published blogs:', publishedBlogs);
        
        if (publishedBlogs.length > 0) {
          setBlogs(publishedBlogs);
          setFilteredBlogs(publishedBlogs);
          console.log('Using API blogs (alternative format)');
        } else {
          setBlogs(mockBlogs);
          setFilteredBlogs(mockBlogs);
          console.log('Using mock blogs (no published blogs in alternative format)');
        }
      } else {
        console.log('Unexpected API response format:', response.data);
        setBlogs(mockBlogs);
        setFilteredBlogs(mockBlogs);
      }
    } catch (error) {
      console.log('API error, using demo content:', error);
      console.error('Full error:', error);
      // Use mock data when API is unavailable
      setBlogs(mockBlogs);
      setFilteredBlogs(mockBlogs);
      setError(null); // Don't show error, just use fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [blogs, selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    const newParams = new URLSearchParams(searchParams);
    if (search === '') {
      newParams.delete('search');
    } else {
      newParams.set('search', search);
    }
    setSearchParams(newParams);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content ? content.split(' ').length : 100;
    return Math.ceil(words / wordsPerMinute);
  };

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-container">
          <div className="blog-hero">
            <div className="blog-hero-content">
              <h1>Our Blog</h1>
              <p>Stay updated with the latest insights, industry news, and expert advice</p>
            </div>
          </div>
          <div className="blog-loading">
            <div className="loading-spinner">Loading blogs...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="blog-container">
          <div className="blog-hero">
            <div className="blog-hero-content">
              <h1>Our Blog</h1>
              <p>Stay updated with the latest insights, industry news, and expert advice</p>
            </div>
          </div>
          <div className="blog-error">
            <p>{error}</p>
            <button onClick={fetchBlogs} className="retry-button">Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Header */}
      <div className="blog-header">
        <div className="blog-header-container">
          <div className="blog-header-content">
            <h1 className="blog-header-title">
              Insights & Updates
            </h1>
            <p className="blog-header-description">
              Stay informed with the latest trends, regulations, and best practices in audit, 
              tax, and business consulting. Expert insights from our professional team.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="blog-search-filter">
        <div className="blog-search-filter-container">
          <div className="blog-search-filter-content">
            {/* Search */}
            <div className="blog-search-container">
              <label htmlFor="search" className="blog-search-label">
                Search Articles
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by title, content, or tags..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="blog-search-input"
              />
            </div>

            {/* Categories */}
            <div className="blog-categories-container">
              <span className="blog-categories-label">Categories:</span>
              <div className="blog-categories">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`blog-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="blog-container">
        {loading ? (
          <div className="blog-loading">
            <div className="loading-spinner">Loading articles...</div>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="blog-results-summary">
              <p className="blog-results-text">
                {filteredBlogs.length === 0 ? 'No articles found' : 
                 `Showing ${filteredBlogs.length} article${filteredBlogs.length !== 1 ? 's' : ''}`}
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            {/* Blog Grid */}
            {filteredBlogs.length > 0 ? (
              <>
                <div className="blog-grid">
                  {currentBlogs.map((blog) => (
                    <article key={blog.id} className="blog-card">
                      <div className="blog-card-image">
                        <img 
                          src={blog.featuredImage || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop'} 
                          alt={blog.title}
                          loading="lazy"
                        />
                        <div className="blog-card-category">
                          {categories.find(c => c.id === blog.category)?.name || blog.category}
                        </div>
                      </div>
                      
                      <div className="blog-card-content">
                        <div className="blog-card-meta">
                          <div className="blog-meta-item">
                            <CalendarIcon className="blog-meta-icon" />
                            <span>{formatDate(blog.publishedDate || blog.createdAt)}</span>
                          </div>
                          <div className="blog-meta-item">
                            <ClockIcon className="blog-meta-icon" />
                            <span>{getReadTime(blog.content)} min read</span>
                          </div>
                          <div className="blog-meta-item">
                            <EyeIcon className="blog-meta-icon" />
                            <span>{blog.views || 0} views</span>
                          </div>
                        </div>
                        
                        <h3 className="blog-card-title">
                          <Link to={`/blog/${blog.slug || blog.id}`}>
                            {blog.title}
                          </Link>
                        </h3>
                        
                        <p className="blog-card-excerpt">
                          {blog.excerpt}
                        </p>
                        
                        <div className="blog-card-tags">
                          <TagIcon className="blog-tag-icon" />
                          <div className="blog-tags-list">
                            {blog.tags && blog.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="blog-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="blog-card-footer">
                          <div className="blog-author">
                            <span>By {blog.author?.name || 'Anonymous'}</span>
                          </div>
                          <Link 
                            to={`/blog/${blog.slug || blog.id}`}
                            className="blog-read-more"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="blog-pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="blog-pagination-btn"
                    >
                      ← Previous
                    </button>
                    
                    <div className="blog-pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`blog-pagination-number ${currentPage === page ? 'active' : ''}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="blog-pagination-btn"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="blog-empty-state">
                <div className="blog-empty-content">
                  <h3 className="blog-empty-title">No articles found</h3>
                  <p className="blog-empty-description">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'No blog posts are currently available.'
                    }
                  </p>
                  {(searchTerm || selectedCategory !== 'all') && (
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSearchParams({});
                      }}
                      className="blog-clear-filters"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="blog-newsletter">
        <div className="blog-newsletter-container">
          <div className="blog-newsletter-content">
            <h3 className="blog-newsletter-title">Stay Updated</h3>
            <p className="blog-newsletter-description">
              Get the latest insights and industry updates delivered to your inbox.
            </p>
            <div className="blog-newsletter-actions">
              <Link
                to="/contact"
                className="blog-newsletter-button"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}