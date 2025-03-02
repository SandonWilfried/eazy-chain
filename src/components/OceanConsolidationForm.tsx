import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  originCountry: z.string({
    required_error: "Please select an origin country",
  }),
  cargoWeight: z.coerce
    .number()
    .min(1, { message: "Weight must be at least 1 kg" }),
  cargoVolume: z.coerce
    .number()
    .min(0.1, { message: "Volume must be at least 0.1 cubic meters" })
    .optional(),
  cargoLength: z.coerce
    .number()
    .min(1, { message: "Length must be at least 1 cm" }),
  cargoWidth: z.coerce
    .number()
    .min(1, { message: "Width must be at least 1 cm" }),
  cargoHeight: z.coerce
    .number()
    .min(1, { message: "Height must be at least 1 cm" }),
  cargoType: z.string({
    required_error: "Please select a cargo type",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address",
  }),
  contactPhone: z.string().min(7, {
    message: "Please enter a valid phone number",
  }),
  additionalInstructions: z.string().optional(),
  identityDocument: z.instanceof(File).optional().refine(file => {
    if (!file) return false;
    return true;
  }, {
    message: "Identity document is required"
  }),
});

type FormValues = z.infer<typeof formSchema>;

const originCountries = ["China", "Turkey", "France", "Germany"];
const cargoTypes = [
  "General Cargo",
  "Textiles",
  "Electronics",
  "Construction Materials",
  "Furniture",
  "Food Products",
  "Chemicals (Non-hazardous)",
  "Machinery",
  "Automotive Parts",
  "Other",
];

const OceanConsolidationForm = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [quotation, setQuotation] = useState<{
    amount: number;
    currency: string;
    pricePerCubicMeter: number;
    volume: number;
  } | null>(null);
  const [showBookingButton, setShowBookingButton] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    initialPayment: number;
    remainingPayment: number;
    currency: string;
  } | null>(null);
  const [identityDocumentUploaded, setIdentityDocumentUploaded] = useState<boolean>(false);
  const [identityDocumentFile, setIdentityDocumentFile] = useState<File | null>(null);
  const [initialPaymentConfirmed, setInitialPaymentConfirmed] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargoWeight: 1,
      cargoVolume: 1,
      cargoLength: 100,  // Default 100 cm
      cargoWidth: 100,   // Default 100 cm
      cargoHeight: 100,  // Default 100 cm
      cargoType: "",
      additionalInstructions: "",
    },
  });

  const watchOriginCountry = form.watch("originCountry");
  const watchCargoLength = form.watch("cargoLength");
  const watchCargoWidth = form.watch("cargoWidth");
  const watchCargoHeight = form.watch("cargoHeight");
  const watchCargoVolume = form.watch("cargoVolume");

  // Calculate volume based on dimensions
  useEffect(() => {
    if (watchCargoLength && watchCargoWidth && watchCargoHeight) {
      // Convert cm to m and calculate volume
      const volumeInCubicMeters = (watchCargoLength * watchCargoWidth * watchCargoHeight) / 1000000;
      
      if (!watchCargoVolume || Math.abs(watchCargoVolume - volumeInCubicMeters) > 0.01) {
        form.setValue("cargoVolume", parseFloat(volumeInCubicMeters.toFixed(2)));
      }
    }
  }, [watchCargoLength, watchCargoWidth, watchCargoHeight, form, watchCargoVolume]);

  // Calculate price for China when volume or origin country changes
  useEffect(() => {
    if (watchOriginCountry === "China" && watchCargoVolume && watchCargoVolume > 0) {
      const pricePerCubicMeter = watchCargoVolume > 1 ? 245000 : 250000;
      const totalAmount = pricePerCubicMeter * watchCargoVolume;
      
      setQuotation({
        amount: totalAmount,
        currency: "XOF",
        pricePerCubicMeter: pricePerCubicMeter,
        volume: watchCargoVolume
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
  }, [watchCargoVolume, watchOriginCountry]);

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

  const confirmInitialPayment = () => {
    if (!identityDocumentUploaded) {
      toast.error("Please upload your identity document first.");
      return;
    }
    
    setInitialPaymentConfirmed(true);
    toast.success("Initial payment confirmed!");
  };

  const requestBookingReference = () => {
    if (!identityDocumentFile) {
      toast.error("Please upload your identity document first.");
      return;
    }
    
    if (!initialPaymentConfirmed) {
      toast.error("Please confirm initial payment first.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingReference(`OCN-${Math.floor(Math.random() * 1000000)}`);
      toast.success("Ocean consolidation request submitted successfully!");
      console.log("Form data:", form.getValues(), "Quotation:", quotation, "Payment details:", paymentDetails);
    }, 1500);
  };

  const onSubmit = (data: FormValues) => {
    if (watchOriginCountry === "China" && !showBookingButton && quotation) {
      toast.error("Please accept the quotation first before submitting");
      return;
    }
    
    if (showBookingButton && !identityDocumentUploaded) {
      toast.error("Please upload your identity document before submitting");
      return;
    }
    
    if (showBookingButton && !initialPaymentConfirmed) {
      toast.error("Please confirm initial payment before submitting");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingReference(`OCN-${Math.floor(Math.random() * 1000000)}`);
      toast.success("Ocean consolidation request submitted successfully!");
      console.log("Form data:", data);
    }, 1500);
  };

  return (
    <div className="p-6">
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="originCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin Country</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select origin country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {originCountries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
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
                name="cargoType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo Type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cargo type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cargoTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cargoWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cargoVolume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo Volume (cubic meters)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0.1" step="0.1" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="cargoLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length (cm) <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="number" min="1" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cargoWidth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (cm) <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="number" min="1" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cargoHeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm) <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="number" min="1" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {quotation && watchOriginCountry === "China" && (
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Shipping Quotation</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Volume:</span> {quotation.volume.toFixed(2)} cubic meters</p>
                  <p><span className="font-medium">Rate:</span> {quotation.pricePerCubicMeter.toLocaleString()} XOF per cubic meter</p>
                  <p className="text-lg font-bold">
                    Total: {Math.round(quotation.amount).toLocaleString()} {quotation.currency}
                  </p>
                  
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
                      ) : !initialPaymentConfirmed ? (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Confirm Initial Payment</CardTitle>
                            <CardDescription>
                              Please confirm that you will make the initial payment
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                  Initial Payment Required: {Math.round(paymentDetails?.initialPayment || 0).toLocaleString()} {paymentDetails?.currency || 'XOF'}
                                </p>
                                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                                  This payment is required to proceed with your booking.
                                </p>
                              </div>
                              <Button 
                                type="button" 
                                onClick={confirmInitialPayment}
                                className="w-full"
                              >
                                Confirm Initial Payment
                              </Button>
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
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400">
                                <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                              </svg>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                              Initial payment confirmed!
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="additionalInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any special handling requirements or additional information"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || 
                       (watchOriginCountry === "China" && !showBookingButton && quotation !== null) ||
                       (showBookingButton && !identityDocumentUploaded) ||
                       (showBookingButton && !initialPaymentConfirmed)}
            >
              {isSubmitting ? "Submitting..." : "Submit Ocean Consolidation Request"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default OceanConsolidationForm;
