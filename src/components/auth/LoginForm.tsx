
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define schema for login
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      // Special case for admin login
      if (values.email === 'tridibesh.dspt@gmail.com' && values.password === 'Gopal@123') {
        console.log("Admin login successful, redirecting to admin dashboard");
        
        // Store admin info in localStorage
        localStorage.setItem('adminUser', JSON.stringify({ 
          email: values.email,
          isAdmin: true 
        }));
        
        toast.success("Admin Login Successful");
        
        // Force page reload to ensure auth state is recognized
        setTimeout(() => {
          navigate('/admin-dashboard');
          window.location.reload();
        }, 100);
        
        return;
      }
      
      // Regular Supabase authentication
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        toast.error(`Login failed: ${error.message}`);
      } else if (onSuccess) {
        onSuccess();
        navigate('/devotee-dashboard');
      }
    } catch (error: any) {
      toast.error(`Authentication error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                  <Input placeholder="you@example.com" className="pl-10" {...field} />
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
        <div className="text-sm text-muted-foreground">
          <p>Admin login: tridibesh.dspt@gmail.com / Gopal@123</p>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-saffron hover:bg-saffron/90 mt-2" 
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
