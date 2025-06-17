
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from './ThemeProvider';
import { useToast } from '@/hooks/use-toast';

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const { toast } = useToast();

  const getUserMenuClasses = () => {
    switch(theme) {
      case 'light':
        return 'flex items-center gap-3 bg-white rounded-lg shadow-md border border-slate-200 p-3';
      case 'dark':
        return 'flex items-center gap-3 bg-slate-800 rounded-lg shadow-md border border-slate-700 p-3';
      case 'hacker':
        return 'flex items-center gap-3 bg-black rounded-lg shadow-md border border-green-500 p-3 hacker-border';
      default:
        return 'flex items-center gap-3 bg-white rounded-lg shadow-md border border-slate-200 p-3';
    }
  };

  const getEmailClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-sm text-slate-600';
      case 'dark':
        return 'text-sm text-slate-300';
      case 'hacker':
        return 'text-sm text-green-400 font-mono';
      default:
        return 'text-sm text-slate-600';
    }
  };

  const getButtonClasses = () => {
    switch(theme) {
      case 'light':
        return 'bg-red-600 hover:bg-red-700 text-white text-sm';
      case 'dark':
        return 'bg-red-600 hover:bg-red-700 text-white text-sm';
      case 'hacker':
        return 'bg-red-600 hover:bg-red-700 text-green-400 text-sm font-mono';
      default:
        return 'bg-red-600 hover:bg-red-700 text-white text-sm';
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  if (!user) return null;

  return (
    <div className={getUserMenuClasses()}>
      <span className={getEmailClasses()}>
        {user.email}
      </span>
      <Button
        onClick={handleSignOut}
        size="sm"
        className={getButtonClasses()}
      >
        Sign Out
      </Button>
    </div>
  );
};
