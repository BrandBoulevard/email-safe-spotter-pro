
import React from 'react';
import { useTheme } from './ThemeProvider';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const getThemeClasses = () => {
    switch(theme) {
      case 'light':
        return 'bg-white rounded-lg shadow-md border border-slate-200 p-2';
      case 'dark':
        return 'bg-slate-800 rounded-lg shadow-md border border-slate-700 p-2';
      case 'hacker':
        return 'bg-black rounded-lg shadow-md border border-green-500 p-2';
      default:
        return 'bg-white rounded-lg shadow-md border border-slate-200 p-2';
    }
  };

  const getLabelClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-sm font-medium text-slate-700 mr-3';
      case 'dark':
        return 'text-sm font-medium text-slate-300 mr-3';
      case 'hacker':
        return 'text-sm font-medium text-green-400 mr-3 font-mono';
      default:
        return 'text-sm font-medium text-slate-700 mr-3';
    }
  };

  const getSelectClasses = () => {
    switch(theme) {
      case 'light':
        return 'bg-transparent border-none text-sm font-medium text-slate-700 focus:outline-none cursor-pointer';
      case 'dark':
        return 'bg-transparent border-none text-sm font-medium text-slate-300 focus:outline-none cursor-pointer';
      case 'hacker':
        return 'bg-transparent border-none text-sm font-medium text-green-400 focus:outline-none cursor-pointer font-mono';
      default:
        return 'bg-transparent border-none text-sm font-medium text-slate-700 focus:outline-none cursor-pointer';
    }
  };

  return (
    <div className="flex justify-end mb-4">
      <div className={getThemeClasses()}>
        <label className={getLabelClasses()}>Theme:</label>
        <select 
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'hacker')}
          className={getSelectClasses()}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="hacker">Hacker</option>
        </select>
      </div>
    </div>
  );
};
