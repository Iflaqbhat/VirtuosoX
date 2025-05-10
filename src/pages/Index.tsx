
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import WalletConnect from '@/components/WalletConnect';
import { ArrowRight, CheckCircle2, Coins, Globe, Sparkles, Shield, Zap } from 'lucide-react';

const Index = () => {
  const { connected } = useWallet();
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-20 right-[20%] w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-40 left-[15%] w-20 h-20 bg-accent/20 rounded-full blur-lg animate-float"></div>
            <div className="absolute bottom-32 right-[25%] w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
            
            {/* Fade gradient */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="flex flex-col animate-fade-in">
                <div className="inline-block mb-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    Next-Gen Solana Platform
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Discover the <span className="solana-text-gradient">SolanaVerse</span> Experience
                </h1>
                <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-md text-pretty">
                  The ultimate Web3 platform built on Solana. Fast transactions, low fees, and a beautiful interface designed for the future.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2 h-12 px-8 text-base font-medium shadow-soft">
                    <Link to={connected ? "/dashboard" : "#connect"}>
                      {connected ? 'Go to Dashboard' : 'Get Started'} 
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2 h-12 px-8 text-base font-medium">
                    <Link to="/marketplace">
                      Explore Marketplace
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative p-5 rounded-2xl glass-card animate-fade-in" style={{ animationDelay: "0.2s" }} id="connect">
                  <div className="absolute -top-2 -right-2 flex items-center gap-1.5 bg-accent/90 text-accent-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Secure Connection
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">Connect Your Wallet</h3>
                  <WalletConnect />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-muted/30 dark:bg-muted/10"></div>
          
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform offers a comprehensive suite of tools to interact with the Solana blockchain
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Shield />}
                title="Secure Wallet Integration"
                description="Connect your favorite Solana wallet with bank-level security and complete control over your assets"
                gradient="purple-gradient"
              />
              <FeatureCard 
                icon={<Coins />}
                title="Seamless Transactions"
                description="Send and receive SOL with minimal fees and lightning-fast confirmation times"
                gradient="blue-gradient"
              />
              <FeatureCard 
                icon={<Sparkles />}
                title="NFT Marketplace"
                description="Discover, buy, and sell NFTs with a beautiful interface built for creators and collectors"
                gradient="green-gradient"
              />
              <FeatureCard 
                icon={<Globe />}
                title="Global Ecosystem"
                description="Join a worldwide community of Solana enthusiasts and participate in the decentralized economy"
                gradient="purple-gradient"
              />
              <FeatureCard 
                icon={<Zap />}
                title="Speed & Performance"
                description="Experience the fastest blockchain with up to 65,000 transactions per second and near-zero fees"
                gradient="blue-gradient"
              />
              <FeatureCard 
                icon={<CheckCircle2 />}
                title="Verified Projects"
                description="Explore curated NFTs and dApps that have undergone our rigorous verification process"
                gradient="green-gradient"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24">
          <div className="container">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
              
              {/* Content */}
              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to dive into Web3?</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Connect your wallet now and experience the future of decentralized applications. No complex setups, just seamless blockchain integration.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="gap-2 h-12 px-8 text-base font-medium shadow-soft">
                      <a href="#connect">
                        Connect Wallet <ArrowRight className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="gap-2 h-12 px-8 text-base font-medium" asChild>
                      <Link to="/marketplace">
                        Explore Marketplace
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-40 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-10 bg-muted/20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-hero-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">SV</span>
              </div>
              <span className="font-bold text-lg">SolanaVerse</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Docs</a>
              <a href="#" className="hover:text-primary transition-colors">About</a>
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
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, gradient }) => {
  return (
    <div className="relative group hover-card rounded-xl overflow-hidden">
      {/* Card background */}
      <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity ${gradient}`}></div>
      
      {/* Card content */}
      <div className="relative p-6 bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl h-full flex flex-col">
        <div className={`p-3 rounded-lg bg-${gradient.split('-')[0]}/10 w-fit mb-4`}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: `h-6 w-6 text-${gradient.split('-')[0]}` 
          })}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Index;
