import { useState } from "react";
import { Globe, BarChart, Leaf, Wind, Droplets, ZapOff, Ship, Package, Plane, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomsClearanceForm from "@/components/CustomsClearanceForm";
import AirConsolidationForm from "@/components/AirConsolidationForm";

const Services = () => {
  const [customsDialogOpen, setCustomsDialogOpen] = useState(false);
  const [airConsolidationDialogOpen, setAirConsolidationDialogOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Comprehensive maritime solutions for your business needs
          </p>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Maritime Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Global Trade Consulting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Expert advice on international trade regulations, customs, and compliance to help your business navigate global markets.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Service 2 */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Supply Chain Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Data-driven insights to optimize your supply chain operations and reduce costs while improving efficiency.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Service 3 */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Sustainable Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Eco-friendly shipping options to reduce your carbon footprint and meet environmental compliance standards.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Service 4 */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Wind className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Weather Routing Services</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Optimized route planning based on weather forecasts to ensure safer voyages and reduced fuel consumption.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Service 5 */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Droplets className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Ballast Water Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Comprehensive solutions for ballast water treatment systems to comply with international regulations.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Service 6 */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <ZapOff className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Energy Efficiency Consulting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Expert advice on reducing energy consumption and emissions for your vessel operations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* International Shipping Services */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">International Shipping Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Customs Clearance */}
            <Card 
              className="transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => setCustomsDialogOpen(true)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Customs Clearance Request</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Streamlined customs clearance services to expedite your shipments through border controls and regulatory checkpoints.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Air Consolidation - Updated to open dialog */}
            <Card 
              className="transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => setAirConsolidationDialogOpen(true)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Air Consolidation Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Consolidation services by air from China, Turkey, France, and Germany to Togo, optimizing shipping costs and transit times.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Ocean Consolidation */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Ship className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Ocean Consolidation Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Ocean freight consolidation from China, Turkey, France, and Germany to Togo, ideal for cost-effective shipments.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* China to Togo */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>China to Togo Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Specialized shipping solutions from China to Togo with end-to-end logistics support and tracking capabilities.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Turkey to Togo */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Ship className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Turkey to Togo Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Reliable shipping services from Turkey to Togo with customs handling and competitive transit times.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Europe to Togo */}
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Europe to Togo Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Comprehensive shipping solutions from France and Germany to Togo, featuring flexible scheduling and cargo options.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Customs Clearance Dialog */}
      <Dialog open={customsDialogOpen} onOpenChange={setCustomsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Customs Clearance Request</DialogTitle>
          </DialogHeader>
          <CustomsClearanceForm onClose={() => setCustomsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Air Consolidation Dialog */}
      <Dialog open={airConsolidationDialogOpen} onOpenChange={setAirConsolidationDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Air Consolidation Service Request</DialogTitle>
          </DialogHeader>
          <AirConsolidationForm onClose={() => setAirConsolidationDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact our team today to discuss how we can help optimize your maritime operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-10 px-4 py-2">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background border-t py-12 mt-auto">
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

export default Services;
