import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
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
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cargoTypes = [
  "General Cargo",
  "Container",
  "Bulk",
  "Refrigerated",
  "Liquid Bulk",
  "Vehicles",
  "Project Cargo",
  "Hazardous",
];

const formSchema = z.object({
  originPort: z.string({
    required_error: "Origin port is required.",
  }),
  destinationPort: z.string({
    required_error: "Destination port is required.",
  }),
  departureDate: z.date({
    required_error: "Departure date is required.",
  }),
  cargoType: z.string({
    required_error: "Cargo type is required.",
  }),
  containerCount: z.coerce.number().min(1, {
    message: "At least one container is required.",
  }),
  palletCount: z.coerce.number().min(1, {
    message: "At least one pallet is required.",
  }),
  weight: z.coerce.number().min(1, {
    message: "Weight is required.",
  }),
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargoDescription: "",
      containerCount: 1,
      palletCount: 1,
      weight: 1000,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Booking Request Submitted",
        description: "We will contact you shortly to confirm your booking.",
      });
      form.reset();
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="originPort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origin Port</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Shanghai, China" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input placeholder="e.g. Rotterdam, Netherlands" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="departureDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Departure Date</FormLabel>
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
                        <span>Select your preferred date</span>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <FormField
            control={form.control}
            name="palletCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Pallets</FormLabel>
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
                <FormLabel>Weight (kg)</FormLabel>
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
          name="cargoDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide details about your cargo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Booking Request"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
