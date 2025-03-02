
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargoWeight: 1,
      cargoVolume: 1,
      cargoLength: 100,  // Default 100 cm instead of 1 m
      cargoWidth: 100,   // Default 100 cm instead of 1 m
      cargoHeight: 100,  // Default 100 cm instead of 1 m
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
      
      setShowBookingButton(false); // Reset when values change
    } else {
      setQuotation(null);
      setShowBookingButton(false);
    }
  }, [watchCargoVolume, watchOriginCountry]);

  const acceptQuotation = () => {
    setShowBookingButton(true);
    toast.success("Quotation accepted!");
  };

  const requestBookingReference = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingReference(`OCN-${Math.floor(Math.random() * 1000000)}`);
      toast.success("Ocean consolidation request submitted successfully!");
      console.log("Form data:", form.getValues(), "Quotation:", quotation);
    }, 1500);
  };

  const onSubmit = (data: FormValues) => {
    if (watchOriginCountry === "China" && !showBookingButton && quotation) {
      toast.error("Please accept the quotation first before submitting");
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

            {/* Quotation Section for China */}
            {quotation && watchOriginCountry === "China" && (
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Shipping Quotation</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Volume:</span> {quotation.volume.toFixed(2)} cubic meters</p>
                  <p><span className="font-medium">Rate:</span> {quotation.pricePerCubicMeter.toLocaleString()} XOF per cubic meter</p>
                  <p className="text-lg font-bold">
                    Total: {Math.round(quotation.amount).toLocaleString()} {quotation.currency}
                  </p>
                  
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
              disabled={isSubmitting || (watchOriginCountry === "China" && !showBookingButton && quotation)}
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
