import { useState } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { BuildingOfficeIcon, UserGroupIcon, TrophyIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    company: 'TechCorp Industries',
    position: 'Chief Financial Officer',
    content: 'Elite Audit Solutions transformed our financial reporting process. Their attention to detail and proactive approach helped us identify cost savings opportunities worth over $500K annually. The team\'s expertise in SOX compliance gave us complete confidence during our IPO process.',
    rating: 5,
    projectType: 'SOX Compliance & IPO Audit',
    industry: 'Technology',
    companySize: '500+ employees',
    results: ['$500K annual cost savings', 'Successful IPO completion', 'Zero compliance issues']
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    company: 'Global Manufacturing Corp',
    position: 'CEO',
    content: 'When we needed to restructure our operations across multiple states, Elite Audit Solutions provided invaluable guidance. Their multi-state tax expertise saved us significant costs and streamlined our compliance processes. Highly recommend their services.',
    rating: 5,
    projectType: 'Multi-State Tax Planning',
    industry: 'Manufacturing',
    companySize: '1000+ employees',
    results: ['30% reduction in tax liability', 'Streamlined compliance', 'Multi-state optimization']
  },
  {
    id: 3,
    name: 'Emily Chen',
    company: 'Riverside Healthcare',
    position: 'Director of Finance',
    content: 'The team at Elite Audit Solutions understood our unique challenges in healthcare finance. Their specialized knowledge of healthcare regulations and funding compliance was exactly what we needed. They helped us secure additional funding and improve our financial controls.',
    rating: 5,
    projectType: 'Healthcare Compliance Audit',
    industry: 'Healthcare',
    companySize: '250+ employees',
    results: ['Secured $2M funding', 'Improved controls', 'Regulatory compliance']
  },
  {
    id: 4,
    name: 'David Thompson',
    company: 'Startup Innovations LLC',
    position: 'Founder & CTO',
    content: 'As a growing startup, we needed audit services that could scale with us. Elite Audit Solutions provided flexible, cost-effective solutions that grew with our business. Their startup-focused approach and understanding of our constraints was refreshing.',
    rating: 5,
    projectType: 'Startup Financial Audit',
    industry: 'Technology Startup',
    companySize: '50+ employees',
    results: ['Successful Series A audit', 'Investor confidence', 'Scalable processes']
  },
  {
    id: 5,
    name: 'Lisa Wang',
    company: 'Retail Excellence Inc',
    position: 'VP of Operations',
    content: 'Our retail business had complex inventory and revenue recognition challenges. Elite Audit Solutions helped us implement robust controls and reporting systems that improved our operational efficiency by 25%. Their retail industry expertise was evident throughout the engagement.',
    rating: 5,
    projectType: 'Retail Operations Audit',
    industry: 'Retail',
    companySize: '300+ employees',
    results: ['25% efficiency improvement', 'Better inventory controls', 'Streamlined operations']
  }
];

const clientLogos = [
  { name: 'TechCorp Industries', industry: 'Technology' },
  { name: 'Global Manufacturing Corp', industry: 'Manufacturing' },
  { name: 'Riverside Healthcare', industry: 'Healthcare' },
  { name: 'Startup Innovations LLC', industry: 'Technology' },
  { name: 'Retail Excellence Inc', industry: 'Retail' },
  { name: 'Financial Services Pro', industry: 'Financial Services' },
  { name: 'Construction Masters', industry: 'Construction' },
  { name: 'Education Forward', industry: 'Education' },
  { name: 'Energy Solutions Ltd', industry: 'Energy' },
  { name: 'Food & Beverage Co', industry: 'Food & Beverage' },
  { name: 'Real Estate Group', industry: 'Real Estate' },
  { name: 'Transport Logistics', industry: 'Transportation' }
];

