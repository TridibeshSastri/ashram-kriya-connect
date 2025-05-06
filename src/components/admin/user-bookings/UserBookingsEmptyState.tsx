
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarX } from 'lucide-react';

type UserBookingsEmptyStateProps = {
  refetch: () => Promise<void>;
}

export const UserBookingsEmptyState = ({ refetch }: UserBookingsEmptyStateProps) => {
  return (
    <div className="text-center py-8">
      <Alert className="mb-6">
        <CalendarX className="h-4 w-4" />
        <AlertTitle>No bookings found</AlertTitle>
        <AlertDescription>
          There are no event bookings in the system yet. Bookings will appear here when users register for events.
        </AlertDescription>
      </Alert>
      <Button onClick={refetch} className="mt-4">
        Refresh
      </Button>
    </div>
  );
};
