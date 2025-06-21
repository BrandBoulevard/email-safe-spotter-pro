
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from './ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        return 'text-slate-700 font-medium';
      case 'dark':
        return 'text-slate-300 font-medium';
      case 'hacker':
        return 'text-green-400 font-mono font-medium';
      default:
        return 'text-slate-700 font-medium';
    }
  };

  const getInputClasses = () => {
    switch(theme) {
      case 'light':
        return 'mt-1 bg-white text-slate-900 border-slate-300 focus:border-blue-500 focus:ring-blue-500';
      case 'dark':
        return 'mt-1 bg-slate-700 text-slate-100 border-slate-600 focus:border-blue-400 focus:ring-blue-400';
      case 'hacker':
        return 'mt-1 bg-gray-900 text-green-400 border-green-600 focus:border-green-400 focus:ring-green-400 font-mono';
      default:
        return 'mt-1 bg-white text-slate-900 border-slate-300 focus:border-blue-500 focus:ring-blue-500';
    }
  };

  const getButtonClasses = () => {
    switch(theme) {
      case 'light':
        return 'w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5';
      case 'dark':
        return 'w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5';
      case 'hacker':
        return 'w-full bg-green-600 hover:bg-green-700 text-black font-mono font-medium py-2.5';
      default:
        return 'w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5';
    }
  };

  const getToggleClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-blue-600 hover:text-blue-800 cursor-pointer font-medium';
      case 'dark':
        return 'text-blue-400 hover:text-blue-300 cursor-pointer font-medium';
      case 'hacker':
        return 'text-green-400 hover:text-green-300 cursor-pointer font-mono font-medium';
      default:
        return 'text-blue-600 hover:text-blue-800 cursor-pointer font-medium';
    }
  };

  const getPasswordToggleClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-slate-500 hover:text-slate-700 cursor-pointer';
      case 'dark':
        return 'text-slate-400 hover:text-slate-200 cursor-pointer';
      case 'hacker':
        return 'text-green-500 hover:text-green-300 cursor-pointer';
      default:
        return 'text-slate-500 hover:text-slate-700 cursor-pointer';
    }
  };

  const getDescriptionTextClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-slate-600';
      case 'dark':
        return 'text-slate-400';
      case 'hacker':
        return 'text-green-500 font-mono';
      default:
        return 'text-slate-600';
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
      
      <form onSubmit={handleAuth} className="space-y-6">
        <div>
          <Label htmlFor="email" className={getLabelClasses()}>
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className={getInputClasses()}
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <Label htmlFor="password" className={getLabelClasses()}>
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className={getInputClasses()}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getPasswordToggleClasses()}`}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className={getButtonClasses()}
        >
          {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm">
          <span className={getDescriptionTextClasses()}>
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
    </div>
  );
};
