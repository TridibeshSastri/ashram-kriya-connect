
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, XIcon } from "lucide-react";

type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventId: number;
  eventTitle: string;
  seats: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
};

type UserBookingsTableProps = {
  bookings: Booking[];
  searchTerm: string;
  statusFilter: string;
  handleApproveBooking: (id: number) => void;
  handleCancelBooking: (id: number) => void;
}

export const UserBookingsTable = ({
  bookings,
  searchTerm,
  statusFilter,
  handleApproveBooking,
  handleCancelBooking
}: UserBookingsTableProps) => {
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
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
          {filteredBookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No bookings found matching your search
              </TableCell>
            </TableRow>
          ) : (
            filteredBookings.map((booking) => (
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
