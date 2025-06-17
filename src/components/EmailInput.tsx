
import React from 'react';
import { useTheme } from './ThemeProvider';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onScan: () => void;
  onClear: () => void;
  isScanning: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({ 
  value, 
  onChange, 
  onScan, 
  onClear, 
  isScanning 
}) => {
  const { theme } = useTheme();

  const getLabelClasses = () => {
    switch(theme) {
      case 'light':
        return 'block text-sm font-medium text-slate-700 mb-3';
      case 'dark':
        return 'block text-sm font-medium text-slate-300 mb-3';
      case 'hacker':
        return 'block text-sm font-medium text-green-500 mb-3 font-mono';
      default:
        return 'block text-sm font-medium text-slate-700 mb-3';
    }
  };

  const getTextareaClasses = () => {
    switch(theme) {
      case 'light':
        return 'w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200 text-slate-700';
      case 'dark':
        return 'w-full px-4 py-3 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200 text-white bg-slate-700';
      case 'hacker':
        return 'w-full px-4 py-3 border border-green-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200 text-green-500 bg-black font-mono';
      default:
        return 'w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200 text-slate-700';
    }
  };

  const getScanButtonClasses = () => {
    switch(theme) {
      case 'hacker':
        return 'flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-mono';
      default:
        return 'flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl';
    }
  };

  const getClearButtonClasses = () => {
    switch(theme) {
      case 'light':
        return 'sm:w-auto px-6 py-4 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200';
      case 'dark':
        return 'sm:w-auto px-6 py-4 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors duration-200';
      case 'hacker':
        return 'sm:w-auto px-6 py-4 border border-green-500 text-green-500 rounded-xl hover:bg-gray-900 transition-colors duration-200 font-mono';
      default:
        return 'sm:w-auto px-6 py-4 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200';
    }
  };

  return (
    <div className="p-8">
      <label className={getLabelClasses()}>
        Email Content to Analyze
      </label>
      <textarea 
        rows={8} 
        className={getTextareaClasses()}
        placeholder="Paste the suspicious email content here... Include the subject line, sender info, and message body for best results."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button 
          onClick={onScan}
          disabled={isScanning}
          className={getScanButtonClasses()}
        >
          {isScanning ? '🔄 Analyzing Email...' : '🔍 Scan for Phishing'}
        </button>
        <button 
          onClick={onClear}
          className={getClearButtonClasses()}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
