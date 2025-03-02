
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plane, Info, Upload } from "lucide-react";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
  identityDocument: z.instanceof(File).optional().refine(file => {
    if (!file) return false;
    return true;
  }, {
    message: "Identity document is required"
  }),
});

type AirConsolidationFormProps = {
  onClose: () => void;
};

// Pricing table for the normal freight service
const calculateNormalPrice = (weight: number): number => {
  // Round up to nearest 0.5 kg
  const roundedWeight = Math.ceil(weight * 2) / 2;
  
  // Calculate based on 0.5 kg increments
  const baseRate = 5250; // Price per 0.5 kg
  const increment = 0.5; // kg
  
  // Calculate price
  const multiplier = Math.ceil(roundedWeight / increment);
  return baseRate * multiplier;
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
  const [identityDocumentUploaded, setIdentityDocumentUploaded] = useState<boolean>(false);
  const [identityDocumentFile, setIdentityDocumentFile] = useState<File | null>(null);

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
      let totalAmount = 0;
      let expressMultiplier = 1.43; // ~43% higher for express (15000/10500)
      
      if (watchServiceType === "normal") {
        // Calculate normal freight price based on the pricing table
        totalAmount = calculateNormalPrice(watchWeight);
      } else {
        // Express freight is approximately 43% more expensive
        totalAmount = calculateNormalPrice(watchWeight) * expressMultiplier;
      }
      
      // Round to nearest whole number
      totalAmount = Math.round(totalAmount);
      
      setQuotation({
        amount: totalAmount,
        currency: "XOF",
        perKg: watchServiceType === "normal" ? 10500 : 15000,
      });
      
      // Calculate payment details (50% now, 50% later)
      const initialPayment = totalAmount / 2;
      setPaymentDetails({
        initialPayment: initialPayment,
        remainingPayment: totalAmount - initialPayment,
        currency: "XOF"
      });
      
      setShowBookingButton(false); // Reset when values change
      setIdentityDocumentUploaded(false); // Reset when values change
    } else {
      setQuotation(null);
      setPaymentDetails(null);
      setShowBookingButton(false);
      setIdentityDocumentUploaded(false);
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
    toast.success("Quotation accepted! Please upload your identity document.");
  };

  const handleIdentityDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit. Please upload a smaller file.");
        return;
      }
      
      // Validate file type (PDF, JPG, PNG)
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a PDF, JPG, or PNG file.");
        return;
      }
      
      setIdentityDocumentFile(file);
      form.setValue("identityDocument", file);
      setIdentityDocumentUploaded(true);
      toast.success("Identity document uploaded successfully!");
    }
  };

  const requestBookingReference = () => {
    if (!identityDocumentFile) {
      toast.error("Please upload your identity document first.");
      return;
    }
    
    // Generate a random booking reference
    const bookingRef = `ACS-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    setBookingReference(bookingRef);
    
    const values = form.getValues();
    console.log("Booking reference requested for:", {
      ...values,
      quotation,
      paymentDetails,
      identityDocument: identityDocumentFile.name
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
    
    if (showBookingButton && !identityDocumentUploaded) {
      toast.error("Please upload your identity document before submitting");
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
                              Normal Freight (5,250 XOF per 0.5 kg)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <FormLabel htmlFor="express" className="font-normal cursor-pointer">
                              Express (~7,500 XOF per 0.5 kg)
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
                <p><span className="font-medium">Rate:</span> {watchServiceType === "normal" ? "5,250" : "7,500"} XOF per 0.5 kg increment</p>
                <p><span className="font-medium">Weight:</span> {watchWeight} kg (rounded up to {Math.ceil(watchWeight * 2) / 2} kg for billing)</p>
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
                  <div className="space-y-4 mt-4">
                    {!identityDocumentUploaded ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Upload Identity Document</CardTitle>
                          <CardDescription>
                            Please upload a copy of your national ID card or passport
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="identity-document">
                                Identity Document <span className="text-destructive">*</span>
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id="identity-document"
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={handleIdentityDocumentUpload}
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Accepted formats: PDF, JPG, PNG (max 5MB)
                              </p>
                              {form.formState.errors.identityDocument && (
                                <p className="text-sm font-medium text-destructive">
                                  {form.formState.errors.identityDocument.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400">
                              <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Document uploaded successfully: {identityDocumentFile?.name}
                          </p>
                        </div>
                        <Button 
                          type="button" 
                          onClick={requestBookingReference}
                          variant="secondary"
                          className="mt-2"
                        >
                          Request Booking Reference
                        </Button>
                      </div>
                    )}
                  </div>
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
              disabled={(watchOriginCountry === "china" && !showBookingButton && quotation !== null) || 
                        (showBookingButton && !identityDocumentUploaded)}
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
