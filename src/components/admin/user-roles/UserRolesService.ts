
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export type UserWithRoles = {
  id: string;
  email: string;
  fullName: string;
  roles: UserRole[];
  created_at: string;
};

export const fetchUserRoles = async (): Promise<{ users: UserWithRoles[], error: string | null }> => {
  try {
    console.log("Fetching users from profiles table...");
    
    // Fetch profiles data
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name, created_at');
    
    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      throw profilesError;
    }
    
    console.log("Profiles fetched:", profiles?.length || 0, "profiles found");
    
    if (!profiles?.length) {
      return {
        users: [],
        error: "No users found in the database. Users need to register first or add an admin user."
      };
    }
    
    // Get all user roles
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('user_id, role');
    
    if (rolesError) {
      console.error("Error fetching user roles:", rolesError);
      throw rolesError;
    }
    
    console.log("User roles fetched:", userRoles?.length || 0, "roles found");
    
    // Combine the data for profiles
    const usersWithRoles: UserWithRoles[] = profiles.map(profile => {
      const userRolesList = userRoles
        ?.filter(r => r.user_id === profile.id)
        ?.map(r => r.role as UserRole) || [];
      
      return {
        id: profile.id,
        email: profile.email || '',
        fullName: profile.full_name || '',
        roles: userRolesList,
        created_at: profile.created_at
      };
    });
    
    console.log("Users with roles:", usersWithRoles);
    return { users: usersWithRoles, error: null };
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return { users: [], error: 'Failed to load users: ' + error.message };
  }
};

export const toggleUserRole = async (userId: string, role: UserRole, hasRole: boolean): Promise<boolean> => {
  try {
    if (hasRole) {
      // Remove role
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);
      
      if (error) throw error;
      toast.success(`Removed ${role} role`);
    } else {
      // Add role
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: role
        });
      
      if (error) throw error;
      toast.success(`Assigned ${role} role`);
    }
    
    return true;
  } catch (error: any) {
    console.error('Error toggling role:', error);
    toast.error(error.message || 'Failed to update role');
    return false;
  }
};

export const createAdminUserAccount = async (): Promise<boolean> => {
  try {
    // Register the admin user
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@asksms.org',
      password: 'adminpassword'
    });
    
    if (error) throw error;
    
    if (data.user) {
      // Manually insert into profiles if needed
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: 'admin@asksms.org',
          full_name: 'Admin User',
        });
        
      if (profileError) throw profileError;
      
      // Assign admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: data.user.id,
          role: 'admin'
        });
        
      if (roleError) throw roleError;
      
      toast.success('Admin user created successfully');
      return true;
    }
    return false;
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    
    // Special handling for "User already registered" error
    if (error.message?.includes('already registered')) {
      toast.info('Admin user already exists. Try to sign in with admin@asksms.org/adminpassword');
    } else {
      toast.error('Failed to create admin user: ' + error.message);
    }
    return false;
  }
};
