import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authAPI } from '../../services/api';
import {
  Cog6ToothIcon,
  UserIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  BellIcon,
  CameraIcon,
  KeyIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import '../../styles/adminDashboard.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Elite Audit Firm',
    siteDescription: 'Professional Audit and Consulting Services',
    adminEmail: 'admin@eliteaudit.com',
    supportEmail: 'support@eliteaudit.com',
    timezone: 'America/New_York',
    language: 'en',
    maintenanceMode: false
  });

  // Company Settings
  const [companySettings, setCompanySettings] = useState({
    companyName: 'Elite Audit Firm',
    address: '123 Business Street, Corporate City, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'info@eliteaudit.com',
    website: 'https://eliteaudit.com',
    taxId: '12-3456789',
    registrationNumber: 'REG123456789'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newContactAlerts: true,
    blogComments: false,
    systemUpdates: true,
    marketingEmails: false,
    securityAlerts: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
    ipRestriction: false,
    allowedIPs: ''
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Profile Data State
  const [profileData, setProfileData] = useState({
    fullName: 'John Administrator',
    email: 'admin@eliteaudit.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'System Administrator'
  });

  const tabs = [
    { id: 'general', name: 'General', icon: Cog6ToothIcon },
    { id: 'company', name: 'Company', icon: BuildingOfficeIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'profile', name: 'Profile', icon: UserIcon }
  ];

  // Load user profile on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        if (response.data.success) {
          const user = response.data.data;
          setProfileData({
            fullName: user.name || 'John Administrator',
            email: user.email || 'admin@eliteaudit.com',
            phone: user.phone || '+1 (555) 123-4567',
            jobTitle: user.jobTitle || 'System Administrator'
          });
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
        // Keep default values if API call fails
      }
    };

    loadUserProfile();
  }, []);

  const handleSaveSettings = async (settingsType) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${settingsType} settings saved successfully`);
    } catch (error) {
      toast.error(`Failed to save ${settingsType} settings`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Password change error:', error);
      const message = error.response?.data?.message || 'Failed to change password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      await authAPI.updateProfile(profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-header">
        <h3>General Settings</h3>
        <p>Configure basic site settings and preferences</p>
      </div>
      
      <div className="admin-settings-form">
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-form-label">Site Name</label>
            <input
              type="text"
              value={generalSettings.siteName}
              onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
              className="admin-form-input"
              placeholder="Enter site name"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Admin Email</label>
            <input
              type="email"
              value={generalSettings.adminEmail}
              onChange={(e) => setGeneralSettings({...generalSettings, adminEmail: e.target.value})}
              className="admin-form-input"
              placeholder="Enter admin email"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Support Email</label>
            <input
              type="email"
              value={generalSettings.supportEmail}
              onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
              className="admin-form-input"
              placeholder="Enter support email"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Timezone</label>
            <select
              value={generalSettings.timezone}
              onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
              className="admin-form-select"
            >
              <option value="America/New_York">Eastern Time (EST)</option>
              <option value="America/Chicago">Central Time (CST)</option>
              <option value="America/Denver">Mountain Time (MST)</option>
              <option value="America/Los_Angeles">Pacific Time (PST)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div className="admin-form-group span-2">
            <label className="admin-form-label">Site Description</label>
            <textarea
              value={generalSettings.siteDescription}
              onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
              className="admin-form-input"
              rows="3"
              placeholder="Enter site description"
            />
          </div>

          <div className="admin-form-group span-2">
            <div className="admin-checkbox-group">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={generalSettings.maintenanceMode}
                  onChange={(e) => setGeneralSettings({...generalSettings, maintenanceMode: e.target.checked})}
                  className="admin-checkbox"
                />
                <span className="admin-checkbox-text">Enable Maintenance Mode</span>
              </label>
            </div>
          </div>
        </div>

        <div className="admin-settings-actions">
          <button
            onClick={() => handleSaveSettings('General')}
            disabled={loading}
            className="admin-btn primary"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderCompanySettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-header">
        <h3>Company Information</h3>
        <p>Manage your company details and contact information</p>
      </div>
      
      <div className="admin-settings-form">
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-form-label">Company Name</label>
            <input
              type="text"
              value={companySettings.companyName}
              onChange={(e) => setCompanySettings({...companySettings, companyName: e.target.value})}
              className="admin-form-input"
              placeholder="Enter company name"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Phone Number</label>
            <input
              type="tel"
              value={companySettings.phone}
              onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})}
              className="admin-form-input"
              placeholder="Enter phone number"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Email Address</label>
            <input
              type="email"
              value={companySettings.email}
              onChange={(e) => setCompanySettings({...companySettings, email: e.target.value})}
              className="admin-form-input"
              placeholder="Enter email address"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Website</label>
            <input
              type="url"
              value={companySettings.website}
              onChange={(e) => setCompanySettings({...companySettings, website: e.target.value})}
              className="admin-form-input"
              placeholder="Enter website URL"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Tax ID</label>
            <input
              type="text"
              value={companySettings.taxId}
              onChange={(e) => setCompanySettings({...companySettings, taxId: e.target.value})}
              className="admin-form-input"
              placeholder="Enter tax ID"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Registration Number</label>
            <input
              type="text"
              value={companySettings.registrationNumber}
              onChange={(e) => setCompanySettings({...companySettings, registrationNumber: e.target.value})}
              className="admin-form-input"
              placeholder="Enter registration number"
            />
          </div>

          <div className="admin-form-group span-2">
            <label className="admin-form-label">Address</label>
            <textarea
              value={companySettings.address}
              onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
              className="admin-form-input"
              rows="3"
              placeholder="Enter company address"
            />
          </div>
        </div>

        <div className="admin-settings-actions">
          <button
            onClick={() => handleSaveSettings('Company')}
            disabled={loading}
            className="admin-btn primary"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-header">
        <h3>Notification Preferences</h3>
        <p>Configure how and when you receive notifications</p>
      </div>
      
      <div className="admin-settings-form">
        <div className="admin-notification-groups">
          <div className="admin-notification-group">
            <h4>Email Notifications</h4>
            <div className="admin-notification-options">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                  className="admin-checkbox"
                />
                <span className="admin-checkbox-text">Enable email notifications</span>
              </label>

              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.newContactAlerts}
                  onChange={(e) => setNotificationSettings({...notificationSettings, newContactAlerts: e.target.checked})}
                  className="admin-checkbox"
                />
                <span className="admin-checkbox-text">New contact form submissions</span>
              </label>

              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.blogComments}
                  onChange={(e) => setNotificationSettings({...notificationSettings, blogComments: e.target.checked})}
                  className="admin-checkbox"
                />
                <span className="admin-checkbox-text">Blog comments and reviews</span>
              </label>
            </div>
          </div>

          <div className="admin-notification-group">
            <h4>System Notifications</h4>
            <div className="admin-notification-options">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.systemUpdates}
                  onChange={(e) => setNotificationSettings({...notificationSettings, systemUpdates: e.target.checked})}
                  className="admin-checkbox"
                />
                <span className="admin-checkbox-text">System updates and maintenance</span>
              </label>

              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.securityAlerts}
                  onChange={(e) => setNotificationSettings({...notificationSettings, securityAlerts: e.target.checked})}
                  className="admin-checkbox"
                />
                <span className="admin-checkbox-text">Security alerts and warnings</span>
              </label>

              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.marketingEmails}
                  onChange={(e) => setNotificationSettings({...notificationSettings, marketingEmails: e.target.checked})}
                  className="admin-checkbox"
                />
                <span className="admin-checkbox-text">Marketing and promotional emails</span>
              </label>
            </div>
          </div>
        </div>

        <div className="admin-settings-actions">
          <button
            onClick={() => handleSaveSettings('Notification')}
            disabled={loading}
            className="admin-btn primary"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-header">
        <h3>Security Settings</h3>
        <p>Configure security options and access controls</p>
      </div>
      
      <div className="admin-settings-form">
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-form-label">Session Timeout (minutes)</label>
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
              className="admin-form-select"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password Expiry (days)</label>
            <select
              value={securitySettings.passwordExpiry}
              onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
              className="admin-form-select"
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Max Login Attempts</label>
            <select
              value={securitySettings.loginAttempts}
              onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: e.target.value})}
              className="admin-form-select"
            >
              <option value="3">3 attempts</option>
              <option value="5">5 attempts</option>
              <option value="10">10 attempts</option>
            </select>
          </div>

          <div className="admin-form-group span-2">
            <div className="admin-checkbox-group">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={securitySettings.twoFactorAuth}
                  onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                  className="admin-checkbox"
                />
                <span className="admin-checkbox-text">Enable Two-Factor Authentication</span>
              </label>
            </div>
          </div>

          <div className="admin-form-group span-2">
            <div className="admin-checkbox-group">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={securitySettings.ipRestriction}
                  onChange={(e) => setSecuritySettings({...securitySettings, ipRestriction: e.target.checked})}
                  className="admin-checkbox"
                />
                <span className="admin-checkbox-text">Enable IP Address Restriction</span>
              </label>
            </div>
          </div>

          {securitySettings.ipRestriction && (
            <div className="admin-form-group span-2">
              <label className="admin-form-label">Allowed IP Addresses</label>
              <textarea
                value={securitySettings.allowedIPs}
                onChange={(e) => setSecuritySettings({...securitySettings, allowedIPs: e.target.value})}
                className="admin-form-input"
                rows="3"
                placeholder="Enter IP addresses (one per line)"
              />
            </div>
          )}
        </div>

        <div className="admin-settings-actions">
          <button
            onClick={() => handleSaveSettings('Security')}
            disabled={loading}
            className="admin-btn primary"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-header">
        <h3>Profile Settings</h3>
        <p>Manage your personal profile information</p>
      </div>
      
      <div className="admin-settings-form">
        <div className="admin-profile-section">
          <div className="admin-profile-avatar">
            <div className="admin-avatar-placeholder">
              <UserIcon style={{width: '3rem', height: '3rem'}} />
            </div>
            <button className="admin-btn secondary">
              <CameraIcon style={{width: '1rem', height: '1rem'}} />
              Change Photo
            </button>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-form-label">Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                className="admin-form-input"
                placeholder="Enter your full name"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="admin-form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="admin-form-input"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Job Title</label>
              <input
                type="text"
                value={profileData.jobTitle}
                onChange={(e) => setProfileData({...profileData, jobTitle: e.target.value})}
                className="admin-form-input"
                placeholder="Enter your job title"
              />
            </div>
          </div>

          <div className="admin-password-section">
            <h4>Change Password</h4>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="admin-form-input"
                  placeholder="Enter current password"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="admin-form-input"
                  placeholder="Enter new password"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="admin-form-input"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="admin-settings-actions" style={{marginTop: '1rem'}}>
              <button
                onClick={handlePasswordChange}
                disabled={loading}
                className="admin-btn primary"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>

        <div className="admin-settings-actions">
          <button
            onClick={handleProfileUpdate}
            disabled={loading}
            className="admin-btn primary"
          >
            {loading ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'company':
        return renderCompanySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'profile':
        return renderProfileSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>Settings</h1>
          <p>Configure your system preferences and account settings</p>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="admin-settings-container">
        <div className="admin-settings-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`admin-settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <Icon style={{width: '1.25rem', height: '1.25rem'}} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="admin-settings-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}