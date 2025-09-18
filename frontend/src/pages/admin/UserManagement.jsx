import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { userAPI } from '../../services/api';
import AddUserForm from '../../components/admin/AddUserForm';
import {
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import '../../styles/adminDashboard.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
    users: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers({
        role: roleFilter === 'all' ? undefined : roleFilter,
        status: statusFilter === 'all' ? undefined : statusFilter,
        search: searchTerm
      });
      setUsers(response.data.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await userAPI.getUserStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      await userAPI.updateUser(userId, { isActive: newStatus });
      toast.success(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await userAPI.updateUser(userId, { role: newRole });
      toast.success('User role updated successfully');
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        await userAPI.deleteUser(userId);
        toast.success('User deleted successfully');
        fetchUsers();
        fetchStats();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: '500',
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          color: '#1d4ed8',
          border: '1px solid #bfdbfe'
        }}>
          <ShieldCheckIcon style={{width: '0.75rem', height: '0.75rem'}} />
          Admin
        </span>
      );
    }
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0.5rem',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '500',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        color: '#166534',
        border: '1px solid #dcfce7'
      }}>
        <UserIcon style={{width: '0.75rem', height: '0.75rem'}} />
        User
      </span>
    );
  };

  const getStatusBadge = (isActive) => {
    if (isActive) {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: '500',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          color: '#166534',
          border: '1px solid #dcfce7'
        }}>
          <CheckCircleIcon style={{width: '0.75rem', height: '0.75rem'}} />
          Active
        </span>
      );
    }
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0.5rem',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '500',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        color: '#dc2626',
        border: '1px solid #fecaca'
      }}>
        <XCircleIcon style={{width: '0.75rem', height: '0.75rem'}} />
        Inactive
      </span>
    );
  };

  const statusCounts = stats;

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>User Management</h1>
          <p>Manage system users and their permissions</p>
        </div>
        <div className="admin-dashboard-actions">
          <button
            onClick={() => setShowAddUserModal(true)}
            className="admin-btn primary"
          >
            <UserPlusIcon style={{width: '1rem', height: '1rem'}} />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid" style={{marginBottom: '2rem'}}>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper users">
              <UsersIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Total Users</div>
              <div className="admin-stat-value">{statusCounts.total}</div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper services">
              <CheckCircleIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Active Users</div>
              <div className="admin-stat-value">{statusCounts.active}</div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper contacts">
              <XCircleIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Inactive Users</div>
              <div className="admin-stat-value">{statusCounts.inactive}</div>
            </div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card-content">
            <div className="admin-stat-icon-wrapper blogs">
              <ShieldCheckIcon className="admin-stat-icon" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-title">Administrators</div>
              <div className="admin-stat-value">{statusCounts.admins}</div>
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
            <label className="admin-form-label">Search Users</label>
            <div className="admin-search-container">
              <MagnifyingGlassIcon className="admin-search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
                placeholder="Search by name or email..."
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="admin-form-group">
            <label className="admin-form-label">Filter by Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="admin-select"
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrators</option>
              <option value="user">Users</option>
            </select>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="admin-content-card">
        {loading ? (
          <div className="admin-loading-state">
            <div className="admin-spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="admin-empty-state">
            <UsersIcon style={{width: '3rem', height: '3rem'}} />
            <h3>No Users Found</h3>
            <p>No users found matching your criteria.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="admin-table-user">
                        <div className="admin-table-avatar">
                          <UsersIcon style={{width: '1rem', height: '1rem'}} />
                        </div>
                        <div className="admin-table-user-info">
                          <div className="admin-table-user-name">
                            {user.name}
                          </div>
                          <div className="admin-table-user-email">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                        className="admin-status-select"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={user.isActive ? 'active' : 'inactive'}
                        onChange={(e) => handleStatusUpdate(user._id, e.target.value === 'active')}
                        className="admin-status-select"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td>
                      <div className="admin-table-date">
                        {formatDate(user.lastLogin)}
                      </div>
                    </td>
                    <td>
                      <div className="admin-table-date">
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => openUserModal(user)}
                          className="admin-action-btn view"
                          title="View Details"
                        >
                          <EyeIcon style={{width: '1rem', height: '1rem'}} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
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

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>User Details</h3>
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
                  <div className="admin-form-value">{selectedUser.name}</div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Email</label>
                  <div className="admin-form-value">{selectedUser.email}</div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Role</label>
                  <div className="admin-form-value">{getRoleBadge(selectedUser.role)}</div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Status</label>
                  <div className="admin-form-value">{getStatusBadge(selectedUser.isActive)}</div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Joined</label>
                  <div className="admin-form-value">{formatDate(selectedUser.createdAt)}</div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Last Login</label>
                  <div className="admin-form-value">{formatDate(selectedUser.lastLogin)}</div>
                </div>
              </div>
            </div>
            
            <div className="admin-modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="admin-btn secondary"
              >
                Close
              </button>
              <button
                className="admin-btn primary"
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>Add New User</h2>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="admin-modal-close"
              >
                ×
              </button>
            </div>
            
            <div className="admin-modal-content">
              <AddUserForm 
                onClose={() => setShowAddUserModal(false)}
                onUserAdded={() => {
                  fetchUsers();
                  fetchStats();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}