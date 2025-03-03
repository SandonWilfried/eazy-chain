import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Tracking from "./pages/Tracking";
import Passengers from "./pages/Passengers";
import NotFound from "./pages/NotFound";
import SupplierPayment from "./pages/SupplierPayment";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-react-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/passengers" element={<Passengers />} />
          <Route path="/supplier-payment" element={<SupplierPayment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
