import { useState } from "react";
import Navbar from "@/components/Navbar";
import RoomCard, { RoomProps } from "@/components/RoomCard";
import PassengerBookingForm from "@/components/PassengerBookingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Ship, Users, ShipWheel, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Room data with images - updated to only include premium cabins
const availableRooms: RoomProps[] = [
  {
    id: "premium-1",
    name: "Timbuktu",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: ["Luxurious bathroom", "King-size bed", "Panoramic view", "Sitting area", "Room service", "Premium amenities", "Free WiFi", "Breakfast included", "Lunch included", "Dinner included"],
    imageUrl: "/lovable-uploads/e3fd6dab-0bc4-469c-9c15-f714d7767334.png"
  },
  {
    id: "premium-2",
    name: "Lalibela",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: ["Luxurious bathroom", "King-size bed", "Panoramic view", "Sitting area", "Room service", "Premium amenities", "Free WiFi", "Breakfast included", "Lunch included", "Dinner included"],
    imageUrl: "/lovable-uploads/0de33748-89e1-424d-8fc8-67b808131ea3.png"
  },
  {
    id: "premium-3",
    name: "Ouidah",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: ["Luxurious bathroom", "King-size bed", "Panoramic view", "Sitting area", "Room service", "Premium amenities", "Free WiFi", "Breakfast included", "Lunch included", "Dinner included"],
    imageUrl: "/lovable-uploads/e3fd6dab-0bc4-469c-9c15-f714d7767334.png"
  },
  {
    id: "premium-4",
    name: "Abidjan",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: ["Luxurious bathroom", "King-size bed", "Panoramic view", "Sitting area", "Room service", "Premium amenities", "Free WiFi", "Breakfast included", "Lunch included", "Dinner included"],
    imageUrl: "/lovable-uploads/0de33748-89e1-424d-8fc8-67b808131ea3.png"
  },
  {
    id: "premium-5",
    name: "Zanzibar",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: ["Luxurious bathroom", "King-size bed", "Panoramic view", "Sitting area", "Room service", "Premium amenities", "Free WiFi", "Breakfast included", "Lunch included", "Dinner included"],
    imageUrl: "/lovable-uploads/e3fd6dab-0bc4-469c-9c15-f714d7767334.png"
  },
  {
    id: "premium-6",
    name: "Nosy Be",
    capacity: 2,
    available: 2,
    price: 100,
    amenities: ["Luxurious bathroom", "King-size bed", "Panoramic view", "Sitting area", "Room service", "Premium amenities", "Free WiFi", "Breakfast included", "Lunch included", "Dinner included"],
    imageUrl: "/lovable-uploads/0de33748-89e1-424d-8fc8-67b808131ea3.png"
  }
];

// Vessel features
const vesselFeatures = [
  {
    icon: <ShipWheel className="h-12 w-12 text-primary" />,
    title: "Eco-Friendly Travel",
    description: "Our vessel is powered by wind and solar energy, making your journey environmentally responsible."
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "Limited Capacity",
    description: "With only 6 cabins for 12 passengers, enjoy an exclusive and personalized sailing experience."
  },
  {
    icon: <Ship className="h-12 w-12 text-primary" />,
    title: "10-Day Voyage",
    description: "Experience a tranquil 10-day journey between Lomé, Togo and Praia, Cape Verde with coastal stops."
  }
];

// Additional room images to showcase
const additionalRoomImages = [
  {
    id: 1,
    title: "Panoramic Ocean View",
    description: "Wake up to breathtaking ocean views from your cabin window",
    imageUrl: "/lovable-uploads/71824e94-558d-479d-804e-e766cffa8885.png"
  },
  {
    id: 2,
    title: "Luxurious Bathroom",
    description: "Enjoy our premium bathroom facilities during your journey",
    imageUrl: "/lovable-uploads/6d153727-082d-4151-8d87-83b4d2df35fc.png"
  },
  {
    id: 3,
    title: "Dining Experience",
    description: "Savor delicious meals in our comfortable dining areas",
    imageUrl: "/lovable-uploads/c2a686f5-5007-4e3b-8c3f-989d6ab63354.png"
  },
  {
    id: 4,
    title: "Relaxation Space",
    description: "Unwind in our thoughtfully designed relaxation areas",
    imageUrl: "/lovable-uploads/a3a0ca37-4b5c-499a-b77d-1b4930d1b070.png"
  }
];

const Passengers = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  const [showCustomForm, setShowCustomForm] = useState(false);

  const handleCustomBookingClick = () => {
    setShowCustomForm(true);
    setActiveTab("custom");
  };

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Passenger Accommodations</h1>
                <p className="text-muted-foreground">
                  Book your cabin on our sailing vessel for a unique and sustainable ocean voyage
                </p>
              </div>
            </div>
            
            <div className="glass-panel p-6 mb-8">
              <h2 className="text-xl font-semibold mb-3">Sailing Voyage Experience</h2>
              <p className="mb-4">
                Eazy Chain offers passenger accommodations on our cargo sailing vessel. Join us for a unique 10-day voyage between 
                <span className="font-medium"> Lomé, Togo and Praia, Cape Verde</span>, with stops at beautiful coastal cities along the way.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                {vesselFeatures.map((feature, index) => (
                  <div key={index} className="text-center p-4 glass-panel">
                    <div className="mx-auto flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6 mb-2">
                <p className="text-muted-foreground mb-3">
                  Can't find what you're looking for? Create a custom booking request.
                </p>
                <Button 
                  onClick={handleCustomBookingClick}
                  className="px-6"
                >
                  Create Custom Booking
                </Button>
              </div>
            </div>
            
            <Tabs 
              defaultValue="rooms" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rooms" className="text-base py-3">
                  <Ship className="mr-2 h-4 w-4" />
                  Available Cabins
                </TabsTrigger>
                <TabsTrigger value="custom" className="text-base py-3">
                  <User className="mr-2 h-4 w-4" />
                  Custom Booking
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="rooms" className="space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
                
                {/* Room Image Gallery Section */}
                <div className="mt-12 mb-8">
                  <h2 className="text-2xl font-semibold mb-6 text-center">More Cabin Views</h2>
                  <p className="text-muted-foreground text-center mb-8">Explore more images of our premium cabin accommodations</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {additionalRoomImages.map((image) => (
                      <Card key={image.id} className="overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9 relative h-64">
                          <img 
                            src={image.imageUrl} 
                            alt={image.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{image.title}</h3>
                          <p className="text-muted-foreground text-sm">{image.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="custom" className="animate-fade-in">
                <div className="glass-panel px-4 py-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-semibold mb-6">Passenger Booking Request</h2>
                  <p className="text-muted-foreground mb-6">
                    Please provide your details below to book your cabin on our sailing vessel.
                  </p>
                  <PassengerBookingForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eazy Chain. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Passengers;
