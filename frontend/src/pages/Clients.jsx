import { useState } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { BuildingOfficeIcon, UserGroupIcon, TrophyIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import '../styles/clients.css';

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
        className={`star-icon ${i < rating ? 'filled' : 'empty'}`}
      />
    ));
  };

  return (
    <div className="clients-page">
      {/* Header */}
      <div className="clients-header">
        <div className="clients-header-container">
          <div className="clients-header-content">
            <h1 className="clients-header-title">
              Our Clients
            </h1>
            <p className="clients-header-description">
              Trusted by businesses across industries. From startups to Fortune 500 companies, 
              we deliver exceptional results that drive success and growth.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon-container">
                  <stat.icon className="stat-icon" />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2 className="testimonials-title">
              What Our Clients Say
            </h2>
            <p className="testimonials-description">
              Real feedback from real clients who have experienced the Elite Audit Solutions difference.
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-navigation">
              <button
                onClick={prevTestimonial}
                className="nav-button"
              >
                <ChevronLeftIcon className="nav-icon" />
              </button>
              
              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`dot-button ${
                      index === currentTestimonial ? 'active' : ''
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="nav-button"
              >
                <ChevronRightIcon className="nav-icon" />
              </button>
            </div>

            <div className="testimonial-content">
              <div className="testimonial-stars">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <blockquote className="testimonial-quote">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div className="testimonial-author">
                <div className="author-name">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="author-position">
                  {testimonials[currentTestimonial].position}
                </div>
                <div className="author-company">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="case-studies-section">
        <div className="case-studies-container">
          <div className="case-studies-header">
            <h2 className="case-studies-title">
              Success Stories
            </h2>
            <p className="case-studies-description">
              Detailed case studies showcasing how we've helped clients overcome challenges and achieve their goals.
            </p>
          </div>

          <div className="case-studies-list">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`case-study-item ${
                  index === selectedCaseStudy ? 'selected' : ''
                }`}
              >
                <div
                  className="case-study-header-section"
                  onClick={() => setSelectedCaseStudy(selectedCaseStudy === index ? -1 : index)}
                >
                  <div className="case-study-header-content">
                    <div>
                      <h3 className="case-study-item-title">{study.title}</h3>
                      <p className="case-study-client-info">{study.client} • {study.industry}</p>
                    </div>
                    <div className="case-study-meta">
                      <div>{study.duration}</div>
                      <div>{study.teamSize}</div>
                    </div>
                  </div>
                </div>

                {selectedCaseStudy === index && (
                  <div className="case-study-details">
                    <div className="case-study-details-grid">
                      <div>
                        <h4 className="detail-section-title">Challenge</h4>
                        <p className="detail-section-content">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="detail-section-title">Our Solution</h4>
                        <p className="detail-section-content">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="detail-section-title">Results Achieved</h4>
                        <ul className="results-list">
                          {study.results.map((result, idx) => (
                            <li key={idx} className="result-item">
                              <span className="result-checkmark">✓</span>
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
      <div className="client-logos-section">
        <div className="client-logos-container">
          <div className="client-logos-header">
            <h2 className="client-logos-title">
              Trusted by Industry Leaders
            </h2>
            <p className="client-logos-description">
              We're proud to serve clients across diverse industries, from emerging startups to established enterprises.
            </p>
          </div>

          <div className="client-logos-grid">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="client-logo-card"
              >
                <div className="client-logo-placeholder">
                  <span className="logo-placeholder-text">LOGO</span>
                </div>
                <div className="client-name">{client.name}</div>
                <div className="client-industry">{client.industry}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Join Our Success Stories?
            </h2>
            <p className="cta-description">
              Let us help your business achieve its financial goals with expert audit, tax, and consulting services.
            </p>
            <div className="cta-buttons">
              <a
                href="/contact"
                className="cta-primary-button"
              >
                Start Your Success Story
              </a>
              <a href="/services" className="cta-secondary-button">
                View our services <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}