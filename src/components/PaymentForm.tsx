
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

// Form validation schema
const formSchema = z.object({
  bookingReference: z.string().min(6, {
    message: "Booking reference must be at least 6 characters.",
  }),
});

const PaymentForm = ({ shipmentId, amount, onPaymentSuccess }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [referenceVerified, setReferenceVerified] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingReference: "",
    },
  });
  
  const handleVerifyReference = async () => {
    const bookingReference = form.getValues("bookingReference");
    
    if (!bookingReference || bookingReference.length < 6) {
      form.setError("bookingReference", {
        message: "Please enter a valid booking reference (at least 6 characters)."
      });
      return;
    }
    
    setVerifying(true);
    
    // Simulate API call to verify booking reference
    console.log('Verifying booking reference:', bookingReference);
    
    // For demo purposes, we're adding a slight delay to simulate an API call
    setTimeout(() => {
      // In a real app, you would validate this against your backend
      setReferenceVerified(true);
      toast({
        title: "Booking Reference Verified",
        description: "Your booking reference has been verified successfully."
      });
      setVerifying(false);
    }, 1500);
  };
  
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js is loaded.
      return;
    }
    
    if (!referenceVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your booking reference before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    
    // Verify booking reference (in a real app, this would call your API)
    console.log('Processing payment with booking reference:', values.bookingReference);
    
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
        <CardDescription>Enter your booking reference and card details below to complete your secure payment.</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="bookingReference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Reference</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input 
                          placeholder="Enter your booking reference" 
                          {...field}
                          disabled={referenceVerified}
                        />
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleVerifyReference}
                        disabled={verifying || referenceVerified}
                      >
                        {verifying ? "Verifying..." : referenceVerified ? "Verified ✓" : "Verify"}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className={!referenceVerified ? "opacity-50" : ""}>
              <FormLabel htmlFor="card" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Card Details
              </FormLabel>
              <CardElement
                id="card"
                options={cardStyle}
                className="p-3 border rounded-md mt-1"
                disabled={!referenceVerified}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={form.handleSubmit(handleSubmit)}
          disabled={!stripe || processing || !referenceVerified} 
          className="w-full"
        >
          {processing ? "Processing..." : `Pay $${amount.toLocaleString()}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
