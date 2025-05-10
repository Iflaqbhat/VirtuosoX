
import React from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Notification, useNotifications } from '@/hooks/use-notifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';

export const NotificationsDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();

  // Format relative time
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return format(date, 'MMM d, h:mm a');
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>;
      case 'error':
        return <div className="w-2 h-2 rounded-full bg-destructive mr-2"></div>;
      case 'warning':
        return <div className="w-2 h-2 rounded-full bg-orange-400 mr-2"></div>;
      default:
        return <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-w-[90vw]" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={markAllAsRead}>
                <Check className="h-3.5 w-3.5 mr-1" /> Mark all read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clearNotifications}>
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear all
              </Button>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-[300px]">
          <AnimatePresence>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownMenuItem 
                    className={`flex flex-col items-start p-3 cursor-default ${!notification.read ? 'bg-muted/50' : ''}`}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <div className="flex justify-between w-full">
                      <div className="flex items-center">
                        {getNotificationIcon(notification.type)}
                        <span className="font-medium">{notification.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    {notification.description && (
                      <p className="text-sm text-muted-foreground mt-1 ml-4">
                        {notification.description}
                      </p>
                    )}
                    
                    <div className="flex justify-between w-full mt-2">
                      <span className="text-xs text-muted-foreground ml-4">
                        {formatTime(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 py-0 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </motion.div>
              ))
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
                <p>No notifications</p>
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
