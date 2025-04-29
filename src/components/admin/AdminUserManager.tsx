
import { useState } from 'react';
import { CheckIcon, XIcon, FilterIcon, Search } from 'lucide-react';
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
import { getEvents } from '../../services/eventService';

// Mock booking data
const mockBookings = [
  {
    id: 1,
    name: 'Arjuna Patel',
    email: 'arjuna@example.com',
    phone: '+91 98765 43210',
    eventId: 1,
    eventTitle: 'Kriyayoga Initiation',
    seats: 2,
    bookingDate: '2025-03-15',
    status: 'confirmed'
  },
  {
    id: 2,
    name: 'Radha Sharma',
    email: 'radha@example.com',
    phone: '+91 99887 66554',
    eventId: 2,
    eventTitle: 'Guru Pūrṇimā Celebration',
    seats: 4,
    bookingDate: '2025-04-10',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Govind Iyer',
    email: 'govind@example.com',
    phone: '+91 88776 55443',
    eventId: 3,
    eventTitle: 'Monthly Yajna',
    seats: 1,
    bookingDate: '2025-04-15',
    status: 'confirmed'
  },
  {
    id: 4,
    name: 'Maya Desai',
    email: 'maya@example.com',
    phone: '+91 77665 44332',
    eventId: 4,
    eventTitle: 'Janmāṣṭamī Celebration',
    seats: 3,
    bookingDate: '2025-04-18',
    status: 'cancelled'
  },
];

const AdminUserManager = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleApproveBooking = (id: number) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'confirmed' } : booking
    ));
  };

  const handleCancelBooking = (id: number) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'cancelled' } : booking
    ));
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-maroon">User Bookings</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-9" 
                placeholder="Search bookings..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Date Booked</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.name}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{booking.eventTitle}</TableCell>
                  <TableCell>{booking.seats}</TableCell>
                  <TableCell>{booking.bookingDate}</TableCell>
                  <TableCell>
                    <Badge className={
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : booking.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' 
                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                    }>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {booking.status !== 'confirmed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleApproveBooking(booking.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </Button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserManager;
