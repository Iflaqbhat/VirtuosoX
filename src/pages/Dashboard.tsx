
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DashboardCard } from '@/components/DashboardCard';
import { SolanaBalance } from '@/components/SolanaBalance';
import { TransactionList } from '@/components/TransactionList';
import { ArrowRight, Coins, CreditCard, Image, Star } from 'lucide-react';

const Dashboard = () => {
  const { connected, publicKey } = useWallet();
  const navigate = useNavigate();
  
  // Redirect to home if wallet is not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
    }
  }, [connected, navigate]);
  
  if (!connected || !publicKey) {
    return null;
  }
  
  const truncatedAddress = `${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)}`;
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, Solana User</h1>
          <p className="text-muted-foreground">
            Wallet: {truncatedAddress}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <DashboardCard 
              title="SOL Balance" 
              icon={<Coins size={20} />}
            >
              <SolanaBalance />
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
        
        <div className="grid md:grid-cols-2 gap-6">
          <DashboardCard 
            title="NFT Collection" 
            description="Browse your owned NFTs"
            icon={<Image size={20} />}
            footer={
              <Button variant="ghost" size="sm" className="w-full flex justify-center gap-1">
                View Collection <ArrowRight size={16} />
              </Button>
            }
          >
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <Image className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No NFTs found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start your collection by minting or purchasing NFTs
              </p>
              <Button asChild>
                <a href="/marketplace">Browse Marketplace</a>
              </Button>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Rewards Center" 
            description="Earn rewards for using the platform"
            icon={<Star size={20} />}
            footer={
              <Button variant="ghost" size="sm" className="w-full flex justify-center gap-1">
                View All Rewards <ArrowRight size={16} />
              </Button>
            }
          >
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <Star className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Complete actions to earn rewards and special NFTs
              </p>
              <Button asChild>
                <a href="/rewards">Start Earning</a>
              </Button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
