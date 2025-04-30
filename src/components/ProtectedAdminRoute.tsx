
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, this would check against a proper admin role
    // For now, we'll use localStorage to simulate admin authentication
    const checkAdminStatus = () => {
      try {
        // Check if admin is logged in
        const adminUser = localStorage.getItem('adminUser');
        const isAdminUser = adminUser ? JSON.parse(adminUser).isAdmin : false;
        setIsAdmin(isAdminUser);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (isLoading) {
    // While checking authentication status
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    );
  }

  if (!isAdmin) {
    // If not admin, redirect to home and show a toast notification
    toast({
      title: "Access Denied",
      description: "You don't have permission to access the admin area",
      variant: "destructive",
    });
    
    return <Navigate to="/" replace />;
  }

  // If admin is authenticated, render the protected route
  return <>{children}</>;
};

export default ProtectedAdminRoute;
