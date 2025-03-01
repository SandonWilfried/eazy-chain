
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreditCard, Calendar, Smartphone, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  cardNumber: z.string().min(13, {
    message: "Card number must be at least 13 digits.",
  }).max(19, {
    message: "Card number must be at most 19 digits.",
  }).refine((val) => /^[0-9]+$/.test(val), {
    message: "Card number must contain only digits.",
  }),
  cardholderName: z.string().min(3, {
    message: "Cardholder name is required.",
  }),
  expiryDate: z.string().min(5, {
    message: "Expiry date is required.",
  }).refine((val) => /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(val), {
    message: "Expiry date must be in MM/YY format.",
  }).refine((val) => {
    const [month, year] = val.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const today = new Date();
    return expiryDate > today;
  }, {
    message: "Card is expired.",
  }),
  cvv: z.string().min(3, {
    message: "CVV must be at least 3 digits.",
  }).max(4, {
    message: "CVV must be at most 4 digits.",
  }).refine((val) => /^[0-9]+$/.test(val), {
    message: "CVV must contain only digits.",
  }),
  billingAddress: z.string().min(5, {
    message: "Billing address is required.",
  }),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  state: z.string().min(2, {
    message: "State is required.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code is required.",
  }),
  country: z.string().min(2, {
    message: "Country is required.",
  }),
});

// Payment method types
type PaymentMethod = "creditCard" | "mobileMoney" | "paypal" | "googlePay" | "amazonPay" | "applePay";

interface PaymentFormProps {
  shipmentId?: string;
  amount: number;
}

