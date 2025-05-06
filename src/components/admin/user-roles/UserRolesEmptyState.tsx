
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";

type UserRolesEmptyStateProps = {
  fetchUsers: () => Promise<void>;
}

export const UserRolesEmptyState = ({ fetchUsers }: UserRolesEmptyStateProps) => {
  return (
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
  );
};
