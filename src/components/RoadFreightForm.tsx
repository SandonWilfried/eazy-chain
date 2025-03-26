
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Truck, CalendarDays, MapPin, Package, Scale, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface RoadFreightFormProps {
  onClose: () => void;
}

const formSchema = z.object({
  pickupAddress: z.string().min(5, { message: "Please enter a valid pickup address" }),
  deliveryAddress: z.string().min(5, { message: "Please enter a valid delivery address" }),
  cargoType: z.enum(["general", "refrigerated", "hazardous", "oversize"]),
  weight: z.string().min(1, { message: "Weight is required" }),
  volume: z.string().min(1, { message: "Volume is required" }),
  pickupDate: z.string(),
  deliveryDate: z.string(),
  specialInstructions: z.string().optional(),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().min(6, { message: "Please enter a valid phone number" }),
});

type FormValues = z.infer<typeof formSchema>;

const RoadFreightForm = ({ onClose }: RoadFreightFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress: "",
      deliveryAddress: "",
      cargoType: "general",
      weight: "",
      volume: "",
      pickupDate: "",
      deliveryDate: "",
      specialInstructions: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Road Freight Booking Data:", data);
      
      toast({
        title: t('bookingSuccess'),
        description: t('roadFreightBookingDesc'),
      });
      
      setLoading(false);
      onClose();
      
      // Generate a booking reference and redirect to payment page
      const bookingRef = `ROAD${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      navigate(`/payment?reference=${bookingRef}`);
    }, 1500);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              {t('locations')}
            </h3>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pickupAddress')}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t('enterFullAddress')} {...field} />
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
                    <FormLabel>{t('deliveryAddress')}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t('enterFullAddress')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <Package className="mr-2 h-5 w-5 text-primary" />
              {t('cargoDetails')}
            </h3>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cargoType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('cargoType')}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="general" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t('generalCargo')}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="refrigerated" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t('refrigeratedCargo')}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="hazardous" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t('hazardousCargo')}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="oversize" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t('oversizeCargo')}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('totalWeight')} (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="volume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('volume')} (m³)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-primary" />
              {t('schedule')}
            </h3>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="pickupDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pickupDate')}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('requestedDeliveryDate')}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('specialInstructions')}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t('anySpecialRequirements')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5 text-primary" />
              {t('contactInformation')}
            </h3>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fullName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('enterFullName')} {...field} />
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
                    <FormLabel>{t('email')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t('enterEmail')} {...field} />
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
                    <FormLabel>{t('phoneNumber')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('enterPhoneNumber')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? t('submitting') : t('submitBooking')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RoadFreightForm;
