
import { Box, Briefcase, MessageSquarePlus, Ship, Phone, Mail, MapPin } from "lucide-react";
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

    toast.success("Application submitted successfully!");
    setShowApplicationForm(false);
    form.reset();
  };

  const contactOptions = [
    {
      icon: <Box className="w-16 h-16 text-primary" />,
      title: "I would like to",
      subtitle: "ship my cargo",
      action: () => navigate("/booking")
    },
    {
      icon: <Ship className="w-16 h-16 text-primary" />,
      title: "I would like to",
      subtitle: "book a cabin",
      action: () => navigate("/passengers")
    },
    {
      icon: <Briefcase className="w-16 h-16 text-primary" />,
      title: "I would like to",
      subtitle: "apply at Eazy Chain",
      action: () => setShowApplicationForm(true)
    },
    {
      icon: <MessageSquarePlus className="w-16 h-16 text-primary" />,
      title: "I would like to",
      subtitle: "discuss another topic",
      action: () => window.open('mailto:contact@eazy-chain.com', '_blank')
    }
  ];

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Would You Like to Discuss?</h2>
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
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-muted-foreground">Port de Lomé</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Phone className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">0022898464040</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Mail className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">contact@eazy-chain.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Apply at Eazy Chain</DialogTitle>
            <DialogDescription>
              Fill out the form below to apply for a position at Eazy Chain. Upload your CV and cover letter.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
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
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Position you're applying for" {...field} />
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
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about yourself and why you're interested in this position" {...field} />
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
                    <FormLabel>CV/Resume</FormLabel>
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
                    <FormLabel>Cover Letter</FormLabel>
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
                <Button type="button" variant="outline" onClick={() => setShowApplicationForm(false)}>Cancel</Button>
                <Button type="submit">Submit Application</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactSection;
