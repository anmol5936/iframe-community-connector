
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Home, MessageCircle, Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  hasNotification?: boolean;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, to, hasNotification, isActive, onClick }: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={to} onClick={onClick}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative rounded-full w-12 h-12 transition-all duration-500 ease-apple",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-apple-sm scale-105" 
                  : "hover:bg-secondary hover:scale-105"
              )}
            >
              {icon}
              {hasNotification && <span className="notification-dot" />}
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="animate-fade-in">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface NavigationBarProps {
  onRefresh: () => void;
  hasNotifications: boolean;
}

const NavigationBar = ({ onRefresh, hasNotifications }: NavigationBarProps) => {
  const location = useLocation();
  
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 glass p-4 rounded-full shadow-apple z-50 animate-fade-in">
      <NavItem 
        icon={<Home size={20} />} 
        label="Home" 
        to="/" 
        isActive={location.pathname === "/"} 
      />
      <NavItem 
        icon={<Bell size={20} />} 
        label="Notifications" 
        to="/notifications" 
        isActive={location.pathname === "/notifications"}
        hasNotification={hasNotifications} 
      />
      <NavItem 
        icon={<MessageCircle size={20} />} 
        label="Messages" 
        to="/messages" 
        isActive={location.pathname === "/messages"} 
      />
      <NavItem 
        icon={<Users size={20} />} 
        label="Community" 
        to="/community" 
        isActive={location.pathname === "/community"} 
      />
      <div className="my-2 border-t w-8 border-border"></div>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onRefresh}
              className="rounded-full w-12 h-12 hover:bg-secondary hover:scale-105 transition-all duration-500 ease-apple"
            >
              <RefreshCw size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="animate-fade-in">
            <p>Refresh</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NavigationBar;
