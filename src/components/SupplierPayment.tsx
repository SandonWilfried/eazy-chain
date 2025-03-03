
import React, { useState } from "react";
import { Ship, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SupplierPaymentForm from "@/components/SupplierPaymentForm";
import { Link } from "react-router-dom";

const SupplierPayment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-primary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Link to="/services">
                <Button variant="ghost" className="mb-4 -ml-3 text-muted-foreground flex items-center gap-1.5">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Services
                </Button>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">Payment to Suppliers</h1>
              <p className="text-lg md:text-xl mt-2 text-muted-foreground max-w-2xl">
                Securely pay your international suppliers with our reliable payment service
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SupplierPaymentForm onClose={() => {}} />
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

export default SupplierPayment;
