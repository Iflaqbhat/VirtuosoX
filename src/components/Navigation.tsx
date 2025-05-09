
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-full bg-hero-gradient flex items-center justify-center overflow-hidden">
            <span className="text-white font-bold">SV</span>
          </div>
          <span className="hidden sm:inline">Solana<span className="solana-text-gradient">Verse</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
          <NavLink to="/dashboard" currentPath={location.pathname}>Dashboard</NavLink>
          <NavLink to="/marketplace" currentPath={location.pathname}>Marketplace</NavLink>
          <NavLink to="/rewards" currentPath={location.pathname}>Rewards</NavLink>
        </nav>
        
        <div className="flex items-center gap-4">
          <WalletMultiButton className="wallet-adapter-button" />
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, currentPath, children }) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "text-base font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
};

export default Navigation;
