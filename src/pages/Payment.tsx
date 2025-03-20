
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PaymentForm from "@/components/PaymentForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockShipmentData = {
  id: "CARGO12345678",
  amount: 4600,
};

const Payment = () => {
  const [shipmentData, setShipmentData] = useState<{ id: string; amount: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const shipmentId = new URLSearchParams(location.search).get("id");
    
    if (shipmentId) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setShipmentData({
          id: shipmentId,
          amount: mockShipmentData.amount,
        });
        setLoading(false);
      }, 1000);
    } else {
      // If no shipment ID, use default data
      setShipmentData(mockShipmentData);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="mb-4"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h1 className="text-3xl font-bold mb-2">Secure Payment</h1>
              <p className="text-muted-foreground">
                Complete your payment details to finalize your shipping transaction
              </p>
            </div>
            
            {loading ? (
              <div className="glass-panel p-8 text-center animate-pulse">
                <p className="text-lg">Loading payment information...</p>
              </div>
            ) : (
              <div className="animate-fade-in">
                {shipmentData && (
                  <PaymentForm 
                    shipmentId={shipmentData.id} 
                    amount={shipmentData.amount} 
                  />
                )}
              </div>
            )}
          </div>
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

export default Payment;
