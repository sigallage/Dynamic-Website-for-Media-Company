import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { serviceAPI } from '../../services/api';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import '../../../src/styles/adminDashboard.css';

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchServices();
  }, [categoryFilter, statusFilter]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceAPI.getAllServices();
      if (response.data.success) {
        let fetchedServices = response.data.data;
        
        // Apply filters
        if (categoryFilter !== 'all') {
          fetchedServices = fetchedServices.filter(service => service.category === categoryFilter);
        }
        
        if (statusFilter !== 'all') {
          fetchedServices = fetchedServices.filter(service => 
            statusFilter === 'active' ? service.isActive : !service.isActive
          );
        }
        
        setServices(fetchedServices);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        await serviceAPI.deleteService(id);
        toast.success('Service deleted successfully');
        fetchServices(); // Refresh the list
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Failed to delete service');
      }
    }
  };

  const toggleServiceStatus = async (id, currentStatus) => {
    try {
      await serviceAPI.updateService(id, { isActive: !currentStatus });
      toast.success(`Service ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchServices(); // Refresh the list
    } catch (error) {
      console.error('Error updating service status:', error);
      toast.error('Failed to update service status');
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategories = () => {
    const categories = [...new Set(services.map(service => service.category))];
    return categories.sort();
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toLocaleString()}`;
    }
    return price || 'Contact for pricing';
  };

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        border: '1px solid #86efac',
        color: '#047857'
      }}>
        <CheckCircleIcon style={{width: '0.75rem', height: '0.75rem', marginRight: '0.25rem'}} />
        Active
      </span>
    ) : (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
        border: '1px solid #fca5a5',
        color: '#dc2626'
      }}>
        <XCircleIcon style={{width: '0.75rem', height: '0.75rem', marginRight: '0.25rem'}} />
        Inactive
      </span>
    );
  };

  const getDurationBadge = (duration) => {
    const durationStyles = {
      'Quick': {
        background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        border: '1px solid #86efac',
        color: '#047857'
      },
      'Standard': {
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        border: '1px solid #93c5fd',
        color: '#1e40af'
      },
      'Extended': {
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        border: '1px solid #fbbf24',
        color: '#92400e'
      },
      'Ongoing': {
        background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
        border: '1px solid #c4b5fd',
        color: '#7c3aed'
      }
    };
    
    const style = durationStyles[duration] || {
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      border: '1px solid #cbd5e1',
      color: '#475569'
    };
    
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        ...style
      }}>
        <ClockIcon style={{width: '0.75rem', height: '0.75rem', marginRight: '0.25rem'}} />
        {duration}
      </span>
    );
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>Service Management</h1>
          <p>Manage your audit and consulting services</p>
        </div>
        <div className="admin-dashboard-actions">
          <Link
            to="/admin/services/new"
            className="admin-btn admin-btn-primary"
          >
            <PlusIcon className="admin-btn-icon" />
            New Service
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid" style={{marginBottom: '2rem'}}>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper services">
              <CurrencyDollarIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Total Services</div>
              <div className="admin-stat-value">{services.length}</div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper blogs">
              <CheckCircleIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Active Services</div>
              <div className="admin-stat-value">
                {services.filter(s => s.isActive).length}
              </div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper contacts">
              <FunnelIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Categories</div>
              <div className="admin-stat-value">
                {getCategories().length}
              </div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper users">
              <EyeIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Featured Services</div>
              <div className="admin-stat-value">
                {services.filter(s => s.featured).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-content-card" style={{marginBottom: '2rem'}}>
        <div className="admin-content-card-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <FunnelIcon style={{width: '1.25rem', height: '1.25rem', color: '#6b7280'}} />
            <h3 style={{margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1f2937'}}>
              Search & Filter
            </h3>
          </div>
        </div>
        <div className="admin-content-card-body">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
            {/* Search */}
            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
                Search Services
              </label>
              <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', pointerEvents: 'none'}}>
                  <MagnifyingGlassIcon style={{width: '1.25rem', height: '1.25rem', color: '#9ca3af'}} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    background: 'white',
                    transition: 'all 0.2s ease'
                  }}
                  placeholder="Search by title, description, or category..."
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  background: 'white',
                  transition: 'all 0.2s ease'
                }}
              >
                <option value="all">All Categories</option>
                {getCategories().map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  background: 'white',
                  transition: 'all 0.2s ease'
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Service List */}
      <div className="admin-content-card">
        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner"></div>
            <span>Loading services...</span>
          </div>
        ) : filteredServices.length === 0 ? (
          <div style={{padding: '3rem', textAlign: 'center'}}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <CurrencyDollarIcon style={{width: '2rem', height: '2rem', color: '#9ca3af'}} />
            </div>
            <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>
              No services found
            </h3>
            <p style={{color: '#6b7280', marginBottom: '1.5rem'}}>
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'No services match your current search criteria.'
                : 'Get started by creating your first service.'
              }
            </p>
            <Link to="/admin/services/new" className="admin-btn admin-btn-primary">
              <PlusIcon className="admin-btn-icon" />
              Create First Service
            </Link>
          </div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead style={{background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderBottom: '2px solid #e2e8f0'}}>
                <tr>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Service
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Category
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Price
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Duration
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '1rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody style={{background: 'white'}}>
                {filteredServices.map((service) => (
                  <tr 
                    key={service._id} 
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.closest('tr').style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.target.closest('tr').style.background = 'white'}
                  >
                    <td style={{padding: '1.5rem'}}>
                      <div style={{display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                        <div style={{flex: 1, minWidth: 0}}>
                          <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                            <div style={{
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              color: '#1e293b',
                              marginRight: '0.5rem'
                            }}>
                              {service.title}
                            </div>
                            {service.featured && (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '0.125rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                                color: '#92400e',
                                border: '1px solid #fbbf24'
                              }}>
                                Featured
                              </span>
                            )}
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#64748b',
                            lineHeight: '1.4',
                            marginBottom: '0.5rem'
                          }}>
                            {service.description.substring(0, 120)}...
                          </div>
                          {service.features && service.features.length > 0 && (
                            <div style={{
                              fontSize: '0.75rem',
                              color: '#94a3b8'
                            }}>
                              {service.features.length} features included
                            </div>
                          )}
                        </div>
                        {service.icon && (
                          <div style={{
                            width: '3rem',
                            height: '3rem',
                            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #93c5fd',
                            flexShrink: 0
                          }}>
                            <span style={{color: '#3b82f6', fontSize: '1.25rem'}}>{service.icon}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{padding: '1.5rem', whiteSpace: 'nowrap'}}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                        border: '1px solid #cbd5e1',
                        color: '#475569'
                      }}>
                        {service.category}
                      </span>
                    </td>
                    <td style={{padding: '1.5rem', whiteSpace: 'nowrap'}}>
                      <div style={{display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#1e293b'}}>
                        <CurrencyDollarIcon style={{width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#94a3b8'}} />
                        {formatPrice(service.price)}
                      </div>
                    </td>
                    <td style={{padding: '1.5rem', whiteSpace: 'nowrap'}}>
                      {getDurationBadge(service.duration)}
                    </td>
                    <td style={{padding: '1.5rem', whiteSpace: 'nowrap'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        {getStatusBadge(service.isActive)}
                        <button
                          onClick={() => toggleServiceStatus(service._id, service.isActive)}
                          style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#f9fafb';
                            e.target.style.color = '#374151';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'none';
                            e.target.style.color = '#6b7280';
                          }}
                        >
                          Toggle
                        </button>
                      </div>
                    </td>
                    <td style={{padding: '1.5rem', whiteSpace: 'nowrap'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                        <Link
                          to={`/services#${service._id}`}
                          target="_blank"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '6px',
                            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                            border: '1px solid #cbd5e1',
                            color: '#64748b',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none'
                          }}
                          title="View Service"
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)';
                            e.target.style.color = '#1e293b';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
                            e.target.style.color = '#64748b';
                          }}
                        >
                          <EyeIcon style={{width: '1rem', height: '1rem'}} />
                        </Link>
                        <Link
                          to={`/admin/services/edit/${service._id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '6px',
                            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                            border: '1px solid #93c5fd',
                            color: '#3b82f6',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none'
                          }}
                          title="Edit Service"
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)';
                            e.target.style.color = '#1e40af';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
                            e.target.style.color = '#3b82f6';
                          }}
                        >
                          <PencilIcon style={{width: '1rem', height: '1rem'}} />
                        </Link>
                        <button
                          onClick={() => handleDelete(service._id, service.title)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '6px',
                            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                            border: '1px solid #fca5a5',
                            color: '#dc2626',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                          }}
                          title="Delete Service"
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)';
                            e.target.style.color = '#991b1b';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                            e.target.style.color = '#dc2626';
                          }}
                        >
                          <TrashIcon style={{width: '1rem', height: '1rem'}} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Service Categories Overview */}
      <div className="admin-content-card" style={{marginTop: '2rem'}}>
        <div className="admin-content-card-header">
          <h3 style={{margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1f2937'}}>
            Services by Category
          </h3>
        </div>
        <div className="admin-content-card-body">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
            {getCategories().map((category) => {
              const categoryServices = services.filter(s => s.category === category);
              const activeCount = categoryServices.filter(s => s.isActive).length;
              const percentage = categoryServices.length > 0 ? (activeCount / categoryServices.length) * 100 : 0;
              
              return (
                <div key={category} style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <h4 style={{fontWeight: '600', color: '#1e293b', margin: 0}}>{category}</h4>
                    <span style={{fontSize: '0.875rem', color: '#64748b', fontWeight: '500'}}>
                      {activeCount}/{categoryServices.length} active
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#e2e8f0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '0.5rem'
                  }}>
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #3b82f6, #1e40af)',
                        borderRadius: '4px',
                        transition: 'width 0.3s ease'
                      }}
                    ></div>
                  </div>
                  <div style={{fontSize: '0.75rem', color: '#94a3b8', textAlign: 'right'}}>
                    {Math.round(percentage)}% active
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}