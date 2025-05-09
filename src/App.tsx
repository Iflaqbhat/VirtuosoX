
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletConnectProvider } from "@/components/WalletConnectProvider";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Rewards from "./pages/Rewards";
import Staking from "./pages/Staking";
import NotFound from "./pages/NotFound";

// Override default Wallet Adapter styles
import './wallet-adapter-styles.css';

const App = () => {
  // Create a client inside the component to ensure proper React context
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <WalletConnectProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/staking" element={<Staking />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WalletConnectProvider>
    </QueryClientProvider>
  );
};

export default App;
