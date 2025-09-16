import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, EyeIcon, TagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

// Mock blog data - this would come from the API in a real application
const mockBlogPost = {
  id: 1,
  title: 'New SOX Compliance Requirements for 2024',
  slug: 'new-sox-compliance-requirements-2024',
  excerpt: 'Understanding the latest Sarbanes-Oxley compliance requirements and how they impact your business operations and financial reporting.',
  content: `
    <h2>Introduction to SOX Compliance Changes</h2>
    <p>The Sarbanes-Oxley Act continues to evolve, and 2024 brings significant updates that public companies must understand and implement. These changes reflect the ongoing commitment to corporate transparency and financial accountability.</p>
    
    <h2>Key Changes for 2024</h2>
    <p>The most significant updates include enhanced internal control documentation requirements, expanded cybersecurity disclosure mandates, and stricter certification processes for financial statements.</p>
    
    <h3>Enhanced Internal Control Documentation</h3>
    <p>Companies must now provide more detailed documentation of their internal control processes, including:</p>
    <ul>
      <li>Comprehensive risk assessment procedures</li>
      <li>Detailed control activity documentation</li>
      <li>Enhanced monitoring and reporting mechanisms</li>
      <li>Clear segregation of duties matrices</li>
    </ul>
    
    <h3>Cybersecurity Disclosure Requirements</h3>
    <p>New provisions require companies to disclose material cybersecurity incidents and their potential impact on financial reporting within specified timeframes.</p>
    
    <h2>Implementation Timeline</h2>
    <p>Public companies have until December 31, 2024, to fully implement these new requirements. However, we recommend beginning preparation immediately to ensure compliance.</p>
    
    <h2>Best Practices for Compliance</h2>
    <p>To ensure smooth compliance with the new requirements, consider the following best practices:</p>
    
    <ol>
      <li><strong>Conduct a Gap Analysis:</strong> Review current processes against new requirements</li>
      <li><strong>Update Policies and Procedures:</strong> Revise existing documentation to meet new standards</li>
      <li><strong>Enhance Training Programs:</strong> Ensure all relevant personnel understand the changes</li>
      <li><strong>Implement Regular Testing:</strong> Establish ongoing testing procedures for internal controls</li>
    </ol>
    
    <h2>How We Can Help</h2>
    <p>At Elite Audit Solutions, we specialize in helping companies navigate complex compliance requirements. Our team of experienced professionals can assist with:</p>
    
    <ul>
      <li>SOX compliance assessment and gap analysis</li>
      <li>Internal control design and implementation</li>
      <li>Ongoing compliance monitoring and testing</li>
      <li>Remediation of control deficiencies</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>The new SOX compliance requirements for 2024 represent a significant step forward in corporate accountability. While challenging, proper preparation and expert guidance can ensure your organization remains compliant while maintaining operational efficiency.</p>
    
    <p>For more information about how these changes might affect your organization, or to schedule a compliance assessment, please contact our team.</p>
  `,
  category: 'compliance',
  tags: ['SOX', 'Compliance', 'Financial Reporting', 'Internal Controls'],
  author: { 
    name: 'Sarah Johnson',
    title: 'Managing Partner & CPA',
    bio: 'Sarah has over 20 years of experience in auditing and financial consulting, with particular expertise in SOX compliance and regulatory requirements.'
  },
  publishedDate: '2024-03-15',
  views: 1245,
  featuredImage: '',
  status: 'published'
};

const relatedPosts = [
  {
    id: 2,
    title: 'Understanding Internal Controls: A Complete Guide',
    slug: 'understanding-internal-controls-complete-guide',
    excerpt: 'A comprehensive guide to implementing and maintaining effective internal controls in your organization.',
    publishedDate: '2024-03-05'
  },
  {
    id: 3,
    title: 'Preparing for Year-End Audit: Essential Checklist',
    slug: 'preparing-year-end-audit-essential-checklist',
    excerpt: 'A comprehensive checklist to help organizations prepare for their year-end audit and ensure a smooth process.',
    publishedDate: '2024-02-28'
  },
  {
    id: 4,
    title: 'The Future of Financial Auditing: Technology Trends',
    slug: 'future-financial-auditing-technology-trends',
    excerpt: 'Exploring how artificial intelligence, automation, and data analytics are transforming the audit industry.',
    publishedDate: '2024-03-08'
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch from API based on slug
    // For now, we'll simulate an API call
    const fetchBlogPost = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (slug === mockBlogPost.slug) {
          setBlogPost(mockBlogPost);
        } else {
          setBlogPost(null);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setBlogPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-gray-700">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">{blogPost.title}</span>
          </nav>
        </div>
      </div>

      {/* Back to Blog Button */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        {/* Article Header */}
        <header className="mb-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
              {blogPost.category.charAt(0).toUpperCase() + blogPost.category.slice(1).replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            {blogPost.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-6">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {formatDate(blogPost.publishedDate)}
            </div>
            <div className="flex items-center mr-6">
              <ClockIcon className="h-4 w-4 mr-1" />
              {getReadTime(blogPost.content)} min read
            </div>
            <div className="flex items-center">
              <EyeIcon className="h-4 w-4 mr-1" />
              {blogPost.views.toLocaleString()} views
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center pb-6 border-b border-gray-200">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-medium text-lg">
                  {blogPost.author.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-900">{blogPost.author.name}</p>
              <p className="text-sm text-gray-500">{blogPost.author.title}</p>
            </div>
          </div>
        </header>

        {/* Featured Image Placeholder */}
        <div className="aspect-video bg-gray-100 rounded-lg mb-12 flex items-center justify-center">
          <span className="text-gray-400">Featured Image</span>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none prose-primary"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Tags:</span>
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                <TagIcon className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Author</h3>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-medium text-xl">
                  {blogPost.author.name.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">{blogPost.author.name}</p>
              <p className="text-sm text-gray-600 mb-2">{blogPost.author.title}</p>
              <p className="text-gray-700">{blogPost.author.bio}</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Related Articles
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Continue reading with these related insights and updates.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Featured Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="hover:text-primary-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {formatDate(post.publishedDate)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need Expert Guidance?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Our team of experts is here to help you navigate complex compliance and audit requirements. 
              Contact us for personalized advice.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Our Experts
              </Link>
              <Link to="/services" className="text-sm font-semibold leading-6 text-white">
                View our services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}