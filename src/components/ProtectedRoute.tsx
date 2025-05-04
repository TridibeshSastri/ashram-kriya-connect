
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: ('devotee' | 'mentor' | 'admin')[];
}

const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, roles } = useAuth();

  // If still loading authentication state, show loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If roles are required, check if user has at least one of the required roles
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = roles.some(role => requiredRoles.includes(role));
    
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If authenticated and has required role (or no role required), render the children
  return <>{children}</>;
};

export default ProtectedRoute;
