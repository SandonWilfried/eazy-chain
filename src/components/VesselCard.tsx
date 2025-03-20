
import { useState } from "react";
import { Ship, Calendar, Package, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    // This would typically navigate to booking page with vessel pre-selected
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
            <CardDescription className="mt-1">{vessel.route}</CardDescription>
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package size={16} />
              <span>Available Space</span>
            </div>
            <span className="font-medium">{vessel.available} of {vessel.capacity} TEU</span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full" 
                style={{ width: `${(vessel.available / vessel.capacity) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-lg font-semibold">
          ${vessel.price.toLocaleString()}<span className="text-sm text-muted-foreground font-normal"> per TEU</span>
        </div>
        <Button onClick={handleBookNow}>Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default VesselCard;
