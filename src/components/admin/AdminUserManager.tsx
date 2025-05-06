
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserBookingsHeader } from './user-bookings/UserBookingsHeader';
import { UserBookingsTable } from './user-bookings/UserBookingsTable';
import { UserBookingsLoader } from './user-bookings/UserBookingsLoader';
import { UserBookingsEmptyState } from './user-bookings/UserBookingsEmptyState';
import { UserBookingsError } from './user-bookings/UserBookingsError';
import { 
  fetchBookings, 
  approveBooking, 
  cancelBooking,
  Booking
} from './user-bookings/UserBookingsService';
import { toast } from 'sonner';

const AdminUserManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveBooking = async (id: number) => {
    try {
      const success = await approveBooking(id);
      
      if (success) {
        // Update local state
        setBookings(bookings.map(booking => 
          booking.id === id ? { ...booking, status: 'confirmed' } : booking
        ));
        toast.success('Booking approved successfully');
      }
    } catch (err: any) {
      toast.error('Failed to approve booking: ' + (err.message || 'Unknown error'));
    }
  };

  const handleCancelBooking = async (id: number) => {
    try {
      const success = await cancelBooking(id);
      
      if (success) {
        // Update local state
        setBookings(bookings.map(booking => 
          booking.id === id ? { ...booking, status: 'cancelled' } : booking
        ));
        toast.success('Booking cancelled successfully');
      }
    } catch (err: any) {
      toast.error('Failed to cancel booking: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <UserBookingsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {error && <UserBookingsError error={error} />}

        {loading ? (
          <UserBookingsLoader />
        ) : bookings.length === 0 ? (
          <UserBookingsEmptyState refetch={loadBookings} />
        ) : (
          <UserBookingsTable
            bookings={bookings}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            handleApproveBooking={handleApproveBooking}
            handleCancelBooking={handleCancelBooking}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserManager;
