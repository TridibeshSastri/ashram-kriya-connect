
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from "@/components/ui/card";
import { UserRolesHeader } from './user-roles/UserRolesHeader';
import { UserRolesError } from './user-roles/UserRolesError';
import { UserRolesLoader } from './user-roles/UserRolesLoader';
import { UserRolesEmptyState } from './user-roles/UserRolesEmptyState';
import { UserRolesTable } from './user-roles/UserRolesTable';
import { 
  fetchUserRoles, 
  toggleUserRole, 
  createAdminUserAccount,
  UserWithRoles
} from './user-roles/UserRolesService';

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
    setLoading(true);
    setError(null);
    
    const { users: fetchedUsers, error: fetchError } = await fetchUserRoles();
    
    if (fetchError) {
      setError(fetchError);
      setUsers([]);
    } else {
      setUsers(fetchedUsers);
    }
    
    setLoading(false);
  };
  
  const handleToggleRole = async (userId: string, role: UserWithRoles['roles'][0], hasRole: boolean) => {
    const success = await toggleUserRole(userId, role, hasRole);
    
    if (success) {
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
    }
  };
  
  const handleCreateAdminUser = async () => {
    setCreatingAdmin(true);
    
    const success = await createAdminUserAccount();
    
    if (success) {
      // Refresh user list
      await fetchUsers();
      
      // Refresh current user data in case this is the admin
      await refreshUserData();
    }
    
    setCreatingAdmin(false);
  };

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>
  }

  return (
    <Card>
      <CardContent className="p-6">
        <UserRolesHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
          fetchUsers={fetchUsers}
          createAdminUser={handleCreateAdminUser}
          creatingAdmin={creatingAdmin}
        />

        {error && <UserRolesError error={error} />}

        {loading ? (
          <UserRolesLoader />
        ) : users.length === 0 ? (
          <UserRolesEmptyState fetchUsers={fetchUsers} />
        ) : (
          <UserRolesTable 
            users={users}
            searchTerm={searchTerm}
            toggleRole={handleToggleRole}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserRolesManager;
