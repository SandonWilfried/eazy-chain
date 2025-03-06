
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

// Price per pallet type in USD
const PALLET_PRICES = {
  "us": 1200, // US Pallet
  "euro": 1000, // Euro Pallet
};

// Currency conversion rates
const CURRENCY_RATES = {
  "usd": 1,
  "xof": 600, // 1 USD = 600 XOF (approx)
};

type PalletType = "us" | "euro";
type Currency = "usd" | "xof";

const PalletPriceCalculator = () => {
  const [palletType, setPalletType] = useState<PalletType>("us");
  const [quantity, setQuantity] = useState<number>(1);
  const [currency, setCurrency] = useState<Currency>("usd");
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const basePrice = PALLET_PRICES[palletType];
    const total = basePrice * quantity;
    const convertedTotal = total * CURRENCY_RATES[currency];
    setTotalPrice(convertedTotal);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Pallet Price Calculator</h3>
        
        <div className="space-y-4">
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
                <SelectItem value="us">US Pallet (1200 x 1000 mm)</SelectItem>
                <SelectItem value="euro">Euro Pallet (1200 x 800 mm)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
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
          
          {totalPrice !== null && (
            <div className="mt-4 p-4 bg-primary/10 rounded-md">
              <h4 className="font-medium mb-1">Estimated Price:</h4>
              <p className="text-2xl font-bold">
                {currency === "usd" 
                  ? `$${totalPrice.toLocaleString()}`
                  : `${totalPrice.toLocaleString()} XOF`
                }
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Base price per {palletType === "us" ? "US" : "Euro"} pallet: 
                {currency === "usd" 
                  ? ` $${PALLET_PRICES[palletType].toLocaleString()}`
                  : ` ${(PALLET_PRICES[palletType] * CURRENCY_RATES.xof).toLocaleString()} XOF`
                }
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-6 bg-accent/30 p-3 rounded-md">
          <div className="flex items-start gap-2">
            <div className="bg-primary/20 p-2 rounded-full mt-1">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                i
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                This calculator provides an estimate for shipping pallets. 
                Final prices may vary based on weight, dimensions, and specific port fees. 
                Contact us for a detailed quote.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PalletPriceCalculator;
