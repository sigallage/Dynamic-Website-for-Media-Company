import React, { useState } from 'react';
import { userAPI } from '../../services/api';
import toast from 'react-hot-toast';

function AddUserForm({ onClose, onUserAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    isActive: true
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await userAPI.createUser(formData);
      toast.success('User created successfully');
      onUserAdded();
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      const message = error.response?.data?.message || 'Failed to create user';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label className="admin-form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="admin-form-input"
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="admin-form-input"
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="admin-form-input"
            placeholder="Enter password (min 6 characters)"
            minLength="6"
            required
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="admin-form-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Status</label>
          <div className="admin-checkbox-group">
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="admin-checkbox"
              />
              <span className="admin-checkbox-text">Active User</span>
            </label>
          </div>
        </div>
      </div>

      <div className="admin-form-footer">
        <button
          type="button"
          onClick={onClose}
          className="admin-btn secondary"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="admin-btn primary"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </div>
    </form>
  );
}

export default AddUserForm;