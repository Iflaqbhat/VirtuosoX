
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Coins, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  BadgeCheck, 
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
  const [timeRemaining, setTimeRemaining] = useState('23:45:12');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedPool, setExpandedPool] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(75);
  
  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const parts = timeRemaining.split(':').map(Number);
      let hours = parts[0];
      let minutes = parts[1];
      let seconds = parts[2];
      
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
          if (hours < 0) {
            hours = 23; // Reset to 24 hours
            // Simulate rewards distribution when timer resets
            setTotalEarned(prev => prev + (totalStaked * 0.001));
            toast({
              title: "Rewards Distributed!",
              description: `You received ${(totalStaked * 0.001).toFixed(4)} SOL in rewards`,
              variant: "default"
            });
          }
        }
      }
      
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      // Update progress bar
      const totalSeconds = 24 * 60 * 60;
      const remainingSeconds = hours * 3600 + minutes * 60 + seconds;
      const progress = 100 - ((remainingSeconds / totalSeconds) * 100);
      setProgressValue(progress);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining, totalStaked]);
  
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

  const handleUnstake = (poolId: string) => {
    if (!connected || !stakedAmount[poolId]) {
      return;
    }

    const amountToUnstake = stakedAmount[poolId];
    
    // Update staking amounts
    const newStakedAmount = { ...stakedAmount };
    delete newStakedAmount[poolId];
    setStakedAmount(newStakedAmount);
    
    // Update totals
    setTotalStaked(totalStaked - amountToUnstake);
    
    toast({
      title: "Tokens Unstaked",
      description: `You've unstaked ${amountToUnstake} SOL`,
      variant: "default"
    });
  };
  
  const simulateRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate updated data
      setTotalEarned(prev => prev + (totalStaked * 0.0005));
      setIsRefreshing(false);
      toast({
        title: "Rewards Updated",
        description: "Latest rewards data has been fetched",
        variant: "default"
      });
    }, 1500);
  };

  const togglePoolExpand = (poolId: string) => {
    setExpandedPool(expandedPool === poolId ? null : poolId);
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
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 p-6 mb-8 border border-primary/20"
        >
          <div className="absolute inset-0 bg-hero-gradient opacity-5"></div>
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Start Earning Today</h2>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Stake your SOL and earn passive rewards with our flexible staking options.
                </p>
                <Badge className="mb-2" variant="outline">New user bonus: 5% APY boost</Badge>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Staking Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-card-gradient h-full">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-medium flex items-center">
                  <Coins className="mr-2 h-5 w-5 text-primary" />
                  Total Staked
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalStaked.toFixed(2)} SOL</p>
                {totalStaked > 0 && (
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="mr-2 text-xs">Active</Badge>
                    {Object.keys(stakedAmount).length} active pool{Object.keys(stakedAmount).length !== 1 ? 's' : ''}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="bg-card-gradient h-full">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-medium flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                  Total Earnings
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold">{totalEarned.toFixed(4)} SOL</p>
                  <button 
                    className="text-primary hover:text-primary/80 transition-colors"
                    onClick={simulateRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                {totalEarned > 0 && (
                  <div className="text-xs text-accent mt-2 font-medium">
                    + 0.0005 SOL per day per SOL staked
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="bg-card-gradient h-full">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-medium flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-secondary" />
                  Next Reward
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold font-mono">{timeRemaining}</p>
                <Progress value={progressValue} max={100} className="h-2 mt-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0h</span>
                  <span>12h</span>
                  <span>24h</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Staking Pools */}
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Coins className="mr-2 h-5 w-5" /> Staking Pools
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stakingPools.map((pool) => (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * parseInt(pool.id.replace('pool', '')) }}
              className="flex"
            >
              <Card className="overflow-hidden border-border/50 hover:shadow-md hover:border-primary/30 transition-all w-full">
                <CardHeader className="pb-2 bg-gradient-to-r from-background to-card/50">
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
                    <div className="bg-accent/10 rounded-md p-3 relative">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium flex items-center">
                            <BadgeCheck className="h-4 w-4 mr-1 text-primary" /> 
                            Currently Staked
                          </p>
                          <p className="text-lg font-bold">{stakedAmount[pool.id]} SOL</p>
                        </div>
                        <button 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => togglePoolExpand(pool.id)}
                          aria-label="Expand pool details"
                        >
                          {expandedPool === pool.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                      </div>
                      
                      {expandedPool === pool.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-border/50"
                        >
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Daily Earnings</p>
                              <p className="font-medium">{(stakedAmount[pool.id] * pool.apy / 365 / 100).toFixed(5)} SOL</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Yearly Earnings</p>
                              <p className="font-medium">{(stakedAmount[pool.id] * pool.apy / 100).toFixed(3)} SOL</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="w-full"
                            onClick={() => handleUnstake(pool.id)}
                          >
                            Unstake All
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-muted/20 rounded-md p-3 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> 
                        Not staked yet
                      </p>
                    </div>
                  )}
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
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-card-gradient rounded-lg p-6 border border-border/50 mt-10">
          <h2 className="text-2xl font-semibold mb-4">Staking FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">What is staking?</h3>
              <p className="text-muted-foreground text-sm">
                Staking is the process of actively participating in transaction validation on a proof-of-stake blockchain. By staking your SOL tokens, you can earn passive rewards.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How are rewards calculated?</h3>
              <p className="text-muted-foreground text-sm">
                Rewards are calculated based on the amount staked and the APY of the selected pool. Rewards are distributed daily.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Can I unstake at any time?</h3>
              <p className="text-muted-foreground text-sm">
                For Flexible Staking, you can unstake at any time. For pools with a lock period, you'll need to wait until the lock period ends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
