
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: ('devotee' | 'mentor' | 'admin')[];
}

const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, roles } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminCheckComplete, setAdminCheckComplete] = useState(false);

  // Check for admin in localStorage (for admin login)
  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const adminUser = localStorage.getItem('adminUser');
        const isAdminUser = adminUser ? JSON.parse(adminUser).isAdmin : false;
        setIsAdmin(isAdminUser);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setAdminCheckComplete(true);
      }
    };
    
    checkAdminStatus();
  }, []);

  // If still loading authentication state, show loading indicator
  if (isLoading || !adminCheckComplete) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    );
  }

  // For admin paths, check localStorage admin status
  if (requiredRoles?.includes('admin')) {
    if (isAdmin) {
      console.log("Admin authenticated, allowing access to protected route");
      return <>{children}</>;
    } else {
      console.log("Admin authentication failed, redirecting to unauthorized");
      toast.error("You don't have permission to access this area");
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // For non-admin paths, check regular authentication
  if (!isAuthenticated) {
    toast.error("Please log in to access this page");
    return <Navigate to="/auth" replace />;
  }

  // If roles are required, check if user has at least one of the required roles
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = roles.some(role => requiredRoles.includes(role));
    
    if (!hasRequiredRole) {
      toast.error("You don't have permission to access this area");
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If authenticated and has required role (or no role required), render the children
  return <>{children}</>;
};

export default ProtectedRoute;
