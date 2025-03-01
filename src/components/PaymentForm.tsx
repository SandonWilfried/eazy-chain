
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export interface PaymentFormProps {
  shipmentId: string;
  amount: number;
  onPaymentSuccess?: () => void;
}

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const PaymentForm = ({ shipmentId, amount, onPaymentSuccess }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js is loaded.
      return;
    }
    
    setProcessing(true);
    
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      toast({
        title: "Payment Failed",
        description: "Card element not found. Please refresh and try again.",
        variant: "destructive"
      });
      setProcessing(false);
      return;
    }
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });
    
    if (error) {
      console.log('[stripe error]', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Please check your card details and try again.",
        variant: "destructive"
      });
      setProcessing(false);
      return;
    }
    
    console.log('[PaymentMethod]', paymentMethod);
    
    // Simulate a successful payment for the demo
    // In production, you would call your backend API here
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Your payment was processed successfully!"
      });
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
      setProcessing(false);
    }, 2000);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your card details below to complete your secure payment.</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="card" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Card Details
            </label>
            <CardElement
              id="card"
              options={cardStyle}
              className="p-2 border rounded-md mt-2"
            />
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          disabled={!stripe || processing} 
          className="w-full"
        >
          {processing ? "Processing..." : `Pay $${amount.toLocaleString()}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
