
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '../components/PageHeader';

// Admin login form schema
const adminLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

const AdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Check if admin is already logged in
  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const adminUser = localStorage.getItem('adminUser');
        const isAdmin = adminUser ? JSON.parse(adminUser).isAdmin : false;
        setIsAdmin(isAdmin);
        
        if (isAdmin) {
          navigate('/admin');
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [navigate]);

  // Login form
  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "tridibesh.dspt@gmail.com",
      password: "",
    },
  });

  const onSubmit = (values: AdminLoginFormValues) => {
    setIsLoading(true);
    // In a real app, this would make an API call to authenticate admin
    console.log("Admin login values:", values);
    
    // For demo purposes, let's hardcode admin credentials
    // In a real application, this would be validated against a database
    const isValidAdmin = values.email === "tridibesh.dspt@gmail.com" && values.password === "Gopal@123";
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (isValidAdmin) {
        // Store admin info in localStorage
        localStorage.setItem('adminUser', JSON.stringify({ 
          email: values.email,
          isAdmin: true 
        }));
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard",
        });
        
        navigate('/admin');
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  // Don't render anything while checking admin status
  if (isAdmin === true) {
    return null; // Will be redirected by the useEffect
  }

  return (
    <main className="bg-accent/20 pt-20 pb-16">
      <PageHeader
        title="Admin Authentication"
        description="Login to access the admin dashboard"
      />

      <section className="py-16">
        <div className="container-custom max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="tridibesh.dspt@gmail.com" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input type="password" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-saffron hover:bg-saffron/90 mt-2" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                For demo: tridibesh.dspt@gmail.com / Gopal@123
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default AdminAuth;
