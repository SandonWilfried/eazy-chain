
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import SupplierPaymentForm from "@/components/SupplierPaymentForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SupplierPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Helmet>
        <title>Supplier Payment | CargoCaravan</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">Payment to Suppliers</h1>
            <p className="text-muted-foreground max-w-3xl">
              Send secure payments to your suppliers worldwide. We offer competitive exchange rates and fast processing times.
              Follow the steps below to verify your identity and generate a payment reference.
            </p>
          </div>
          
          <SupplierPaymentForm />
        </div>
      </main>
      
      <footer className="bg-background border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CargoCaravan. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SupplierPayment;
