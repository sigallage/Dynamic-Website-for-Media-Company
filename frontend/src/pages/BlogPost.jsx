import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, EyeIcon, TagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { mockBlogPostsMap, relatedPosts } from '../data/blogData';

export default function BlogPost() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (mockBlogPostsMap[slug]) {
          setBlogPost(mockBlogPostsMap[slug]);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
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
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
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

      <article className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <header className="mb-12">
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
              {blogPost.category.charAt(0).toUpperCase() + blogPost.category.slice(1).replace('-', ' ')}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            {blogPost.title}
          </h1>
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
        </header>

        <div 
          className="prose prose-lg max-w-none prose-primary"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

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
      </article>
    </div>
  );
}
