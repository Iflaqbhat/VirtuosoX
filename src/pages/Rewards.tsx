
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, BadgeCheck, Gift, Star, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MOCK_TASKS = [
  {
    id: "task1",
    name: "Connect your wallet",
    description: "Connect your Solana wallet to the app",
    points: 10,
    isComplete: true,
  },
  {
    id: "task2",
    name: "Complete your profile",
    description: "Add your name and profile picture",
    points: 25,
    isComplete: false,
  },
  {
    id: "task3",
    name: "Make your first transfer",
    description: "Send SOL to another wallet",
    points: 50,
    isComplete: false,
  },
  {
    id: "task4",
    name: "Mint your first NFT",
    description: "Create your first NFT on VirtuosoX",
    points: 100,
    isComplete: false,
  },
  {
    id: "task5",
    name: "Refer a friend",
    description: "Invite a friend to join VirtuosoX",
    points: 75,
    isComplete: false,
  }
];

const MOCK_REWARDS = [
  {
    id: "reward1",
    name: "Early Adopter Badge",
    description: "Exclusive NFT for platform early adopters",
    pointsCost: 100,
    image: "https://placehold.co/200x200/9945FF/FFFFFF?text=Early+Adopter"
  },
  {
    id: "reward2",
    name: "Transaction Fee Discount",
    description: "10% off on transaction fees for 1 week",
    pointsCost: 200,
    image: "https://placehold.co/200x200/14F195/121212?text=Fee+Discount"
  },
  {
    id: "reward3",
    name: "VIP Access Pass",
    description: "Access to exclusive NFT collections",
    pointsCost: 500,
    image: "https://placehold.co/200x200/00C2FF/FFFFFF?text=VIP+Access"
  },
];

const Rewards = () => {
  const { connected } = useWallet();
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState(10);
  const [completedTasks, setCompletedTasks] = useState<string[]>(["task1"]);
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const [animatePoint, setAnimatePoint] = useState(false);
  
  // Enhancement: Add a level system based on points
  const currentLevel = Math.floor(userPoints / 100) + 1;
  const nextLevelPoints = currentLevel * 100;
  const progressToNextLevel = (userPoints % 100) / 100 * 100;

  const handleCompleteTask = (taskId: string, points: number) => {
    if (completedTasks.includes(taskId)) return;
    
    setCompletedTasks([...completedTasks, taskId]);
    setUserPoints(userPoints + points);
    setAnimatePoint(true);
    
    toast({
      title: "Task completed!",
      description: `You earned ${points} points`,
      variant: "default",
    });
    
    setTimeout(() => setAnimatePoint(false), 1500);
  };
  
  const handleRedeemReward = (rewardId: string, pointsCost: number) => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to redeem rewards",
        variant: "destructive"
      });
      return;
    }
    
    if (userPoints < pointsCost) {
      toast({
        title: "Not enough points",
        description: `You need ${pointsCost - userPoints} more points to redeem this reward`,
        variant: "destructive"
      });
      return;
    }
    
    setClaimedRewards([...claimedRewards, rewardId]);
    setUserPoints(userPoints - pointsCost);
    
    toast({
      title: "Reward redeemed!",
      description: "Your reward has been added to your account",
      variant: "default",
    });
  };
  
  // Update task completion status based on wallet connection
  useEffect(() => {
    if (connected && !completedTasks.includes("task1")) {
      handleCompleteTask("task1", 10);
    }
  }, [connected]);
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Rewards Center</h1>
          <p className="text-muted-foreground">
            Complete tasks and earn exclusive rewards on the VirtuosoX platform
          </p>
        </div>
        
        {/* Points Summary */}
        <div className="bg-card-gradient rounded-xl p-6 border border-border/50 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient opacity-5"></div>
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                Your Reward Points
              </h2>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold mt-2">
                  {userPoints}
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={animatePoint ? { opacity: 1, y: -20 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 1 }}
                    className="text-accent ml-1 absolute text-sm font-normal"
                  >
                    +points
                  </motion.span>
                </p>
                <span className="text-muted-foreground"> points</span>
              </div>
            </div>
            <div className="md:text-right">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Level {currentLevel}
                </Badge>
                <p className="text-sm text-muted-foreground">Next level: {nextLevelPoints} points</p>
              </div>
              <Progress value={progressToNextLevel} max={100} className="h-2 w-full md:w-64" />
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Trophy className="mr-2 h-6 w-6 text-primary" />
              Earn Points
            </h2>
            <div className="space-y-4">
              {MOCK_TASKS.map((task) => {
                const isCompleted = completedTasks.includes(task.id);
                
                return (
                  <motion.div
                    key={task.id}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className={cn("border-border/50 transition-all", 
                      isCompleted ? "bg-accent/10" : ""
                    )}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <h3 className="font-semibold">{task.name}</h3>
                            {isCompleted && (
                              <BadgeCheck className="h-4 w-4 ml-1 text-primary" />
                            )}
                          </div>
                          <span className="flex items-center text-sm font-medium">
                            <Star className="h-4 w-4 mr-1 text-primary" />
                            {task.points} points
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant={isCompleted ? "outline" : "default"} 
                          className={cn("w-full", isCompleted ? "bg-accent/20" : "")}
                          disabled={!connected || isCompleted}
                          onClick={() => handleCompleteTask(task.id, task.points)}
                        >
                          {isCompleted ? "Completed ✓" : "Complete Task"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Rewards Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Gift className="mr-2 h-6 w-6 text-primary" />
              Redeem Rewards
            </h2>
            <div className="space-y-4">
              {MOCK_REWARDS.map((reward) => {
                const isRedeemed = claimedRewards.includes(reward.id);
                const canRedeem = userPoints >= reward.pointsCost && !isRedeemed;
                
                return (
                  <motion.div
                    key={reward.id}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className={cn("border-border/50", 
                      isRedeemed ? "bg-accent/10" : ""
                    )}>
                      <div className="flex">
                        <div className="w-24 h-24 overflow-hidden">
                          <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{reward.name}</h3>
                            {isRedeemed && (
                              <Badge className="bg-primary/20 text-primary border-none">
                                Redeemed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground my-1">{reward.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="flex items-center text-sm">
                              <Star className="h-4 w-4 mr-1 text-primary" />
                              {reward.pointsCost} points
                            </span>
                            <Button 
                              size="sm" 
                              variant={isRedeemed ? "outline" : "default"}
                              disabled={!connected || !canRedeem || isRedeemed}
                              onClick={() => handleRedeemReward(reward.id, reward.pointsCost)}
                            >
                              {isRedeemed ? "Claimed" : "Redeem"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
              
              {claimedRewards.length > 0 && (
                <Card className="mt-6 bg-card-gradient">
                  <CardHeader>
                    <h3 className="font-semibold flex items-center">
                      <Award className="mr-2 h-5 w-5 text-primary" />
                      Your Claimed Rewards
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {claimedRewards.map((claimedId) => {
                        const reward = MOCK_REWARDS.find(r => r.id === claimedId);
                        return reward ? (
                          <div key={claimedId} className="flex items-center gap-2">
                            <BadgeCheck className="h-4 w-4 text-primary" />
                            <span>{reward.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function to conditionally join classnames
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default Rewards;
