
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreditCard, Calendar } from "lucide-react";
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

interface PaymentFormProps {
  shipmentId?: string;
  amount: number;
}

const PaymentForm = ({ shipmentId, amount }: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
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
    
    console.log("Payment form submitted:", values);
    
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
            <CreditCard className="mr-2 h-5 w-5 text-primary" />
            Payment Details
          </h3>
          
          <div className="text-center mb-8 p-4 bg-secondary/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Amount Due</div>
            <div className="text-3xl font-semibold mt-1">${amount.toLocaleString()}</div>
            {shipmentId && (
              <div className="text-sm text-muted-foreground mt-2">
                Shipment ID: {shipmentId}
              </div>
            )}
          </div>
          
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
        </div>

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
