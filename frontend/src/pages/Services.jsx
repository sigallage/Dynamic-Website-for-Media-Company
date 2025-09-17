import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  ShieldCheckIcon, 
  UserGroupIcon, 
  DocumentCheckIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import '../styles/services.css';

const serviceCategories = [
  { id: 'all', name: 'All Services' },
  { id: 'financial-audit', name: 'Financial Audit' },
  { id: 'tax-services', name: 'Tax Services' },
  { id: 'consulting', name: 'Consulting' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'specialized-services', name: 'Specialized Services' }
];

const services = [
  {
    id: 1,
    title: 'Annual Financial Audit',
    category: 'financial-audit',
    shortDescription: 'Comprehensive annual financial statement audits ensuring accuracy and compliance with accounting standards.',
    description: 'Our annual financial audit service provides a thorough examination of your financial statements, internal controls, and accounting practices. We ensure compliance with GAAP, identify potential risks, and provide valuable insights to improve your financial reporting processes.',
    icon: ChartBarIcon,
    features: [
      'Financial statement examination',
      'Internal control assessment',
      'Risk identification and mitigation',
      'GAAP compliance verification',
      'Management letter with recommendations',
      'Regulatory compliance review'
    ],
    pricing: {
      startingPrice: 5000,
      priceType: 'project-based'
    }
  },
  {
    id: 2,
    title: 'Tax Planning & Preparation',
    category: 'tax-services',
    shortDescription: 'Strategic tax planning and preparation services to minimize tax liability while ensuring full compliance.',
    description: 'Our comprehensive tax services include strategic planning, preparation, and filing of all tax returns. We help businesses and individuals optimize their tax positions while maintaining full compliance with federal, state, and local tax regulations.',
    icon: CurrencyDollarIcon,
    features: [
      'Strategic tax planning',
      'Federal and state tax preparation',
      'Tax compliance review',
      'Quarterly estimated payments',
      'Tax audit representation',
      'Multi-state tax filing'
    ],
    pricing: {
      startingPrice: 1500,
      priceType: 'project-based'
    }
  },
  {
    id: 3,
    title: 'Business Consulting',
    category: 'consulting',
    shortDescription: 'Expert business advisory services to help optimize operations and drive strategic growth.',
    description: 'Our business consulting services provide strategic guidance to help organizations improve efficiency, reduce costs, and achieve sustainable growth. We work closely with management teams to identify opportunities and implement effective solutions.',
    icon: BriefcaseIcon,
    features: [
      'Strategic planning assistance',
      'Financial analysis and modeling',
      'Process improvement recommendations',
      'Risk management strategies',
      'Performance metrics development',
      'M&A due diligence support'
    ],
    pricing: {
      startingPrice: 200,
      priceType: 'hourly'
    }
  },
  {
    id: 4,
    title: 'SOX Compliance Review',
    category: 'compliance',
    shortDescription: 'Sarbanes-Oxley compliance assessment and implementation support for public companies.',
    description: 'Comprehensive SOX compliance services including internal control assessment, documentation, testing, and remediation. We help public companies maintain compliance with Section 404 requirements and improve overall financial reporting quality.',
    icon: ShieldCheckIcon,
    features: [
      'Internal control documentation',
      'SOX 404 compliance testing',
      'Deficiency remediation support',
      'Management certification assistance',
      'Ongoing monitoring procedures',
      'Auditor coordination'
    ],
    pricing: {
      startingPrice: 15000,
      priceType: 'project-based'
    }
  },
  {
    id: 5,
    title: 'Forensic Accounting',
    category: 'specialized-services',
    shortDescription: 'Expert forensic accounting services for fraud investigation and litigation support.',
    description: 'Our forensic accounting team provides specialized services for fraud investigations, litigation support, and dispute resolution. We combine accounting expertise with investigative skills to uncover financial irregularities and provide expert testimony.',
    icon: DocumentCheckIcon,
    features: [
      'Fraud investigation and detection',
      'Economic damage calculations',
      'Expert witness testimony',
      'Asset tracing and recovery',
      'Insurance claim support',
      'Dispute resolution assistance'
    ],
    pricing: {
      startingPrice: 300,
      priceType: 'hourly'
    }
  },
  {
    id: 6,
    title: 'QuickBooks Setup & Training',
    category: 'consulting',
    shortDescription: 'Professional QuickBooks implementation, setup, and staff training services.',
    description: 'Complete QuickBooks implementation services including system setup, chart of accounts configuration, data migration, and comprehensive staff training. We ensure your accounting system is optimized for your business needs.',
    icon: UserGroupIcon,
    features: [
      'System setup and configuration',
      'Chart of accounts design',
      'Data migration assistance',
      'Staff training programs',
      'Best practices implementation',
      'Ongoing support available'
    ],
    pricing: {
      startingPrice: 2500,
      priceType: 'project-based'
    }
  }
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredServices, setFilteredServices] = useState(services);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory));
    }
  }, [selectedCategory]);

  const formatPrice = (service) => {
    const { startingPrice, priceType } = service.pricing;
    
    if (priceType === 'hourly') {
      return `Starting at $${startingPrice.toLocaleString()}/hour`;
    } else if (priceType === 'project-based') {
      return `Starting at $${startingPrice.toLocaleString()}`;
    } else {
      return 'Custom pricing';
    }
  };

  return (
    <div className="services-page">
      {/* Header */}
      <div className="services-header">
        <div className="services-header-container">
          <div className="services-header-content">
            <h1 className="services-header-title">
              Our Services
            </h1>
            <p className="services-header-description">
              Comprehensive audit, tax, and consulting services tailored to meet your business needs. 
              Our expert team delivers reliable solutions with exceptional attention to detail.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="services-filter">
        <div className="services-filter-container">
          <div className="services-filter-buttons">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`filter-button ${
                  selectedCategory === category.id ? 'active' : ''
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-main">
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="service-card"
            >
              <div className="service-card-header">
                <div className="service-icon-container">
                  <service.icon className="service-icon" aria-hidden="true" />
                </div>
                <div className="service-content">
                  <h3 className="service-title">
                    {service.title}
                  </h3>
                  <p className="service-short-description">
                    {service.shortDescription}
                  </p>
                  <p className="service-description">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="service-features">
                    <h4 className="service-features-title">Key Features:</h4>
                    <ul className="service-features-list">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="service-feature">
                          <CheckIcon className="service-feature-icon" />
                          <span className="service-feature-text">{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="service-features-more">
                          +{service.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="service-pricing">
                    <div className="service-pricing-info">
                      <p className="service-price">
                        {formatPrice(service)}
                      </p>
                      <p className="service-price-note">
                        Custom packages available
                      </p>
                    </div>
                    <Link
                      to="/contact"
                      className="service-cta-button"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-section">
        <div className="why-choose-container">
          <div className="why-choose-header">
            <h2 className="why-choose-title">
              Why Choose Elite Audit Solutions?
            </h2>
            <p className="why-choose-description">
              We combine deep industry expertise with personalized service to deliver exceptional results for our clients.
            </p>
          </div>
          
          <div className="why-choose-grid">
            <div className="why-choose-item">
              <div className="why-choose-icon-container">
                <UserGroupIcon className="why-choose-icon" />
              </div>
              <h3 className="why-choose-item-title">Expert Team</h3>
              <p className="why-choose-item-description">
                Certified professionals with decades of combined experience in audit, tax, and consulting services.
              </p>
            </div>
            
            <div className="why-choose-item">
              <div className="why-choose-icon-container">
                <ShieldCheckIcon className="why-choose-icon" />
              </div>
              <h3 className="why-choose-item-title">Proven Track Record</h3>
              <p className="why-choose-item-description">
                Over 15 years of successful engagements with businesses ranging from startups to Fortune 500 companies.
              </p>
            </div>
            
            <div className="why-choose-item">
              <div className="why-choose-icon-container">
                <ChartBarIcon className="why-choose-icon" />
              </div>
              <h3 className="why-choose-item-title">Results-Driven</h3>
              <p className="why-choose-item-description">
                We focus on delivering measurable results that help your business achieve its financial and operational goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="services-cta">
        <div className="services-cta-container">
          <div className="services-cta-content">
            <h2 className="services-cta-title">
              Ready to get started?
            </h2>
            <p className="services-cta-description">
              Contact us today to discuss your specific needs and learn how our services can benefit your business.
            </p>
            <div className="services-cta-buttons">
              <Link
                to="/contact"
                className="services-cta-primary"
              >
                Contact Us Today
              </Link>
              <Link to="/about" className="services-cta-secondary">
                Learn more about us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}