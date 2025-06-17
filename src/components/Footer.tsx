
import React from 'react';
import { useTheme } from './ThemeProvider';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const getFooterClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-center mt-8 text-slate-500 text-sm';
      case 'dark':
        return 'text-center mt-8 text-slate-400 text-sm';
      case 'hacker':
        return 'text-center mt-8 text-green-400 text-sm font-mono';
      default:
        return 'text-center mt-8 text-slate-500 text-sm';
    }
  };

  const getNameClasses = () => {
    switch(theme) {
      case 'light':
        return 'font-medium text-slate-700';
      case 'dark':
        return 'font-medium text-slate-300';
      case 'hacker':
        return 'font-medium text-green-500';
      default:
        return 'font-medium text-slate-700';
    }
  };

  return (
    <div className={getFooterClasses()}>
      <p>Copy written by <span className={getNameClasses()}>Yuster Peter</span></p>
      <p className="mt-1">Built with security and privacy in mind</p>
    </div>
  );
};
