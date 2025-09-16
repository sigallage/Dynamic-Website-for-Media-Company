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
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Comprehensive audit, tax, and consulting services tailored to meet your business needs. 
              Our expert team delivers reliable solutions with exceptional attention to detail.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
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

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 group-hover:bg-primary-700 transition-colors">
                    <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.shortDescription}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-sm text-gray-500 italic">
                          +{service.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-primary-600">
                        {formatPrice(service)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Custom packages available
                      </p>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
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
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Elite Audit Solutions?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We combine deep industry expertise with personalized service to deliver exceptional results for our clients.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Expert Team</h3>
              <p className="mt-2 text-gray-600">
                Certified professionals with decades of combined experience in audit, tax, and consulting services.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Proven Track Record</h3>
              <p className="mt-2 text-gray-600">
                Over 15 years of successful engagements with businesses ranging from startups to Fortune 500 companies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Results-Driven</h3>
              <p className="mt-2 text-gray-600">
                We focus on delivering measurable results that help your business achieve its financial and operational goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Contact us today to discuss your specific needs and learn how our services can benefit your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Us Today
              </Link>
              <Link to="/about" className="text-sm font-semibold leading-6 text-white">
                Learn more about us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}