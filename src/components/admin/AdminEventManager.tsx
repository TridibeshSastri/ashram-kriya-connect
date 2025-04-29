
import { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { getEvents } from '../../services/eventService';
import AdminEventForm from './AdminEventForm';

interface AdminEvent {
  id?: number;
  title: string;
  date: string;
  image: string;
  location: string;
  category: string;
  category2?: string;
  description: string;
  link?: string;
  availableSeats?: number;
}

const AdminEventManager = () => {
  const [events, setEvents] = useState<AdminEvent[]>(getEvents().map((event, index) => ({ ...event, id: index + 1 })));
  const [isAddEditMode, setIsAddEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<AdminEvent | null>(null);

  const handleAddEvent = () => {
    setCurrentEvent({
      title: '',
      date: '',
      image: '/images/placeholder.jpg',
      location: '',
      category: '',
      description: '',
      availableSeats: 50
    });
    setIsAddEditMode(true);
  };

  const handleEditEvent = (event: AdminEvent) => {
    setCurrentEvent(event);
    setIsAddEditMode(true);
  };

  const handleDeleteEvent = (eventId: number | undefined) => {
    if (eventId) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  const handleSaveEvent = (event: AdminEvent) => {
    if (event.id) {
      // Update existing event
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      // Add new event
      setEvents([...events, { ...event, id: events.length + 1 }]);
    }
    setIsAddEditMode(false);
    setCurrentEvent(null);
  };

  const handleCancel = () => {
    setIsAddEditMode(false);
    setCurrentEvent(null);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-maroon">Event Management</h2>
          <Button onClick={handleAddEvent} className="bg-saffron hover:bg-saffron/90">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>

        {isAddEditMode ? (
          <AdminEventForm 
            event={currentEvent}
            onSave={handleSaveEvent}
            onCancel={handleCancel}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Available Seats</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.id}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.availableSeats}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditEvent(event)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700" 
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminEventManager;
