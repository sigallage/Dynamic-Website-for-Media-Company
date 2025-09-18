import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-900">
      <div className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            Professional Audit & <span className="text-primary-600">Consulting Services</span>
          </h1>
          <p className="hero-subtitle">
            Trusted by businesses nationwide for comprehensive audit, tax, and consulting services.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="hero-btn-primary">
              Get Free Consultation
            </Link>
            <Link to="/services" className="hero-btn-secondary">
              Our Services
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Comprehensive Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Financial Audit</h3>
              <p className="text-gray-600">Comprehensive audits for compliance.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Tax Services</h3>
              <p className="text-gray-600">Expert tax planning services.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Business Consulting</h3>
              <p className="text-gray-600">Strategic business advisory.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
