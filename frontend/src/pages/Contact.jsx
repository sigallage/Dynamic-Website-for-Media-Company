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
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Ready to get started? We'd love to hear from you. Send us a message and we'll 
              respond as soon as possible to discuss your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form and Info */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                Get in Touch
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName', { required: 'First name is required' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register('lastName', { required: 'Last name is required' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="john.doe@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    {...register('company')}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="serviceInterest" className="block text-sm font-medium text-gray-700 mb-2">
                    Service of Interest
                  </label>
                  <select
                    id="serviceInterest"
                    {...register('serviceInterest')}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Select a service</option>
                    {serviceInterests.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', { required: 'Message is required' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Please provide details about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    {...register('newsletter')}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                    I would like to receive updates and insights via email
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                {/* Main Contact Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPinIcon className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Address</h3>
                        <p className="text-gray-600">
                          {contactInfo.address.street}<br />
                          {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}<br />
                          {contactInfo.address.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <PhoneIcon className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-600">{contactInfo.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <EnvelopeIcon className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600">{contactInfo.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <ClockIcon className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Business Hours</h3>
                        <div className="text-gray-600 text-sm space-y-1">
                          <p>{contactInfo.hours.weekdays}</p>
                          <p>{contactInfo.hours.weekends}</p>
                          <p>{contactInfo.hours.closed}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Response Promise */}
                <div className="bg-primary-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Quick Response Guarantee</h3>
                      <p className="text-gray-600 text-sm">
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
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Locations
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              With offices across major business centers, we're here to serve you locally.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="aspect-video bg-gray-200 rounded-lg mb-12 flex items-center justify-center">
            <div className="text-center">
              <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Interactive Map Integration</p>
              <p className="text-sm text-gray-400">Google Maps or similar service would be embedded here</p>
            </div>
          </div>

          {/* Office Locations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{office.name}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <MapPinIcon className="h-4 w-4 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-600">{office.address}</p>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <p className="text-gray-600">{office.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <p className="text-gray-600">{office.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How quickly can you start our audit?
                </h3>
                <p className="text-gray-600">
                  We typically can begin new engagements within 2-3 weeks of initial consultation, 
                  depending on the scope and our current capacity. Rush engagements may be accommodated.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you work with small businesses?
                </h3>
                <p className="text-gray-600">
                  Absolutely! We serve businesses of all sizes, from startups to Fortune 500 companies. 
                  Our services are tailored to meet the specific needs and budget of each client.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What industries do you specialize in?
                </h3>
                <p className="text-gray-600">
                  Our team has expertise across multiple industries including technology, healthcare, 
                  manufacturing, retail, and financial services. We adapt our approach to each industry's unique requirements.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do you ensure data security?
                </h3>
                <p className="text-gray-600">
                  We maintain strict confidentiality protocols and use secure, encrypted systems for all 
                  client data. Our team is trained in the latest cybersecurity best practices.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can you help with tax planning?
                </h3>
                <p className="text-gray-600">
                  Yes, our tax services include both preparation and strategic planning. We help clients 
                  optimize their tax position while ensuring full compliance with all regulations.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer virtual consultations?
                </h3>
                <p className="text-gray-600">
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