const caseStudies = [
  {
    id: 1,
    title: 'IPO Readiness for Technology Startup',
    client: 'TechCorp Industries',
    industry: 'Technology',
    challenge: 'Preparing for IPO with complex revenue recognition and internal control requirements',
    solution: 'Comprehensive SOX compliance implementation, revenue recognition analysis, and internal control design',
    results: [
      'Successful IPO with $150M raised',
      'Zero material weaknesses identified',
      'Streamlined financial reporting process',
      '6-month faster than projected timeline'
    ],
    duration: '8 months',
    teamSize: '6 specialists'
  },
  {
    id: 2,
    title: 'Multi-State Tax Optimization',
    client: 'Global Manufacturing Corp',
    industry: 'Manufacturing',
    challenge: 'Complex multi-state tax obligations with potential for significant optimization',
    solution: 'Comprehensive tax strategy review, nexus analysis, and implementation of tax-efficient structure',
    results: [
      '$750K annual tax savings',
      'Reduced compliance burden by 40%',
      'Streamlined multi-state filing process',
      'Improved cash flow management'
    ],
    duration: '4 months',
    teamSize: '4 specialists'
  },
  {
    id: 3,
    title: 'Healthcare Compliance Transformation',
    client: 'Riverside Healthcare',
    industry: 'Healthcare',
    challenge: 'Complex healthcare regulations and funding compliance requirements',
    solution: 'Specialized healthcare audit, compliance framework implementation, and staff training',
    results: [
      '100% regulatory compliance achieved',
      '$2M additional funding secured',
      'Risk exposure reduced by 60%',
      'Enhanced operational efficiency'
    ],
    duration: '6 months',
    teamSize: '5 specialists'
  }
];

const stats = [
  { icon: BuildingOfficeIcon, value: '500+', label: 'Clients Served' },
  { icon: UserGroupIcon, value: '25+', label: 'Industry Experts' },
  { icon: TrophyIcon, value: '98%', label: 'Client Satisfaction' },
  { icon: ChartBarIcon, value: '$50M+', label: 'Client Savings Generated' }
];

export default function Clients() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Our Clients
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Trusted by businesses across industries. From startups to Fortune 500 companies, 
              we deliver exceptional results that drive success and growth.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="mt-2 text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Real feedback from real clients who have experienced the Elite Audit Solutions difference.
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={prevTestimonial}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                
                <blockquote className="text-xl lg:text-2xl font-medium text-gray-900 mb-8">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className="mb-6">
                  <div className="text-lg font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-primary-600 font-medium">
                    {testimonials[currentTestimonial].position}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Project: </span>
                    <span className="text-gray-600">{testimonials[currentTestimonial].projectType}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Industry: </span>
                    <span className="text-gray-600">{testimonials[currentTestimonial].industry}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Size: </span>
                    <span className="text-gray-600">{testimonials[currentTestimonial].companySize}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Results:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {testimonials[currentTestimonial].results.map((result, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Detailed case studies showcasing how we've helped clients overcome challenges and achieve their goals.
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
                  index === selectedCaseStudy ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedCaseStudy(selectedCaseStudy === index ? -1 : index)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{study.title}</h3>
                      <p className="text-primary-600 font-medium">{study.client} • {study.industry}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>{study.duration}</div>
                      <div>{study.teamSize}</div>
                    </div>
                  </div>
                </div>

                {selectedCaseStudy === index && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                        <p className="text-gray-600 text-sm">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Our Solution</h4>
                        <p className="text-gray-600 text-sm">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Results Achieved</h4>
                        <ul className="space-y-1">
                          {study.results.map((result, idx) => (
                            <li key={idx} className="text-green-700 text-sm flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Logos */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're proud to serve clients across diverse industries, from emerging startups to established enterprises.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-gray-400 font-medium text-xs">LOGO</span>
                </div>
                <div className="text-sm font-medium text-gray-900">{client.name}</div>
                <div className="text-xs text-gray-500">{client.industry}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Join Our Success Stories?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Let us help your business achieve its financial goals with expert audit, tax, and consulting services.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start Your Success Story
              </a>
              <a href="/services" className="text-sm font-semibold leading-6 text-white">
                View our services <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}