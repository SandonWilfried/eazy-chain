
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import Tracking from "./pages/Tracking";
import Payment from "./pages/Payment";
import Passengers from "./pages/Passengers";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import SupplierPayment from "./components/SupplierPayment";
import PurchaseConditions from "./pages/PurchaseConditions";
import UsageConditions from "./pages/UsageConditions";
import ReturnsRefunds from "./pages/ReturnsRefunds";
import LegalNotices from "./pages/LegalNotices";
import Disclaimers from "./pages/Disclaimers";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/passengers" element={<Passengers />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/services" element={<Services />} />
            <Route path="/supplier-payment" element={<SupplierPayment />} />
            <Route path="/purchase-conditions" element={<PurchaseConditions />} />
            <Route path="/usage-conditions" element={<UsageConditions />} />
            <Route path="/returns-refunds" element={<ReturnsRefunds />} />
            <Route path="/legal-notices" element={<LegalNotices />} />
            <Route path="/disclaimers" element={<Disclaimers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
