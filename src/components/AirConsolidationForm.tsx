
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plane, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  companyName: z.string().optional(),
  originCountry: z.string({
    required_error: "Please select an origin country.",
  }),
  destinationCountry: z.string().default("Togo"),
  weight: z.coerce.number().min(0.1, {
    message: "Weight must be greater than 0 kg.",
  }),
  dimensions: z.string().optional(),
  specialInstructions: z.string().optional(),
  serviceType: z.enum(["normal", "express"]).optional().default("normal"),
});

type AirConsolidationFormProps = {
  onClose: () => void;
};

const AirConsolidationForm = ({ onClose }: AirConsolidationFormProps) => {
  const [showBookingButton, setShowBookingButton] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [quotation, setQuotation] = useState<{
    amount: number;
    currency: string;
    perKg: number;
    discountApplied?: boolean;
  } | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{
    initialPayment: number;
    remainingPayment: number;
    currency: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      originCountry: "",
      destinationCountry: "Togo",
      weight: undefined,
      dimensions: "",
      specialInstructions: "",
      serviceType: "normal",
    },
  });

  const watchWeight = form.watch("weight");
  const watchOriginCountry = form.watch("originCountry");
  const watchServiceType = form.watch("serviceType");

  // Calculate price when weight, origin country, or service type changes
  useEffect(() => {
    if (watchWeight && watchWeight > 0 && watchOriginCountry === "china") {
      // Get base rate per kg based on service type
      const baseRatePerKg = watchServiceType === "normal" ? 10500 : 15000;
      
      // Calculate price based on weight ranges
      let finalRate = baseRatePerKg;
      let discountApplied = false;
      let multiplier = 1;
      
      if (watchWeight >= 0.1 && watchWeight < 0.5) {
        // Half price for 0.1 to 0.5 kg (excluding 0.5)
        finalRate = baseRatePerKg / 2;
        discountApplied = true;
      } else if (watchWeight >= 0.5 && watchWeight < 1) {
        // Full price for 0.5 to 1 kg (excluding 1)
        multiplier = 1;
      } else if (watchWeight >= 1) {
        // For weights 1kg and above, calculate the appropriate multiplier
        // e.g., 1-2kg is 2x, 2-3kg is 3x, etc.
        multiplier = Math.ceil(watchWeight);
        finalRate = baseRatePerKg * multiplier;
      }
      
      // Calculate total amount
      const totalAmount = watchWeight < 1 ? finalRate * watchWeight : baseRatePerKg * multiplier;
      
      setQuotation({
        amount: totalAmount,
        currency: "XOF",
        perKg: finalRate,
        discountApplied
      });
      
      // Calculate payment details (50% now, 50% later)
      const initialPayment = totalAmount / 2;
      setPaymentDetails({
        initialPayment: initialPayment,
        remainingPayment: totalAmount - initialPayment,
        currency: "XOF"
      });
      
      setShowBookingButton(false); // Reset when values change
    } else {
      setQuotation(null);
      setPaymentDetails(null);
      setShowBookingButton(false);
    }
  }, [watchWeight, watchOriginCountry, watchServiceType]);

  const originCountries = [
    { value: "china", label: "China" },
    { value: "turkey", label: "Turkey" },
    { value: "france", label: "France" },
    { value: "germany", label: "Germany" },
  ];

  const acceptQuotation = () => {
    setShowBookingButton(true);
    toast.success("Quotation accepted!");
  };

  const requestBookingReference = () => {
    // Generate a random booking reference
    const bookingRef = `ACS-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    setBookingReference(bookingRef);
    
    const values = form.getValues();
    console.log("Booking reference requested for:", {
      ...values,
      quotation,
      paymentDetails
    });
    
    toast.success(`Booking reference generated: ${bookingRef}`, {
      description: "Please save this reference for tracking your shipment.",
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Air Consolidation Form Submitted:", values);
    
    if (watchOriginCountry === "china" && !showBookingButton && quotation) {
      toast.error("Please accept the quotation first before submitting");
      return;
    }
    
    // In a real app, submit the form data to a backend service here
    
    toast.success("Air Consolidation request submitted successfully!", {
      description: "We'll get back to you shortly.",
    });
    
    onClose();
  };

  return (
    <Form {...form}>
      {bookingReference ? (
        <div className="text-center space-y-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Booking Confirmed!</h3>
            <p className="mb-4">
              Your booking reference number is:
            </p>
            <div className="text-2xl font-bold p-3 bg-background border rounded-md inline-block">
              {bookingReference}
            </div>
            {paymentDetails && (
              <div className="mt-4 p-4 bg-muted rounded-md text-left">
                <h4 className="font-medium mb-2">Payment Terms:</h4>
                <p>Initial payment (50%): <strong>{Math.round(paymentDetails.initialPayment).toLocaleString()} {paymentDetails.currency}</strong></p>
                <p className="mt-1">Please complete the initial payment to proceed with shipping.</p>
                <p className="mt-3">Remaining payment (50%): <strong>{Math.round(paymentDetails.remainingPayment).toLocaleString()} {paymentDetails.currency}</strong></p>
                <p className="mt-1 text-sm text-muted-foreground">This amount will be due when you pick up your goods.</p>
              </div>
            )}
            <p className="mt-4 text-sm text-muted-foreground">
              Please save this reference number for tracking your shipment.
            </p>
          </div>
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Plane className="h-5 w-5" />
            <h3 className="text-lg font-medium">Air Consolidation Service Request</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4 md:col-span-2">
              <h4 className="font-medium">Contact Information</h4>
              
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
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
                      <FormLabel>Phone Number <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 8900" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company Ltd" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional: Enter your company name if applicable
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Shipment Details */}
            <div className="space-y-4 md:col-span-2">
              <h4 className="font-medium">Shipment Details</h4>
              
              <FormField
                control={form.control}
                name="originCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin Country <span className="text-destructive">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select origin country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {originCountries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="destinationCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Country</FormLabel>
                    <FormControl>
                      <Input value="Togo" disabled {...field} />
                    </FormControl>
                    <FormDescription>
                      Our air consolidation service is currently available only for shipping to Togo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {watchOriginCountry === "china" && (
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Service Type <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="normal" />
                            <FormLabel htmlFor="normal" className="font-normal cursor-pointer">
                              Normal Freight (10,500 XOF per kg)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <FormLabel htmlFor="express" className="font-normal cursor-pointer">
                              Express (15,000 XOF per kg)
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg) <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" min="0.1" placeholder="10.5" {...field} />
                      </FormControl>
                      <FormDescription>
                        Total weight in kilograms
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensions</FormLabel>
                      <FormControl>
                        <Input placeholder="30 x 40 x 50 cm" {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional: Package dimensions (L x W x H)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any special requirements or handling instructions for your shipment" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include any additional information or requirements for your shipment
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Quotation Section */}
          {quotation && watchOriginCountry === "china" && (
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Shipping Quotation</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Service:</span> {watchServiceType === "normal" ? "Normal Freight" : "Express"}</p>
                <p><span className="font-medium">Rate:</span> {quotation.perKg.toLocaleString()} XOF per kg</p>
                {quotation.discountApplied && (
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                    Small package discount (50%) applied!
                  </p>
                )}
                <p><span className="font-medium">Weight:</span> {watchWeight} kg</p>
                <p className="text-lg font-bold">
                  Total: {quotation.amount.toLocaleString()} {quotation.currency}
                </p>
                
                {/* Payment terms information */}
                {paymentDetails && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
                    <div className="flex gap-2 items-center text-blue-700 dark:text-blue-300 font-medium mb-1">
                      <Info size={16} />
                      <span>Payment Terms</span>
                    </div>
                    <p>Initial payment (50%): <strong>{Math.round(paymentDetails.initialPayment).toLocaleString()} {paymentDetails.currency}</strong></p>
                    <p>Remaining payment (50%): <strong>{Math.round(paymentDetails.remainingPayment).toLocaleString()} {paymentDetails.currency}</strong></p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      You'll need to pay 50% upfront to confirm your booking. The remaining 50% will be due when you pick up your goods.
                    </p>
                  </div>
                )}
                
                {!showBookingButton ? (
                  <Button 
                    type="button" 
                    onClick={acceptQuotation}
                    className="mt-2"
                  >
                    Accept Quotation
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    onClick={requestBookingReference}
                    className="mt-2"
                    variant="secondary"
                  >
                    Request Booking Reference
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={(watchOriginCountry === "china" && !showBookingButton && quotation !== null)}
            >
              Submit Request
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default AirConsolidationForm;
