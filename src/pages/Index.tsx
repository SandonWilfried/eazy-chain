
import { useNavigate } from "react-router-dom";
import { Ship, Package, Truck, CreditCard, Anchor, Globe, BarChart, Leaf, Wind, Droplets, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TrackingForm from "@/components/TrackingForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Seamless Shipping for Your <span className="text-primary">Business</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book shipments, track your cargo, and manage payments all in one place. Fast, reliable, and transparent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/booking")}
                className="animate-slide-in [animation-delay:100ms]"
              >
                Book Shipment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/tracking")}
                className="animate-slide-in [animation-delay:200ms]"
              >
                Track Your Cargo
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      
      {/* About Us Section */}
      <section id="about-us" className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
            
            <div className="glass-panel p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Sustainable Maritime Transportation</h3>
              <p className="mb-6 text-lg">
                Sailing as the main mode of propulsion allows for drastically less polluting ocean transport.
                Compared to the average container ship making the same Le Havre – Guadeloupe route, our cargo sailing ships allow for a massive reduction in greenhouse gas emissions, per tonne transported and per kilometre travelled:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-primary/10 p-6 rounded-lg">
                  <h4 className="text-xl font-medium flex items-center mb-4">
                    <ZapOff className="mr-2 h-6 w-6 text-primary" />
                    Emission Reduction
                  </h4>
                  <ul className="space-y-2 text-lg">
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">&gt;95%</span> CO₂
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">98%</span> sulphur oxides
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">92%</span> nitrogen oxides
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">100%</span> methane (massively emitted by LNG)
                    </li>
                  </ul>
                </div>
                
                <div className="bg-primary/10 p-6 rounded-lg">
                  <h4 className="text-xl font-medium flex items-center mb-4">
                    <Leaf className="mr-2 h-6 w-6 text-primary" />
                    Biodiversity Protection
                  </h4>
                  <ul className="space-y-2 text-lg">
                    <li className="flex items-start">
                      Reducing the risk of collision (noise)
                    </li>
                    <li className="flex items-start">
                      Mitigating ocean acidification
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">ANEMOS sail inflated by the wind</h3>
              <p className="mb-4 text-lg">The sail makes the most of it. The sail provides the best performance to exploit it.</p>
              <p className="mb-6 text-lg font-medium">This is the most concrete lever for decarbonizing maritime transport</p>
              
              <div className="bg-primary/10 p-6 rounded-lg mb-6">
                <h4 className="text-xl font-medium flex items-center mb-4">
                  <Wind className="mr-2 h-6 w-6 text-primary" />
                  Unparalleled Efficiency
                </h4>
                <p className="text-lg">A decarbonization greater than 90% compared to the average ship on our transatlantic routes (230m, 2750 TEU).</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Ship className="mr-2 h-6 w-6 text-primary" />
                  TOWT sailboat
                </h3>
                <h4 className="text-lg font-medium mb-3">Carbon footprint of the cargo sailboat</h4>
                <p className="mb-4 text-lg">Less than 2gCO₂/km/T transported for a transatlantic route, according to the emission factors published by ADEME.</p>
                
                <h4 className="text-lg font-medium mb-3">By 2025, TOWT guarantees:</h4>
                <ul className="space-y-2 text-lg">
                  <li>A monthly departure from Le Havre to New York, each saving around 500t of CO₂.</li>
                  <li>A quarterly coffee import, saving around 700t of CO₂ per trip.</li>
                  <li>Intra-American routes on the same frequencies.</li>
                  <li>These frequencies, thanks to 6 additional sisterships under construction, will gradually be multiplied by 4 over 2026-2027.</li>
                  <li>Several hundred thousand tons per year of goods switched to low-carbon transport.</li>
                </ul>
              </div>
              
              <div className="glass-panel p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Anchor className="mr-2 h-6 w-6 text-primary" />
                  Container ship
                </h3>
                <h4 className="text-lg font-medium mb-3">Carbon footprint of a container ship</h4>
                <p className="mb-4 text-lg">A container ship produces 20.2g/km/T transported according to ADEME for a ship between 1150 and 3500 TEU.</p>
                
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">TOWT Sailboat</span>
                    <span className="font-medium">2g CO₂/km/T</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-4">
                    <div className="bg-primary h-4 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2 mt-4">
                    <span className="font-medium">Container Ship</span>
                    <span className="font-medium">20.2g CO₂/km/T</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-4">
                    <div className="bg-destructive h-4 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tracking Section */}
      <section className="bg-accent/50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto glass-panel p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Track Your Shipment</h2>
            <TrackingForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-3">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to efficiently manage your cargo shipping needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="glass-panel p-6 text-center transition-all duration-300 hover:shadow-md">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Ship className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Vessel Booking</h3>
            <p className="text-muted-foreground">
              Book space on our vessels with real-time availability and competitive rates.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel p-6 text-center transition-all duration-300 hover:shadow-md">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cargo Tracking</h3>
            <p className="text-muted-foreground">
              Real-time visibility into your cargo's location and status throughout its journey.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel p-6 text-center transition-all duration-300 hover:shadow-md">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Logistics Support</h3>
            <p className="text-muted-foreground">
              Comprehensive logistics solutions to ensure smooth operations at every stage.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-panel p-6 text-center transition-all duration-300 hover:shadow-md">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
            <p className="text-muted-foreground">
              Secure and convenient payment processing for your shipping transactions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Vessel Image Section */}
      <section className="py-16 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Our Vessels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Modern and efficient vessels to transport your cargo safely
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg mx-auto max-w-4xl">
            <img 
              src="/lovable-uploads/1b96471e-0948-4119-9423-cd74d0e7002f.png" 
              alt="Eazy Chain Vessel" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Digital Platform Section */}
      <section className="py-16 bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Our Digital Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage your shipments easily with our intuitive mobile application
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg mx-auto max-w-sm">
            <img 
              src="/lovable-uploads/28028336-6b36-4a7c-8ca1-e2bbca44b05e.png" 
              alt="Eazy Chain Digital Platform" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Our Trusted Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We collaborate with industry leaders to provide the best shipping solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-panel p-6 flex justify-center items-center transition-all duration-300 hover:shadow-md">
              <img 
                src="/lovable-uploads/6d153727-082d-4151-8d87-83b4d2df35fc.png" 
                alt="Africa Global Logistics" 
                className="h-32 w-auto object-contain"
              />
            </div>
            <div className="glass-panel p-6 flex justify-center items-center transition-all duration-300 hover:shadow-md">
              <img 
                src="/lovable-uploads/19953a92-d5a2-493f-a1ec-42d9c0c38412.png" 
                alt="ECOWAS FECCIAO" 
                className="h-32 w-auto object-contain"
              />
            </div>
            <div className="glass-panel p-6 flex justify-center items-center transition-all duration-300 hover:shadow-md">
              <img 
                src="/lovable-uploads/a6451c69-1a90-439e-a6ca-0213250b62c9.png" 
                alt="TOWT Transport à la Voile" 
                className="h-32 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship With Us?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of businesses that trust us with their shipping needs. Get started today.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate("/booking")}
          >
            Get Started
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Ship className="h-8 w-8 text-primary mr-2" />
              <span className="font-semibold text-xl">Eazy Chain</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Eazy Chain. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
