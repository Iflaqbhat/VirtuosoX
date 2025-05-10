
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: {
    id: string;
    name: string;
    description: string;
    points: number;
    isComplete: boolean;
  };
  isCompleted: boolean;
  onComplete: (id: string, points: number) => void;
  connected: boolean;
}

export const TaskCard = ({ task, isCompleted, onComplete, connected }: TaskCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`border-border/50 transition-all ${isCompleted ? "bg-accent/10" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="font-semibold">{task.name}</h3>
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                >
                  <BadgeCheck className="h-4 w-4 ml-1 text-primary" />
                </motion.div>
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
            className={isCompleted ? "bg-accent/20 w-full" : "w-full"}
            disabled={!connected || isCompleted}
            onClick={() => onComplete(task.id, task.points)}
          >
            {isCompleted ? (
              <span className="flex items-center">
                Completed <BadgeCheck className="ml-1 h-4 w-4" />
              </span>
            ) : "Complete Task"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
