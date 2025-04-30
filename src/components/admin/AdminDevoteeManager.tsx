
import { useState } from 'react';
import { Search, UserRound, Mail, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Mock devotee data
const mockDevotees = [
  {
    id: 1,
    name: 'Arjuna Patel',
    email: 'arjuna@example.com',
    phone: '+91 98765 43210',
    registeredDate: '2025-01-15',
    lastActive: '2025-04-28',
    status: 'active',
    courses: 3,
    purchases: 4
  },
  {
    id: 2,
    name: 'Radha Sharma',
    email: 'radha@example.com',
    phone: '+91 99887 66554',
    registeredDate: '2025-02-10',
    lastActive: '2025-04-25',
    status: 'active',
    courses: 2,
    purchases: 3
  },
  {
    id: 3,
    name: 'Krishna Iyer',
    email: 'krishna@example.com',
    phone: '+91 88776 55443',
    registeredDate: '2025-03-05',
    lastActive: '2025-04-20',
    status: 'inactive',
    courses: 1,
    purchases: 2
  },
  {
    id: 4,
    name: 'Lakshmi Desai',
    email: 'lakshmi@example.com',
    phone: '+91 77665 44332',
    registeredDate: '2025-03-20',
    lastActive: '2025-04-15',
    status: 'active',
    courses: 4,
    purchases: 5
  },
];

const AdminDevoteeManager = () => {
  const [devotees, setDevotees] = useState(mockDevotees);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDevotee, setSelectedDevotee] = useState<typeof mockDevotees[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleDeactivateDevotee = (id: number) => {
    setDevotees(devotees.map(devotee => 
      devotee.id === id ? { ...devotee, status: 'inactive' } : devotee
    ));
  };

  const handleActivateDevotee = (id: number) => {
    setDevotees(devotees.map(devotee => 
      devotee.id === id ? { ...devotee, status: 'active' } : devotee
    ));
  };

  const handleViewDetails = (devotee: typeof mockDevotees[0]) => {
    setSelectedDevotee(devotee);
    setIsDetailsOpen(true);
  };

  const filteredDevotees = devotees.filter(devotee => {
    const matchesSearch = devotee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         devotee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || devotee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-maroon">Devotee Management</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-9" 
                placeholder="Search devotees..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead className="hidden lg:table-cell">Courses</TableHead>
                <TableHead className="hidden lg:table-cell">Purchases</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevotees.map((devotee) => (
                <TableRow key={devotee.id}>
                  <TableCell>{devotee.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{devotee.name}</div>
                      <div className="text-sm text-gray-500">{devotee.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{devotee.registeredDate}</div>
                    <div className="text-xs text-gray-500">Last active: {devotee.lastActive}</div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{devotee.courses}</TableCell>
                  <TableCell className="hidden lg:table-cell">{devotee.purchases}</TableCell>
                  <TableCell>
                    <Badge className={
                      devotee.status === 'active' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : 'bg-red-100 text-red-800 hover:bg-red-100'
                    }>
                      {devotee.status.charAt(0).toUpperCase() + devotee.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(devotee)}
                      >
                        Details
                      </Button>
                      {devotee.status === 'active' ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeactivateDevotee(devotee.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleActivateDevotee(devotee.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          Activate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Devotee Details Dialog */}
        {selectedDevotee && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Devotee Details</DialogTitle>
                <DialogDescription>Complete information about this devotee</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
                    <UserRound className="h-8 w-8 text-saffron" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedDevotee.name}</h3>
                    <Badge className={
                      selectedDevotee.status === 'active' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : 'bg-red-100 text-red-800 hover:bg-red-100'
                    }>
                      {selectedDevotee.status.charAt(0).toUpperCase() + selectedDevotee.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedDevotee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Registered on {selectedDevotee.registeredDate}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/20 rounded-lg text-center">
                    <div className="text-xl font-semibold text-maroon">{selectedDevotee.courses}</div>
                    <div className="text-sm">Courses</div>
                  </div>
                  <div className="p-4 bg-accent/20 rounded-lg text-center">
                    <div className="text-xl font-semibold text-maroon">{selectedDevotee.purchases}</div>
                    <div className="text-sm">Purchases</div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminDevoteeManager;
