
import { useState } from "react";
import { Globe, BarChart, Leaf, Wind, Droplets, ZapOff, Ship, Package, Plane, Truck, CreditCard, Send, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomsClearanceForm from "@/components/CustomsClearanceForm";
import AirConsolidationForm from "@/components/AirConsolidationForm";
import OceanConsolidationForm from "@/components/OceanConsolidationForm";
import AirFreightForm from "@/components/AirFreightForm";
import OceanFreightForm from "@/components/OceanFreightForm";
import CourierServiceForm from "@/components/CourierServiceForm";
import DroneServiceForm from "@/components/DroneServiceForm";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const [customsDialogOpen, setCustomsDialogOpen] = useState(false);
  const [airConsolidationDialogOpen, setAirConsolidationDialogOpen] = useState(false);
  const [oceanConsolidationDialogOpen, setOceanConsolidationDialogOpen] = useState(false);
  const [airFreightDialogOpen, setAirFreightDialogOpen] = useState(false);
  const [oceanFreightDialogOpen, setOceanFreightDialogOpen] = useState(false);
  const [courierServiceDialogOpen, setCourierServiceDialogOpen] = useState(false);
  const [droneServiceDialogOpen, setDroneServiceDialogOpen] = useState(false);
  const { t } = useLanguage();
  
  const getDefaultDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  };
  
  const maritimeSolutions = [
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      titleKey: 'globalTradeConsulting',
      descriptionKey: 'globalTradeConsultingDesc',
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      titleKey: 'supplyChainAnalytics',
      descriptionKey: 'supplyChainAnalyticsDesc',
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      titleKey: 'sustainableShipping',
      descriptionKey: 'sustainableShippingDesc',
    },
    {
      icon: <Wind className="h-8 w-8 text-primary" />,
      titleKey: 'weatherRoutingServices',
      descriptionKey: 'weatherRoutingServicesDesc',
    },
    {
      icon: <Droplets className="h-8 w-8 text-primary" />,
      titleKey: 'ballastWaterManagement',
      descriptionKey: 'ballastWaterManagementDesc',
    },
    {
      icon: <ZapOff className="h-8 w-8 text-primary" />,
      titleKey: 'energyEfficiencyConsulting',
      descriptionKey: 'energyEfficiencyConsultingDesc',
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('ourServices')}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            {t('servicesDesc')}
          </p>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('internationalShippingServices')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              className="transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => setCustomsDialogOpen(true)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{t('customsClearance')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t('customsClearanceDesc')}
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card 
              className="transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => setAirFreightDialogOpen(true)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{t('airFreight')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t('airFreightDesc')}
                </CardDescription>
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setAirConsolidationDialogOpen(true);
                    }} 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    {t('airGroupage')}
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => setOceanFreightDialogOpen(true)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Ship className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{t('oceanFreight')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t('oceanFreightDesc')}
                </CardDescription>
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOceanConsolidationDialogOpen(true);
                    }} 
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    {t('oceanGroupage')}
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Link to="/supplier-payment" className="block">
              <Card className="transition-all duration-300 hover:shadow-md h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{t('paymentToSuppliers')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {t('suppliersDesc')}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            
            <Card 
              className="transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => setCourierServiceDialogOpen(true)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{t('courierServices')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t('courierServicesDesc')}
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card 
              className="transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() => setDroneServiceDialogOpen(true)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{t('droneServices')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {t('droneServicesDesc')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('maritimeSolutions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {maritimeSolutions.map((service, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle>{t(service.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {t(service.descriptionKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Dialog open={customsDialogOpen} onOpenChange={setCustomsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('customsClearance')}</DialogTitle>
          </DialogHeader>
          <CustomsClearanceForm onClose={() => setCustomsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={airFreightDialogOpen} onOpenChange={setAirFreightDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('airFreight')}</DialogTitle>
          </DialogHeader>
          <AirFreightForm onClose={() => setAirFreightDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={airConsolidationDialogOpen} onOpenChange={setAirConsolidationDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('airGroupage')}</DialogTitle>
          </DialogHeader>
          <AirConsolidationForm onClose={() => setAirConsolidationDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={oceanFreightDialogOpen} onOpenChange={setOceanFreightDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('oceanFreight')}</DialogTitle>
          </DialogHeader>
          <OceanFreightForm onClose={() => setOceanFreightDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={oceanConsolidationDialogOpen} onOpenChange={setOceanConsolidationDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('oceanGroupage')}</DialogTitle>
          </DialogHeader>
          <OceanConsolidationForm onClose={() => setOceanConsolidationDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={courierServiceDialogOpen} onOpenChange={setCourierServiceDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('courierServices')}</DialogTitle>
          </DialogHeader>
          <CourierServiceForm onClose={() => setCourierServiceDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={droneServiceDialogOpen} onOpenChange={setDroneServiceDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t('droneServiceRequest')}</DialogTitle>
          </DialogHeader>
          <DroneServiceForm onClose={() => setDroneServiceDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('readyToGetStarted')}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t('contactOurTeam')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-10 px-4 py-2">
              {t('bookConsultation')}
            </Link>
          </div>
        </div>
      </section>
      
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

export default Services;
