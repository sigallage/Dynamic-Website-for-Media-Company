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
import { serviceAPI } from '../services/api';
import '../styles/services.css';

const serviceCategories = [
  { id: 'all', name: 'All Services' },
  { id: 'financial-audit', name: 'Financial Audit' },
  { id: 'tax-services', name: 'Tax Services' },
  { id: 'consulting', name: 'Consulting' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'specialized-services', name: 'Specialized Services' }
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceAPI.getAllServices();
      
      // Handle the API response format: direct array of services
      if (Array.isArray(response.data)) {
        const activeServices = response.data.filter(service => service.isActive);
        setServices(activeServices);
        setFilteredServices(activeServices);
      } else {
        console.error('Unexpected API response format:', response.data);
        // Fallback to empty array
        setServices([]);
        setFilteredServices([]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback to empty array
      setServices([]);
      setFilteredServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory));
    }
  }, [selectedCategory, services]);

  const formatPrice = (service) => {
    if (!service.pricing) return 'Custom pricing';
    
    const { startingPrice, priceType } = service.pricing;
    
    if (priceType === 'hourly') {
      return `Starting at $${startingPrice.toLocaleString()}/hour`;
    } else if (priceType === 'project-based') {
      return `Starting at $${startingPrice.toLocaleString()}`;
    } else {
      return 'Custom pricing';
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      'ChartBarIcon': ChartBarIcon,
      'CurrencyDollarIcon': CurrencyDollarIcon,
      'BriefcaseIcon': BriefcaseIcon,
      'ShieldCheckIcon': ShieldCheckIcon,
      'DocumentCheckIcon': DocumentCheckIcon,
      'UserGroupIcon': UserGroupIcon
    };
    
    return iconMap[iconName] || BriefcaseIcon;
  };

  if (loading) {
    return (
      <div className="services-page">
        <div className="services-header">
          <div className="services-header-container">
            <div className="services-header-content">
              <h1 className="services-header-title">Our Services</h1>
              <p className="services-header-description">Loading services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          {filteredServices.map((service) => {
            const IconComponent = getIconComponent(service.icon);
            return (
            <div
              key={service._id}
              className="service-card"
            >
              <div className="service-card-header">
                <div className="service-icon-container">
                  <IconComponent className="service-icon" aria-hidden="true" />
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
            );
          })}
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