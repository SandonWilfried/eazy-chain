
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, Loader2, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Form schema for validation
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  packageType: z.string({
    required_error: "Please select a package type.",
  }),
  packageWeight: z.string().min(1, {
    message: "Please enter the package weight.",
  }),
  packageDimensions: z.string().min(1, {
    message: "Please enter the package dimensions.",
  }),
  pickupAddress: z.string().min(5, {
    message: "Pickup address must be at least 5 characters.",
  }),
  deliveryAddress: z.string().min(5, {
    message: "Delivery address must be at least 5 characters.",
  }),
  urgentDelivery: z.boolean().default(false),
  additionalInformation: z.string().optional(),
});

type DroneServiceFormProps = {
  onClose: () => void;
};

const DroneServiceForm = ({ onClose }: DroneServiceFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Initialize the form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      packageType: "",
      packageWeight: "",
      packageDimensions: "",
      pickupAddress: "",
      deliveryAddress: "",
      urgentDelivery: false,
      additionalInformation: "",
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Drone service form submitted:", values);
    
    // Show success toast
    toast({
      title: t('bookingSuccess'),
      description: t('bookingSuccessDesc'),
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const countries = ["Togo", "Benin", "Côte d'Ivoire", "Senegal"];
  const packageTypes = [t('documents'), t('smallPackage'), t('mediumPackage'), t('fragileItems'), t('medicalSupplies')];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('personalInformation')}</h3>
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('firstName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enterFullName')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enterEmail')} type="email" {...field} />
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
                  <FormLabel>{t('phone')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enterPhone')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('country')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectCountry')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('city')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enterCity')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Package Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('packageInformation')}</h3>
            
            <FormField
              control={form.control}
              name="packageType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('packageType')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectPackageType')} />
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
                  <FormLabel>{t('packageWeight')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enterWeight')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="packageDimensions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('packageDimensions')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('lengthWidthHeight')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pickupAddress')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enterPickupAddress')} {...field} />
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
                    <Input placeholder={t('enterDeliveryAddress')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="urgentDelivery"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t('urgentDelivery')}</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      {t('selectForPriority')}
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="additionalInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('additionalInformation')}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t('specialInstructions')} 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('processing')}
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                {t('submitRequest')}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DroneServiceForm;
