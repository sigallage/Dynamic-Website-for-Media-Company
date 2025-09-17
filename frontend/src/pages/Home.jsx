import { Link } from 'react-router-dom';import { Link } from 'react-router-dom';import { Link } from 'react-router-dom';import { useState, useEffect } from 'react';



export default function Home() {

  return (

    <div className="bg-white">export default function Home() {import { Link } from 'react-router-dom';

      <div className="hero">

        <div className="hero-container">  return (

          <h1 className="hero-title">

            Professional Audit & Consulting Services    <div className="bg-white">export default function Home() {import { ChartBarIcon, ShieldCheckIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

          </h1>

          <p className="hero-subtitle">      <div className="hero">

            Trusted by businesses nationwide for comprehensive audit, tax, and consulting services.

          </p>        <div className="hero-container">  return (

          <div className="hero-buttons">

            <Link to="/contact" className="hero-btn-primary">          <h1 className="hero-title">

              Get Free Consultation

            </Link>            Professional Audit & <span className="text-primary-600">Consulting Services</span>    <div className="bg-white">const features = [

            <Link to="/services" className="hero-btn-secondary">

              Our Services          </h1>

            </Link>

          </div>          <p className="hero-subtitle">      {/* Hero section */}  {

        </div>

      </div>            Trusted by businesses nationwide for comprehensive audit, tax, and consulting services.

    </div>

  );          </p>      <div className="hero">    name: 'Financial Audit',

}
          <div className="hero-buttons">

            <Link to="/contact" className="hero-btn-primary">        <div className="hero-container">    description: 'Comprehensive financial statement audits ensuring compliance and accuracy for your business.',

              Get Free Consultation

            </Link>          <h1 className="hero-title">    icon: ChartBarIcon,

            <Link to="/services" className="hero-btn-secondary">

              Our Services            Professional Audit & <span className="text-primary-600">Consulting Services</span>  },

            </Link>

          </div>          </h1>  {

        </div>

      </div>          <p className="hero-subtitle">    name: 'Tax Services',



      <div className="container py-16">            Trusted by businesses nationwide for comprehensive audit, tax, and consulting services.     description: 'Expert tax planning and preparation services to optimize your tax position.',

        <div className="text-center">

          <h2 className="text-3xl font-bold text-gray-900 mb-8">            We help you maintain compliance, optimize operations, and drive sustainable growth.    icon: ShieldCheckIcon,

            Comprehensive Services

          </h2>          </p>  },

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-gray-50 p-6 rounded-lg">          <div className="hero-buttons">  {

              <h3 className="text-xl font-semibold mb-4">Financial Audit</h3>

              <p className="text-gray-600">Comprehensive audits for compliance.</p>            <Link to="/contact" className="hero-btn-primary">    name: 'Business Consulting',

            </div>

            <div className="bg-gray-50 p-6 rounded-lg">              Get Free Consultation    description: 'Strategic business advisory services to help you make informed decisions.',

              <h3 className="text-xl font-semibold mb-4">Tax Services</h3>

              <p className="text-gray-600">Expert tax planning services.</p>            </Link>    icon: UserGroupIcon,

            </div>

            <div className="bg-gray-50 p-6 rounded-lg">            <Link to="/services" className="hero-btn-secondary">  },

              <h3 className="text-xl font-semibold mb-4">Business Consulting</h3>

              <p className="text-gray-600">Strategic business advisory.</p>              Our Services →];

            </div>

          </div>            </Link>

        </div>

      </div>          </div>const stats = [

    </div>

  );        </div>  { id: 1, name: 'Clients Served', value: '500+' },

}
      </div>  { id: 2, name: 'Years Experience', value: '15+' },

  { id: 3, name: 'Successful Audits', value: '1000+' },

      {/* Simple content section */}  { id: 4, name: 'Expert Team', value: '25+' },

      <div className="container py-16">];

        <div className="text-center">

          <h2 className="text-3xl font-bold text-gray-900 mb-8">const testimonials = [

            Comprehensive Services  {

          </h2>    id: 1,

          <p className="text-lg text-gray-600 mb-8">    name: 'Sarah Johnson',

            Everything you need for financial compliance and business growth.    company: 'Tech Innovations LLC',

          </p>    position: 'CEO',

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">    content: 'Elite Audit Solutions provided exceptional service during our annual audit. Their attention to detail and professional approach gave us complete confidence.',

            <div className="bg-gray-50 p-6 rounded-lg">    rating: 5,

              <h3 className="text-xl font-semibold mb-4">Financial Audit</h3>  },

              <p className="text-gray-600">Comprehensive financial statement audits ensuring compliance and accuracy.</p>  {

            </div>    id: 2,

            <div className="bg-gray-50 p-6 rounded-lg">    name: 'Michael Chen',

              <h3 className="text-xl font-semibold mb-4">Tax Services</h3>    company: 'Global Manufacturing Corp',

              <p className="text-gray-600">Expert tax planning and preparation services to optimize your position.</p>    position: 'CFO',

            </div>    content: 'Outstanding tax advisory services. They helped us optimize our tax strategy and saved us significant costs while ensuring full compliance.',

            <div className="bg-gray-50 p-6 rounded-lg">    rating: 5,

              <h3 className="text-xl font-semibold mb-4">Business Consulting</h3>  },

              <p className="text-gray-600">Strategic business advisory services for informed decision making.</p>];

            </div>

          </div>export default function Home() {

        </div>  const [currentTestimonial, setCurrentTestimonial] = useState(0);

      </div>

    </div>  useEffect(() => {

  );    const timer = setInterval(() => {

}      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            Professional Audit & <span className="text-primary-600">Consulting Services</span>
          </h1>
          <p className="hero-subtitle">
            Trusted by businesses nationwide for comprehensive audit, tax, and consulting services. 
            We help you maintain compliance, optimize operations, and drive sustainable growth.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="hero-btn-primary">
              Get Free Consultation
            </Link>
            <Link to="/services" className="hero-btn-secondary">
              Our Services →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Feature section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Comprehensive Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for financial compliance
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From detailed financial audits to strategic business consulting, we provide the expertise 
            your business needs to thrive in today's competitive landscape.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-400">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-600">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What our clients say about us
            </p>
          </div>
          
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-opacity duration-1000 ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <figure className="text-center">
                    <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                      <p>"{testimonial.content}"</p>
                    </blockquote>
                    <figcaption className="mt-10">
                      <div className="flex items-center justify-center space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <CheckCircleIcon key={i} className="h-5 w-5 text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-base font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm leading-6 text-gray-600">
                        {testimonial.position}, {testimonial.company}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to ensure your business compliance?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Contact us today for a free consultation and discover how our expert team can help 
              your business achieve its financial goals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Free Quote
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