
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'hacker';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const body = document.body;
    
    // Reset all theme classes
    body.className = 'min-h-screen transition-all duration-300';
    
    switch(theme) {
      case 'light':
        body.className += ' bg-gradient-to-br from-slate-50 to-slate-100';
        document.body.style.fontFamily = 'Inter, sans-serif';
        break;
      case 'dark':
        body.className += ' bg-gradient-to-br from-slate-900 to-slate-800';
        document.body.style.fontFamily = 'Inter, sans-serif';
        break;
      case 'hacker':
        body.className += ' bg-black matrix-bg';
        document.body.style.fontFamily = 'Fira Code, monospace';
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
