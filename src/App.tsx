
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
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
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import NFTCollection from "./pages/NFTCollection";
import { ThemeProvider } from "@/hooks/use-theme";
import { NotificationsProvider } from "./hooks/use-notifications";

// Override default Wallet Adapter styles
import './wallet-adapter-styles.css';

const App = () => {
  // Create a client inside the component to ensure proper React context
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <NotificationsProvider>
          <WalletConnectProvider>
            <TooltipProvider>
              <Sonner position="top-right" closeButton={true} richColors={true} />
              <Toaster />
              
              <BrowserRouter>
                <div className="relative min-h-screen flex flex-col">
                  <Navigation />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/rewards" element={<Rewards />} />
                      <Route path="/staking" element={<Staking />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/nft-collection" element={<NFTCollection />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </WalletConnectProvider>
        </NotificationsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
