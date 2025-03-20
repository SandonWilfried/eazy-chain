
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Anchor, Ship, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Currency conversion rates
const CURRENCY_RATES = {
  "usd": 1,
  "xof": 600, // 1 USD = 600 XOF (approx)
  "eur": 0.92, // 1 USD = 0.92 EUR (approx)
};

// Port names and codes
const PORTS = {
  "lome": "Lomé, Togo",
  "abidjan": "Abidjan, Côte d'Ivoire",
  "sanpedro": "San Pedro, Côte d'Ivoire",
  "monrovia": "Monrovia, Liberia",
  "conakry": "Conakry, Guinea",
  "dakar": "Dakar, Senegal",
  "praia": "Praia, Cape Verde",
};

// Port distances in nautical miles
const PORT_DISTANCES = {
  "lome-abidjan": 270,
  "lome-sanpedro": 324,
  "lome-monrovia": 540,
  "lome-conakry": 648,
  "lome-dakar": 1080,
  "lome-praia": 1350,
  
  "abidjan-lome": 270,
  "abidjan-sanpedro": 162,
  "abidjan-monrovia": 540,
  "abidjan-conakry": 648,
  "abidjan-dakar": 1080,
  "abidjan-praia": 1350,
  
  "sanpedro-lome": 324,
  "sanpedro-abidjan": 162,
  "sanpedro-monrovia": 648,
  "sanpedro-conakry": 810,
  "sanpedro-dakar": 1350,
  "sanpedro-praia": 1620,
  
  "monrovia-lome": 540,
  "monrovia-abidjan": 540,
  "monrovia-sanpedro": 648,
  "monrovia-conakry": 432,
  "monrovia-dakar": 1350,
  "monrovia-praia": 1620,
  
  "conakry-lome": 648,
  "conakry-abidjan": 648,
  "conakry-sanpedro": 810,
  "conakry-monrovia": 432,
  "conakry-dakar": 810,
  "conakry-praia": 1080,
  
  "dakar-lome": 1080,
  "dakar-abidjan": 1080,
  "dakar-sanpedro": 1350,
  "dakar-monrovia": 1350,
  "dakar-conakry": 810,
  "dakar-praia": 540,
  
  "praia-lome": 1350,
  "praia-abidjan": 1350,
  "praia-sanpedro": 1620,
  "praia-monrovia": 1620,
  "praia-conakry": 1080,
  "praia-dakar": 540,
};

// Rate per nautical mile in EUR
const RATE_PER_NAUTICAL_MILE = 0.69;

// Sailing ship discount factor (since our ship uses wind power)
const WIND_POWERED_DISCOUNT = 0.85; // 15% discount due to lower fuel costs

type PalletType = "us" | "euro";
type Currency = "usd" | "xof" | "eur";
type PortCode = keyof typeof PORTS;

