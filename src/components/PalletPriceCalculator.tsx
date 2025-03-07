import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Anchor, Ship, MapPin } from "lucide-react";

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

// Port distances in km (based on the provided hypothesis)
const PORT_DISTANCES = {
  "lome-abidjan": 500,
  "lome-sanpedro": 600,
  "lome-monrovia": 1000,
  "lome-conakry": 1200,
  "lome-dakar": 2000,
  "lome-praia": 2500,
  
  "abidjan-lome": 500,
  "abidjan-sanpedro": 300,
  "abidjan-monrovia": 1000,
  "abidjan-conakry": 1200,
  "abidjan-dakar": 2000,
  "abidjan-praia": 2500,
  
  "sanpedro-lome": 600,
  "sanpedro-abidjan": 300,
  "sanpedro-monrovia": 1200,
  "sanpedro-conakry": 1500,
  "sanpedro-dakar": 2500,
  "sanpedro-praia": 3000,
  
  "monrovia-lome": 1000,
  "monrovia-abidjan": 1000,
  "monrovia-sanpedro": 1200,
  "monrovia-conakry": 800,
  "monrovia-dakar": 2500,
  "monrovia-praia": 3000,
  
  "conakry-lome": 1200,
  "conakry-abidjan": 1200,
  "conakry-sanpedro": 1500,
  "conakry-monrovia": 800,
  "conakry-dakar": 1500,
  "conakry-praia": 2000,
  
  "dakar-lome": 2000,
  "dakar-abidjan": 2000,
  "dakar-sanpedro": 2500,
  "dakar-monrovia": 2500,
  "dakar-conakry": 1500,
  "dakar-praia": 1000,
  
  "praia-lome": 2500,
  "praia-abidjan": 2500,
  "praia-sanpedro": 3000,
  "praia-monrovia": 3000,
  "praia-conakry": 2000,
  "praia-dakar": 1000,
};

// Fixed rates in EUR for routes from Lomé
const FIXED_RATES_FROM_LOME = {
  "abidjan": 238,
  "sanpedro": 268,
  "monrovia": 364,
  "conakry": 446,
  "dakar": 561,
  "praia": 680,
};

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

    let basePrice: number;
    
    // Use the fixed rates if the departure port is Lomé
    if (departurePort === "lome" && arrivalPort in FIXED_RATES_FROM_LOME) {
      basePrice = FIXED_RATES_FROM_LOME[arrivalPort as keyof typeof FIXED_RATES_FROM_LOME];
    } 
    // For other routes, calculate based on distance and extrapolated rates from Lomé routes
    else {
      const routeKey = `${departurePort}-${arrivalPort}` as keyof typeof PORT_DISTANCES;
      const distanceKm = PORT_DISTANCES[routeKey] || 0;
      
      if (distanceKm === 0) {
        console.error("Distance not found for route:", routeKey);
        return;
      }
      
      // Calculate equivalent Lomé route to determine the rate
      // First check if there's a direct rate from Lomé to arrival port
      if (arrivalPort in FIXED_RATES_FROM_LOME) {
        // For routes from other ports to the same destination as Lomé routes
        // Use the Lomé rate and adjust based on distance ratio
        const lomeToArrivalDistance = PORT_DISTANCES[`lome-${arrivalPort}` as keyof typeof PORT_DISTANCES];
        const lomeRate = FIXED_RATES_FROM_LOME[arrivalPort as keyof typeof FIXED_RATES_FROM_LOME];
        
        basePrice = (lomeRate / lomeToArrivalDistance) * distanceKm;
      } 
      // For routes where neither departure nor arrival is Lomé, extrapolate from the Lomé-Abidjan reference
      else {
        // Use Lomé-Abidjan as reference: 238 EUR for 500 km
        const referenceRate = 238 / 500; // EUR per km based on Lomé-Abidjan
        basePrice = referenceRate * distanceKm;
      }
    }
    
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
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-primary" />
                  Route: {PORTS[departurePort]} → {PORTS[arrivalPort]}
                </p>
                <p>Pallet type: {palletType === "us" ? "US Pallet" : "Euro Pallet"}</p>
                <p>Distance: {PORT_DISTANCES[`${departurePort}-${arrivalPort}` as keyof typeof PORT_DISTANCES] || 0} km</p>
                {departurePort === "lome" && arrivalPort in FIXED_RATES_FROM_LOME && (
                  <p>Fixed rate: {FIXED_RATES_FROM_LOME[arrivalPort as keyof typeof FIXED_RATES_FROM_LOME]} EUR</p>
                )}
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
                Prices are based on fixed rates from Lomé to major ports, with other routes calculated proportionally.
                Our eco-friendly vessels offer 15% lower costs than diesel vessels, with a capacity of 1,000 pallets per vessel.
                Contact us for bulk shipping quotes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PalletPriceCalculator;
