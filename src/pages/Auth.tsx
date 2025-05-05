
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '../components/PageHeader';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Auth = () => {
  const loginTabRef = useRef<HTMLButtonElement>(null);
  
  const handleRegisterSuccess = () => {
    // Switch to login tab after successful registration
    loginTabRef.current?.click();
  };

  return (
    <main className="bg-accent/20 pt-20 pb-16">
      <PageHeader
        title="Authentication Portal"
        description="Register or log in to access your personalized dashboard."
      />

      <section className="py-16">
        <div className="container-custom max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" id="login-tab" ref={loginTabRef}>Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <AuthCard
                title="Welcome Back"
                description="Enter your credentials to access your account"
                footer={
                  <p>Forgot your password? <Link to="#" className="text-maroon hover:underline">Reset it here</Link></p>
                }
              >
                <LoginForm />
              </AuthCard>
            </TabsContent>
            
            <TabsContent value="register">
              <AuthCard
                title="Create an Account"
                description="Join our spiritual community"
                footer={
                  <p>By registering, you agree to our <Link to="#" className="text-maroon hover:underline">Terms of Service</Link></p>
                }
              >
                <RegisterForm onSuccess={handleRegisterSuccess} />
              </AuthCard>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Auth;
