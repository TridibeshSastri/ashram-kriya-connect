
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, UserPlus } from 'lucide-react';

type UserRolesHeaderProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  fetchUsers: () => Promise<void>;
  createAdminUser: () => Promise<void>;
  creatingAdmin: boolean;
}

export const UserRolesHeader = ({
  searchTerm,
  setSearchTerm,
  loading,
  fetchUsers,
  createAdminUser,
  creatingAdmin
}: UserRolesHeaderProps) => {
  return (
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
  );
};
