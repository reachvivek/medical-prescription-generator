import { Navigate } from 'react-router-dom';

const MockProtectedRoute = ({ children }) => {
  // Check if mock authentication is enabled
  const isAuthenticated = localStorage.getItem('mock_auth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default MockProtectedRoute;
