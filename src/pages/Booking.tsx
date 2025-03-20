
import { useState } from "react";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import { Card, CardContent } from "@/components/ui/card";
import PalletPriceCalculator from "@/components/PalletPriceCalculator";
import { useLanguage } from "@/contexts/LanguageContext";

const Booking = () => {
  const [selectedVessel, setSelectedVessel] = useState(null);
  const { t } = useLanguage();

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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('booking')}</h1>
            <p className="text-muted-foreground mb-0">{t('bookingDesc')}</p>
          </div>
        </section>
        
        {/* Main Content Section with Booking Form and Shipping Info Side by Side */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content - Book Your Cargo */}
            <div className="lg:col-span-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{t('bookYourCargo')}</h3>
                  <BookingForm />
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar - Shipping Information */}
            <div className="lg:col-span-4">
              <Card className="bg-card mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{t('shippingInformation')}</h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {t('vesselDesc')}
                  </p>
                  
                  {/* Pallet type information */}
                  <div className="bg-primary/10 rounded-lg p-4">
                    <h4 className="font-medium text-base mb-2">{t('palletTypesAvailable')}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                            US
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{t('usPallet')}</p>
                          <p className="text-xs text-muted-foreground">1200 x 1000 mm</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                            EU
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{t('euroPallet')}</p>
                          <p className="text-xs text-muted-foreground">1200 x 800 mm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Price Calculator */}
              <PalletPriceCalculator />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eazy Chain. {t('allRightsReserved')}
        </div>
      </footer>
    </div>
  );
};

export default Booking;
