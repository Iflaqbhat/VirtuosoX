
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { cn } from '@/lib/utils';
import { 
  Award, 
  Gift, 
  Menu, 
  Home, 
  LayoutDashboard, 
  Coins, 
  ShoppingBag, 
  X, 
  Star, 
  BarChart3 
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-full bg-hero-gradient flex items-center justify-center overflow-hidden">
            <span className="text-white font-bold">VX</span>
          </div>
          <span className="hidden sm:inline">Virtuoso<span className="solana-text-gradient">X</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" currentPath={location.pathname} icon={<Home size={18} />}>Home</NavLink>
          <NavLink to="/dashboard" currentPath={location.pathname} icon={<LayoutDashboard size={18} />}>Dashboard</NavLink>
          <NavLink to="/marketplace" currentPath={location.pathname} icon={<ShoppingBag size={18} />}>Marketplace</NavLink>
          <NavLink to="/rewards" currentPath={location.pathname} icon={<Award size={18} />}>Rewards</NavLink>
          <NavLink to="/staking" currentPath={location.pathname} icon={<Coins size={18} />}>Staking</NavLink>
          <NavLink to="/analytics" currentPath={location.pathname} icon={<BarChart3 size={18} />}>Analytics</NavLink>
        </nav>
        
        <div className="flex items-center gap-4">
          <WalletMultiButton className="wallet-adapter-button" />
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <span className="sr-only">Toggle menu</span>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[300px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-hero-gradient flex items-center justify-center">
                    <span className="text-white font-bold">VX</span>
                  </div>
                  <span className="font-bold text-xl">VirtuosoX</span>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
              <div className="flex flex-col gap-4">
                <MobileNavLink to="/" currentPath={location.pathname} setIsOpen={setIsOpen} icon={<Home className="mr-2 h-5 w-5" />}>Home</MobileNavLink>
                <MobileNavLink to="/dashboard" currentPath={location.pathname} setIsOpen={setIsOpen} icon={<LayoutDashboard className="mr-2 h-5 w-5" />}>Dashboard</MobileNavLink>
                <MobileNavLink to="/marketplace" currentPath={location.pathname} setIsOpen={setIsOpen} icon={<ShoppingBag className="mr-2 h-5 w-5" />}>Marketplace</MobileNavLink>
                <MobileNavLink to="/rewards" currentPath={location.pathname} setIsOpen={setIsOpen} icon={<Award className="mr-2 h-5 w-5" />}>Rewards</MobileNavLink>
                <MobileNavLink to="/staking" currentPath={location.pathname} setIsOpen={setIsOpen} icon={<Coins className="mr-2 h-5 w-5" />}>Staking</MobileNavLink>
                <MobileNavLink to="/analytics" currentPath={location.pathname} setIsOpen={setIsOpen} icon={<BarChart3 className="mr-2 h-5 w-5" />}>Analytics</MobileNavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, currentPath, children, icon }) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "text-base font-medium transition-colors hover:text-primary flex items-center gap-2",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {icon}
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, currentPath, children, icon, setIsOpen }) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      onClick={() => setIsOpen(false)}
      className={cn(
        "flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      {children}
    </Link>
  );
};

export default Navigation;
