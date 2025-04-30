
// This is a dummy implementation of Instamojo Sandbox payment service
// In a real implementation, this would make API calls to Instamojo's endpoints

export interface PaymentDetails {
  name: string;
  email: string;
  phone: string;
  amount: number;
  purpose: string;
}

export interface PaymentRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  purpose: string;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// Simulate a database of payments
const payments: PaymentRecord[] = [];

export const createPayment = async (paymentDetails: PaymentDetails): Promise<string> => {
  console.log('Creating payment with Instamojo Sandbox', paymentDetails);
  
  // In a real implementation, we would make an API call to create a payment request
  // Since this is a sandbox implementation, we'll simulate the API call
  
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Generate a random payment ID to simulate Instamojo response
      const transactionId = 'MOJO' + Math.random().toString(36).substring(2, 15);
      console.log('Payment created with ID:', transactionId);
      
      // Create a payment record
      const payment: PaymentRecord = {
        id: Math.random().toString(36).substring(2, 15),
        name: paymentDetails.name,
        email: paymentDetails.email,
        phone: paymentDetails.phone,
        amount: paymentDetails.amount,
        purpose: paymentDetails.purpose,
        transactionId,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      payments.push(payment);
      
      // Return a dummy payment URL
      // In a real implementation, this would be the URL returned by Instamojo
      resolve(`https://sandbox.instamojo.com/pay/${transactionId}`);
    }, 1500);
  });
};

// In a real implementation, this would verify the payment status with Instamojo
export const verifyPayment = async (paymentId: string): Promise<{success: boolean, message: string}> => {
  console.log('Verifying payment:', paymentId);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the payment record
      const payment = payments.find(p => p.transactionId === paymentId);
      
      if (payment) {
        // Update payment status
        payment.status = 'completed';
        
        // Simulate successful payment for demo purposes
        resolve({
          success: true,
          message: 'Payment was successful!'
        });
      } else {
        resolve({
          success: false,
          message: 'Payment not found!'
        });
      }
    }, 1000);
  });
};

// Get all payment records for admin
export const getAllPayments = async (): Promise<PaymentRecord[]> => {
  // In a real implementation, this would fetch from a database
  return Promise.resolve([...payments]);
};

// Get donation statistics
export const getDonationStats = async (): Promise<{
  totalAmount: number;
  completedDonations: number;
  pendingDonations: number;
}> => {
  const completedPayments = payments.filter(p => p.status === 'completed');
  const pendingPayments = payments.filter(p => p.status === 'pending');
  
  return Promise.resolve({
    totalAmount: completedPayments.reduce((sum, p) => sum + p.amount, 0),
    completedDonations: completedPayments.length,
    pendingDonations: pendingPayments.length
  });
};
