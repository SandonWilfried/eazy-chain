import { useState } from "react";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Ship } from "lucide-react";
import VesselCard from "@/components/VesselCard";

// Route Map Component
const RouteMap = () => {
  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Voyage Route</h3>
        <div className="relative h-48 rounded-md overflow-hidden">
          <img
            src="/map-route.png"
            alt="Voyage Route"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-md text-sm px-2 py-1">
            Lomé ↔ Praia
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Lomé, Togo</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Praia, Cape Verde</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Booking = () => {
  const [selectedVessel, setSelectedVessel] = useState(null);

  // Sample vessels data for the fleet section
  const vessels = [
    {
      id: "v1",
      name: "MS Eazy Voyager",
      route: "Lomé, Togo ↔ Praia, Cape Verde",
      departureDate: "2023-12-10",
      arrivalDate: "2023-12-18",
      capacity: 300,
      available: 120,
      price: 1200,
      priceXOF: 720000
    },
    {
      id: "v2",
      name: "MS Eazy Explorer",
      route: "Lomé, Togo ↔ Praia, Cape Verde",
      departureDate: "2023-12-22",
      arrivalDate: "2023-12-30",
      capacity: 280,
      available: 35,
      price: 1300,
      priceXOF: 780000
    },
    {
      id: "v3",
      name: "MS Eazy Mariner",
      route: "Lomé, Togo ↔ Praia, Cape Verde",
      departureDate: "2024-01-05",
      arrivalDate: "2024-01-13",
      capacity: 320,
      available: 200,
      price: 1150,
      priceXOF: 690000
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pb-16">
        {/* Page Header */}
        <section className="pt-24 pb-10 bg-accent/30">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking</h1>
            <p className="text-muted-foreground mb-0">Book cargo space on our vessels for your shipments</p>
          </div>
        </section>
        
        {/* Fleet Section */}
        <section id="fleet" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Our Fleet</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from our available vessels for your next shipment
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {vessels.map(vessel => (
                <VesselCard key={vessel.id} vessel={vessel} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Booking Form Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="cargo">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="cargo">Cargo</TabsTrigger>
                      <TabsTrigger value="container">Container</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cargo" className="mt-0">
                      <BookingForm />
                    </TabsContent>
                    <TabsContent value="container" className="mt-0">
                      <BookingForm isContainer />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar - 1/3 width on large screens */}
            <div>
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                  
                  <p className="text-muted-foreground mb-6">
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
                  <Button className="w-full mt-6">
                    <Ship className="mr-2 h-4 w-4" />
                    Create Custom Booking
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
