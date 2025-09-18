import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { contactAPI } from '../../services/api';
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import '../../styles/adminDashboard.css';

export default function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [statusFilter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAllContacts({
        status: statusFilter === 'all' ? undefined : statusFilter,
        sortBy: 'submittedAt',
        sortOrder: 'desc'
      });
      
      if (response.data.success) {
        setContacts(response.data.data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await contactAPI.updateContactStatus(id, newStatus);
      toast.success('Status updated successfully');
      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the inquiry from ${name}? This action cannot be undone.`)) {
      try {
        await contactAPI.deleteContact(id);
        toast.success('Contact inquiry deleted successfully');
        fetchContacts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Failed to delete contact inquiry');
      }
    }
  };

  const openContactModal = async (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    
    // Mark as read if it's new
    if (contact.status === 'new') {
      await handleStatusUpdate(contact._id, 'in-progress');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchTerm === '' || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const configs = {
      new: { 
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        border: '1px solid #93c5fd',
        color: '#1d4ed8',
        icon: ExclamationTriangleIcon,
        label: 'New'
      },
      'in-progress': { 
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        border: '1px solid #f59e0b',
        color: '#d97706',
        icon: ClockIcon,
        label: 'In Progress'
      },
      resolved: { 
        background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        border: '1px solid #86efac',
        color: '#047857',
        icon: CheckCircleIcon,
        label: 'Resolved'
      },
      closed: { 
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        border: '1px solid #9ca3af',
        color: '#374151',
        icon: XCircleIcon,
        label: 'Closed'
      }
    };
    
    const config = configs[status] || configs.new;
    const IconComponent = config.icon;
    
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        background: config.background,
        border: config.border,
        color: config.color
      }}>
        <IconComponent style={{width: '0.75rem', height: '0.75rem', marginRight: '0.25rem'}} />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusCounts = () => {
    return {
      total: contacts.length,
      new: contacts.filter(c => c.status === 'new').length,
      inProgress: contacts.filter(c => c.status === 'in-progress').length,
      resolved: contacts.filter(c => c.status === 'resolved').length,
      closed: contacts.filter(c => c.status === 'closed').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>Contact Inquiries</h1>
          <p>Manage and respond to customer inquiries</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid" style={{marginBottom: '2rem'}}>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper contacts">
              <EnvelopeIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Total Inquiries</div>
              <div className="admin-stat-value">{statusCounts.total}</div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper blogs">
              <ClockIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">New</div>
              <div className="admin-stat-value">{statusCounts.new}</div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper services">
              <ExclamationTriangleIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">In Progress</div>
              <div className="admin-stat-value">{statusCounts.inProgress}</div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper users">
              <CheckCircleIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Resolved</div>
              <div className="admin-stat-value">{statusCounts.resolved}</div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper contacts">
              <XCircleIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Closed</div>
              <div className="admin-stat-value">{statusCounts.closed}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-content-card" style={{marginBottom: '2rem'}}>
        <div className="admin-section-header">
          <div className="admin-section-title">
            <FunnelIcon style={{width: '1rem', height: '1rem'}} />
            <span>Search & Filter</span>
          </div>
        </div>
        
        <div className="admin-form-grid">
          {/* Search */}
          <div className="admin-form-group">
            <label className="admin-form-label">Search Contacts</label>
            <div className="admin-search-container">
              <MagnifyingGlassIcon className="admin-search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
                placeholder="Search by name, email, or company..."
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="admin-form-group">
            <label className="admin-form-label">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact List */}
      <div className="admin-content-card">
        {loading ? (
          <div className="admin-loading-state">
            <div className="admin-spinner"></div>
            <p>Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="admin-empty-state">
            <EnvelopeIcon style={{width: '3rem', height: '3rem'}} />
            <h3>No Contact Inquiries</h3>
            <p>No contact inquiries found matching your criteria.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Subject</th>
                  <th>Service Interest</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>
                      <div className="admin-table-user">
                        <div className="admin-table-avatar">
                          <EnvelopeIcon style={{width: '1rem', height: '1rem'}} />
                        </div>
                        <div className="admin-table-user-info">
                          <div className="admin-table-user-name">
                            {contact.name}
                          </div>
                          <div className="admin-table-user-email">
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="admin-table-user-meta">
                              <PhoneIcon style={{width: '0.75rem', height: '0.75rem'}} />
                              {contact.phone}
                            </div>
                          )}
                          {contact.company && (
                            <div className="admin-table-user-meta">
                              <BuildingOfficeIcon style={{width: '0.75rem', height: '0.75rem'}} />
                              {contact.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="admin-table-content">
                        {contact.subject}
                      </div>
                    </td>
                    <td>
                      <div className="admin-table-content">
                        {contact.serviceInterest || 'Not specified'}
                      </div>
                    </td>
                    <td>
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                        className="admin-status-select"
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td>
                      <div className="admin-table-date">
                        {formatDate(contact.submittedAt)}
                      </div>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => openContactModal(contact)}
                          className="admin-action-btn view"
                          title="View Details"
                        >
                          <EyeIcon style={{width: '1rem', height: '1rem'}} />
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id, contact.name)}
                          className="admin-action-btn delete"
                          title="Delete"
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

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>Contact Inquiry Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="admin-modal-close"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="admin-modal-content">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label className="admin-form-label">Name</label>
                  <div className="admin-form-value">
                    {selectedContact.name}
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Email</label>
                  <div className="admin-form-value">{selectedContact.email}</div>
                </div>
                {selectedContact.phone && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Phone</label>
                    <div className="admin-form-value">{selectedContact.phone}</div>
                  </div>
                )}
                {selectedContact.company && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Company</label>
                    <div className="admin-form-value">{selectedContact.company}</div>
                  </div>
                )}
              </div>
              
              <div className="admin-form-group">
                <label className="admin-form-label">Subject</label>
                <div className="admin-form-value">{selectedContact.subject}</div>
              </div>
              
              {selectedContact.serviceInterest && (
                <div className="admin-form-group">
                  <label className="admin-form-label">Service Interest</label>
                  <div className="admin-form-value">{selectedContact.serviceInterest}</div>
                </div>
              )}
              
              <div className="admin-form-group">
                <label className="admin-form-label">Message</label>
                <div className="admin-message-display">
                  {selectedContact.message}
                </div>
              </div>
              
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label className="admin-form-label">Status</label>
                  <div className="admin-form-value">{getStatusBadge(selectedContact.status)}</div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Submitted</label>
                  <div className="admin-form-value">{formatDate(selectedContact.submittedAt)}</div>
                </div>
              </div>
              
              {selectedContact.newsletter && (
                <div className="admin-form-group">
                  <div className="admin-newsletter-indicator">
                    <CheckCircleIcon style={{width: '1rem', height: '1rem'}} />
                    <span>Subscribed to newsletter</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="admin-modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="admin-btn secondary"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                className="admin-btn primary"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}