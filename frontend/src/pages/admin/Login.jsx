import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../../services/api';
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Check if user is already authenticated
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.login(data);
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success('Login successful! Welcome back.');
        navigate('/admin/dashboard');
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-header">
        <div className="admin-login-icon-container">
          <LockClosedIcon className="admin-login-icon" />
        </div>
        <h2 className="admin-login-title">
          Admin Login
        </h2>
        <p className="admin-login-subtitle">
          Sign in to your admin account to manage the website
        </p>
      </div>

      <div className="admin-login-form-container">
        <div className="admin-login-form-card">
          <form className="admin-login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="admin-form-group">
              <label htmlFor="email" className="admin-form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className="admin-form-input"
                placeholder="admin@eliteaudit.com"
              />
              {errors.email && (
                <p className="admin-form-error">{errors.email.message}</p>
              )}
            </div>

            <div className="admin-form-group">
              <label htmlFor="password" className="admin-form-label">
                Password
              </label>
              <div className="admin-password-container">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className="admin-form-input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="admin-password-icon" />
                  ) : (
                    <EyeIcon className="admin-password-icon" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="admin-form-error">{errors.password.message}</p>
              )}
            </div>

            <div className="admin-form-group">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <input
                    id="remember-me"
                    type="checkbox"
                    style={{
                      width: '1rem',
                      height: '1rem',
                      borderRadius: '0.25rem',
                      border: '1px solid var(--gray-300)',
                      color: 'var(--primary-600)',
                      marginRight: '0.5rem'
                    }}
                  />
                  <label htmlFor="remember-me" style={{fontSize: '0.875rem', color: 'var(--gray-900)'}}>
                    Remember me
                  </label>
                </div>

                <div style={{fontSize: '0.875rem'}}>
                  <a href="#" style={{
                    fontWeight: '500',
                    color: 'var(--primary-600)',
                    textDecoration: 'none'
                  }}>
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            <div className="admin-form-group">
              <button
                type="submit"
                disabled={isLoading}
                className="admin-submit-button"
              >
                {isLoading ? (
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="admin-loading-spinner"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div style={{marginTop: '1.5rem'}}>
            <div style={{position: 'relative'}}>
              <div style={{
                position: 'absolute',
                inset: '0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '100%',
                  borderTop: '1px solid var(--gray-300)'
                }} />
              </div>
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '0.875rem'
              }}>
                <span style={{
                  backgroundColor: 'white',
                  padding: '0 0.5rem',
                  color: 'var(--gray-500)'
                }}>Demo Credentials</span>
              </div>
            </div>

            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--gray-50)',
              borderRadius: '0.375rem'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                marginBottom: '0.5rem'
              }}>
                <strong>For demonstration purposes:</strong>
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--gray-600)',
                marginBottom: '0.25rem'
              }}>
                Email: <code style={{
                  backgroundColor: 'var(--gray-200)',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '0.25rem',
                  fontFamily: 'monospace'
                }}>admin@eliteaudit.com</code>
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--gray-600)'
              }}>
                Password: <code style={{
                  backgroundColor: 'var(--gray-200)',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '0.25rem',
                  fontFamily: 'monospace'
                }}>admin123</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}