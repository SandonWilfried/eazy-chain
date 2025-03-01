import { useNavigate } from "react-router-dom";
import { Ship, Package, Truck, CreditCard } from "lucide-react";
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-container">
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
