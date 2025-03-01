
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
            
            {/* Enhanced and more realistic vessel cargo illustration */}
            <div className="relative h-52 bg-blue-50 dark:bg-blue-950/20 rounded-lg overflow-hidden mb-4 border border-blue-100 dark:border-blue-900">
              {/* Ocean background with waves */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-400 to-transparent opacity-30"></div>
                
                {/* Animated waves */}
                <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
                  <div className="absolute h-8 w-[200%] left-0 animate-[move-right_10s_linear_infinite]">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute h-8 w-full">
                      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-blue-300 dark:fill-blue-600 opacity-25" />
                    </svg>
                  </div>
                  <div className="absolute h-8 w-[200%] left-0 animate-[move-right_15s_linear_infinite_reverse]">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute h-8 w-full">
                      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-blue-400 dark:fill-blue-500 opacity-20" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Ship illustration */}
              <div className="absolute inset-x-0 bottom-4 mx-auto h-36 w-[85%]">
                {/* Ship hull */}
                <div className="absolute bottom-0 w-full h-24 bg-gray-700 dark:bg-gray-800 rounded-b-xl rounded-t-lg overflow-hidden border-2 border-gray-800 dark:border-gray-700">
                  {/* Hull details */}
                  <div className="absolute inset-y-0 left-0 w-[15%] bg-gray-800 dark:bg-gray-900 skew-x-[20deg]"></div>
                  <div className="absolute inset-y-0 right-0 w-[15%] bg-gray-800 dark:bg-gray-900 skew-x-[-20deg]"></div>
                  
                  {/* Cargo area */}
                  <div className="absolute top-2 left-[15%] right-[15%] bottom-2 bg-gray-600 dark:bg-gray-700 rounded">
                    {/* Cargo containers/pallets - grid layout */}
                    <div className="absolute inset-1 grid grid-cols-8 grid-rows-3 gap-0.5 p-0.5">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const isAvailable = i < Math.round((vessel.available / vessel.capacity) * 24);
                        return (
                          <div key={i} className="relative overflow-hidden border border-gray-500 dark:border-gray-600 rounded-sm">
                            <div className={`absolute inset-0 ${
                              isAvailable 
                                ? "bg-green-500 dark:bg-green-600" 
                                : "bg-red-400 dark:bg-red-700"
                            }`}>
                              {/* Individual pallet details */}
                              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-px p-px">
                                {Array.from({ length: 4 }).map((_, j) => (
                                  <div 
                                    key={j} 
                                    className={`${
                                      isAvailable 
                                        ? "bg-green-400 dark:bg-green-500" 
                                        : "bg-red-300 dark:bg-red-600"
                                    } border border-gray-400 dark:border-gray-500 rounded-[1px]`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Ship deck and superstructure */}
                <div className="absolute bottom-24 right-[20%] w-[30%] h-12 bg-gray-500 dark:bg-gray-600 rounded-t-lg border-2 border-b-0 border-gray-600 dark:border-gray-500">
                  {/* Bridge windows */}
                  <div className="absolute top-2 left-2 right-2 h-3 flex space-x-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex-1 bg-blue-300 dark:bg-blue-700 rounded-sm border border-gray-400"></div>
                    ))}
                  </div>
                  
                  {/* Radar/communication equipment */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                </div>
                
                {/* Smoke stack */}
                <div className="absolute bottom-24 left-[30%] w-[8%] h-8 bg-orange-500 dark:bg-orange-700 rounded-t-md border-2 border-b-0 border-orange-600 dark:border-orange-800">
                  <div className="absolute -top-1 left-0 right-0 h-1 bg-gray-700 dark:bg-gray-800 rounded-t-sm"></div>
                </div>
              </div>
              
              {/* Capacity indicators */}
              <div className="absolute top-2 right-2 flex flex-col items-end space-y-1 z-10">
                <div className="px-2 py-1 bg-white/90 dark:bg-black/70 text-xs font-medium rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                  {Math.round(availabilityPercentage)}% Available
                </div>
                <div className="px-2 py-1 bg-white/90 dark:bg-black/70 text-xs font-medium rounded border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                  {vessel.available} of {vessel.capacity} pallets
                </div>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-2 left-2 z-10 flex flex-col items-start gap-1">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/80 dark:bg-black/60 rounded backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                  <div className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded-sm border border-green-600 dark:border-green-500"></div>
                  <span className="text-[10px] text-gray-800 dark:text-gray-200">Available Space</span>
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/80 dark:bg-black/60 rounded backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                  <div className="w-3 h-3 bg-red-400 dark:bg-red-700 rounded-sm border border-red-500 dark:border-red-600"></div>
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
