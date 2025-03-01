import { useState } from "react";
import Navbar from "@/components/Navbar";
import RoomCard, { RoomProps } from "@/components/RoomCard";
import PassengerBookingForm from "@/components/PassengerBookingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Ship, Users, ShipWheel, User, Leaf, Anchor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Room data with images
const availableRooms: RoomProps[] = [
  {
    id: "standard-1",
    name: "Standard Cabin 1",
    capacity: 2,
    available: 2,
    price: 299,
    amenities: ["Private bathroom", "Air conditioning", "Storage space", "Reading lights"],
    imageUrl: "/lovable-uploads/dc49cca7-a192-430c-b5b2-20afa5343515.png"
  },
  {
    id: "standard-2",
    name: "Standard Cabin 2",
    capacity: 2,
    available: 2,
    price: 299,
    amenities: ["Private bathroom", "Air conditioning", "Storage space", "Reading lights"],
    imageUrl: "/lovable-uploads/a3a0ca37-4b5c-499a-b77d-1b4930d1b070.png"
  },
  {
    id: "deluxe-1",
    name: "Deluxe Cabin 1",
    capacity: 2,
    available: 2,
    price: 399,
    amenities: ["Private bathroom", "Premium bedding", "Ocean view", "Mini refrigerator", "Desk area"],
    imageUrl: "/lovable-uploads/cdea28bb-8c22-4bca-84b9-b371e61f5a0d.png"
  },
  {
    id: "deluxe-2",
    name: "Deluxe Cabin 2",
    capacity: 2,
    available: 1,
    price: 399,
    amenities: ["Private bathroom", "Premium bedding", "Ocean view", "Mini refrigerator", "Desk area"],
    imageUrl: "/lovable-uploads/06612564-a5e3-4908-aa05-12ccd63fcd26.png"
  },
  {
    id: "premium-1",
    name: "Premium Cabin 1",
    capacity: 2,
    available: 2,
    price: 599,
    amenities: ["Luxurious bathroom", "King-size bed", "Panoramic view", "Sitting area", "Room service", "Premium amenities"],
    imageUrl: "/lovable-uploads/4f1849ef-25b4-4c4a-99c8-923ed3b3d4ce.png"
  },
  {
    id: "premium-2",
    name: "Premium Cabin 2",
    capacity: 2,
    available: 0,
    price: 599,
    amenities: ["Luxurious bathroom", "King-size bed", "Panoramic view", "Sitting area", "Room service", "Premium amenities"],
    imageUrl: "/lovable-uploads/0166031e-471c-41a2-b706-ba4695891108.png"
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
            
            {/* About Us Section */}
            <div className="glass-panel p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Anchor className="h-6 w-6 text-primary mr-2" />
                About Us
              </h2>
              
              <div className="space-y-6">
                <p>
                  Sailing as the main mode of propulsion allows for drastically less polluting ocean transport.
                  Compared to the average container ship making the same Le Havre – Guadeloupe route, our cargo sailing ships allow for a massive reduction in greenhouse gas emissions, per tonne transported and per kilometre travelled:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-primary/20">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Leaf className="h-5 w-5 text-primary mr-2" />
                        Emission Reductions
                      </h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>&gt;95% CO2</li>
                        <li>98% sulphur oxides</li>
                        <li>92% nitrogen oxides</li>
                        <li>100% methane (massively emitted by LNG)</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary/20">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Ship className="h-5 w-5 text-primary mr-2" />
                        Biodiversity Benefits
                      </h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Reducing the risk of collision (noise)</li>
                        <li>Mitigating ocean acidification</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">ANEMOS sail inflated by the wind</h3>
                  <p>The sail makes the most of it. The sail provides the best performance to exploit it.</p>
                  <p className="font-medium mt-2">This is the most concrete lever for decarbonizing maritime transport</p>
                  <p className="mt-1">A decarbonization greater than 90% compared to the average ship on our transatlantic routes (230m, 2750 TEU).</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <Card className="border-primary/20">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-3">TOWT sailboat</h3>
                      <p className="font-medium">Carbon footprint of the cargo sailboat</p>
                      <p className="mt-2">Less than 2gCO2/km/T transported for a transatlantic route, according to the emission factors published by ADEME.</p>
                      
                      <p className="font-medium mt-4">By 2025, TOWT guarantees:</p>
                      <ul className="space-y-2 list-disc pl-5 mt-2">
                        <li>A monthly departure from Le Havre to New York, each saving around 500t of CO2.</li>
                        <li>A quarterly coffee import, saving around 700t of CO2 per trip.</li>
                        <li>Intra-American routes on the same frequencies.</li>
                      </ul>
                      <p className="mt-2">These frequencies, thanks to 6 additional sisterships under construction, will gradually be multiplied by 4 over 2026-2027. Several hundred thousand tons per year of goods switched to low-carbon transport.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary/20">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-3">Container ship</h3>
                      <p className="font-medium">Carbon footprint of a container ship</p>
                      <p className="mt-2">A container ship produces 20.2g/km/T transported according to ADEME for a ship between 1150 and 3500 TEU.</p>
                    </CardContent>
                  </Card>
                </div>
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
