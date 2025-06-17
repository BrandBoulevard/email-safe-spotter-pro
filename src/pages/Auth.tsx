
import React from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { AuthForm } from '../components/AuthForm';

const Auth = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-300">
        <div className="max-w-4xl mx-auto p-6">
          <ThemeSwitcher />
          <div className="mt-20">
            <AuthForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Auth;
