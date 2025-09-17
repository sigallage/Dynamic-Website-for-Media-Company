import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

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
            <span className="sr-only">Open main menu</span>
            <Bars3Icon style={{width: '24px', height: '24px'}} aria-hidden="true" />
          </button>
        </div>
        <div className="header-nav">
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
        <div className="header-nav" style={{justifyContent: 'flex-end', gap: '1rem'}}>
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
        <div className="mobile-menu">
          <div className="mobile-menu-nav">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
              <Link to="/" className="header-logo">
                Elite Audit
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{background: 'none', border: 'none', cursor: 'pointer'}}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon style={{width: '24px', height: '24px'}} aria-hidden="true" />
              </button>
            </div>
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
            <Link
              to="/admin/login"
              className="mobile-menu-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Login
            </Link>
            <Link
              to="/contact"
              className="btn btn-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}