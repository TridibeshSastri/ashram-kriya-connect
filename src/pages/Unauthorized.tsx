
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHeader from '../components/PageHeader';
import { AlertTriangle } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <main>
      <PageHeader
        title="Access Denied"
        description="You don't have permission to access this page."
      />
      
      <section className="py-16">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <AlertTriangle className="h-24 w-24 text-red-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-maroon mb-4">
            Unauthorized Access
          </h2>
          
          <p className="text-lg mb-8">
            You don't have the required permissions to access this page. 
            If you believe this is a mistake, please contact the administrators.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/')}
              className="bg-saffron hover:bg-saffron/90"
            >
              Return to Home
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Unauthorized;
