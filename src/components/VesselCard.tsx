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
            <div className="relative h-60 bg-blue-50 dark:bg-blue-950/20 rounded-lg overflow-hidden mb-4 border border-blue-100 dark:border-blue-900">
              {/* Ship image as base */}
              <img 
                src="/lovable-uploads/00117671-409f-47bf-afe2-5dbb9f9e15f2.png" 
                alt="Cargo vessel from aerial view" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay to show available/unavailable cargo sections */}
              <div className="absolute inset-0 flex flex-col">
                {/* Top bridge section - don't overlay */}
                <div className="h-[15%]"></div>
                
                {/* Cargo area divided into sections */}
                <div className="flex-1 grid grid-rows-10 gap-[1px] px-[15%]">
                  {Array.from({ length: 10 }).map((_, rowIndex) => {
                    // Calculate if this section should be marked as available
                    const rowPercentage = (rowIndex + 1) / 10 * 100;
                    const isAvailable = rowPercentage <= availabilityPercentage;
                    
                    return (
                      <div 
                        key={rowIndex} 
                        className={`w-full ${
                          isAvailable 
                            ? "bg-green-400/30 border border-green-500/50" 
                            : "bg-red-400/30 border border-red-500/50"
                        } backdrop-blur-sm`}
                      ></div>
                    );
                  })}
                </div>
                
                {/* Bottom section - don't overlay */}
                <div className="h-[10%]"></div>
              </div>
              
              {/* Capacity indicators */}
              <div className="absolute top-2 right-2 flex flex-col items-end space-y-1 z-10">
                <div className="px-2 py-1 bg-white/90 dark:bg-black/70 text-xs font-medium rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                  {Math.round(availabilityPercentage)}% Available
                </div>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-2 left-2 z-10 flex flex-col items-start gap-1">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/80 dark:bg-black/60 rounded backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                  <div className="w-3 h-3 bg-green-400/80 rounded-sm border border-green-500"></div>
                  <span className="text-[10px] text-gray-800 dark:text-gray-200">Available Space</span>
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/80 dark:bg-black/60 rounded backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                  <div className="w-3 h-3 bg-red-400/80 rounded-sm border border-red-500"></div>
                  <span className="text-[10px] text-gray-800 dark:text-gray-200">Reserved Space</span>
                </div>
              </div>
            </div>
            
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
