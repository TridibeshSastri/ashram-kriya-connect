
// Mock data - in a real app this would come from an API
export type Booking = {
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

// Mock booking data
const mockBookings: Booking[] = [
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

export const fetchBookings = async (): Promise<Booking[]> => {
  // This simulates an API call - in a real app, this would fetch data from your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBookings);
    }, 500);
  });
};

export const approveBooking = async (id: number): Promise<boolean> => {
  // This simulates an API call - in a real app, this would update data in your backend
  console.log(`Approving booking with ID: ${id}`);
  return Promise.resolve(true);
};

export const cancelBooking = async (id: number): Promise<boolean> => {
  // This simulates an API call - in a real app, this would update data in your backend
  console.log(`Cancelling booking with ID: ${id}`);
  return Promise.resolve(true);
};
