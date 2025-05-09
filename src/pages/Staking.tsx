
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Coins, ArrowRight, TrendingUp, Clock, BadgeCheck } from 'lucide-react';

const stakingPools = [
  {
    id: 'pool1',
    name: 'Flexible Staking',
    description: 'Earn rewards with no lock-up period',
    apy: 3.5,
    minAmount: 0.5,
    lockPeriod: 0,
    image: 'https://placehold.co/100x100/14F195/121212?text=Flex'
  },
  {
    id: 'pool2',
    name: '30 Day Lock',
    description: 'Higher rewards with a 30 day commitment',
    apy: 5.5,
    minAmount: 1,
    lockPeriod: 30,
    image: 'https://placehold.co/100x100/9945FF/FFFFFF?text=30D'
  },
  {
    id: 'pool3',
    name: '90 Day Lock',
    description: 'Maximum rewards with a 90 day commitment',
    apy: 8.0,
    minAmount: 2,
    lockPeriod: 90,
    image: 'https://placehold.co/100x100/00C2FF/FFFFFF?text=90D'
  }
];

const Staking = () => {
  const { connected } = useWallet();
  const { toast } = useToast();
  const [stakedAmount, setStakedAmount] = useState<Record<string, number>>({});
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  
  const handleStake = (poolId: string, minAmount: number) => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to stake",
        variant: "destructive"
      });
      return;
    }
    
    // Update staking amounts (in a real app, this would interact with blockchain)
    const newStakedAmount = { ...stakedAmount };
    newStakedAmount[poolId] = (newStakedAmount[poolId] || 0) + minAmount;
    setStakedAmount(newStakedAmount);
    
    // Update totals
    setTotalStaked(totalStaked + minAmount);
    setTotalEarned(totalEarned + (minAmount * 0.001));
    
    toast({
      title: "Staking successful",
      description: `You've staked ${minAmount} SOL`,
      variant: "default"
    });
  };
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Staking Portal</h1>
          <p className="text-muted-foreground">
            Stake your SOL to earn passive rewards on the VirtuosoX platform
          </p>
        </div>
        
        {/* Staking Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card-gradient">
            <CardHeader className="pb-2">
              <h2 className="text-lg font-medium flex items-center">
                <Coins className="mr-2 h-5 w-5 text-primary" />
                Total Staked
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalStaked.toFixed(2)} SOL</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card-gradient">
            <CardHeader className="pb-2">
              <h2 className="text-lg font-medium flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                Total Earnings
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalEarned.toFixed(4)} SOL</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card-gradient">
            <CardHeader className="pb-2">
              <h2 className="text-lg font-medium flex items-center">
                <Clock className="mr-2 h-5 w-5 text-secondary" />
                Next Reward
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">23:45:12</p>
              <Progress value={75} max={100} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>
        
        {/* Staking Pools */}
        <h2 className="text-2xl font-semibold mb-4">Staking Pools</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stakingPools.map((pool) => (
            <Card key={pool.id} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all">
              <CardHeader className="pb-2 bg-gradient-to-r from-card to-card/50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{pool.name}</h3>
                  <div className="bg-primary/20 text-primary rounded-full px-2 py-1 text-xs font-medium">
                    {pool.apy}% APY
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded overflow-hidden mr-4">
                    <img src={pool.image} alt={pool.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{pool.description}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Min: {pool.minAmount} SOL</span> 
                      {' • '} 
                      <span className="font-medium">
                        {pool.lockPeriod ? `${pool.lockPeriod} days lock` : 'No lock'}
                      </span>
                    </p>
                  </div>
                </div>
                
                {stakedAmount[pool.id] ? (
                  <div className="bg-accent/30 rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium flex items-center">
                          <BadgeCheck className="h-4 w-4 mr-1 text-primary" /> 
                          Currently Staked
                        </p>
                        <p className="text-lg font-bold">{stakedAmount[pool.id]} SOL</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleStake(pool.id, pool.minAmount)}>
                        Stake More
                      </Button>
                    </div>
                  </div>
                ) : null}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  disabled={!connected} 
                  onClick={() => handleStake(pool.id, pool.minAmount)}
                >
                  {stakedAmount[pool.id] ? 'Add to Stake' : 'Stake Now'} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Staking;
