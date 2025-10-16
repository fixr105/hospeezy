import React from 'react';
import { Calendar, User, Clock, ArrowRight, Heart, TrendingUp, Shield } from 'lucide-react';

const Blog = () => {
  const featuredPost = {
    title: 'Understanding Healthcare Costs: A Complete Guide for Patients',
    excerpt: 'Learn how to navigate the complex world of medical billing, insurance claims, and cost comparisons to make informed healthcare decisions.',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Dr. Rajesh Sharma',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Healthcare Costs',
    featured: true,
  };

  const blogPosts = [
    {
      title: '5 Questions to Ask Before Any Surgery',
      excerpt: 'Essential questions that can help you make informed decisions about your surgical care and avoid unexpected costs.',
      image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Priya Patel',
      date: '2024-01-12',
      readTime: '5 min read',
      category: 'Patient Education',
    },
    {
      title: 'How to Appeal a Denied Insurance Claim',
      excerpt: 'Step-by-step guide to successfully appealing insurance claim denials and maximizing your coverage.',
      image: 'https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Anjali Reddy',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Insurance',
    },
    {
      title: 'The Rise of Medical Tourism in India',
      excerpt: 'Exploring how international patients are finding quality, affordable healthcare in India.',
      image: 'https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Dr. Amit Kumar',
      date: '2024-01-08',
      readTime: '7 min read',
      category: 'Healthcare Trends',
    },
    {
      title: 'Preparing for Emergency Medical Situations',
      excerpt: 'Essential steps to take before a medical emergency to ensure you get the best care at the best price.',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Dr. Rajesh Sharma',
      date: '2024-01-05',
      readTime: '4 min read',
      category: 'Emergency Care',
    },
    {
      title: 'Technology in Healthcare: Making Costs Transparent',
      excerpt: 'How digital tools are revolutionizing healthcare cost transparency and patient empowerment.',
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Ravi Krishnan',
      date: '2024-01-03',
      readTime: '6 min read',
      category: 'Technology',
    },
    {
      title: 'Success Story: How HOSPEEZY Helped Save ₹2 Lakhs',
      excerpt: 'A real patient story about finding quality cardiac care at an affordable price through HOSPEEZY.',
      image: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Anjali Reddy',
      date: '2024-01-01',
      readTime: '3 min read',
      category: 'Success Stories',
    },
  ];

  const categories = [
    { name: 'Healthcare Costs', count: 12, icon: TrendingUp },
    { name: 'Patient Education', count: 8, icon: Heart },
    { name: 'Insurance', count: 6, icon: Shield },
    { name: 'Success Stories', count: 4, icon: User },
    { name: 'Healthcare Trends', count: 3, icon: TrendingUp },
    { name: 'Emergency Care', count: 2, icon: Heart },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200" style={{ backgroundColor: '#efe5d2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Healthcare Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights, patient stories, and practical advice to help you navigate 
              the healthcare system with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-600 rounded-lg overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 text-white">
                <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured Article
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-blue-100 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{featuredPost.readTime}</span>
                  </div>
                </div>
                <button className="text-red-600 px-6 py-3 rounded-md font-semibold transition-colors flex items-center space-x-2"
                  style={{ backgroundColor: '#efe5d2' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#e5d9c0'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#efe5d2'}
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts and Sidebar */}
      <section className="py-20" style={{ backgroundColor: '#efe5d2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option>Most Recent</option>
                  <option>Most Popular</option>
                  <option>Most Relevant</option>
                </select>
              </div>
              
              <div className="space-y-8">
                {blogPosts.map((post, index) => (
                  <article key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-center mb-3">
                          <span className="bg-red-50 text-red-800 text-xs px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 cursor-pointer">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className="h-4 w-4 text-red-600" />
                        <span className="text-gray-700">{category.name}</span>
                      </div>
                      <span className="bg-red-50 text-red-800 text-xs px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-red-600 text-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
                <p className="text-red-100 mb-4">
                  Get the latest healthcare tips and HOSPEEZY updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-300 focus:outline-none"
                  />
                  <button className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={index} className="flex space-x-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 hover:text-red-600 cursor-pointer">
                          {post.title}
                        </h4>
                        <p className="text-gray-500 text-xs">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Healthcare Guidance?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Don't navigate the healthcare system alone. Our patient advocates are here to help 
            you find the best care options for your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-red-600 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
            >
              Get Help Now
            </a>
            <a
              href="/tools"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Use Our Tools
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;