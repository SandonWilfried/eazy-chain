
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
import Dashboard from "./pages/Dashboard";
import Passengers from "./pages/Passengers";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import SupplierPayment from "./components/SupplierPayment";

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/supplier-payment" element={<SupplierPayment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