const PalletPriceCalculator = () => {
  const { t } = useLanguage();
  const [palletType, setPalletType] = useState<PalletType>("euro");
  const [quantity, setQuantity] = useState<number>(1);
  const [currency, setCurrency] = useState<Currency>("eur");
  const [departurePort, setDeparturePort] = useState<PortCode>("lome");
  const [arrivalPort, setArrivalPort] = useState<PortCode>("praia");
  const [pricePerPallet, setPricePerPallet] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  // Store prices in all currencies
  const [prices, setPrices] = useState<{
    perPallet: { usd: number; eur: number; xof: number } | null;
    total: { usd: number; eur: number; xof: number } | null;
  }>({
    perPallet: null,
    total: null
  });

  const calculatePrice = () => {
    if (departurePort === arrivalPort) {
      setPricePerPallet(0);
      setTotalPrice(0);
      setPrices({
        perPallet: { usd: 0, eur: 0, xof: 0 },
        total: { usd: 0, eur: 0, xof: 0 }
      });
      return;
    }

    // Get the distance in nautical miles
    const routeKey = `${departurePort}-${arrivalPort}` as keyof typeof PORT_DISTANCES;
    const distanceNM = PORT_DISTANCES[routeKey] || 0;
    
    if (distanceNM === 0) {
      console.error("Distance not found for route:", routeKey);
      return;
    }
    
    // Calculate base price using the rate per nautical mile
    let basePrice = distanceNM * RATE_PER_NAUTICAL_MILE;
    
    // Apply wind-powered discount
    basePrice = basePrice * WIND_POWERED_DISCOUNT;
    
    // Adjust price for pallet type
    if (palletType === "us") {
      basePrice = basePrice * 1.2; // US pallets are 20% more expensive due to size
    }
    
    // Convert from EUR to USD first (base for all calculations)
    const eurToUsd = 1 / CURRENCY_RATES.eur;
    const priceInUsd = basePrice * eurToUsd;
    
    // Convert to selected currency for display
    const convertedPrice = priceInUsd * CURRENCY_RATES[currency];
    
    // Calculate prices in all currencies
    const perPalletPrices = {
      usd: priceInUsd,
      eur: priceInUsd * CURRENCY_RATES.eur,
      xof: priceInUsd * CURRENCY_RATES.xof
    };
    
    const totalPrices = {
      usd: perPalletPrices.usd * quantity,
      eur: perPalletPrices.eur * quantity,
      xof: perPalletPrices.xof * quantity
    };
    
    setPricePerPallet(convertedPrice);
    setTotalPrice(convertedPrice * quantity);
    setPrices({
      perPallet: perPalletPrices,
      total: totalPrices
    });
  };

  // Format currency for display
  const formatCurrency = (value: number, currencyCode: Currency) => {
    switch (currencyCode) {
      case "usd":
        return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
      case "xof":
        return `${value.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} XOF`;
      case "eur":
        return `€${value.toLocaleString('de-DE', { maximumFractionDigits: 2 })}`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Ship className="mr-2 h-5 w-5 text-primary" />
          {t('palletPriceCalculator')}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departure-port">{t('portOfDeparture')}</Label>
              <Select 
                value={departurePort} 
                onValueChange={(value: PortCode) => setDeparturePort(value)}
              >
                <SelectTrigger id="departure-port" className="w-full">
                  <SelectValue placeholder={t('selectDeparturePort')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PORTS).map(([code, name]) => (
                    <SelectItem key={`dep-${code}`} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="arrival-port">{t('portOfArrival')}</Label>
              <Select 
                value={arrivalPort} 
                onValueChange={(value: PortCode) => setArrivalPort(value)}
                disabled={!departurePort}
              >
                <SelectTrigger id="arrival-port" className="w-full">
                  <SelectValue placeholder={t('selectArrivalPort')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PORTS)
                    .filter(([code]) => code !== departurePort) // Filter out the departure port
                    .map(([code, name]) => (
                      <SelectItem key={`arr-${code}`} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pallet-type">{t('palletType')}</Label>
              <Select 
                value={palletType} 
                onValueChange={(value: PalletType) => setPalletType(value)}
              >
                <SelectTrigger id="pallet-type" className="w-full">
                  <SelectValue placeholder={t('selectPalletType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="euro">{t('euroPallet')} (1200 x 800 mm)</SelectItem>
                  <SelectItem value="us">{t('usPallet')} (1200 x 1000 mm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="quantity">{t('quantity')}</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={1000}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="currency">{t('currency')}</Label>
            <Select 
              value={currency} 
              onValueChange={(value: Currency) => setCurrency(value)}
            >
              <SelectTrigger id="currency" className="w-full">
                <SelectValue placeholder={t('selectCurrency')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="xof">XOF (CFA)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={calculatePrice} 
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" />
            {t('calculatePrice')}
          </Button>
          
          {prices.perPallet !== null && prices.total !== null && (
            <div className="mt-4 p-4 bg-primary/10 rounded-md">
              <h4 className="font-medium mb-3">{t('estimatedShippingCosts')}</h4>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Per pallet costs */}
                <div className="border-b border-primary/20 pb-3">
                  <h5 className="text-sm text-muted-foreground mb-2">{t('perPallet')}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="bg-secondary/10 p-2 rounded">
                      <span className="text-xs text-muted-foreground">EUR</span>
                      <p className="text-lg font-semibold">{formatCurrency(prices.perPallet.eur, "eur")}</p>
                    </div>
                    <div className="bg-secondary/10 p-2 rounded">
                      <span className="text-xs text-muted-foreground">USD</span>
                      <p className="text-lg font-semibold">{formatCurrency(prices.perPallet.usd, "usd")}</p>
                    </div>
                    <div className="bg-secondary/10 p-2 rounded">
                      <span className="text-xs text-muted-foreground">XOF</span>
                      <p className="text-lg font-semibold">{formatCurrency(prices.perPallet.xof, "xof")}</p>
                    </div>
                  </div>
                </div>
                
                {/* Total costs */}
                <div>
                  <h5 className="text-sm text-muted-foreground mb-2">{t('total')} ({quantity} {t('pallets')}):</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="bg-primary/20 p-2 rounded">
                      <span className="text-xs text-muted-foreground">EUR</span>
                      <p className="text-lg font-bold">{formatCurrency(prices.total.eur, "eur")}</p>
                    </div>
                    <div className="bg-primary/20 p-2 rounded">
                      <span className="text-xs text-muted-foreground">USD</span>
                      <p className="text-lg font-bold">{formatCurrency(prices.total.usd, "usd")}</p>
                    </div>
                    <div className="bg-primary/20 p-2 rounded">
                      <span className="text-xs text-muted-foreground">XOF</span>
                      <p className="text-lg font-bold">{formatCurrency(prices.total.xof, "xof")}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 text-sm text-muted-foreground">
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-primary" />
                  {t('route')} {PORTS[departurePort]} → {PORTS[arrivalPort]}
                </p>
                <p>{t('palletType')}: {palletType === "us" ? t('usPallet') : t('euroPallet')}</p>
                <p>{t('distance')} {PORT_DISTANCES[`${departurePort}-${arrivalPort}` as keyof typeof PORT_DISTANCES] || 0} {t('nauticalMiles')}</p>
                <p>{t('rate')} {RATE_PER_NAUTICAL_MILE} EUR {t('perNauticalMile')}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 bg-accent/30 p-3 rounded-md">
          <div className="flex items-start gap-2">
            <div className="bg-primary/20 p-2 rounded-full mt-1">
              <Anchor className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t('calculatorNote').replace('{rate}', RATE_PER_NAUTICAL_MILE.toString())}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PalletPriceCalculator;
