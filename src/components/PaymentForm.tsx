import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export interface PaymentFormProps {
  shipmentId: string;
  amount: number;
  onPaymentSuccess?: () => void; // Add this line to fix the error
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

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) as CardElement,
    });

    if (error) {
      console.log('[stripe error]', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Please check your card details and try again.",
        variant: "destructive",
      });
      setProcessing(false);
      return;
    }

    console.log('[PaymentMethod]', paymentMethod);

    // Confirm the PaymentIntent on your server
    const response = await fetch("/api/confirm-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: amount * 100, // Amount in cents
        shipmentId: shipmentId,
      }),
    });

    const { clientSecret, status, message } = await response.json();

    if (status === 'requires_action') {
      stripe.confirmCardPayment(clientSecret).then(function(result: any) {
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          toast({
            title: "Payment Failed",
            description: result.error.message,
            variant: "destructive",
          });
          setProcessing(false);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            toast({
              title: "Payment Successful",
              description: "Your payment was processed successfully!",
            });
            if (onPaymentSuccess) {
              onPaymentSuccess();
            }
          }
          setProcessing(false);
        }
      });
    } else if (status === 'succeeded') {
      // Show a success message to your customer
      toast({
        title: "Payment Successful",
        description: "Your payment was processed successfully!",
      });
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
      setProcessing(false);
    } else {
      // Show an error to your customer
      toast({
        title: "Payment Failed",
        description: message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Enter your card details below to complete your secure payment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="card" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Card Details
            </label>
            <CardElement id="card" options={cardStyle} className="p-2 border rounded-md" />
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
