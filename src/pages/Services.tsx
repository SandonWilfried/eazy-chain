import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  Boxes,
  Coins,
  CreditCard,
  PackageCheck,
  PiggyBank,
  Store,
} from "lucide-react";

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      {/* Navbar */}
      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Explore Our Comprehensive Services</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              At CargoCaravan, we offer a wide range of services designed to streamline your international trade and logistics operations. From sourcing to shipping, we've got you covered.
            </p>
          </section>
          
          {/* International Shipping Services Section */}
          <section className="mb-16" id="international-shipping">
            <div className="mb-8 md:mb-10">
              <h2 className="text-3xl font-bold mb-2">International Shipping Services</h2>
              <p className="text-muted-foreground max-w-3xl">
                We offer a comprehensive range of international shipping services with a focus on reliability and affordability. Our global network ensures your cargo reaches its destination safely and on time.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Chinese Sourcing */}
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Store className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Chinese Sourcing</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Leverage our expertise in Chinese sourcing to find reliable suppliers, negotiate favorable terms, and ensure quality control.
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button onClick={openModal}>Learn More</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment to Suppliers */}
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Payment to Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Secure and reliable payment services to your international suppliers with competitive exchange rates and tracking capabilities.
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button asChild>
                      <Link to="/supplier-payment">Get Started</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Courier Services */}
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <PackageCheck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Courier Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Fast and reliable courier services for your urgent shipments. We handle everything from documentation to delivery.
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button onClick={openModal}>Explore Options</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Financial Solutions Section */}
          <section className="mb-16" id="financial-solutions">
            <div className="mb-8 md:mb-10">
              <h2 className="text-3xl font-bold mb-2">Financial Solutions</h2>
              <p className="text-muted-foreground max-w-3xl">
                Optimize your cash flow and reduce financial risks with our tailored financial solutions for international trade.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Trade Finance */}
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Banknote className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Trade Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Access trade finance solutions to fund your import and export activities, mitigate risks, and improve your working capital.
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button onClick={openModal}>Discover Options</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Currency Exchange */}
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Coins className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Currency Exchange</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Get competitive exchange rates and minimize currency risks with our currency exchange services for international transactions.
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button onClick={openModal}>View Rates</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Escrow Services */}
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <PiggyBank className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Escrow Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Secure your international transactions with our escrow services, ensuring that funds are released only when all terms are met.
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button onClick={openModal}>Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Warehousing & Distribution Section */}
          <section className="mb-16" id="warehousing-distribution">
            <div className="mb-8 md:mb-10">
              <h2 className="text-3xl font-bold mb-2">Warehousing & Distribution</h2>
              <p className="text-muted-foreground max-w-3xl">
                Optimize your supply chain with our warehousing and distribution services, providing secure storage and efficient delivery solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Secure Warehousing */}
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Boxes className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Secure Warehousing</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Store your goods safely in our secure warehouses, equipped with advanced security systems and climate control.
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button onClick={openModal}>Explore Locations</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Distribution Networks */}
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Boxes className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Distribution Networks</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Reach your customers faster with our global distribution networks, offering efficient and cost-effective delivery solutions.
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button onClick={openModal}>View Coverage</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Inventory Management */}
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Boxes className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Inventory Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Optimize your inventory levels and reduce costs with our inventory management services, providing real-time visibility and control.
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button onClick={openModal}>Get a Quote</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
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

export default Services;
