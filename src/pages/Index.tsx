
import { useNavigate } from "react-router-dom";
import { Ship, Package, Truck, CreditCard, Anchor, Globe, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TrackingForm from "@/components/TrackingForm";

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

      {/* About Us Section */}
      <section id="about-us" className="py-20 bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Eazy Chain</h2>
              <p className="text-lg text-muted-foreground">
                Revolutionizing short-sea shipping in West Africa through innovation and sustainability
              </p>
            </div>
            
            <div className="glass-panel p-8 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="mb-6 text-lg">
                We decided to start Eazy Chain to facilitate short-sea shipping in West Africa. Maritime transport accounts for 90% of global trade, and in Africa, ports are the key to our economic competitiveness. However, our port infrastructure is congested, delays are too long, and costs are exorbitant.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Anchor className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-medium mb-2">Port Congestion</h4>
                  <p className="text-muted-foreground">
                    Logistical delays paralyze trade, increasing costs and reducing competitiveness.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-medium mb-2">Poor Connectivity</h4>
                  <p className="text-muted-foreground">
                    Difficult to transport goods across the West African coast due to lack of efficient connections.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-medium mb-2">Low Regional Trade</h4>
                  <p className="text-muted-foreground">
                    Only 15% intra-regional trade in West Africa, compared to 68% in Europe and 59% in Asia.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Our Solution</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <img 
                      src="/lovable-uploads/1b96471e-0948-4119-9423-cd74d0e7002f.png" 
                      alt="Eazy Chain Vessel" 
                      className="rounded-lg shadow-md w-full h-auto"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <p className="mb-4">
                      Eazy Chain offers an innovative solution with the introduction of coastal vessels and a digital logistics management platform. Our 1,100-tonne, fully palletized vessel will connect the port of Lomé to the port of Praia, with successive stops in the ports of Abidjan, San Pedro, Monrovia, Conakry and Dakar.
                    </p>
                    <p className="mb-4">
                      This sailing cargo ship will reduce 5,000 tonnes of CO2 per year and streamline intra-regional trade. In addition, our digital platform offers automated booking, real-time tracking, and secure payments, guaranteeing transparency and efficiency.
                    </p>
                    <div className="flex gap-4 mt-6">
                      <Button onClick={() => navigate("/booking")}>Book Now</Button>
                      <Button variant="outline" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
                        Our Services
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-2xl font-semibold mb-4">The Challenges We Address</h3>
                <p className="mb-6">
                  We face three major challenges in West African shipping:
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <span className="font-medium">Port congestion:</span> Logistical delays paralyze trade, increasing costs.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <span className="font-medium">Lack of connectivity and digitalization:</span> It is difficult to transport goods from one port to another along the entire West African coast due to the lack of efficient connections. Also, reservations and freight management are still manual, which reduces the competitiveness of our African companies.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <span className="font-medium">Low intra-regional trade:</span> In West Africa, trade between countries represents only about 15% of trade, compared to 68% in Europe, 59% in Asia and 30% in South America.
                    </div>
                  </li>
                </ul>
                <p className="mb-6">
                  This weak economic integration is a brake on our development. Without efficient logistics, it is impossible to increase intra-African trade and strengthen our competitiveness.
                </p>
                <p className="mb-6">
                  Faced with all these challenges, Eazy Chain offers an innovative solution with the introduction of coastal vessels and a digital logistics management platform. Our 1,100-tonne, fully palletized vessel will connect the port of Lomé to the port of Praia, with successive stops in the ports of Abidjan, San Pedro, Monrovia, Conakry and Dakar. This sailing cargo ship will reduce 5,000 tonnes of CO2 per year and streamline intra-regional trade. In addition, our digital platform will offer automated booking, real-time tracking and secure payments, guaranteeing transparency and efficiency.
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <div className="flex justify-center space-x-4">
                <img 
                  src="/lovable-uploads/6d153727-082d-4151-8d87-83b4d2df35fc.png" 
                  alt="Africa Global Logistics" 
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
                <img 
                  src="/lovable-uploads/19953a92-d5a2-493f-a1ec-42d9c0c38412.png" 
                  alt="ECOWAS FECCIAO" 
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
                <img 
                  src="/lovable-uploads/a6451c69-1a90-439e-a6ca-0213250b62c9.png" 
                  alt="TOWT Transport à la Voile" 
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
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
