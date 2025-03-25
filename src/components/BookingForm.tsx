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
import { CalendarIcon, Check, ChevronsUpDown, MapPin } from "lucide-react";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { Checkbox } from "@/components/ui/checkbox";

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

const palletTypes = [
  "US Pallet (1200 x 1000 mm)",
  "Euro Pallet (1200 x 800 mm)",
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
  palletType: z.string({
    required_error: "Pallet type is required.",
  }),
  weight: z.coerce.number().min(1, {
    message: "Weight is required.",
  }),
  cargoDescription: z.string().optional(),
  pickupAddressRequired: z.boolean().default(false),
  pickupAddress: z.string().optional(),
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
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [availableDestinationPorts, setAvailableDestinationPorts] = useState(westAfricanPorts);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const getDefaultDepartureDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargoDescription: "",
      containerCount: 1,
      palletCount: 1,
      palletType: "Euro Pallet (1200 x 800 mm)",
      weight: 1000,
      departureDate: getDefaultDepartureDate(),
      pickupAddressRequired: false,
      pickupAddress: "",
    },
  });

  const originPort = form.watch("originPort");
  const watchPickupAddressRequired = form.watch("pickupAddressRequired");
  
  useEffect(() => {
    if (originPort) {
      setAvailableDestinationPorts(
        westAfricanPorts.filter(port => port !== originPort)
      );
      
      const currentDestination = form.getValues("destinationPort");
      if (currentDestination === originPort) {
        form.setValue("destinationPort", "");
      }
    } else {
      setAvailableDestinationPorts(westAfricanPorts);
    }
  }, [originPort, form]);

  const generateQrCodeUrl = (reference: string) => {
    return `${window.location.origin}/payment?reference=${reference}`;
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
    
    const bookingRef = `BKG-${Math.floor(Math.random() * 1000000)}`;
    setBookingReference(bookingRef);
    
    const paymentUrl = generateQrCodeUrl(bookingRef);
    setQrCodeUrl(paymentUrl);
    
    const emailSubject = "Cargo Booking Request";
    const emailBody = `
      Cargo Booking Request Details:
      ----------------------------
      Booking Reference: ${bookingRef}
      Origin Port: ${values.originPort}
      Destination Port: ${values.destinationPort}
      Departure Date: ${format(values.departureDate, 'PPP')}
      
      Cargo Information:
      - Cargo Type: ${values.cargoType}
      - Container Count: ${values.containerCount}
      - Pallet Count: ${values.palletCount}
      - Pallet Type: ${values.palletType}
      - Weight (kg): ${values.weight}
      - Cargo Description: ${values.cargoDescription || 'Not provided'}
      ${values.pickupAddressRequired ? `- Pickup Address: ${values.pickupAddress}` : ''}
      
      Contact Information:
      - Name: ${values.contactName}
      - Email: ${values.contactEmail}
      - Phone: ${values.contactPhone}
      
      This is an automated booking request from the website.
    `;
    
    window.location.href = `mailto:contact@eazy-chain.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t('bookingRequestSubmitted'),
        description: t('bookingConfirmation'),
      });
    }, 1500);
  }

  if (bookingReference) {
    return (
      <div className="text-center space-y-6 p-6 bg-background rounded-lg border shadow-sm">
        <h2 className="text-2xl font-bold mb-2">{t('bookingConfirmed')}</h2>
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <p className="mb-4">
            {t('yourBookingReference')}:
          </p>
          <div className="text-2xl font-bold p-3 bg-background border rounded-md inline-block">
            {bookingReference}
          </div>
          
          <p className="mt-4 text-red-600 font-medium">
            {t('keepReferenceForPaymentTracking')}
          </p>
          
          {qrCodeUrl && (
            <div className="mt-6">
              <p className="mb-2 font-medium">{t('scanQrCodeForPayment')}:</p>
              <div className="flex justify-center">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeUrl)}&size=150x150`} 
                  alt="Payment QR Code" 
                  className="border p-2 bg-white"
                />
              </div>
            </div>
          )}
          
          <div className="mt-6 flex space-x-4 justify-center">
            <Button variant="default" asChild>
              <a href={qrCodeUrl} target="_blank" rel="noopener noreferrer">
                {t('payNow')}
              </a>
            </Button>
            <Button variant="outline" onClick={() => form.reset()}>
              {t('newBooking')}
            </Button>
          </div>
        </div>
      </div>
    );
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
                <FormLabel>{t('originPort')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectOriginPort')} />
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
                <FormLabel>{t('destinationPort')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectDestinationPort')} />
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
              <FormLabel>{t('departureDate')}</FormLabel>
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
                        <span>{t('selectDepartureDate')}</span>
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
                    className={cn("p-3 pointer-events-auto")}
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
                <FormLabel>{t('cargoType')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectCargoType')} />
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
                <FormLabel>{t('palletCount')}</FormLabel>
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
                <FormLabel>{t('weight')}</FormLabel>
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
          name="palletType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('palletType')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectPalletType')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {palletTypes.map((type) => (
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
          name="cargoDescription"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('cargoDescription')}</FormLabel>
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
                        : t('selectCargoDescription')}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder={t('selectCargoDescription')} />
                    <CommandEmpty>{t('noDescriptionFound')}</CommandEmpty>
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

        <FormField
          control={form.control}
          name="pickupAddressRequired"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t('needPickupService')}</FormLabel>
                <p className="text-sm text-muted-foreground">
                  {t('checkBoxIfPickupNeeded')}
                </p>
              </div>
            </FormItem>
          )}
        />

        {watchPickupAddressRequired && (
          <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('pickupAddress')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder={t('enterPickupAddress')}
                      className="resize-none min-h-[80px] pl-10"
                      {...field}
                    />
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('contactName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('fullName')} {...field} />
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
                <FormLabel>{t('contactEmail')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t('emailPlaceholder')} {...field} />
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
                <FormLabel>{t('contactPhone')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('phonePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submitBookingRequest')}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
