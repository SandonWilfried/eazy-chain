
import { Box, Briefcase, MessageSquarePlus, Ship, Phone, Mail, MapPin, ExternalLink, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

type ApplicationFormValues = {
  name: string;
  email: string;
  position: string;
  message: string;
  cv: FileList | null;
  coverLetter: FileList | null;
};

const ContactSection = () => {
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const { t } = useLanguage();

  const form = useForm<ApplicationFormValues>({
    defaultValues: {
      name: "",
      email: "",
      position: "",
      message: "",
      cv: null,
      coverLetter: null,
    },
  });

  const onSubmit = (data: ApplicationFormValues) => {
    console.log("Application submitted:", data);
    // In a real application, you would handle file uploads here
    // and send the data to your backend

    toast.success(t('bookingSuccess'));
    setShowApplicationForm(false);
    form.reset();
  };

  const contactOptions = [
    {
      icon: <Box className="w-16 h-16 text-primary" />,
      title: t('iWouldLikeTo'),
      subtitle: t('shipMyCargo'),
      action: () => navigate("/booking")
    },
    {
      icon: <Ship className="w-16 h-16 text-primary" />,
      title: t('iWouldLikeTo'),
      subtitle: t('bookCabin'),
      action: () => navigate("/passengers")
    },
    {
      icon: <Briefcase className="w-16 h-16 text-primary" />,
      title: t('iWouldLikeTo'),
      subtitle: t('applyAtEazyChain'),
      action: () => setShowApplicationForm(true)
    },
    {
      icon: <MessageSquarePlus className="w-16 h-16 text-primary" />,
      title: t('iWouldLikeTo'),
      subtitle: t('discussAnotherTopic'),
      action: () => window.open('mailto:contact@eazy-chain.com', '_blank')
    }
  ];

  // Updated Google Maps URL with precise location
  const googleMapsUrl = "https://www.google.com/maps/place/Eazy+Chain/@6.1876146,1.190399,17z/data=!3m1!4b1!4m6!3m5!1s0x102159b6294d8231:0xb834142ae26180d2!8m2!3d6.1876093!4d1.1929739!16s%2Fg%2F11x26y0tjb?entry=ttu";
  
  // WhatsApp URLs
  const whatsAppUrl1 = "https://wa.me/22898464040";
  const whatsAppUrl2 = "https://wa.me/22893546464";
  
  // Email URL
  const emailUrl = "mailto:contact@eazy-chain.com";

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">{t('whatWouldYouLikeToDiscuss')}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <Card 
                key={index}
                className="p-8 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary"
                onClick={option.action}
              >
                <div className="mb-6">{option.icon}</div>
                <h3 className="text-lg text-primary mb-2">{option.title}</h3>
                <p className="text-xl font-semibold">{option.subtitle}</p>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="glass-panel p-8 grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <MapPin className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t('address')}</h3>
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary hover:underline flex items-center justify-center gap-2"
                >
                  <span>Avenue Pya, rue de la clinique Bayor, Djidjolé, Lomé Togo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Phone className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t('phone')}</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <a 
                      href="tel:+22898464040"
                      className="text-muted-foreground hover:text-primary hover:underline"
                    >
                      +22898464040
                    </a>
                    <a 
                      href={whatsAppUrl1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-green-600 hover:text-green-700 mt-1"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </a>
                  </div>
                  
                  <div className="flex flex-col">
                    <a 
                      href="tel:+22893546464"
                      className="text-muted-foreground hover:text-primary hover:underline"
                    >
                      +22893546464
                    </a>
                    <a 
                      href={whatsAppUrl2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-green-600 hover:text-green-700 mt-1"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Mail className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t('email')}</h3>
                <a 
                  href={emailUrl}
                  className="text-muted-foreground hover:text-primary hover:underline"
                >
                  contact@eazy-chain.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('applyAtEazyChain')}</DialogTitle>
            <DialogDescription>
              {t('applyFormDesc')}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
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
                name="email"
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
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('position')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('positionApplyingFor')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('message')}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t('tellUsAboutYourself')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cv"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>{t('cvResume')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={(e) => onChange(e.target.files)}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>{t('coverLetter')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={(e) => onChange(e.target.files)}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowApplicationForm(false)}>{t('cancel')}</Button>
                <Button type="submit">{t('submitApplication')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactSection;
