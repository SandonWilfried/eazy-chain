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
          
          {/* Enhanced visual representation of available space with vessel illustration */}
          <div className="mt-6 pt-2 border-t">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart4 size={16} />
                <span>Available Space</span>
              </div>
              <span className="font-medium">{vessel.available} of {vessel.capacity} pallets</span>
            </div>
            
            {/* Enhanced vessel cargo illustration with clearer pallets */}
            <div className="relative h-40 bg-blue-50 dark:bg-blue-950/20 rounded-lg overflow-hidden mb-3 border border-blue-100 dark:border-blue-900">
              {/* Ship outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[95%] h-[85%] relative">
                  {/* Ship body */}
                  <div className="absolute bottom-0 w-full h-[70%] bg-gray-200 dark:bg-gray-800 rounded-b-lg rounded-t-xl border border-gray-300 dark:border-gray-700">
                    {/* Ship bow */}
                    <div className="absolute top-0 w-full h-[20%] bg-gray-300 dark:bg-gray-700 rounded-t-xl border-b border-gray-400 dark:border-gray-600"></div>
                    
                    {/* Cargo space with enhanced pallet visibility */}
                    <div className="absolute top-[25%] left-[5%] w-[90%] h-[65%] bg-gray-100 dark:bg-gray-900 rounded-md overflow-hidden border border-gray-300 dark:border-gray-700">
                      {/* Cargo pallets grid - now with more defined pallets */}
                      <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 gap-1 p-1.5">
                        {Array.from({ length: 50 }).map((_, i) => {
                          const isAvailable = i < Math.round((vessel.available / vessel.capacity) * 50);
                          return (
                            <div 
                              key={i} 
                              className={`relative rounded-sm border ${
                                isAvailable 
                                  ? "bg-blue-400 dark:bg-blue-600 border-blue-500 dark:border-blue-700" 
                                  : "bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-600"
                              }`}
                            >
                              {/* Pallet details */}
                              <div className={`absolute inset-0 flex items-center justify-center ${
                                isAvailable ? "opacity-100" : "opacity-60"
                              }`}>
                                <div className="w-3/4 h-3/4 border-t border-l border-r border-b-0 
                                  border-gray-500 dark:border-gray-400"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Pallet stacks - visual effect */}
                      <div className="absolute bottom-0 left-0 right-0 h-[15%] flex">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div 
                            key={`stack-${i}`} 
                            className="flex-1 border-t border-gray-400 dark:border-gray-600"
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bridge */}
                    <div className="absolute top-[-15%] right-[10%] w-[25%] h-[30%] bg-gray-400 dark:bg-gray-600 rounded-t-lg border border-gray-500 dark:border-gray-500">
                      {/* Bridge windows */}
                      <div className="absolute top-[30%] left-[20%] right-[20%] h-[20%] flex gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div 
                            key={`window-${i}`} 
                            className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-sm"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Water line with waves */}
                  <div className="absolute bottom-0 w-full">
                    <div className="h-[8px] bg-blue-300 dark:bg-blue-700 z-10"></div>
                    <div className="h-[4px] bg-blue-200 dark:bg-blue-800 opacity-70 z-10"></div>
                  </div>
                </div>
              </div>
              
              {/* Improved capacity indicator */}
              <div className="absolute top-1 right-1 z-10">
                <span className="text-xs font-medium bg-white/90 dark:bg-black/70 px-2 py-1 rounded backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                  {Math.round(availabilityPercentage)}% Available
                </span>
              </div>

              {/* Legend */}
              <div className="absolute bottom-1 left-1 z-10 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-400 dark:bg-blue-600 rounded-sm border border-blue-500"></div>
                  <span className="text-[10px] text-gray-700 dark:text-gray-300">Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-sm border border-gray-400"></div>
                  <span className="text-[10px] text-gray-700 dark:text-gray-300">Reserved</span>
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
