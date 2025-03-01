
import { useState } from "react";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import VesselCard, { VesselProps } from "@/components/VesselCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ship } from "lucide-react";

// Mock data for vessels
const availableVessels: VesselProps[] = [
  {
    id: "v1",
    name: "Nordic Navigator",
    route: "Shanghai → Rotterdam",
    departureDate: "2023-11-15",
    arrivalDate: "2023-12-05",
    capacity: 100,
    available: 65,
    price: 2300,
  },
  {
    id: "v2",
    name: "Pacific Pathfinder",
    route: "Hong Kong → Los Angeles",
    departureDate: "2023-11-20",
    arrivalDate: "2023-12-10",
    capacity: 120,
    available: 30,
    price: 2700,
  },
  {
    id: "v3",
    name: "Atlantic Adventurer",
    route: "New York → Hamburg",
    departureDate: "2023-11-25",
    arrivalDate: "2023-12-10",
    capacity: 80,
    available: 10,
    price: 2500,
  },
  {
    id: "v4",
    name: "Baltic Voyager",
    route: "St. Petersburg → Helsinki",
    departureDate: "2023-11-18",
    arrivalDate: "2023-11-25",
    capacity: 50,
    available: 35,
    price: 1800,
  },
];

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
                  Choose from available vessels or create a custom booking request
                </p>
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
                <div className="grid md:grid-cols-2 gap-6">
                  {availableVessels.map((vessel) => (
                    <VesselCard key={vessel.id} vessel={vessel} />
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-4">
                    Don't see a suitable vessel? Create a custom booking request.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("custom")}
                  >
                    Create Custom Booking
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="custom" className="animate-fade-in">
                <div className="glass-panel px-4 py-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-semibold mb-6">Custom Booking Request</h2>
                  <p className="text-muted-foreground mb-6">
                    Please provide details about your shipment and we'll find the best vessel to accommodate your needs.
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
          © {new Date().getFullYear()} CargoCaravan. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Booking;
