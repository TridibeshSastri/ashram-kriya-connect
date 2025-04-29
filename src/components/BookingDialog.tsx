
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Ticket } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Define the form schema
const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  seats: z.coerce
    .number()
    .min(1, { message: "Please book at least 1 seat." })
    .max(10, { message: "Maximum 10 seats can be booked at once." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  eventDate: string;
  availableSeats: number;
}

const BookingDialog = ({
  open,
  onOpenChange,
  eventTitle,
  eventDate,
  availableSeats,
}: BookingDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Define the form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      seats: 1,
    },
  });

  // Handle form submission
  const onSubmit = (values: BookingFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call for booking
    setTimeout(() => {
      // In a real app, you would send this data to your backend
      console.log("Booking submitted:", { 
        event: eventTitle, 
        date: eventDate, 
        ...values 
      });
      
      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
      setIsSubmitting(false);
      
      // Show success message
      toast({
        title: "Booking Successful!",
        description: `You have successfully booked ${values.seats} seat(s) for ${eventTitle}.`,
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-maroon">Book Seats</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col space-y-1 text-base text-gray-700 mt-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-maroon">{eventTitle}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} />
                <span>{eventDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Ticket size={16} />
                <span>{availableSeats} seats available</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="seats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Seats</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={availableSeats > 10 ? 10 : availableSeats}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-saffron hover:bg-saffron/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
