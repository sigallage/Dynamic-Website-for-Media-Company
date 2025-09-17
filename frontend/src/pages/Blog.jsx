import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CalendarIcon, ClockIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline';
import '../styles/blog.css';

const categories = [
  { id: 'all', name: 'All Posts' },
  { id: 'audit-insights', name: 'Audit Insights' },
  { id: 'industry-news', name: 'Industry News' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'tax-updates', name: 'Tax Updates' },
  { id: 'business-tips', name: 'Business Tips' }
];

// Mock blog data - this would come from the API in a real application
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
    featuredImage: '',
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
    featuredImage: '',
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
    featuredImage: '',
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
    featuredImage: '',
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
    featuredImage: '',
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
    featuredImage: '',
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
  const blogsPerPage = 6;

  useEffect(() => {
    // In a real application, this would fetch from API
    setBlogs(mockBlogs);
    setFilteredBlogs(mockBlogs);
    
    // Handle URL parameters
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    setSelectedCategory(category);
    setSearchTerm(search);
  }, [searchParams]);

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
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

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
                Search blog posts
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="blog-search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="blog-category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`blog-category-button ${
                    selectedCategory === category.id ? 'active' : ''
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-main">
        {filteredBlogs.length === 0 ? (
          <div className="blog-empty-state">
            <p className="blog-empty-text">No blog posts found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {paginatedBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="blog-card"
                >
                  {/* Featured Image Placeholder */}
                  <div className="blog-card-image">
                    <div className="blog-card-image-placeholder">
                      <span>Featured Image</span>
                    </div>
                  </div>

                  <div className="blog-card-content">
                    {/* Category Badge */}
                    <div className="blog-card-category">
                      <span className="blog-category-badge">
                        {categories.find(cat => cat.id === blog.category)?.name}
                      </span>
                    </div>

                    {/* Title */}
                    <h3>
                      <Link to={`/blog/${blog.slug}`} className="blog-card-title">
                        {blog.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="blog-card-excerpt">
                      {blog.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="blog-card-meta">
                      <div className="blog-meta-item">
                        <CalendarIcon className="blog-meta-icon" />
                        {formatDate(blog.publishedDate)}
                      </div>
                      <span className="blog-meta-separator">•</span>
                      <div className="blog-meta-item">
                        <ClockIcon className="blog-meta-icon" />
                        {getReadTime(blog.content)} min read
                      </div>
                      <span className="blog-meta-separator">•</span>
                      <div className="blog-meta-item">
                        <EyeIcon className="blog-meta-icon" />
                        {blog.views}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="blog-card-tags">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="blog-tag"
                        >
                          <TagIcon className="blog-tag-icon" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author */}
                    <div className="blog-card-author">
                      <p className="blog-author-text">
                        By <span className="blog-author-name">{blog.author.name}</span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="blog-pagination">
                <nav className="blog-pagination-nav">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="blog-pagination-button"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`blog-pagination-button ${
                        currentPage === index + 1 ? 'active' : ''
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="blog-pagination-button"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="blog-newsletter">
        <div className="blog-newsletter-container">
          <div className="blog-newsletter-content">
            <h2 className="blog-newsletter-title">
              Stay Updated
            </h2>
            <p className="blog-newsletter-description">
              Subscribe to our newsletter to receive the latest insights and updates directly in your inbox.
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