const PaymentForm = ({ shipmentId, amount }: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("creditCard");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  // Format card number while typing
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date while typing
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Payment form submitted:", { method: paymentMethod, ...values });
    
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully.",
    });
    
    // Navigate to dashboard or order confirmation
    navigate("/dashboard");
    
    setIsProcessing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="glass-panel p-6">
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-primary" />
            Payment Details
          </h3>
          
          <div className="text-center mb-6 p-4 bg-secondary/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Amount Due</div>
            <div className="text-3xl font-semibold mt-1">${amount.toLocaleString()}</div>
            {shipmentId && (
              <div className="text-sm text-muted-foreground mt-2">
                Shipment ID: {shipmentId}
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Select Payment Method</h4>
            <Tabs 
              defaultValue="creditCard" 
              className="w-full"
              onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
            >
              <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
                <TabsTrigger value="creditCard" className="py-2 h-auto data-[state=active]:bg-primary data-[state=active]:text-white">
                  <CreditCard className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">Card</span>
                </TabsTrigger>
                <TabsTrigger value="mobileMoney" className="py-2 h-auto data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Smartphone className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">Mobile Money</span>
                </TabsTrigger>
                <TabsTrigger value="paypal" className="py-2 h-auto data-[state=active]:bg-primary data-[state=active]:text-white">
                  <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.5 5.56c0 2.38-1.7 5.37-4.94 5.37h-2.91l-1.22 5.1H7.08l.06-.27l1.54-6.37l.04-.12h.02l.19-.84h3.67c.47 0 .9-.33 1-.8l.17-.77C14.16 5.6 16.08 5 17.5 5a1 1 0 0 1 2 .56z"></path>
                    <path d="M7.7 5.56C7.7 7.96 6 10.96 2.76 10.96H-.15L-1.38 16H-4.5l3-13h5.19c2.24 0 4.01 1.12 4.01 2.56z"></path>
                  </svg>
                  <span className="hidden md:inline">PayPal</span>
                </TabsTrigger>
                <TabsTrigger value="googlePay" className="py-2 h-auto data-[state=active]:bg-primary data-[state=active]:text-white">
                  <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 24C5.37 24 0 18.63 0 12S5.37 0 12 0s12 5.37 12 12-5.37 12-12 12zm0-22C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 11.5H15v-2c0-1.1-.9-2-2-2h-2v-2h4V6h-4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v2H9V15h4c1.1 0 2-.9 2-2v-2h2.5v2.5z"></path>
                  </svg>
                  <span className="hidden md:inline">Google Pay</span>
                </TabsTrigger>
                <TabsTrigger value="amazonPay" className="py-2 h-auto data-[state=active]:bg-primary data-[state=active]:text-white">
                  <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.42 14.75c-.85.75-2.07 1.16-3.15 1.16-1.48 0-2.82-.54-3.83-1.45-.08-.07-.01-.17.08-.12 1.03.6 2.31.97 3.63.97.89 0 1.87-.18 2.77-.57.14-.06.25.09.11.18z"></path>
                    <path d="M19.17 14.06c-.21-.28-1.4-.13-1.94-.07-.16.02-.18-.12-.04-.22.95-.67 2.5-.47 2.68-.25.18.22-.05 1.77-.93 2.51-.14.12-.27.06-.21-.08.2-.5.65-1.62.44-1.89z"></path>
                    <path d="M16.25 5.08v-.66c0-.1.08-.17.17-.17h3c.1 0 .17.07.17.17v.57c0 .1-.09.22-.24.42l-1.55 2.22c.58-.01 1.18.07 1.7.36.12.06.15.16.16.26v.7c0 .1-.1.2-.21.15-1.04-.55-2.43-.61-3.58.01-.12.06-.22-.06-.22-.15v-.67c0-.1 0-.3.12-.5l1.8-2.57h-1.14c-.1 0-.18-.07-.18-.17z"></path>
                    <path d="M9.2 14.3h-.91c-.09-.01-.16-.07-.16-.15l.01-4.63c0-.1.08-.17.18-.17h.85c.09 0 .16.07.17.16v.6h.02c.22-.59.64-.87 1.2-.87.57 0 .92.28 1.18.87.22-.59.7-.87 1.23-.87.37 0 .78.15 1.02.5.28.38.22.94.22 1.43v2.87c0 .1-.08.17-.18.17h-.9c-.1-.01-.17-.08-.17-.17V11.1c0-.1 0-.35-.01-.5-.04-.31-.22-.4-.43-.4-.18 0-.36.12-.44.31-.08.19-.07.51-.07.59v3.04c0 .1-.08.17-.18.17h-.9c-.09-.01-.17-.08-.17-.17V11.1c0-.27.02-.65-.28-.65-.32 0-.39.32-.39.65v3.04c0 .1-.08.17-.18.17z"></path>
                    <path d="M6.99 10.99c.28 0 .29-.25.29-.65v-3.07c0-.4.13-.65.47-.65h.88c.1 0 .17.08.17.16v4.56c0 .27-.02.78.05 1.1.35.04.3.06.1.06h-.93c-.08 0-.15-.03-.19-.1-.26-.17-.22-.41-.27-.65-.26.4-.63.75-1.24.75-.63 0-1.01-.35-1.3-.9-.26-.48-.26-1.23-.26-1.78 0-.6.02-1.42.49-1.92.23-.25.61-.4.97-.4.39 0 .77.2.96.67h.02v-.58c0-.09.07-.16.16-.16h.84c.1 0 .18.07.18.16v3.09c0 .17.03.31.11.31zm-.11-1.88c-.25 0-.42.17-.5.43-.1.38-.1.93-.1 1.35 0 .42.01.93.09 1.24.07.25.26.44.51.44.26 0 .45-.19.52-.44.09-.32.09-.82.09-1.24 0-.35 0-.85-.05-1.13-.07-.35-.24-.65-.56-.65z"></path>
                  </svg>
                  <span className="hidden md:inline">Amazon Pay</span>
                </TabsTrigger>
                <TabsTrigger value="applePay" className="py-2 h-auto data-[state=active]:bg-primary data-[state=active]:text-white">
                  <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.72 12.88c-.02-1.97 1.6-2.92 1.68-2.97-.91-1.33-2.33-1.52-2.84-1.54-1.2-.12-2.36.71-2.97.71-.62 0-1.56-.7-2.57-.68-1.31.02-2.53.77-3.21 1.94-1.38 2.4-.35 5.93.98 7.88.66.95 1.44 2 2.47 1.96 1-.04 1.37-.64 2.58-.64 1.2 0 1.54.64 2.6.62 1.07-.02 1.75-.97 2.4-1.93.77-1.1 1.08-2.19 1.09-2.24-.02-.01-2.09-.8-2.11-3.2zM15.84 6.8c.55-.67.92-1.6.82-2.53-.79.03-1.76.53-2.33 1.19-.5.58-.95 1.53-.83 2.42.88.07 1.78-.45 2.34-1.08z"></path>
                  </svg>
                  <span className="hidden md:inline">Apple Pay</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="creditCard" className="mt-4">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="0000 0000 0000 0000" 
                              className="pl-10" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(formatCardNumber(e.target.value));
                              }}
                              maxLength={19}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cardholderName"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name as shown on card" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="MM/YY" 
                              className="pl-10" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(formatExpiryDate(e.target.value));
                              }}
                              maxLength={5}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="•••" 
                            {...field}
                            maxLength={4}
                          />
                        </FormControl>
                        <FormDescription>
                          3 or 4 digits on the back of your card
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="mobileMoney" className="mt-4">
                <div className="space-y-4">
                  <div className="bg-secondary/30 rounded-lg p-4 text-center">
                    <Smartphone className="mx-auto h-10 w-10 text-primary/80 mb-2" />
                    <h3 className="text-lg font-medium">Mobile Money Payment</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Send payment directly from your mobile money account
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your mobile number" />
                      </FormControl>
                    </FormItem>
                    <div className="text-sm text-muted-foreground">
                      We'll send a payment request to your mobile money account. Follow the instructions on your phone to complete the payment.
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="paypal" className="mt-4">
                <div className="bg-secondary/30 rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-blue-600 mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.067 8.31c.51 2.307-.563 4.316-2.237 5.313-1.663.976-3.846 1.102-5.229 1.102H11.2c-.498 0-.92.36-.996.85l-.054.27-.598 3.785-.03.153c-.08.468-.465.835-.953.835h-2.33c-.414 0-.69-.343-.627-.745.01-.078 2.193-13.878 2.193-13.878.09-.573.542-.995 1.12-1.016H15.3c1.153 0 2.249.174 2.956.778.7.597 1.12 1.49.811 2.553zm1.557-2.395c-.904-.885-2.253-1.265-3.892-1.265H10.57c-.88 0-1.639.667-1.768 1.518 0 0-2.192 13.867-2.192 13.867-.1.63.355 1.203 1.07 1.203h2.833c.83 0 1.576-.498 1.707-1.313l.054-.265.598-3.786.038-.195c.13-.815.876-1.313 1.707-1.313h1.037c3.146 0 5.664-1.267 6.438-4.943.326-1.541.17-2.846-.679-3.764-.294-.305-.656-.568-1.085-.779z"></path>
                  </svg>
                  <h3 className="text-lg font-medium">PayPal</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pay securely using your PayPal account
                  </p>
                  <Button variant="outline" className="mt-4">
                    Continue to PayPal
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="googlePay" className="mt-4">
                <div className="bg-secondary/30 rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-800 dark:text-white mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 24C5.37 24 0 18.63 0 12S5.37 0 12 0s12 5.37 12 12-5.37 12-12 12zm0-22C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 11.5H15v-2c0-1.1-.9-2-2-2h-2v-2h4V6h-4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v2H9V15h4c1.1 0 2-.9 2-2v-2h2.5v2.5z"></path>
                  </svg>
                  <h3 className="text-lg font-medium">Google Pay</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fast, simple checkout with Google Pay
                  </p>
                  <Button variant="outline" className="mt-4">
                    Pay with Google Pay
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="amazonPay" className="mt-4">
                <div className="bg-secondary/30 rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-orange-500 mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.42 14.75c-.85.75-2.07 1.16-3.15 1.16-1.48 0-2.82-.54-3.83-1.45-.08-.07-.01-.17.08-.12 1.03.6 2.31.97 3.63.97.89 0 1.87-.18 2.77-.57.14-.06.25.09.11.18z"></path>
                    <path d="M19.17 14.06c-.21-.28-1.4-.13-1.94-.07-.16.02-.18-.12-.04-.22.95-.67 2.5-.47 2.68-.25.18.22-.05 1.77-.93 2.51-.14.12-.27.06-.21-.08.2-.5.65-1.62.44-1.89z"></path>
                    <path d="M16.25 5.08v-.66c0-.1.08-.17.17-.17h3c.1 0 .17.07.17.17v.57c0 .1-.09.22-.24.42l-1.55 2.22c.58-.01 1.18.07 1.7.36.12.06.15.16.16.26v.7c0 .1-.1.2-.21.15-1.04-.55-2.43-.61-3.58.01-.12.06-.22-.06-.22-.15v-.67c0-.1 0-.3.12-.5l1.8-2.57h-1.14c-.1 0-.18-.07-.18-.17z"></path>
                    <path d="M9.2 14.3h-.91c-.09-.01-.16-.07-.16-.15l.01-4.63c0-.1.08-.17.18-.17h.85c.09 0 .16.07.17.16v.6h.02c.22-.59.64-.87 1.2-.87.57 0 .92.28 1.18.87.22-.59.7-.87 1.23-.87.37 0 .78.15 1.02.5.28.38.22.94.22 1.43v2.87c0 .1-.08.17-.18.17h-.9c-.1-.01-.17-.08-.17-.17V11.1c0-.1 0-.35-.01-.5-.04-.31-.22-.4-.43-.4-.18 0-.36.12-.44.31-.08.19-.07.51-.07.59v3.04c0 .1-.08.17-.18.17h-.9c-.09-.01-.17-.08-.17-.17V11.1c0-.27.02-.65-.28-.65-.32 0-.39.32-.39.65v3.04c0 .1-.08.17-.18.17z"></path>
                    <path d="M6.99 10.99c.28 0 .29-.25.29-.65v-3.07c0-.4.13-.65.47-.65h.88c.1 0 .17.08.17.16v4.56c0 .27-.02.78.05 1.1.35.04.3.06.1.06h-.93c-.08 0-.15-.03-.19-.1-.26-.17-.22-.41-.27-.65-.26.4-.63.75-1.24.75-.63 0-1.01-.35-1.3-.9-.26-.48-.26-1.23-.26-1.78 0-.6.02-1.42.49-1.92.23-.25.61-.4.97-.4.39 0 .77.2.96.67h.02v-.58c0-.09.07-.16.16-.16h.84c.1 0 .18.07.18.16v3.09c0 .17.03.31.11.31zm-.11-1.88c-.25 0-.42.17-.5.43-.1.38-.1.93-.1 1.35 0 .42.01.93.09 1.24.07.25.26.44.51.44.26 0 .45-.19.52-.44.09-.32.09-.82.09-1.24 0-.35 0-.85-.05-1.13-.07-.35-.24-.65-.56-.65z"></path>
                  </svg>
                  <h3 className="text-lg font-medium">Amazon Pay</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pay using your Amazon account
                  </p>
                  <Button variant="outline" className="mt-4">
                    Pay with Amazon
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="applePay" className="mt-4">
                <div className="bg-secondary/30 rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-800 dark:text-white mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.72 12.88c-.02-1.97 1.6-2.92 1.68-2.97-.91-1.33-2.33-1.52-2.84-1.54-1.2-.12-2.36.71-2.97.71-.62 0-1.56-.7-2.57-.68-1.31.02-2.53.77-3.21 1.94-1.38 2.4-.35 5.93.98 7.88.66.95 1.44 2 2.47 1.96 1-.04 1.37-.64 2.58-.64 1.2 0 1.54.64 2.6.62 1.07-.02 1.75-.97 2.4-1.93.77-1.1 1.08-2.19 1.09-2.24-.02-.01-2.09-.8-2.11-3.2zM15.84 6.8c.55-.67.92-1.6.82-2.53-.79.03-1.76.53-2.33 1.19-.5.58-.95 1.53-.83 2.42.88.07 1.78-.45 2.34-1.08z"></path>
                  </svg>
                  <h3 className="text-lg font-medium">Apple Pay</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    The faster, safer way to pay with Apple devices
                  </p>
                  <Button variant="outline" className="mt-4">
                    Pay with Apple Pay
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {paymentMethod === "creditCard" && (
          <div className="glass-panel p-6">
            <h3 className="text-xl font-medium mb-4">Billing Information</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="billingAddress"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Billing Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State / Province</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP / Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="ZIP Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            {isProcessing ? "Processing Payment..." : `Pay $${amount.toLocaleString()}`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentForm;
