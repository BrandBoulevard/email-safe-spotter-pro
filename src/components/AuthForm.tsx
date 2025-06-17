
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from './ThemeProvider';
import { useToast } from '@/hooks/use-toast';

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { toast } = useToast();

  const getFormClasses = () => {
    switch(theme) {
      case 'light':
        return 'bg-white rounded-xl shadow-lg border border-slate-200 p-8 max-w-md mx-auto';
      case 'dark':
        return 'bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-8 max-w-md mx-auto';
      case 'hacker':
        return 'bg-black rounded-xl shadow-lg border border-green-500 p-8 max-w-md mx-auto hacker-border';
      default:
        return 'bg-white rounded-xl shadow-lg border border-slate-200 p-8 max-w-md mx-auto';
    }
  };

  const getTitleClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-2xl font-bold text-slate-800 mb-6 text-center';
      case 'dark':
        return 'text-2xl font-bold text-slate-200 mb-6 text-center';
      case 'hacker':
        return 'text-2xl font-bold text-green-400 mb-6 text-center font-mono hacker-glow';
      default:
        return 'text-2xl font-bold text-slate-800 mb-6 text-center';
    }
  };

  const getLabelClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-slate-700';
      case 'dark':
        return 'text-slate-300';
      case 'hacker':
        return 'text-green-400 font-mono';
      default:
        return 'text-slate-700';
    }
  };

  const getButtonClasses = () => {
    switch(theme) {
      case 'light':
        return 'w-full bg-blue-600 hover:bg-blue-700 text-white';
      case 'dark':
        return 'w-full bg-blue-600 hover:bg-blue-700 text-white';
      case 'hacker':
        return 'w-full bg-green-600 hover:bg-green-700 text-black font-mono';
      default:
        return 'w-full bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getToggleClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-blue-600 hover:text-blue-800 cursor-pointer';
      case 'dark':
        return 'text-blue-400 hover:text-blue-300 cursor-pointer';
      case 'hacker':
        return 'text-green-400 hover:text-green-300 cursor-pointer font-mono';
      default:
        return 'text-blue-600 hover:text-blue-800 cursor-pointer';
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (error: any) {
      let errorMessage = "An error occurred during authentication.";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password.";
      } else if (error.message?.includes("User already registered")) {
        errorMessage = "An account with this email already exists.";
      } else if (error.message?.includes("Password should be at least")) {
        errorMessage = "Password should be at least 6 characters long.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={getFormClasses()}>
      <h2 className={getTitleClasses()}>
        {isLogin ? 'Sign In' : 'Sign Up'}
      </h2>
      
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <Label htmlFor="email" className={getLabelClasses()}>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="password" className={getLabelClasses()}>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="mt-1"
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className={getButtonClasses()}
        >
          {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </Button>
      </form>
      
      <p className="mt-4 text-center text-sm">
        <span className={theme === 'hacker' ? 'text-green-400 font-mono' : 'text-slate-600'}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </span>
        <span
          onClick={() => setIsLogin(!isLogin)}
          className={getToggleClasses()}
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </span>
      </p>
    </div>
  );
};
