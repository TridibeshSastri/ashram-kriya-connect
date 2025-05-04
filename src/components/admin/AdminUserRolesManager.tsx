
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
import { Search } from 'lucide-react';

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
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get all user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at');
      
      if (profilesError) throw profilesError;
      
      // Get all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');
      
      if (rolesError) throw rolesError;
      
      // Combine the data
      const usersWithRoles: UserWithRoles[] = profiles.map(profile => {
        const roles = userRoles
          .filter(r => r.user_id === profile.id)
          .map(r => r.role as UserRole);
        
        return {
          id: profile.id,
          email: profile.email || '',
          fullName: profile.full_name || '',
          roles: roles,
          created_at: profile.created_at
        };
      });
      
      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleRole = async (userId: string, role: UserRole, hasRole: boolean) => {
    try {
      if (hasRole) {
        // Remove role
        const { error } = await supabase.rpc('remove_role', {
          target_user_id: userId,
          role_to_remove: role
        });
        
        if (error) throw error;
        toast.success(`Removed ${role} role`);
      } else {
        // Add role
        const { error } = await supabase.rpc('assign_role', {
          target_user_id: userId,
          role_to_assign: role
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-maroon">User Role Management</h2>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              className="pl-9" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
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
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.fullName}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
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
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserRolesManager;
