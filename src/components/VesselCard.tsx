
import { useState } from "react";
import { Ship, Calendar, Package, Users, RepeatIcon, BarChart4 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export interface VesselProps {
  id: string;
  name: string;
  route: string;
  departureDate: string;
  arrivalDate: string;
  capacity: number;
  available: number;
  price: number;
  priceXOF?: number;
}

const VesselCard = ({ vessel }: { vessel: VesselProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const availabilityPercentage = (vessel.available / vessel.capacity) * 100;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleBookNow = () => {
    // Create email content
    const emailSubject = `Vessel Booking Request: ${vessel.name}`;
    const emailBody = `
      Vessel Booking Details:
      -----------------------
      Vessel Name: ${vessel.name}
      Route: ${vessel.route}
      Departure Date: ${formatDate(vessel.departureDate)}
      Arrival Date: ${formatDate(vessel.arrivalDate)}
      Price per pallet: $${vessel.price.toLocaleString()}${vessel.priceXOF ? ` (${vessel.priceXOF.toLocaleString()} XOF)` : ''}
      
      This is an automated booking request from the website.
    `;
    
    // Open the user's email client with pre-filled details
    window.location.href = `mailto:contact@eazy-chain.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    toast({
      title: "Vessel Selected",
      description: `You've selected ${vessel.name}. Complete your booking details.`,
    });
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 ${
        isHovered ? "shadow-lg transform translate-y-[-4px]" : "shadow-sm"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="h-2 bg-gradient-to-r from-primary/80 to-primary w-full absolute top-0 left-0 right-0" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Ship size={18} className="text-primary" />
              {vessel.name}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center">
              <span>{vessel.route}</span>
              <Badge className="ml-2 bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
                <RepeatIcon size={12} />
                Round Trip
              </Badge>
            </CardDescription>
          </div>
          <Badge 
            variant={availabilityPercentage > 30 ? "outline" : "destructive"}
            className={availabilityPercentage > 30 ? "bg-green-50 text-green-700 border-green-200" : ""}
          >
            {availabilityPercentage > 30 ? "Available" : "Limited Space"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>Departure</span>
            </div>
            <span className="font-medium">{formatDate(vessel.departureDate)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>Arrival</span>
            </div>
            <span className="font-medium">{formatDate(vessel.arrivalDate)}</span>
          </div>
          
          {/* Cargo space visualization using the provided ship image */}
          <div className="mt-6 pt-2 border-t">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart4 size={16} />
                <span>Available Space</span>
              </div>
              <span className="font-medium">{vessel.available} of {vessel.capacity} pallets</span>
            </div>
            
            {/* New realistic vessel cargo visualization using the uploaded image */}
            
            
            {/* Keep the boxes and progress bar */}
            <div className="relative h-16 bg-secondary/50 rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 flex flex-wrap p-1 gap-1">
                {Array.from({ length: 80 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 w-2 rounded-sm ${
                      i < Math.round((vessel.available / vessel.capacity) * 80) 
                        ? "bg-primary/70" 
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium bg-white/80 dark:bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                  {Math.round(availabilityPercentage)}% Available
                </span>
              </div>
            </div>
            
            <Progress 
              value={availabilityPercentage} 
              className="h-2"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-lg font-semibold flex flex-col">
          ${vessel.price.toLocaleString()}<span className="text-sm text-muted-foreground font-normal"> per pallet</span>
          {vessel.priceXOF && (
            <span className="text-sm text-muted-foreground font-normal">
              ({vessel.priceXOF.toLocaleString()} XOF)
            </span>
          )}
        </div>
        <Button onClick={handleBookNow}>Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default VesselCard;
