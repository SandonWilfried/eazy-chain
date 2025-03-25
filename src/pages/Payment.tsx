
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "@/components/Navbar";
import PaymentForm from "@/components/PaymentForm";
import BillOfLadingModal from "@/components/BillOfLadingModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Initialize Stripe with your public key
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const mockShipmentData = {
  id: "CARGO12345678",
  amount: 4600,
  origin: "Shanghai Port, China",
  destination: "Rotterdam Port, Netherlands",
  containerCount: 2,
  description: "General Merchandise",
  weight: "12,500 kg",
  deliveryDate: "2023-11-15",
  currency: "USD",
  itemizedCosts: {
    freight: 3200,
    handling: 800,
    documentation: 300,
    insurance: 300
  }
};

const Payment = () => {
  const [shipmentData, setShipmentData] = useState<{
    id: string;
    amount: number;
    origin: string;
    destination: string;
    containerCount: number;
    description?: string;
    weight?: string;
    deliveryDate?: string;
    currency?: string;
    itemizedCosts?: {
      freight: number;
      handling: number;
      documentation: number;
      insurance: number;
    }
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showBillOfLading, setShowBillOfLading] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const shipmentId = new URLSearchParams(location.search).get("id");
    const reference = new URLSearchParams(location.search).get("reference");
    
    if (reference) {
      setBookingReference(reference);
    }
    
    if (shipmentId) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setShipmentData({
          id: shipmentId,
          amount: mockShipmentData.amount,
          origin: mockShipmentData.origin,
          destination: mockShipmentData.destination,
          containerCount: mockShipmentData.containerCount,
          description: mockShipmentData.description,
          weight: mockShipmentData.weight,
          deliveryDate: mockShipmentData.deliveryDate,
          currency: mockShipmentData.currency,
          itemizedCosts: mockShipmentData.itemizedCosts
        });
        setLoading(false);
      }, 1000);
    } else {
      // If no shipment ID, use default data
      setShipmentData(mockShipmentData);
    }
  }, [location.search]);

  const handlePaymentSuccess = () => {
    // Show bill of lading modal after successful payment
    setShowBillOfLading(true);
  };

  const handleVerificationSuccess = () => {
    setShowPaymentDetails(true);
  };

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
                {t('back')}
              </Button>
              <h1 className="text-3xl font-bold mb-2">{t('securePayment')}</h1>
              <p className="text-muted-foreground">
                {t('paymentDesc')}
              </p>
            </div>
            
            {loading ? (
              <div className="glass-panel p-8 text-center animate-pulse">
                <p className="text-lg">{t('loadingPayment')}</p>
              </div>
            ) : (
              <div className="animate-fade-in space-y-6">
                {shipmentData && (
                  <>
                    {/* Display Payment Form first for verification */}
                    <Elements stripe={stripePromise}>
                      <PaymentForm 
                        shipmentId={shipmentData.id} 
                        amount={shipmentData.amount}
                        onPaymentSuccess={handlePaymentSuccess}
                        autoVerifyReference={bookingReference}
                        onVerificationSuccess={handleVerificationSuccess}
                      />
                    </Elements>
                    
                    {/* Only show payment details after verification */}
                    {showPaymentDetails && (
                      <Card className="overflow-hidden mt-6">
                        <div className="bg-primary py-3 px-4">
                          <h2 className="text-lg font-semibold text-primary-foreground flex items-center">
                            {t('paymentDetails')}
                          </h2>
                        </div>
                        <CardContent className="p-0">
                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                              <div>
                                <p className="text-sm text-muted-foreground">{t('shipmentId')}</p>
                                <p className="font-medium">{shipmentData.id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t('description')}</p>
                                <p className="font-medium">{shipmentData.description || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t('origin')}</p>
                                <p className="font-medium">{shipmentData.origin}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t('destination')}</p>
                                <p className="font-medium">{shipmentData.destination}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t('containerCount')}</p>
                                <p className="font-medium">{shipmentData.containerCount} {t('units')}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t('weight')}</p>
                                <p className="font-medium">{shipmentData.weight || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{t('estimatedDelivery')}</p>
                                <p className="font-medium">{shipmentData.deliveryDate || "N/A"}</p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            {shipmentData.itemizedCosts && (
                              <div className="space-y-3">
                                <h3 className="font-medium">{t('costBreakdown')}</h3>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>{t('description')}</TableHead>
                                      <TableHead className="text-right">{t('amount')}</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>{t('freightCost')}</TableCell>
                                      <TableCell className="text-right">${shipmentData.itemizedCosts.freight.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>{t('handlingFees')}</TableCell>
                                      <TableCell className="text-right">${shipmentData.itemizedCosts.handling.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>{t('documentation')}</TableCell>
                                      <TableCell className="text-right">${shipmentData.itemizedCosts.documentation.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>{t('insurance')}</TableCell>
                                      <TableCell className="text-right">${shipmentData.itemizedCosts.insurance.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow className="font-bold border-t-2">
                                      <TableCell>{t('totalAmount')}</TableCell>
                                      <TableCell className="text-right text-primary">
                                        ${shipmentData.amount.toLocaleString()} {shipmentData.currency}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Bill of Lading Modal */}
                    <BillOfLadingModal
                      open={showBillOfLading}
                      onOpenChange={setShowBillOfLading}
                      shipmentId={shipmentData.id}
                      origin={shipmentData.origin}
                      destination={shipmentData.destination}
                      containerCount={shipmentData.containerCount}
                    />
                  </>
                )}
              </div>
            )}
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

export default Payment;
