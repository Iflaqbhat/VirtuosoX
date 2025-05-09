
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Wallet, ArrowRight } from 'lucide-react';

const WalletConnect = () => {
  const { connected } = useWallet();
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [connected]);
  
  return (
    <div className={`transition-all duration-500 ${animate ? 'scale-105' : 'scale-100'}`}>
      <Card className="w-full max-w-md bg-card-gradient border border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Wallet size={24} className="text-primary" />
            Wallet Connection
          </CardTitle>
          <CardDescription>
            Connect your Solana wallet to access the full features
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
            <Wallet size={32} className={connected ? "text-accent" : "text-muted-foreground"} />
          </div>
          <p className="text-center mb-4">
            {connected 
              ? "Your wallet is connected! You can now access all features." 
              : "Please connect your wallet to continue."}
          </p>
          {!connected && (
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex justify-center w-full">
                <WalletMultiButton className="wallet-adapter-button-custom" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-px flex-1 bg-border"></div>
                <span>No wallet yet?</span>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <Button variant="outline" className="gap-2 w-full">
                Create new wallet
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </CardContent>
        {connected && (
          <CardFooter className="flex flex-col">
            <Button asChild className="w-full">
              <a href="/dashboard">
                Go to Dashboard
                <ArrowRight size={16} className="ml-2" />
              </a>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default WalletConnect;
