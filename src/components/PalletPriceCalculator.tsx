
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Anchor, Ship } from "lucide-react";

// Price per pallet type in USD
const PALLET_PRICES = {
  "us": 1200, // US Pallet
  "euro": 1000, // Euro Pallet
};

// Currency conversion rates
const CURRENCY_RATES = {
  "usd": 1,
  "xof": 600, // 1 USD = 600 XOF (approx)
  "eur": 0.92, // 1 USD = 0.92 EUR (approx)
};

// Port distances and relative cost factors
// Based on the competitor's price of 865 EUR for Le Havre to New York
const PORTS = {
  "lome": "Lomé, Togo",
  "abidjan": "Abidjan, Côte d'Ivoire",
  "sanpedro": "San Pedro, Côte d'Ivoire",
  "monrovia": "Monrovia, Liberia",
  "conakry": "Conakry, Guinea",
  "dakar": "Dakar, Senegal",
  "praia": "Praia, Cape Verde",
};

// Distance factors relative to base route (Le Havre to New York)
// These factors adjust the price based on the distance ratio compared to reference route
const DISTANCE_FACTORS = {
  "lome-abidjan": 0.15,
  "lome-sanpedro": 0.20,
  "lome-monrovia": 0.30,
  "lome-conakry": 0.45,
  "lome-dakar": 0.60,
  "lome-praia": 0.75,
  
  "abidjan-lome": 0.15,
  "abidjan-sanpedro": 0.10,
  "abidjan-monrovia": 0.25,
  "abidjan-conakry": 0.40,
  "abidjan-dakar": 0.55,
  "abidjan-praia": 0.70,
  
  "sanpedro-lome": 0.20,
  "sanpedro-abidjan": 0.10,
  "sanpedro-monrovia": 0.20,
  "sanpedro-conakry": 0.35,
  "sanpedro-dakar": 0.50,
  "sanpedro-praia": 0.65,
  
  "monrovia-lome": 0.30,
  "monrovia-abidjan": 0.25,
  "monrovia-sanpedro": 0.20,
  "monrovia-conakry": 0.25,
  "monrovia-dakar": 0.40,
  "monrovia-praia": 0.55,
  
  "conakry-lome": 0.45,
  "conakry-abidjan": 0.40,
  "conakry-sanpedro": 0.35,
  "conakry-monrovia": 0.25,
  "conakry-dakar": 0.25,
  "conakry-praia": 0.40,
  
  "dakar-lome": 0.60,
  "dakar-abidjan": 0.55,
  "dakar-sanpedro": 0.50,
  "dakar-monrovia": 0.40,
  "dakar-conakry": 0.25,
  "dakar-praia": 0.25,
  
  "praia-lome": 0.75,
  "praia-abidjan": 0.70,
  "praia-sanpedro": 0.65,
  "praia-monrovia": 0.55,
  "praia-conakry": 0.40,
  "praia-dakar": 0.25,
};

// Base price from competitor (Le Havre to New York)
const BASE_PRICE_EUR = 865;

// Sailing ship discount factor (since our ship uses wind power)
const WIND_POWERED_DISCOUNT = 0.85; // 15% discount due to lower fuel costs

type PalletType = "us" | "euro";
type Currency = "usd" | "xof" | "eur";
type PortCode = keyof typeof PORTS;

const PalletPriceCalculator = () => {
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

    const routeKey = `${departurePort}-${arrivalPort}` as keyof typeof DISTANCE_FACTORS;
    const distanceFactor = DISTANCE_FACTORS[routeKey] || 1.0;
    
    // Calculate based on competitor's reference price, adjusted for our route
    let basePrice = BASE_PRICE_EUR * distanceFactor;
    
    // Apply wind-powered discount
    basePrice = basePrice * WIND_POWERED_DISCOUNT;
    
    // Adjust price for pallet type
    if (palletType === "us") {
      basePrice = basePrice * 1.2; // US pallets are 20% more expensive
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
          Pallet Price Calculator
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departure-port">Port of Departure</Label>
              <Select 
                value={departurePort} 
                onValueChange={(value: PortCode) => setDeparturePort(value)}
              >
                <SelectTrigger id="departure-port" className="w-full">
                  <SelectValue placeholder="Select departure port" />
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
              <Label htmlFor="arrival-port">Port of Arrival</Label>
              <Select 
                value={arrivalPort} 
                onValueChange={(value: PortCode) => setArrivalPort(value)}
              >
                <SelectTrigger id="arrival-port" className="w-full">
                  <SelectValue placeholder="Select arrival port" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PORTS).map(([code, name]) => (
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
              <Label htmlFor="pallet-type">Pallet Type</Label>
              <Select 
                value={palletType} 
                onValueChange={(value: PalletType) => setPalletType(value)}
              >
                <SelectTrigger id="pallet-type" className="w-full">
                  <SelectValue placeholder="Select pallet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="euro">Euro Pallet (1200 x 800 mm)</SelectItem>
                  <SelectItem value="us">US Pallet (1200 x 1000 mm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="quantity">Quantity</Label>
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
            <Label htmlFor="currency">Currency</Label>
            <Select 
              value={currency} 
              onValueChange={(value: Currency) => setCurrency(value)}
            >
              <SelectTrigger id="currency" className="w-full">
                <SelectValue placeholder="Select currency" />
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
            Calculate Price
          </Button>
          
          {prices.perPallet !== null && prices.total !== null && (
            <div className="mt-4 p-4 bg-primary/10 rounded-md">
              <h4 className="font-medium mb-3">Estimated Shipping Costs:</h4>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Per pallet costs */}
                <div className="border-b border-primary/20 pb-3">
                  <h5 className="text-sm text-muted-foreground mb-2">Per pallet:</h5>
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
                  <h5 className="text-sm text-muted-foreground mb-2">Total ({quantity} pallets):</h5>
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
                <p>Route: {PORTS[departurePort]} → {PORTS[arrivalPort]}</p>
                <p>Pallet type: {palletType === "us" ? "US Pallet" : "Euro Pallet"}</p>
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
                This calculator provides an estimate for shipping pallets on our wind-powered vessels.
                Prices reflect our eco-friendly shipping advantage with lower fuel consumption.
                Maximum capacity: 1,000 pallets per vessel. Contact us for bulk shipping quotes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PalletPriceCalculator;
