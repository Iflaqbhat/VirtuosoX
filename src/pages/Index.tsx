
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import WalletConnect from '@/components/WalletConnect';
import { ArrowRight, Coins, ShieldCheck, Zap } from 'lucide-react';

const Index = () => {
  const { connected } = useWallet();
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                  Welcome to <span className="solana-text-gradient">SolanaVerse</span> Hub
                </h1>
                <p className="text-xl mb-8 text-muted-foreground max-w-md">
                  Experience the future of decentralized applications with our intuitive Web3 platform built on the Solana blockchain.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link to={connected ? "/dashboard" : "#connect"}>
                      {connected ? 'Go to Dashboard' : 'Get Started'} 
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center" id="connect">
                <WalletConnect />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform offers a comprehensive suite of tools to interact with the Solana blockchain
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Secure Wallet Connection"
                description="Connect your favorite Solana wallet like Phantom or Solflare with complete security and control"
              />
              <FeatureCard 
                icon={<Coins className="h-10 w-10 text-accent" />}
                title="SOL Payments & Transfers"
                description="Send and receive SOL with minimal fees and lightning-fast confirmation times"
              />
              <FeatureCard 
                icon={<Zap className="h-10 w-10 text-secondary" />}
                title="NFT Marketplace"
                description="Browse, buy, and sell NFTs with a seamless interface built for creators and collectors"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="bg-card-gradient-hover rounded-xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-hero-gradient opacity-5"></div>
              <div className="relative z-10 md:max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to dive into Web3?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Connect your wallet now and experience the future of decentralized applications. No complex setups, just seamless blockchain integration.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <a href="#connect">
                      Connect Wallet <ArrowRight size={18} />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/marketplace">
                      Explore Marketplace
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8 bg-muted/20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-hero-gradient flex items-center justify-center">
                <span className="text-white font-bold">SV</span>
              </div>
              <span className="font-bold">SolanaVerse</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SolanaVerse. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-background rounded-lg p-6 border border-border/50 transition-all hover:shadow-md hover:border-primary/20 animate-fade-in">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
