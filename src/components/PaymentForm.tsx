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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Phone } from "lucide-react";

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
  paymentMethod: z.enum(["card", "mobile_money", "paypal"]),
  // Additional fields specific to mobile money
  phoneNumber: z.string().optional(),
  // Additional fields specific to PayPal
  email: z.string().email({ message: "Please enter a valid email address." }).optional(),
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
      paymentMethod: "card",
      phoneNumber: "",
      email: "",
    },
  });
  
  const selectedPaymentMethod = form.watch("paymentMethod");
  
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
    console.log('Selected payment method:', values.paymentMethod);
    
    if (values.paymentMethod === "card") {
      if (!stripe || !elements) {
        toast({
          title: "Payment Failed",
          description: "Stripe has not loaded yet. Please refresh and try again.",
          variant: "destructive"
        });
        setProcessing(false);
        return;
      }
      
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
    } else if (values.paymentMethod === "mobile_money") {
      // Simulate mobile money payment processing
      console.log("Processing Mobile Money payment with phone:", values.phoneNumber);
    } else if (values.paymentMethod === "paypal") {
      // Simulate PayPal payment processing
      console.log("Processing PayPal payment with email:", values.email);
    }
    
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
            
            <div className={!referenceVerified ? "opacity-50 pointer-events-none" : ""}>
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="card" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <CreditCard size={18} />
                            Credit/Debit Card
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mobile_money" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <Phone size={18} />
                            Mobile Money
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="paypal" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 11l4.06-6.5C12.48 2.34 14.5 1.5 16.5 1.5c2.53 0 4.35 1.5 4.89 3.87.43 2-.84 4.24-2.13 5.13H17"/>
                              <path d="M13.5 9.5L8.21 15.9c-1.42 1.71-3.44 2.55-5.44 2.55-2.53 0-4.35-1.5-4.89-3.87-.43-2 .84-4.24 2.13-5.13H3"/>
                              <path d="M4.5 13.5L10 8"/>
                            </svg>
                            PayPal
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {selectedPaymentMethod === "card" && (
                <div className="mt-4">
                  <FormLabel htmlFor="card" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Card Details
                  </FormLabel>
                  <div className="p-3 border rounded-md mt-1">
                    <CardElement
                      id="card"
                      options={cardStyle}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
              
              {selectedPaymentMethod === "mobile_money" && (
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {selectedPaymentMethod === "paypal" && (
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PayPal Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Enter your PayPal email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={form.handleSubmit(handleSubmit)}
          disabled={!referenceVerified || processing || (selectedPaymentMethod === "card" && !stripe)} 
          className="w-full"
        >
          {processing ? (
            "Processing..."
          ) : (
            <div className="flex items-center justify-center">
              <span>Pay </span>
              <span className="inline-block bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 px-3 py-1 ml-2 rounded-md font-bold">
                ${amount.toLocaleString()}
              </span>
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
