import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { serviceAPI } from '../../services/api';
import {
  ArrowLeftIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import '../../styles/adminDashboard.css';

export default function ServiceCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: 'financial-audit',
    features: [''],
    pricing: {
      startingPrice: 0,
      currency: 'USD',
      priceType: 'custom'
    },
    icon: 'BriefcaseIcon',
    isActive: true,
    displayOrder: 0
  });

  const categoryOptions = [
    { value: 'financial-audit', label: 'Financial Audit' },
    { value: 'tax-services', label: 'Tax Services' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'specialized-services', label: 'Specialized Services' }
  ];

  const priceTypeOptions = [
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'hourly', label: 'Hourly Rate' },
    { value: 'project-based', label: 'Project Based' },
    { value: 'custom', label: 'Custom Pricing' }
  ];

  const iconOptions = [
    { value: 'BriefcaseIcon', label: 'Briefcase' },
    { value: 'ChartBarIcon', label: 'Chart Bar' },
    { value: 'CurrencyDollarIcon', label: 'Currency Dollar' },
    { value: 'ShieldCheckIcon', label: 'Shield Check' },
    { value: 'DocumentCheckIcon', label: 'Document Check' },
    { value: 'UserGroupIcon', label: 'User Group' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'number' ? Number(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, features: newFeatures }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Service title is required');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Service description is required');
      return;
    }
    
    if (!formData.shortDescription.trim()) {
      toast.error('Short description is required');
      return;
    }

    if (formData.shortDescription.length > 200) {
      toast.error('Short description must be 200 characters or less');
      return;
    }

    const validFeatures = formData.features.filter(feature => feature.trim());
    if (validFeatures.length === 0) {
      toast.error('At least one feature is required');
      return;
    }

    setLoading(true);
    try {
      const serviceData = {
        ...formData,
        features: validFeatures
      };

      await serviceAPI.createService(serviceData);
      toast.success('Service created successfully!');
      navigate('/admin/services');
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error(error.response?.data?.message || 'Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-blog-create">
      {/* Header */}
      <div className="admin-blog-create-header">
        <div className="admin-blog-create-header-content">
          <div className="admin-blog-create-header-left">
            <button
              onClick={() => navigate('/admin/services')}
              className="admin-blog-create-back-btn"
            >
              <ArrowLeftIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
            <div>
              <h1 className="admin-blog-create-title">
                Create New Service
              </h1>
              <p className="admin-blog-create-subtitle">
                Add a new service to your offerings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="admin-blog-create-form">
        <form onSubmit={handleSubmit}>
          <div className="admin-blog-create-form-content">
            <div className="admin-blog-create-form-grid">
              {/* Basic Information */}
              <div className="admin-blog-create-form-section">
                <h2 className="admin-blog-create-section-title">Basic Information</h2>
                
                <div className="admin-blog-create-form-row">
                  <div className="admin-blog-create-form-group">
                    <label htmlFor="title" className="admin-blog-create-form-label">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="admin-blog-create-form-input"
                      placeholder="Enter service title"
                      required
                    />
                  </div>

                  <div className="admin-blog-create-form-group">
                    <label htmlFor="category" className="admin-blog-create-form-label">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="admin-blog-create-form-select"
                      required
                    >
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="admin-blog-create-form-group">
                  <label htmlFor="shortDescription" className="admin-blog-create-form-label">
                    Short Description * ({formData.shortDescription.length}/200)
                  </label>
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className="admin-blog-create-form-textarea"
                    rows={3}
                    placeholder="Brief description for service cards"
                    maxLength={200}
                    required
                  />
                </div>

                <div className="admin-blog-create-form-group">
                  <label htmlFor="description" className="admin-blog-create-form-label">
                    Full Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="admin-blog-create-form-textarea"
                    rows={6}
                    placeholder="Detailed service description"
                    required
                  />
                </div>
              </div>

              {/* Features */}
              <div className="admin-blog-create-form-section">
                <h2 className="admin-blog-create-section-title">Service Features</h2>
                
                {formData.features.map((feature, index) => (
                  <div key={index} className="admin-blog-create-form-group" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                      <div style={{ flex: 1 }}>
                        <label className="admin-blog-create-form-label">
                          Feature {index + 1} {index === 0 && '*'}
                        </label>
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="admin-blog-create-form-input"
                          placeholder="Enter service feature"
                          required={index === 0}
                        />
                      </div>
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="admin-blog-create-btn admin-blog-create-btn-danger"
                          style={{ padding: '0.5rem' }}
                        >
                          <XMarkIcon style={{ width: '1rem', height: '1rem' }} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addFeature}
                  className="admin-blog-create-btn admin-blog-create-btn-secondary"
                >
                  <PlusIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  Add Feature
                </button>
              </div>

              {/* Pricing */}
              <div className="admin-blog-create-form-section">
                <h2 className="admin-blog-create-section-title">Pricing Information</h2>
                
                <div className="admin-blog-create-form-row">
                  <div className="admin-blog-create-form-group">
                    <label htmlFor="pricing.priceType" className="admin-blog-create-form-label">
                      Price Type
                    </label>
                    <select
                      id="pricing.priceType"
                      name="pricing.priceType"
                      value={formData.pricing.priceType}
                      onChange={handleInputChange}
                      className="admin-blog-create-form-select"
                    >
                      {priceTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-blog-create-form-group">
                    <label htmlFor="pricing.startingPrice" className="admin-blog-create-form-label">
                      Starting Price ($)
                    </label>
                    <input
                      type="number"
                      id="pricing.startingPrice"
                      name="pricing.startingPrice"
                      value={formData.pricing.startingPrice}
                      onChange={handleInputChange}
                      className="admin-blog-create-form-input"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Settings */}
              <div className="admin-blog-create-form-section">
                <h2 className="admin-blog-create-section-title">Additional Settings</h2>
                
                <div className="admin-blog-create-form-row">
                  <div className="admin-blog-create-form-group">
                    <label htmlFor="icon" className="admin-blog-create-form-label">
                      Icon
                    </label>
                    <select
                      id="icon"
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="admin-blog-create-form-select"
                    >
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-blog-create-form-group">
                    <label htmlFor="displayOrder" className="admin-blog-create-form-label">
                      Display Order
                    </label>
                    <input
                      type="number"
                      id="displayOrder"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleInputChange}
                      className="admin-blog-create-form-input"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="admin-blog-create-form-group">
                  <label className="admin-blog-create-form-checkbox-wrapper">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="admin-blog-create-form-checkbox"
                    />
                    <span className="admin-blog-create-form-checkbox-label">
                      Service is active and visible to users
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="admin-blog-create-form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/admin/services')}
                  className="admin-blog-form-btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-blog-form-btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Service'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}