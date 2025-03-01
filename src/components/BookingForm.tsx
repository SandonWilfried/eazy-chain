import { useState, useEffect } from "react";
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
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// List of West African ports as specified
const westAfricanPorts = [
  "Port of Lomé, Togo",
  "Port of Abidjan, Côte d'Ivoire", 
  "Port of San Pedro, Côte d'Ivoire",
  "Port of Monrovia, Liberia",
  "Port of Conakry, Guinea",
  "Port of Dakar, Senegal",
  "Port of Praia, Cape Verde"
];

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

const cargoDescriptions = [
  "Agricultural Products",
  "Textiles",
  "Electronics",
  "Construction Materials",
  "Household Goods",
  "Furniture",
  "Medical Supplies",
  "Food Products",
  "Beverages",
  "Cosmetics",
  "Paper Products",
  "Auto Parts",
  "Industrial Machinery",
  "Chemicals (Non-hazardous)",
  "Plastic Products",
  "Handicrafts",
  "Clothing",
  "Books & Printed Materials",
  "Sports Equipment",
  "Musical Instruments",
  "Office Supplies",
  "Toys",
  "Manufactured Products",
  "Cocoa",
  "Coffee",
  "Soya Beans",
  "Bottles",
  "Timber",
  "Grains",
  "Cotton",
  "Rubber",
  "Spices",
  "Other"
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
}).refine(data => data.originPort !== data.destinationPort, {
  message: "Origin and destination ports cannot be the same",
  path: ["destinationPort"]
});

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [availableDestinationPorts, setAvailableDestinationPorts] = useState(westAfricanPorts);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargoDescription: "",
      containerCount: 1,
      palletCount: 1,
      weight: 1000,
    },
  });

  // Update available destination ports when origin port changes
  const originPort = form.watch("originPort");
  
  useEffect(() => {
    if (originPort) {
      // Filter out the selected origin port from available destinations
      setAvailableDestinationPorts(
        westAfricanPorts.filter(port => port !== originPort)
      );
      
      // If the current destination is the same as the new origin, reset destination
      const currentDestination = form.getValues("destinationPort");
      if (currentDestination === originPort) {
        form.setValue("destinationPort", "");
      }
    } else {
      setAvailableDestinationPorts(westAfricanPorts);
    }
  }, [originPort, form]);

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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin port" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {westAfricanPorts.map((port) => (
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
                    {availableDestinationPorts.map((port) => (
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
            <FormItem className="flex flex-col">
              <FormLabel>Cargo Description</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? cargoDescriptions.find((description) => description === field.value)
                        : "Select cargo description"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search cargo description..." />
                    <CommandEmpty>No description found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {cargoDescriptions.map((description) => (
                          <CommandItem
                            key={description}
                            value={description}
                            onSelect={(value) => {
                              form.setValue("cargoDescription", value);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === description ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {description}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
