
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface PaymentFormProps {
  shipmentId: string;
  amount: number;
  onPaymentSuccess?: () => void;
  autoVerifyReference?: string | null;
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

// Mock shipment data based on booking reference
const mockShipmentDatabase = {
  "REF123456": {
    id: "CARGO12345678",
    amount: 4600,
    origin: "Shanghai Port, China",
    destination: "Rotterdam Port, Netherlands",
    containerCount: 2,
    description: "General Merchandise",
    weight: "12,500 kg",
    deliveryDate: "2023-11-15",
    currency: "USD",
    itemizedCosts: {
      freight: 3200,
      handling: 800,
      documentation: 300,
      insurance: 300
    }
  },
  "REF654321": {
    id: "CARGO87654321",
    amount: 3800,
    origin: "Los Angeles Port, USA",
    destination: "Hamburg Port, Germany",
    containerCount: 1,
    description: "Electronic Equipment",
    weight: "8,200 kg",
    deliveryDate: "2023-12-05",
    currency: "USD",
    itemizedCosts: {
      freight: 2600,
      handling: 600,
      documentation: 300,
      insurance: 300
    }
  },
  "REF789012": {
    id: "CARGO90123456",
    amount: 6200,
    origin: "Singapore Port, Singapore",
    destination: "Yokohama Port, Japan",
    containerCount: 3,
    description: "Automotive Parts",
    weight: "18,700 kg",
    deliveryDate: "2023-11-25",
    currency: "USD",
    itemizedCosts: {
      freight: 4500,
      handling: 1000,
      documentation: 400,
      insurance: 300
    }
  }
};

const PaymentForm = ({ shipmentId, amount, onPaymentSuccess, autoVerifyReference }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [referenceVerified, setReferenceVerified] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState<any>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingReference: autoVerifyReference || "",
      paymentMethod: "card",
      phoneNumber: "",
      email: "",
    },
  });
  
  // Auto-verify reference when provided from URL
  React.useEffect(() => {
    if (autoVerifyReference && !referenceVerified) {
      form.setValue("bookingReference", autoVerifyReference);
      verifyBookingReference(autoVerifyReference);
    }
  }, [autoVerifyReference]);
  
  const selectedPaymentMethod = form.watch("paymentMethod");
  
  const verifyBookingReference = async (reference: string) => {
    if (!reference || reference.length < 6) {
      return;
    }
    
    setVerifying(true);
    
    // Simulate API call to verify booking reference
    console.log('Verifying booking reference:', reference);
    
    // For demo purposes, we're adding a slight delay to simulate an API call
    setTimeout(() => {
      // Check if the reference exists in our mock database
      const shipmentInfo = mockShipmentDatabase[reference as keyof typeof mockShipmentDatabase];
      
      if (shipmentInfo) {
        setReferenceVerified(true);
        setShipmentDetails(shipmentInfo);
        toast({
          title: "Booking Reference Verified",
          description: "Your booking reference has been verified successfully."
        });
      } else {
        toast({
          title: "Invalid Reference",
          description: "The booking reference you entered could not be verified.",
          variant: "destructive"
        });
      }
      setVerifying(false);
    }, 1500);
  };
  
  const handleVerifyReference = async () => {
    const bookingReference = form.getValues("bookingReference");
    verifyBookingReference(bookingReference);
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
    <div className="space-y-6">
      {/* Red banner with shipment ID - only shown after verification */}
      {referenceVerified && shipmentDetails && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-red-600">{t('shipmentId')}</p>
            <p className="font-medium">{shipmentDetails.id}</p>
          </div>
        </div>
      )}
      
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">{t('paymentDetails')}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {t('enterBookingReferenceAndCardDetails')}
          </p>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="bookingReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('bookingReference')}</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input 
                            placeholder={t('enterBookingReference')} 
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
                          {verifying ? t('verifying') : referenceVerified ? t('verified') : t('verify')}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {referenceVerified && (
                  <>
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">{t('selectPaymentMethod')}</h3>
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 gap-2"
                              >
                                <div className="flex items-center space-x-2 rounded-md border p-3">
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="card" />
                                    </FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2 m-0">
                                      <CreditCard size={18} />
                                      {t('creditDebitCard')}
                                    </FormLabel>
                                  </FormItem>
                                </div>
                                <div className="flex items-center space-x-2 rounded-md border p-3">
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="mobile_money" />
                                    </FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2 m-0">
                                      <Phone size={18} />
                                      {t('mobileMoney')}
                                    </FormLabel>
                                  </FormItem>
                                </div>
                                <div className="flex items-center space-x-2 rounded-md border p-3">
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="paypal" />
                                    </FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2 m-0">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 11l4.06-6.5C12.48 2.34 14.5 1.5 16.5 1.5c2.53 0 4.35 1.5 4.89 3.87.43 2-.84 4.24-2.13 5.13H17"/>
                                        <path d="M13.5 9.5L8.21 15.9c-1.42 1.71-3.44 2.55-5.44 2.55-2.53 0-4.35-1.5-4.89-3.87-.43-2 .84-4.24 2.13-5.13H3"/>
                                        <path d="M4.5 13.5L10 8"/>
                                      </svg>
                                      PayPal
                                    </FormLabel>
                                  </FormItem>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {selectedPaymentMethod === "card" && (
                      <div className="mt-4">
                        <FormLabel className="block font-medium mb-2">
                          {t('cardDetails')}
                        </FormLabel>
                        <div className="p-3 border rounded-md">
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
                              <FormLabel>{t('phoneNumber')}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t('enterPhoneNumber')}
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
                              <FormLabel>{t('paypalEmail')}</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder={t('enterPaypalEmail')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <div className="mt-6">
                      <Button 
                        type="submit"
                        disabled={!referenceVerified || processing || (selectedPaymentMethod === "card" && !stripe)} 
                        className="w-full"
                      >
                        {processing ? t('processing') : t('pay')}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;
