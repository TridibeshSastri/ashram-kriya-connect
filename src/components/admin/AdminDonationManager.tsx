
import { useState, useEffect } from 'react';
import { IndianRupee, DollarSign, Check, Clock, Filter, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllPayments, getDonationStats, PaymentRecord } from '@/services/paymentService';

const AdminDonationManager = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PaymentRecord[]>([]);
  const [stats, setStats] = useState({
    totalAmount: 0,
    completedDonations: 0,
    pendingDonations: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { toast } = useToast();

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...payments];
    
    // Apply status filter
    if (filter !== 'all') {
      result = result.filter(payment => payment.status === filter);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        payment =>
          payment.name.toLowerCase().includes(query) ||
          payment.email.toLowerCase().includes(query) ||
          payment.purpose.toLowerCase().includes(query) ||
          payment.transactionId.toLowerCase().includes(query)
      );
    }
    
    setFilteredPayments(result);
  }, [payments, filter, searchQuery]);

  const fetchDonations = async () => {
    setIsLoading(true);
    try {
      const [donationData, statsData] = await Promise.all([
        getAllPayments(),
        getDonationStats()
      ]);
      
      setPayments(donationData);
      setFilteredPayments(donationData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching donation data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load donation data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format date string for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-maroon mb-6">Donation Management</h2>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Donations</p>
                <p className="text-2xl font-bold text-maroon">₹{stats.totalAmount.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-3 bg-saffron/20 rounded-full">
                <IndianRupee className="h-6 w-6 text-saffron" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completed Donations</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedDonations}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending Donations</p>
                <p className="text-2xl font-bold text-amber-600">{stats.pendingDonations}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or purpose..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Donations</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={fetchDonations} 
            variant="outline" 
            className="w-full md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Refresh"}
          </Button>
        </div>
        
        {/* Donations Table */}
        {filteredPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(payment.createdAt)}</TableCell>
                    <TableCell>{payment.name}</TableCell>
                    <TableCell>{payment.email}</TableCell>
                    <TableCell>{payment.purpose}</TableCell>
                    <TableCell>₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="font-mono text-xs">{payment.transactionId}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <DollarSign className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No donations found</h3>
            <p className="mt-1 text-gray-500">
              {searchQuery || filter !== 'all'
                ? 'Try changing your search or filter criteria'
                : 'Donations will appear here once they are made'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminDonationManager;
