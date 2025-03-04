
import { Box, Briefcase, MessageSquarePlus, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ContactSection = () => {
  const navigate = useNavigate();

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
      action: () => window.open('mailto:careers@eazychain.com', '_blank')
    },
    {
      icon: <MessageSquarePlus className="w-16 h-16 text-primary" />,
      title: "I would like to",
      subtitle: "discuss another topic",
      action: () => window.open('mailto:contact@eazychain.com', '_blank')
    }
  ];

  return (
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
      </div>
    </section>
  );
};

export default ContactSection;
