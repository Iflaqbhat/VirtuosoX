
import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavigationActionsProps {
  toggleMobileMenu: () => void;
}

export const NavigationActions = ({ toggleMobileMenu }: NavigationActionsProps) => {
  const hasNotifications = true; // This would normally come from a notifications state/context

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                  <span className="sr-only">New notifications</span>
                </Badge>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <ThemeSwitch />
      
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
};
