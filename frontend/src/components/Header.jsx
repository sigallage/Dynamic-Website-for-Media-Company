import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Clients', href: '/clients' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <nav className="header-container" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="header-logo">
            Elite Audit Solutions
          </Link>
        </div>
        <div className="mobile-menu-button">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon style={{width: '24px', height: '24px'}} aria-hidden="true" />
          </button>
        </div>
        <div className="header-nav-main">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`header-nav-link ${
                location.pathname === item.href ? 'active' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="header-nav-actions">
          <Link
            to="/admin/login"
            className="header-nav-link"
          >
            Admin
          </Link>
          <Link
            to="/contact"
            className="btn btn-primary"
          >
            Get Quote
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-nav" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <Link to="/" className="header-logo" onClick={() => setMobileMenuOpen(false)}>
                Elite Audit Solutions
              </Link>
            </div>
            
            <div className="mobile-menu-links">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`mobile-menu-link ${
                    location.pathname === item.href ? 'active' : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="mobile-menu-actions">
              <Link
                to="/admin/login"
                className="mobile-menu-admin"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
              <Link
                to="/contact"
                className="mobile-menu-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}