
import { UserRole } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type UserWithRoles = {
  id: string;
  email: string;
  fullName: string;
  roles: UserRole[];
  created_at: string;
};

type UserRolesTableProps = {
  users: UserWithRoles[];
  searchTerm: string;
  toggleRole: (userId: string, role: UserRole, hasRole: boolean) => Promise<void>;
}

export const UserRolesTable = ({ users, searchTerm, toggleRole }: UserRolesTableProps) => {
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
  );
};
