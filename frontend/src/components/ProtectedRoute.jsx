import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    // Redirect to login page with return url
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  try {
    const userData = JSON.parse(user);
    if (!userData.isAdmin) {
      // User exists but is not an admin
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    // Invalid user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}