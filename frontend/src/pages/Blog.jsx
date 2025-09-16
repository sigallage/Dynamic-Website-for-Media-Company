import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CalendarIcon, ClockIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline';

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
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Insights & Updates
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Stay informed with the latest trends, regulations, and best practices in audit, 
              tax, and business consulting. Expert insights from our professional team.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="border-b border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <label htmlFor="search" className="sr-only">
                Search blog posts
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 xl:grid-cols-3">
              {paginatedBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Featured Image Placeholder */}
                  <div className="aspect-video bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <div className="h-full flex items-center justify-center">
                      <span className="text-gray-400">Featured Image</span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800">
                        {categories.find(cat => cat.id === blog.category)?.name}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      <Link to={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-3 text-gray-600 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(blog.publishedDate)}
                      </div>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {getReadTime(blog.content)} min read
                      </div>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        {blog.views}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center text-xs text-gray-600"
                        >
                          <TagIcon className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        By <span className="font-medium">{blog.author.name}</span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === index + 1
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Subscribe to our newsletter to receive the latest insights and updates directly in your inbox.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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