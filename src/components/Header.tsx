
import React from 'react';
import { useTheme } from './ThemeProvider';

export const Header: React.FC = () => {
  const { theme } = useTheme();

  const getIconClasses = () => {
    switch(theme) {
      case 'hacker':
        return 'inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4 shadow-lg';
      default:
        return 'inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full mb-4 shadow-lg';
    }
  };

  const getSvgClasses = () => {
    switch(theme) {
      case 'hacker':
        return 'w-8 h-8 text-black';
      default:
        return 'w-8 h-8 text-white';
    }
  };

  const getTitleClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-4xl font-bold text-slate-800 mb-2';
      case 'dark':
        return 'text-4xl font-bold text-white mb-2';
      case 'hacker':
        return 'text-4xl font-bold text-green-500 mb-2 font-mono';
      default:
        return 'text-4xl font-bold text-slate-800 mb-2';
    }
  };

  const getSubtitleClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-xl text-slate-600 mb-6';
      case 'dark':
        return 'text-xl text-slate-300 mb-6';
      case 'hacker':
        return 'text-xl text-green-400 mb-6 font-mono';
      default:
        return 'text-xl text-slate-600 mb-6';
    }
  };

  return (
    <div className="text-center mb-8">
      <div className={getIconClasses()}>
        <svg className={getSvgClasses()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      </div>
      <h1 className={getTitleClasses()}>Worried That Email Might Be a Scam?</h1>
      <p className={getSubtitleClasses()}>Paste it below. We'll help you find out.</p>
    </div>
  );
};
