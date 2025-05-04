
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tables, Enums } from '@/integrations/supabase/database.types';

export type UserRole = Enums<'user_role'>;

interface UserData {
  id: string;
  email: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  roles: UserRole[];
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userData: UserData | null;
  roles: UserRole[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isDevotee: boolean;
  isMentor: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{error: any}>;
  signUp: (email: string, password: string, fullName: string) => Promise<{error: any, data: any}>;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper function to fetch user data and roles
  const fetchUserData = async (userId: string) => {
    try {
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) throw profileError;

      // Fetch user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (rolesError) throw rolesError;

      const userRolesList = userRoles.map(r => r.role) as UserRole[];
      
      if (profile) {
        setUserData({
          id: profile.id || userId,
          email: profile.email || '',
          fullName: profile.full_name,
          avatarUrl: profile.avatar_url,
          roles: userRolesList
        });
      } else {
        setUserData({
          id: userId,
          email: '',
          roles: userRolesList
        });
      }
      
      setRoles(userRolesList);
    } catch (error: any) {
      console.error('Error fetching user data:', error.message);
    }
  };

  // Refresh user data function
  const refreshUserData = async () => {
    if (user?.id) {
      await fetchUserData(user.id);
    }
  };

  // Initialize auth state
  useEffect(() => {
    setIsLoading(true);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);
        
        if (session?.user) {
          // Use setTimeout to prevent Supabase auth deadlock
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setUserData(null);
          setRoles([]);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Authentication functions
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      toast.error(`Login failed: ${error.message}`);
      console.error('Login error:', error.message);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (error) throw error;
      toast.success("Registration successful! Please check your email for verification.");
      return { data, error: null };
    } catch (error: any) {
      toast.error(`Registration failed: ${error.message}`);
      console.error('Registration error:', error.message);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(`Logout failed: ${error.message}`);
      console.error('Logout error:', error.message);
    }
  };

  const value = {
    session,
    user,
    userData,
    roles,
    isAuthenticated: !!user,
    isLoading,
    isDevotee: roles.includes('devotee'),
    isMentor: roles.includes('mentor'),
    isAdmin: roles.includes('admin'),
    signIn,
    signUp,
    signOut,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
