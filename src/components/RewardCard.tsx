
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

interface RewardCardProps {
  reward: {
    id: string;
    name: string;
    description: string;
    pointsCost: number;
    image: string;
  };
  isRedeemed: boolean;
  canRedeem: boolean;
  onRedeem: (id: string, cost: number) => void;
  connected: boolean;
}

export const RewardCard = ({ reward, isRedeemed, canRedeem, onRedeem, connected }: RewardCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`border-border/50 transition-all ${isRedeemed ? "bg-accent/10" : ""}`}>
        <div className="flex">
          <motion.div 
            className="w-24 h-24 overflow-hidden" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img src={reward.image} alt={reward.name} className="w-full h-full object-cover transition-transform" />
          </motion.div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{reward.name}</h3>
              {isRedeemed && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Badge className="bg-primary/20 text-primary border-none">
                    Redeemed
                  </Badge>
                </motion.div>
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
                onClick={() => onRedeem(reward.id, reward.pointsCost)}
                className={isRedeemed ? "bg-accent/20" : ""}
              >
                {isRedeemed ? (
                  <span className="flex items-center">
                    Claimed <BadgeCheck className="ml-1 h-3 w-3" />
                  </span>
                ) : "Redeem"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
