
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  packageType: z.string({ required_error: "Please select package type" }),
  packageWeight: z.coerce.number().min(0.1, { message: "Weight must be at least 0.1 kg" }).max(30, { message: "Maximum weight is 30 kg" }),
  packageLength: z.coerce.number().min(1, { message: "Length must be at least 1 cm" }),
  packageWidth: z.coerce.number().min(1, { message: "Width must be at least 1 cm" }),
  packageHeight: z.coerce.number().min(1, { message: "Height must be at least 1 cm" }),
  contentValue: z.coerce.number().min(0, { message: "Value must be 0 or greater" }),
  contentDescription: z.string().min(5, { message: "Description must be at least 5 characters" }),
  originCountry: z.string({ required_error: "Please select an origin country" }),
  destinationCountry: z.string({ required_error: "Please select a destination country" }),
  senderName: z.string().min(2, { message: "Sender name must be at least 2 characters" }),
  senderAddress: z.string().min(5, { message: "Please provide a valid sender address" }),
  senderPhone: z.string().min(7, { message: "Please enter a valid phone number" }),
  senderEmail: z.string().email({ message: "Please enter a valid email address" }),
  recipientName: z.string().min(2, { message: "Recipient name must be at least 2 characters" }),
  recipientAddress: z.string().min(5, { message: "Please provide a valid recipient address" }),
  recipientPhone: z.string().min(7, { message: "Please enter a valid phone number" }),
  recipientEmail: z.string().email({ message: "Please enter a valid email address" }),
  requestedPickupDate: z.date({ required_error: "Please select a pickup date" }),
  insurance: z.boolean().default(false),
  urgent: z.boolean().default(false),
  additionalInstructions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Asky Airlines destinations
const askyCountries = [
  "Benin", "Burkina Faso", "Cameroon", "Cape Verde", "Central African Republic",
  "Chad", "Congo", "Côte d'Ivoire", "Democratic Republic of the Congo", "Equatorial Guinea",
  "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Liberia", "Mali",
  "Niger", "Nigeria", "Rwanda", "Senegal", "Sierra Leone", "South Africa", "Tanzania", "Togo"
];

const packageTypes = ["Documents", "Small Package", "Medium Package", "Large Package"];

const CourierServiceForm = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageWeight: 1,
      packageLength: 30,
      packageWidth: 20,
      packageHeight: 10,
      contentValue: 0,
      insurance: false,
      urgent: false,
      additionalInstructions: "",
    },
  });

  // Watch values for real-time calculations
  const packageWeight = form.watch("packageWeight");
  const packageType = form.watch("packageType");
  const originCountry = form.watch("originCountry");
  const destinationCountry = form.watch("destinationCountry");
  const urgent = form.watch("urgent");
  const insurance = form.watch("insurance");
  const contentValue = form.watch("contentValue");

  // Calculate estimated cost when relevant fields change
  useState(() => {
    if (packageWeight && packageType && originCountry && destinationCountry) {
      let baseRate = 0;
      
      // Base rate calculation logic
      if (packageType === "Documents") {
        baseRate = 30 + (packageWeight * 10);
      } else if (packageType === "Small Package") {
        baseRate = 50 + (packageWeight * 15);
      } else if (packageType === "Medium Package") {
        baseRate = 70 + (packageWeight * 20);
      } else if (packageType === "Large Package") {
        baseRate = 100 + (packageWeight * 25);
      }
      
      // Apply urgency surcharge
      if (urgent) {
        baseRate *= 1.5;
      }
      
      // Apply insurance cost (2% of declared value)
      let insuranceCost = 0;
      if (insurance && contentValue > 0) {
        insuranceCost = contentValue * 0.02;
      }
      
      setEstimatedCost(baseRate + insuranceCost);
    }
  });

  const onSubmit = (data: FormValues) => {
    // Validate that countries are served by Asky Airlines
    if (!askyCountries.includes(data.originCountry) || !askyCountries.includes(data.destinationCountry)) {
      toast.error("Please select origin and destination countries served by Asky Airlines");
      return;
    }
    
    // Validate that origin and destination are different
    if (data.originCountry === data.destinationCountry) {
      toast.error("Origin and destination countries must be different");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate a random tracking number with EC (Eazy Chain) prefix
      setTrackingNumber(`EC${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`);
      toast.success("Courier service request submitted successfully!");
      console.log("Form data:", data);
    }, 1500);
  };

  return (
    <div className="p-6">
      {trackingNumber ? (
        <div className="text-center space-y-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Shipment Registered!</h3>
            <p className="mb-4">
              Your courier tracking number is:
            </p>
            <div className="text-2xl font-bold p-3 bg-background border rounded-md inline-block">
              {trackingNumber}
            </div>
            {estimatedCost && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="font-medium">Estimated Cost: ${estimatedCost.toFixed(2)} USD</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Final cost may vary based on actual weight and dimensions
                </p>
              </div>
            )}
            <p className="mt-4 text-sm text-muted-foreground">
              Our courier will contact you shortly to arrange pickup. You can track your shipment with this number on our tracking page.
            </p>
          </div>
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-6">
              <p className="font-medium text-blue-800 dark:text-blue-200">
                Courier services available for all countries served by Asky Airlines
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Fast and reliable delivery with door-to-door service and real-time tracking
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Package Information</h3>
                
                <FormField
                  control={form.control}
                  name="packageType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select package type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {packageTypes.map((type) => (
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
                
                <FormField
                  control={form.control}
                  name="packageWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0.1" max="30" step="0.1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Maximum weight: 30 kg
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="packageLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="packageWidth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="packageHeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="contentDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Contents</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the contents of your package"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contentValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Declared Value (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormDescription>
                        For customs and insurance purposes
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="insurance"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Add Insurance
                          </FormLabel>
                          <FormDescription>
                            2% of declared value
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="urgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Urgent Delivery
                          </FormLabel>
                          <FormDescription>
                            50% surcharge
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Shipping Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="originCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select origin country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {askyCountries.map((country) => (
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
                    name="destinationCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {askyCountries.map((country) => (
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
                </div>
                
                <FormField
                  control={form.control}
                  name="requestedPickupDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Requested Pickup Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-2">Sender Information</h4>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="senderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="senderAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Full address including city and postal code"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="senderPhone"
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
                      
                      <FormField
                        control={form.control}
                        name="senderEmail"
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
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-2">Recipient Information</h4>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="recipientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="recipientAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Full address including city and postal code"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="recipientPhone"
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
                      
                      <FormField
                        control={form.control}
                        name="recipientEmail"
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
                    </div>
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="additionalInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Instructions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special handling instructions or delivery notes"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {estimatedCost && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                <p className="font-medium text-green-800 dark:text-green-200">
                  Estimated Cost: ${estimatedCost.toFixed(2)} USD
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  This is an estimate. Final cost may vary based on actual weight and dimensions.
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Courier Request"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CourierServiceForm;
