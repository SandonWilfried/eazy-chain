
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Package, Truck, Ship, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  origin: z.string().min(2, {
    message: "Origin must be at least 2 characters.",
  }),
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  departureDate: z.date({
    required_error: "Departure date is required.",
  }),
  cargoType: z.string({
    required_error: "Cargo type is required.",
  }),
  containerCount: z.string().transform(Number).pipe(
    z.number().min(1, {
      message: "At least one container is required.",
    })
  ),
  weight: z.string().transform(Number).pipe(
    z.number().min(1, {
      message: "Weight is required.",
    })
  ),
  cargoDescription: z.string().optional(),
  contactName: z.string().min(2, {
    message: "Contact name is required.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().min(7, {
    message: "Please enter a valid phone number.",
  }),
});

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      cargoType: "",
      containerCount: "1",
      weight: "",
      cargoDescription: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Booking form submitted:", values);
    
    toast({
      title: "Booking Request Submitted",
      description: "We've received your booking request and will contact you shortly.",
    });
    
    // Reset form after submission
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="glass-panel p-6">
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Ship className="mr-2 h-5 w-5 text-primary" />
            Route Information
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin Port</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Shanghai Port" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Port</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Rotterdam Port" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Departure Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select a date</span>
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
                          date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 6))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Choose a date within the next 6 months.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Package className="mr-2 h-5 w-5 text-primary" />
            Cargo Details
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="cargoType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cargo type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="generalCargo">General Cargo</SelectItem>
                      <SelectItem value="dryBulk">Dry Bulk</SelectItem>
                      <SelectItem value="refrigerated">Refrigerated</SelectItem>
                      <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                      <SelectItem value="vehicles">Vehicles</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="containerCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Containers</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
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
            <FormField
              control={form.control}
              name="cargoDescription"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Cargo Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your cargo in detail..."
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

        <div className="glass-panel p-6">
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Info className="mr-2 h-5 w-5 text-primary" />
            Contact Information
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
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
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Submit Booking Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookingForm;
