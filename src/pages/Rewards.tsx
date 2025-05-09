
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useWallet } from "@solana/wallet-adapter-react";
import { Star } from "lucide-react";
import { useState } from "react";

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
    description: "Create your first NFT on SolanaVerse",
    points: 100,
    isComplete: false,
  },
  {
    id: "task5",
    name: "Refer a friend",
    description: "Invite a friend to join SolanaVerse",
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
  const [userPoints, setUserPoints] = useState(10);
  const [completedTasks, setCompletedTasks] = useState<string[]>(["task1"]);
  
  const handleCompleteTask = (taskId: string, points: number) => {
    if (completedTasks.includes(taskId)) return;
    
    setCompletedTasks([...completedTasks, taskId]);
    setUserPoints(userPoints + points);
  };
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Rewards Center</h1>
          <p className="text-muted-foreground">
            Complete tasks and earn rewards on the SolanaVerse platform
          </p>
        </div>
        
        {/* Points Summary */}
        <div className="bg-card-gradient rounded-xl p-6 border border-border/50 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                Your Reward Points
              </h2>
              <p className="text-3xl font-bold mt-2">{userPoints} points</p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-muted-foreground">Next milestone: 100 points</p>
              <Progress value={userPoints} max={100} className="h-2 w-full md:w-64 mt-2" />
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Earn Points</h2>
            <div className="space-y-4">
              {MOCK_TASKS.map((task) => {
                const isCompleted = completedTasks.includes(task.id);
                
                return (
                  <Card key={task.id} className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{task.name}</h3>
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
                        className="w-full"
                        disabled={!connected || isCompleted}
                        onClick={() => handleCompleteTask(task.id, task.points)}
                      >
                        {isCompleted ? "Completed" : "Complete Task"}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Rewards Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Redeem Rewards</h2>
            <div className="space-y-4">
              {MOCK_REWARDS.map((reward) => (
                <Card key={reward.id} className="border-border/50">
                  <div className="flex">
                    <div className="w-24 h-24 overflow-hidden">
                      <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-semibold">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground my-1">{reward.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="flex items-center text-sm">
                          <Star className="h-4 w-4 mr-1 text-primary" />
                          {reward.pointsCost} points
                        </span>
                        <Button 
                          size="sm" 
                          disabled={!connected || userPoints < reward.pointsCost}
                        >
                          Redeem
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
