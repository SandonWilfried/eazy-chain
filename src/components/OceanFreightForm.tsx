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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  cargoDescription: z.string().min(5, { message: "Description must be at least 5 characters" }),
  containerType: z.string({ required_error: "Please select a container type" }),
  containerSize: z.string({ required_error: "Please select a container size" }),
  containerQuantity: z.coerce.number().min(1, { message: "Quantity must be at least 1" }).max(100, { message: "Maximum 100 containers" }),
  weight: z.coerce.number().min(1, { message: "Weight must be at least 1 kg" }),
  originPort: z.string({ required_error: "Please select an origin port" }),
  destinationPort: z.string({ required_error: "Please select a destination port" }),
  pickupAddress: z.string().min(5, { message: "Please provide a valid pickup address" }),
  deliveryAddress: z.string().min(5, { message: "Please provide a valid delivery address" }),
  requestedShippingDate: z.date({ required_error: "Please select a shipping date" }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().min(7, { message: "Please enter a valid phone number" }),
  additionalInstructions: z.string().optional(),
  hazardousMaterials: z.boolean().optional(),
  temperatureControlled: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const containerTypes = ["Dry", "Refrigerated", "Open Top", "Flat Rack", "Tank"];
const containerSizes = ["20ft Standard", "40ft Standard", "40ft High Cube", "45ft High Cube"];
const originPorts = [
  "Shanghai, China", "Singapore", "Ningbo-Zhoushan, China", "Rotterdam, Netherlands", 
  "Busan, South Korea", "Qingdao, China", "Guangzhou, China", "Port Klang, Malaysia", 
  "Hong Kong, China", "Tianjin, China", "Istanbul, Turkey", "Le Havre, France", 
  "Hamburg, Germany", "Lomé, Togo"
];
const destinationPorts = [
  "Lomé, Togo", "Tema, Ghana", "Lagos, Nigeria", "Abidjan, Ivory Coast", 
  "Dakar, Senegal", "Cotonou, Benin", "Conakry, Guinea", "San Pedro, Ivory Coast", 
  "Monrovia, Liberia", "Freetown, Sierra Leone", "Douala, Cameroon", "Luanda, Angola",
  "Cape Town, South Africa", "Durban, South Africa", "Mombasa, Kenya", "Dar es Salaam, Tanzania"
];

const OceanFreightForm = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      containerQuantity: 1,
      weight: 10000,
      additionalInstructions: "",
      hazardousMaterials: false,
      temperatureControlled: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Create reference number for bookings
    const reference = `OCF-${Math.floor(Math.random() * 1000000)}`;
    
    // Create email content
    const emailSubject = `Ocean Freight Request: ${reference}`;
    const emailBody = `
      Ocean Freight Booking Request:
      =============================
      Booking Reference: ${reference}
      
      Container Details:
      - Cargo Description: ${data.cargoDescription}
      - Container Type: ${data.containerType}
      - Container Size: ${data.containerSize}
      - Number of Containers: ${data.containerQuantity}
      - Total Weight (kg): ${data.weight}
      
      Route Information:
      - Origin Port: ${data.originPort}
      - Destination Port: ${data.destinationPort}
      - Requested Shipping Date: ${format(data.requestedShippingDate, 'PPP')}
      - Pickup Address: ${data.pickupAddress}
      - Delivery Address: ${data.deliveryAddress}
      
      Contact Information:
      - Name: ${data.contactName}
      - Email: ${data.contactEmail}
      - Phone: ${data.contactPhone}
      
      Additional Instructions:
      ${data.additionalInstructions || 'None provided'}
      
      Special Requirements:
      - Hazardous Materials: ${data.hazardousMaterials ? 'Yes' : 'No'}
      - Temperature Controlled: ${data.temperatureControlled ? 'Yes' : 'No'}
      
      This is an automated request from the website.
    `;
    
    // Open email client with pre-filled details
    window.location.href = `mailto:contact@eazy-chain.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingReference(reference);
      toast.success("Ocean freight request submitted successfully!");
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
              Your ocean freight booking reference number is:
            </p>
            <div className="text-2xl font-bold p-3 bg-background border rounded-md inline-block">
              {bookingReference}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Our team will contact you shortly to confirm the details and provide a quote.
            </p>
          </div>
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Container Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="containerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Container Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select container type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {containerTypes.map((type) => (
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
                    name="containerSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Container Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select container size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {containerSizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
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
                    name="containerQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Containers</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="cargoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe the contents of your shipment"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Route Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="originPort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin Port</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select origin port" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {originPorts.map((port) => (
                              <SelectItem key={port} value={port}>
                                {port}
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
                    name="destinationPort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination Port</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination port" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {destinationPorts.map((port) => (
                              <SelectItem key={port} value={port}>
                                {port}
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
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Address (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the full address for container pickup if needed"
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
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the full address for container delivery if needed"
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
                  name="requestedShippingDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Requested Shipping Date</FormLabel>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Ocean Freight Request"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default OceanFreightForm;
