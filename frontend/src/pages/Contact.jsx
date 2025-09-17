import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/api';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import '../styles/contact.css';

const contactInfo = {
  address: {
    street: '123 Business District',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States'
  },
  phone: '+1 (555) 123-4567',
  email: 'info@eliteaudit.com',
  hours: {
    weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
    weekends: 'Saturday: 9:00 AM - 2:00 PM',
    closed: 'Sunday: Closed'
  }
};

const offices = [
  {
    name: 'New York Headquarters',
    address: '123 Business District, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'ny@eliteaudit.com'
  },
  {
    name: 'Los Angeles Office',
    address: '456 Corporate Center, Los Angeles, CA 90210',
    phone: '+1 (555) 987-6543',
    email: 'la@eliteaudit.com'
  },
  {
    name: 'Chicago Office',
    address: '789 Financial Plaza, Chicago, IL 60601',
    phone: '+1 (555) 456-7890',
    email: 'chicago@eliteaudit.com'
  }
];

const serviceInterests = [
  'Financial Audit',
  'Tax Services',
  'Business Consulting',
  'SOX Compliance',
  'Forensic Accounting',
  'QuickBooks Setup',
  'Other'
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await contactAPI.submitContact(data);
      
      if (response.data.success) {
        toast.success(response.data.message);
        reset();
      } else {
        toast.error(response.data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <div className="contact-header-container">
          <div className="contact-header-content">
            <h1 className="contact-header-title">
              Contact Us
            </h1>
            <p className="contact-header-description">
              Ready to get started? We'd love to hear from you. Send us a message and we'll 
              respond as soon as possible to discuss your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form and Info */}
      <div className="contact-main">
        <div className="contact-main-container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="contact-form-title">
                Get in Touch
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName', { required: 'First name is required' })}
                      className="form-input"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="form-error">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName', { required: 'Last name is required' })}
                      className="form-input"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="form-error">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="form-input"
                    placeholder="john.doe@company.com"
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    {...register('company')}
                    className="form-input"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serviceInterest" className="form-label">
                    Service of Interest
                  </label>
                  <select
                    id="serviceInterest"
                    {...register('serviceInterest')}
                    className="form-select"
                  >
                    <option value="">Select a service</option>
                    {serviceInterests.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className="form-input"
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="form-error">{errors.subject.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', { required: 'Message is required' })}
                    className="form-textarea"
                    placeholder="Please provide details about your inquiry..."
                  />
                  {errors.message && (
                    <p className="form-error">{errors.message.message}</p>
                  )}
                </div>

                <div className="form-checkbox-group">
                  <input
                    type="checkbox"
                    id="newsletter"
                    {...register('newsletter')}
                    className="form-checkbox"
                  />
                  <label htmlFor="newsletter" className="form-checkbox-label">
                    I would like to receive updates and insights via email
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-submit-btn"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="loading-spinner"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2 className="contact-info-title">
                Contact Information
              </h2>

              <div className="contact-info-list">
                {/* Main Contact Info */}
                <div className="contact-info-card">
                  <div className="contact-info-items">
                    <div className="contact-info-item">
                      <MapPinIcon className="contact-info-icon" />
                      <div className="contact-info-content">
                        <h3>Address</h3>
                        <p>
                          {contactInfo.address.street}<br />
                          {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}<br />
                          {contactInfo.address.country}
                        </p>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <PhoneIcon className="contact-info-icon" />
                      <div className="contact-info-content">
                        <h3>Phone</h3>
                        <p>{contactInfo.phone}</p>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <EnvelopeIcon className="contact-info-icon" />
                      <div className="contact-info-content">
                        <h3>Email</h3>
                        <p>{contactInfo.email}</p>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <ClockIcon className="contact-info-icon" />
                      <div className="contact-info-content">
                        <h3>Business Hours</h3>
                        <div className="contact-info-hours">
                          <p>{contactInfo.hours.weekdays}</p>
                          <p>{contactInfo.hours.weekends}</p>
                          <p>{contactInfo.hours.closed}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Response Promise */}
                <div className="quick-response-card">
                  <div className="quick-response-content">
                    <CheckCircleIcon className="quick-response-icon" />
                    <div className="quick-response-text">
                      <h3>Quick Response Guarantee</h3>
                      <p>
                        We respond to all inquiries within 24 hours during business days. 
                        For urgent matters, please call us directly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="locations-section">
        <div className="locations-container">
          <div className="locations-header">
            <h2 className="locations-title">
              Our Locations
            </h2>
            <p className="locations-description">
              With offices across major business centers, we're here to serve you locally.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="map-placeholder">
            <div className="map-placeholder-content">
              <MapPinIcon className="map-placeholder-icon" />
              <p className="map-placeholder-title">Interactive Map Integration</p>
              <p className="map-placeholder-subtitle">Google Maps or similar service would be embedded here</p>
            </div>
          </div>

          {/* Office Locations */}
          <div className="offices-grid">
            {offices.map((office, index) => (
              <div key={index} className="office-card">
                <h3 className="office-name">{office.name}</h3>
                <div className="office-details">
                  <div className="office-detail">
                    <MapPinIcon className="office-detail-icon" />
                    <p className="office-detail-text">{office.address}</p>
                  </div>
                  <div className="office-detail">
                    <PhoneIcon className="office-detail-icon" />
                    <p className="office-detail-text">{office.phone}</p>
                  </div>
                  <div className="office-detail">
                    <EnvelopeIcon className="office-detail-icon" />
                    <p className="office-detail-text">{office.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <h2 className="faq-title">
              Frequently Asked Questions
            </h2>
            <p className="faq-description">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="faq-grid">
            <div className="faq-column">
              <div className="faq-item">
                <h3 className="faq-question">
                  How quickly can you start our audit?
                </h3>
                <p className="faq-answer">
                  We typically can begin new engagements within 2-3 weeks of initial consultation, 
                  depending on the scope and our current capacity. Rush engagements may be accommodated.
                </p>
              </div>
              
              <div className="faq-item">
                <h3 className="faq-question">
                  Do you work with small businesses?
                </h3>
                <p className="faq-answer">
                  Absolutely! We serve businesses of all sizes, from startups to Fortune 500 companies. 
                  Our services are tailored to meet the specific needs and budget of each client.
                </p>
              </div>
              
              <div className="faq-item">
                <h3 className="faq-question">
                  What industries do you specialize in?
                </h3>
                <p className="faq-answer">
                  Our team has expertise across multiple industries including technology, healthcare, 
                  manufacturing, retail, and financial services. We adapt our approach to each industry's unique requirements.
                </p>
              </div>
            </div>

            <div className="faq-column">
              <div className="faq-item">
                <h3 className="faq-question">
                  How do you ensure data security?
                </h3>
                <p className="faq-answer">
                  We maintain strict confidentiality protocols and use secure, encrypted systems for all 
                  client data. Our team is trained in the latest cybersecurity best practices.
                </p>
              </div>
              
              <div className="faq-item">
                <h3 className="faq-question">
                  Can you help with tax planning?
                </h3>
                <p className="faq-answer">
                  Yes, our tax services include both preparation and strategic planning. We help clients 
                  optimize their tax position while ensuring full compliance with all regulations.
                </p>
              </div>
              
              <div className="faq-item">
                <h3 className="faq-question">
                  Do you offer virtual consultations?
                </h3>
                <p className="faq-answer">
                  We offer both in-person and virtual consultations to accommodate our clients' preferences 
                  and schedules. Many of our services can be delivered remotely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}