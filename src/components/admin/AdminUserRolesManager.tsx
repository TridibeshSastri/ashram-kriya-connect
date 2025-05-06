
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/database.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, AlertCircle, UserCheck, UserPlus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type UserWithRoles = {
  id: string;
  email: string;
  fullName: string;
  roles: UserRole[];
  created_at: string;
};

const AdminUserRolesManager = () => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { isAdmin, refreshUserData } = useAuth();
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
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
        setError("No users found in the database. Users need to register first or add an admin user.");
        setUsers([]);
        return;
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
      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setError('Failed to load users: ' + error.message);
      toast.error('Failed to load users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleRole = async (userId: string, role: UserRole, hasRole: boolean) => {
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
      
      // Update local state
      setUsers(users.map(user => {
        if (user.id === userId) {
          const newRoles = hasRole
            ? user.roles.filter(r => r !== role)
            : [...user.roles, role];
          
          return { ...user, roles: newRoles };
        }
        return user;
      }));
      
    } catch (error: any) {
      console.error('Error toggling role:', error);
      toast.error(error.message || 'Failed to update role');
    }
  };
  
  const createAdminUser = async () => {
    try {
      setCreatingAdmin(true);
      
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
        
        // Refresh user list
        await fetchUsers();
        
        // Refresh current user data in case this is the admin
        await refreshUserData();
      }
    } catch (error: any) {
      console.error('Error creating admin user:', error);
      
      // Special handling for "User already registered" error
      if (error.message?.includes('already registered')) {
        toast.info('Admin user already exists. Try to sign in with admin@asksms.org/adminpassword');
      } else {
        toast.error('Failed to create admin user: ' + error.message);
      }
    } finally {
      setCreatingAdmin(false);
    }
  };
  
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-maroon">User Role Management</h2>
          
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-9" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={fetchUsers} 
              className="flex items-center gap-1"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={createAdminUser}
              className="flex items-center gap-1 bg-saffron hover:bg-saffron/90"
              disabled={creatingAdmin}
            >
              <UserPlus className="h-4 w-4" />
              {creatingAdmin ? 'Creating...' : 'Create Admin'}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8">
            <Alert className="mb-6">
              <UserCheck className="h-4 w-4" />
              <AlertTitle>No users found</AlertTitle>
              <AlertDescription>
                No registered users were found in your database. Users need to register using the authentication system first, 
                or you can create an admin user with the "Create Admin" button above.
              </AlertDescription>
            </Alert>
            <Button onClick={fetchUsers} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Current Roles</TableHead>
                  <TableHead>Assign Roles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      No users found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.fullName || 'No name'}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground mt-1">ID: {user.id.substring(0, 8)}...</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {user.roles.length > 0 ? (
                            user.roles.map((role) => (
                              <Badge 
                                key={role} 
                                className={
                                  role === 'admin' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                                  role === 'mentor' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                  'bg-green-100 text-green-800 hover:bg-green-100'
                                }
                              >
                                {role}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">No roles assigned</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {['devotee', 'mentor', 'admin'].map((role) => {
                            const hasRole = user.roles.includes(role as UserRole);
                            return (
                              <Button 
                                key={role}
                                size="sm"
                                variant={hasRole ? "default" : "outline"}
                                className={hasRole ? "bg-saffron hover:bg-saffron/90" : ""}
                                onClick={() => toggleRole(user.id, role as UserRole, hasRole)}
                              >
                                {role}
                                {hasRole ? " ✓" : ""}
                              </Button>
                            );
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserRolesManager;
