
import { useState } from "react";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import VesselCard, { VesselProps } from "@/components/VesselCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ship, MapPin } from "lucide-react";

// Updated vessel data with corrected arrival date
const availableVessels: VesselProps[] = [
  {
    id: "v1",
    name: "Anemos",
    route: "Lomé, Togo ↔ Praia, Cape Verde",
    departureDate: "2026-01-05",
    arrivalDate: "2026-01-15", // Updated to 2026, 10 days after departure
    capacity: 1050,
    available: 750,
    price: 150,
    priceXOF: 90000, // Approximate conversion rate 1 USD = 600 XOF
  }
];

// Port stops information with image URLs and sailing times
const portStops = [
  {
    name: "Port of Lomé, Togo (Departure)",
    imageUrl: "/lovable-uploads/dc49cca7-a192-430c-b5b2-20afa5343515.png",
    sailingTime: "Departure point"
  },
  {
    name: "Port of Abidjan, Côte d'Ivoire",
    imageUrl: "/lovable-uploads/a3a0ca37-4b5c-499a-b77d-1b4930d1b070.png",
    sailingTime: "1 day from Lomé"
  },
  {
    name: "Port of San Pedro, Côte d'Ivoire",
    imageUrl: "/lovable-uploads/cdea28bb-8c22-4bca-84b9-b371e61f5a0d.png",
    sailingTime: "1 day from Abidjan"
  },
  {
    name: "Port of Monrovia, Liberia",
    imageUrl: "/lovable-uploads/06612564-a5e3-4908-aa05-12ccd63fcd26.png",
    sailingTime: "1 day from San Pedro"
  },
  {
    name: "Port of Conakry, Guinea",
    imageUrl: "/lovable-uploads/4f1849ef-25b4-4c4a-99c8-923ed3b3d4ce.png",
    sailingTime: "1 day from Monrovia"
  },
  {
    name: "Port of Dakar, Senegal",
    imageUrl: "/lovable-uploads/0166031e-471c-41a2-b706-ba4695891108.png",
    sailingTime: "1 day from Conakry"
  },
  {
    name: "Port of Praia, Cape Verde (Return Point)",
    imageUrl: "/lovable-uploads/1d6430d0-d19c-41a0-bda3-24d8b807d30b.png",
    sailingTime: "1 day from Dakar (10 days total)"
  }
];

// Map component to show the route with reduced height
const RouteMap = () => {
  return (
    <div className="relative w-full h-[300px] rounded-lg overflow-hidden mt-4 mb-6">
      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
        <img 
          src="/lovable-uploads/6462364d-51d2-44c2-9ac6-52ede7aeb9e4.png" 
          alt="Ship route map from West Africa to Cape Verde" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/50 p-2 rounded text-xs font-medium backdrop-blur-sm">
          © Eazy Chain Shipping Routes
        </div>
      </div>
    </div>
  );
};

const Booking = () => {
  const [activeTab, setActiveTab] = useState("vessels");
  const [showCustomForm, setShowCustomForm] = useState(false);

  const handleCustomBookingClick = () => {
    setShowCustomForm(true);
    setActiveTab("vessels"); // Keep the vessels tab active
  };

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Book Your Shipment</h1>
                <p className="text-muted-foreground">
                  Reserve space on our cargo sailing vessel or create a custom booking request
                </p>
              </div>
            </div>
            
            <div className="glass-panel p-6 mb-8">
              <h2 className="text-xl font-semibold mb-3">Our Sailing Vessel</h2>
              <p className="mb-4">
                Eazy Chain operates a cargo sailing vessel with a capacity of 1050 pallets. Pricing is per pallet rather than per container.
                <span className="font-medium"> Our vessels operate round trip voyages between Lomé, Togo and Praia, Cape Verde.</span>
              </p>
              
              {/* Add pallet type information */}
              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-lg mb-2">Pallet Types Available</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        US
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">US Pallet</p>
                      <p className="text-sm text-muted-foreground">1200 x 1000 mm</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        EU
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Euro Pallet</p>
                      <p className="text-sm text-muted-foreground">1200 x 800 mm</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <RouteMap />
              
              {/* Create Custom Booking button */}
              <div className="text-center mt-4 mb-6">
                <p className="text-muted-foreground mb-3">
                  Need a custom shipping solution? Create a custom booking request.
                </p>
                <Button 
                  onClick={handleCustomBookingClick}
                  className="px-6"
                >
                  Create Custom Booking
                </Button>
              </div>
              
              {/* Display the custom booking form below the button when requested */}
              {showCustomForm && (
                <div className="glass-panel px-4 py-6 md:p-8 mb-8 mt-6 border border-border">
                  <h2 className="text-2xl font-semibold mb-6">Custom Booking Request</h2>
                  <p className="text-muted-foreground mb-6">
                    Please provide details about your shipment and we'll find the best solution to accommodate your needs.
                  </p>
                  <BookingForm />
                </div>
              )}
              
              <h3 className="font-medium text-lg mb-4">Round Trip Route Information</h3>
              
              {/* Updated port stops to display sailing times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {portStops.map((port, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="rounded-lg overflow-hidden mb-2 h-40">
                      <img 
                        src={port.imageUrl} 
                        alt={port.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-primary mr-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-sm">{port.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{port.sailingTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Tabs 
              defaultValue="vessels" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="space-y-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="vessels" className="text-base py-3">
                  <Ship className="mr-2 h-4 w-4" />
                  Available Vessels
                </TabsTrigger>
                <TabsTrigger value="custom" className="text-base py-3">
                  Custom Booking
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="vessels" className="space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-1 gap-6">
                  {availableVessels.map((vessel) => (
                    <VesselCard key={vessel.id} vessel={vessel} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="custom" className="animate-fade-in">
                <div className="glass-panel px-4 py-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-semibold mb-6">Custom Booking Request</h2>
                  <p className="text-muted-foreground mb-6">
                    Please provide details about your shipment and we'll find the best solution to accommodate your needs.
                  </p>
                  <BookingForm />
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

export default Booking;
