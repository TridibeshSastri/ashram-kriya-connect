
// This is a dummy implementation of Instamojo Sandbox payment service
// In a real implementation, this would make API calls to Instamojo's endpoints

export interface PaymentDetails {
  name: string;
  email: string;
  phone: string;
  amount: number;
  purpose: string;
}

export const createPayment = async (paymentDetails: PaymentDetails): Promise<string> => {
  console.log('Creating payment with Instamojo Sandbox', paymentDetails);
  
  // In a real implementation, we would make an API call to create a payment request
  // Since this is a sandbox implementation, we'll simulate the API call
  
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Generate a random payment ID to simulate Instamojo response
      const paymentId = 'MOJO' + Math.random().toString(36).substring(2, 15);
      console.log('Payment created with ID:', paymentId);
      
      // Return a dummy payment URL
      // In a real implementation, this would be the URL returned by Instamojo
      resolve(`https://sandbox.instamojo.com/pay/${paymentId}`);
    }, 1500);
  });
};

// In a real implementation, this would verify the payment status with Instamojo
export const verifyPayment = async (paymentId: string): Promise<{success: boolean, message: string}> => {
  console.log('Verifying payment:', paymentId);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful payment for demo purposes
      resolve({
        success: true,
        message: 'Payment was successful!'
      });
    }, 1000);
  });
};
