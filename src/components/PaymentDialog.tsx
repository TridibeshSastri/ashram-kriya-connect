
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IndianRupee } from "lucide-react";

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
import { createPayment, PaymentDetails } from "../services/paymentService";
import { toast } from "@/components/ui/sonner";

// Define the form schema
const paymentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purpose: string;
  amount: number;
}

const PaymentDialog = ({
  open,
  onOpenChange,
  purpose,
  amount,
}: PaymentDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define the form
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: PaymentFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create payment details
      const paymentDetails: PaymentDetails = {
        ...values,
        purpose,
        amount,
      };
      
      // Create payment and get the payment URL
      const paymentUrl = await createPayment(paymentDetails);
      
      // Close the dialog
      onOpenChange(false);
      
      // Show success message
      toast.success("Redirecting to payment gateway...");
      
      // In a real implementation, we would redirect to the payment URL
      console.log("Payment URL:", paymentUrl);
      
      // For demo purposes, open a new window with a simulated payment page
      window.open(
        `data:text/html;charset=utf-8,
        <html>
          <head>
            <title>Instamojo Sandbox Payment</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #f5f5f5; }
              .container { max-width: 500px; width: 100%; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              h2 { margin-top: 0; color: #663399; }
              .field { margin-bottom: 15px; }
              label { display: block; margin-bottom: 5px; font-weight: 500; }
              input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 5px; }
              .amount { font-size: 24px; font-weight: bold; margin: 20px 0; color: #e67e22; }
              button { background: #e67e22; color: white; border: none; padding: 12px 20px; border-radius: 4px; cursor: pointer; font-weight: 600; width: 100%; margin-top: 10px; }
              .success { display: none; text-align: center; }
              .success h3 { color: #27ae60; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Instamojo Sandbox Payment</h2>
              <p>You are making a payment for: <strong>${purpose}</strong></p>
              
              <div class="amount">₹${amount}</div>
              
              <div class="payment-form">
                <div class="field">
                  <label>Card Number</label>
                  <input type="text" placeholder="4242 4242 4242 4242" value="4242 4242 4242 4242" readonly />
                </div>
                
                <div class="field">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" value="12/25" readonly />
                </div>
                
                <div class="field">
                  <label>CVV</label>
                  <input type="text" placeholder="123" value="123" readonly />
                </div>
                
                <button onclick="showSuccess()">Pay ₹${amount}</button>
              </div>
              
              <div class="success" id="success">
                <h3>Payment Successful!</h3>
                <p>Your payment for ${purpose} was successful.</p>
                <p>Transaction ID: MOJO${Math.random().toString(36).substring(2, 15)}</p>
                <button onclick="window.close()">Close Window</button>
              </div>
            </div>
            
            <script>
              function showSuccess() {
                document.querySelector('.payment-form').style.display = 'none';
                document.querySelector('.success').style.display = 'block';
              }
            </script>
          </body>
        </html>`,
        "_blank"
      );
      
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-maroon">Make a Donation</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col space-y-1 text-base text-gray-700 mt-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-maroon">{purpose}</span>
              </div>
              <div className="flex items-center gap-2 text-lg font-medium">
                <IndianRupee size={16} />
                <span>{amount}</span>
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
                {isSubmitting ? "Processing..." : "Proceed to Pay"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
