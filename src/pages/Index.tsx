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
      
      {/* About Us Section */}
      <section id="about" className="py-16 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">About Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Committed to sustainable and eco-friendly maritime transport
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Sustainable Shipping</h3>
              <p className="mb-6">
                Sailing as the main mode of propulsion allows for drastically less polluting ocean transport.
                Compared to the average container ship making the same Le Havre – Guadeloupe route, our cargo 
                sailing ships allow for a massive reduction in greenhouse gas emissions, per tonne transported 
                and per kilometre travelled:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-green-50/50 border-green-100">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{'>'} 95% CO₂</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Reduction in carbon dioxide</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50/50 border-blue-100">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Wind className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">98%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Reduction in sulphur oxides</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50/50 border-purple-100">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <ZapOff className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">92%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Reduction in nitrogen oxides</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50/50 border-amber-100">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                      <Droplets className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl">100%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Reduction in methane emissions</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-3">Beyond the climate impact</h4>
                <p className="mb-3">Using sailing rather than an engine helps to mitigate the impacts on biodiversity:</p>
                <ul className="list-disc list-inside space-y-2 mb-6 pl-4">
                  <li>Reducing the risk of collision (noise)</li>
                  <li>Mitigating ocean acidification</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-3">ANEMOS sail inflated by the wind</h4>
                <p className="mb-2">The sail makes the most of it</p>
                <p className="mb-4">The sail provides the best performance to exploit it.</p>
                
                <p className="mb-3">This is the most concrete lever for decarbonizing maritime transport</p>
                <p className="mb-6">A decarbonization greater than 90% compared to the average ship on our transatlantic routes (230m, 2750 TEU).</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>TOWT Sailboat</CardTitle>
                    <CardDescription>Carbon footprint of the cargo sailboat</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      <span className="font-bold text-green-600">Less than 2g CO₂/km/T</span> transported for 
                      a transatlantic route, according to the emission factors published by ADEME.
                    </p>
                    <h4 className="font-semibold mb-2">By 2025, TOWT guarantees:</h4>
                    <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                      <li>A monthly departure from Le Havre to New York, each saving around 500t of CO₂</li>
                      <li>A quarterly coffee import, saving around 700t of CO₂ per trip</li>
                      <li>Intra-American routes on the same frequencies</li>
                    </ul>
                    <p className="text-sm">
                      These frequencies, thanks to 6 additional sisterships under construction, 
                      will gradually be multiplied by 4 over 2026-2027. Several hundred thousand 
                      tons per year of goods switched to low-carbon transport.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Container Ship</CardTitle>
                    <CardDescription>Carbon footprint of a container ship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      A container ship produces <span className="font-bold text-red-600">20.2g/km/T</span> transported 
                      according to ADEME for a ship between 1150 and 3500 TEU.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
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
