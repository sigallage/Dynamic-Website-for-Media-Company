// Authentication utility functions
export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return false;
    }
    
    const userData = JSON.parse(user);
    return userData && userData.role === 'admin';
  } catch (error) {
    console.error('Authentication check failed:', error);
    clearAuthData();
    return false;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getAuthData = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return null;
    }
    
    return {
      token,
      user: JSON.parse(user)
    };
  } catch (error) {
    console.error('Failed to get auth data:', error);
    clearAuthData();
    return null;
  }
};