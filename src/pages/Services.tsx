import { Globe, BarChart, Leaf, Wind, Droplets, ZapOff } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
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
