
import { useState } from "react";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import VesselCard, { VesselProps } from "@/components/VesselCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ship, MapPin } from "lucide-react";

// Updated vessel data with new information
const availableVessels: VesselProps[] = [
  {
    id: "v1",
    name: "Anemos",
    route: "Lomé, Togo → Praia, Cape Verde",
    departureDate: "2026-01-05",
    arrivalDate: "2023-12-10",
    capacity: 1050,
    available: 750,
    price: 150,
    priceXOF: 90000, // Approximate conversion rate 1 USD = 600 XOF
  }
];

// Port stops information with image URLs
const portStops = [
  {
    name: "Port of Lomé, Togo (Departure)",
    imageUrl: "/lovable-uploads/dc49cca7-a192-430c-b5b2-20afa5343515.png"
  },
  {
    name: "Port of Abidjan, Côte d'Ivoire",
    imageUrl: "/lovable-uploads/c2a686f5-5007-4e3b-8c3f-989d6ab63354.png"
  },
  {
    name: "Port of San Pedro, Côte d'Ivoire",
    imageUrl: "/lovable-uploads/651aee85-46ba-4155-ab92-d07e64f078d6.png"
  },
  {
    name: "Port of Monrovia, Liberia",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Port of Conakry, Guinea",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Port of Dakar, Senegal",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Port of Praia, Cape Verde (Arrival)",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80"
  }
];

// Map component to show the route
const RouteMap = () => {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden mt-4 mb-6">
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
              </p>
              
              <RouteMap />
              
              {/* Moved the Create Custom Booking button to below the map */}
              <div className="text-center mt-4 mb-6">
                <p className="text-muted-foreground mb-3">
                  Need a custom shipping solution? Create a custom booking request.
                </p>
                <Button 
                  onClick={() => setActiveTab("custom")}
                  className="px-6"
                >
                  Create Custom Booking
                </Button>
              </div>
              
              <h3 className="font-medium text-lg mb-4">Route Information</h3>
              <ul className="space-y-6 mb-4">
                {portStops.map((port, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-primary mt-2"></div>
                      {index < portStops.length - 1 && <div className="h-full w-0.5 bg-gray-300"></div>}
                    </div>
                    <div className="flex-1">
                      <div className="rounded-lg overflow-hidden mb-2 h-32 sm:h-40">
                        <img 
                          src={port.imageUrl} 
                          alt={port.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium">{port.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
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
                
                {/* Removed the duplicate "Create Custom Booking" button that was here */}
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
