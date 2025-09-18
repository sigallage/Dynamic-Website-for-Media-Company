import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../../services/api';
import { isAuthenticated } from '../../utils/auth';
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.login(data);
      
      if (response.data.token && response.data.user) {
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
              <div className="admin-login-remember-section">
                <div className="admin-login-remember">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="admin-login-checkbox"
                  />
                  <label htmlFor="remember-me" className="admin-login-remember-label">
                    Remember me
                  </label>
                </div>

                <div>
                  <a href="#" className="admin-login-forgot-link">
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
                  <div className="admin-login-loading">
                    <div className="admin-loading-spinner"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="admin-login-divider">
            <div className="admin-login-divider-line">
              <div className="admin-login-divider-border" />
            </div>
            <div className="admin-login-divider-text-container">
              <span className="admin-login-divider-text">Demo Credentials</span>
            </div>
          </div>

          <div className="admin-login-demo-credentials">
            <p className="admin-login-demo-title">
              <strong>For demonstration purposes:</strong>
            </p>
            <p className="admin-login-demo-item">
              Email: <code className="admin-login-demo-code">admin@eliteaudit.com</code>
            </p>
            <p className="admin-login-demo-item">
              Password: <code className="admin-login-demo-code">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
