
import { useState } from "react";
import { User, Users, Calendar, Check } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export interface RoomProps {
  id: string;
  name: string;
  capacity: number;
  available: number;
  price: number;
  amenities: string[];
  imageUrl: string;
}

const RoomCard = ({ room }: { room: RoomProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  
  // Convert USD to XOF (1 USD ≈ 600 XOF)
  const xofPrice = room.price * 600;
  
  const handleBookNow = () => {
    toast({
      title: "Room Selected",
      description: `You've selected ${room.name}. Complete your booking details.`,
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
        <div className="h-48 overflow-hidden">
          <img 
            src={room.imageUrl} 
            alt={room.name} 
            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
          />
        </div>
        <div className="absolute top-0 right-0 m-2">
          <Badge variant={room.available > 0 ? "outline" : "destructive"} 
            className={room.available > 0 ? "bg-green-50 text-green-700 border-green-200" : ""}>
            {room.available > 0 ? "Available" : "Sold Out"}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{room.name}</span>
          <div className="text-right">
            <div className="text-lg font-semibold">
              ${room.price.toLocaleString()}
              <span className="text-sm text-muted-foreground font-normal"> per night</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {xofPrice.toLocaleString()} XOF <span className="font-normal">per night</span>
            </div>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Users size={16} />
          <span>{room.capacity} person{room.capacity > 1 ? 's' : ''} ({room.available} available)</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Amenities:</h3>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-1 text-sm text-muted-foreground">
                <Check size={14} className="text-primary" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          onClick={handleBookNow} 
          className="w-full"
          disabled={room.available <= 0}
        >
          {room.available > 0 ? "Book Now" : "Sold Out"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
