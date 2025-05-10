import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DashboardCard } from '@/components/DashboardCard';
import { SolanaBalance } from '@/components/SolanaBalance';
import { TransactionList } from '@/components/TransactionList';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Award, Coins, CreditCard, Flame, Image, LineChart, Shield, Star, Wallet } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const Dashboard = () => {
  const { connected, publicKey } = useWallet();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [username, setUsername] = useState('Solana User');
  const [level, setLevel] = useState(5);
  const [xp, setXp] = useState(78);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Redirect to home if wallet is not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
      toast("Wallet not connected", {
        description: "Please connect your wallet to access the dashboard",
      });
    }
  }, [connected, navigate]);
  
  if (!connected || !publicKey) {
    return null;
  }
  
  const truncatedAddress = `${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)}`;
  
  const refreshData = () => {
    toast("Dashboard Refreshed", {
      description: "Latest data has been loaded",
    });
  };
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8 animate-fade-in">
        <div className="bg-card shadow-lg rounded-lg border p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-hero-gradient opacity-10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">{isLoading ? 'Loading...' : `Welcome, ${username}`}</h1>
                <Badge variant="outline" className="border-secondary text-secondary">Level {level}</Badge>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Wallet size={16} />
                <span>{truncatedAddress}</span>
              </div>
              
              <div className="w-full max-w-md">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>XP Progress</span>
                  <span>{xp}/100 XP</span>
                </div>
                <Progress value={xp} className="h-2 bg-muted" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={refreshData} size="sm">
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
                View Profile
              </Button>
              <Button onClick={() => navigate('/marketplace')} className="hidden md:flex">
                Explore Marketplace
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <DashboardCard 
              title="SOL Balance" 
              icon={<Coins size={20} />}
              className="h-full"
            >
              <SolanaBalance />
              
              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Send
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Receive
                </Button>
                <Button size="sm" className="w-full">
                  Buy
                </Button>
              </div>
            </DashboardCard>
          </div>
          
          <div className="md:col-span-2">
            <DashboardCard 
              title="Recent Transactions" 
              description="Your transaction history"
              icon={<CreditCard size={20} />}
              footer={
                <Button variant="ghost" size="sm" className="w-full flex justify-center gap-1">
                  View All Transactions <ArrowRight size={16} />
                </Button>
              }
            >
              <TransactionList />
            </DashboardCard>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Your Portfolio</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <DashboardCard 
            title="NFT Collection" 
            description="Browse your owned NFTs"
            icon={<Image size={20} />}
            footer={
              <Button variant="ghost" size="sm" className="w-full flex justify-center gap-1" onClick={() => navigate('/nft-collection')}>
                View Collection <ArrowRight size={16} />
              </Button>
            }
            className="bg-gradient-to-br from-card to-card/90 border"
          >
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-lg bg-muted flex justify-center items-center">
                  <Image className="h-10 w-10 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-medium">Discover NFTs</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                Start your collection by minting or purchasing NFTs from the marketplace
              </p>
              <Button asChild size="sm">
                <a href="/marketplace">Browse Marketplace</a>
              </Button>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Rewards Center" 
            description="Complete tasks and earn rewards"
            icon={<Star size={20} />}
            footer={
              <Button variant="ghost" size="sm" className="w-full flex justify-center gap-1">
                View All Rewards <ArrowRight size={16} />
              </Button>
            }
            className="bg-gradient-to-br from-card to-card/90 border"
          >
            <div className="p-1">
              <div className="bg-muted/30 rounded-md p-3 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-medium">Daily Login</span>
                  </div>
                  <Badge variant="outline" className="text-xs">5 XP</Badge>
                </div>
                <Progress value={100} className="h-1.5 bg-muted" />
                <div className="flex justify-end mt-2">
                  <Badge variant="secondary" className="text-xs">Completed</Badge>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-accent" />
                    <span className="font-medium">Stake 10 SOL</span>
                  </div>
                  <Badge variant="outline" className="text-xs">25 XP</Badge>
                </div>
                <Progress value={20} className="h-1.5 bg-muted" />
                <div className="flex justify-end mt-2">
                  <Button size="sm" variant="secondary" className="h-7 text-xs" asChild>
                    <a href="/staking">Start Staking</a>
                  </Button>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Security Status" 
            description="Your account security overview"
            icon={<Shield size={20} />}
            footer={
              <Button variant="ghost" size="sm" className="w-full flex justify-center gap-1">
                Security Settings <ArrowRight size={16} />
              </Button>
            }
            className="bg-gradient-to-br from-card to-card/90 border"
          >
            <div className="space-y-4 py-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-sm">Two-factor authentication</span>
                </div>
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">Enabled</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-destructive"></div>
                  <span className="text-sm">Recovery phrase backup</span>
                </div>
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Not Set</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Transaction notifications</span>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Enabled</Badge>
              </div>
            </div>
          </DashboardCard>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Analytics Overview</h2>
        <DashboardCard 
          title="Portfolio Performance" 
          description="See how your portfolio has been performing"
          icon={<LineChart size={20} />}
          footer={
            <Button variant="ghost" size="sm" className="w-full flex justify-center gap-1" asChild>
              <a href="/analytics">View Detailed Analytics <ArrowRight size={16} /></a>
            </Button>
          }
        >
          <div className="h-80 flex items-center justify-center border-t mt-4 pt-4">
            <div className="text-center">
              <LineChart className="mx-auto h-16 w-16 text-muted-foreground mb-2 opacity-50" />
              <h3 className="text-lg font-medium mb-1">Analytics Preview</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Visit the Analytics page to view detailed performance charts and metrics
              </p>
              <Button asChild>
                <a href="/analytics">View Analytics</a>
              </Button>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
