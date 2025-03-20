
import React, { useState } from "react";
import { Ship, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SupplierPaymentForm from "@/components/SupplierPaymentForm";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SupplierPayment = () => {
  const { t } = useLanguage();
  
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
                  {t('backToServices')}
                </Button>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{t('paymentToSuppliers')}</h1>
              <p className="text-lg md:text-xl mt-2 text-muted-foreground max-w-2xl">
                {t('suppliersDesc')}
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
              © {new Date().getFullYear()} Eazy Chain. {t('allRightsReserved')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupplierPayment;
