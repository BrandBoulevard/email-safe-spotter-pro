
import React from 'react';
import { useTheme } from './ThemeProvider';

interface AnalysisResult {
  riskLevel: string;
  message: string;
  confidence: number;
  color: 'green' | 'yellow' | 'red';
  icon: string;
  detectedPatterns: string[];
  safeIndicators: string[];
}

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  isVisible: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isVisible }) => {
  const { theme } = useTheme();

  if (!isVisible || !result) return null;

  const getContainerClasses = () => {
    switch(theme) {
      case 'light':
        return 'border-t border-slate-200 bg-slate-50';
      case 'dark':
        return 'border-t border-slate-700 bg-slate-800';
      case 'hacker':
        return 'border-t border-green-500 bg-black';
      default:
        return 'border-t border-slate-200 bg-slate-50';
    }
  };

  const colorSchemes = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600'
    }
  };

  // Adjust color schemes for hacker theme
  const getColorScheme = () => {
    if (theme === 'hacker') {
      return {
        bg: 'bg-gray-900',
        border: 'border-green-500',
        text: 'text-green-400',
        icon: 'text-green-500'
      };
    }
    return colorSchemes[result.color];
  };

  const scheme = getColorScheme();

  const getTextClasses = () => {
    switch(theme) {
      case 'light':
        return 'font-semibold text-slate-700 mb-3';
      case 'dark':
        return 'font-semibold text-slate-300 mb-3';
      case 'hacker':
        return 'font-semibold text-green-400 mb-3 font-mono';
      default:
        return 'font-semibold text-slate-700 mb-3';
    }
  };

  const getItemTextClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-slate-600';
      case 'dark':
        return 'text-slate-400';
      case 'hacker':
        return 'text-green-300 font-mono';
      default:
        return 'text-slate-600';
    }
  };

  const getDisclaimerClasses = () => {
    switch(theme) {
      case 'light':
        return 'bg-slate-100 rounded-lg p-4 text-sm text-slate-600';
      case 'dark':
        return 'bg-slate-700 rounded-lg p-4 text-sm text-slate-400';
      case 'hacker':
        return 'bg-gray-900 border border-green-500 rounded-lg p-4 text-sm text-green-300 font-mono';
      default:
        return 'bg-slate-100 rounded-lg p-4 text-sm text-slate-600';
    }
  };

  return (
    <div className={getContainerClasses()}>
      <div className="p-8">
        <div className="result-slide-in">
          <div className={`${scheme.bg} ${scheme.border} border-2 rounded-xl p-6 mb-6`}>
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{result.icon}</span>
              <div>
                <h3 className={`${scheme.text} text-xl font-bold`}>{result.riskLevel}</h3>
                <p className={`${scheme.text} opacity-75`}>Confidence: {result.confidence}%</p>
              </div>
            </div>
            <p className={`${scheme.text} text-lg leading-relaxed`}>{result.message}</p>
          </div>

          {result.detectedPatterns.length > 0 && (
            <div className="mb-6">
              <h4 className={getTextClasses()}>⚠️ Detected Issues:</h4>
              <ul className="space-y-2">
                {result.detectedPatterns.map((pattern, index) => (
                  <li key={index} className={`flex items-center ${getItemTextClasses()}`}>
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    {pattern}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.safeIndicators.length > 0 && (
            <div className="mb-6">
              <h4 className={getTextClasses()}>✅ Positive Indicators:</h4>
              <ul className="space-y-2">
                {result.safeIndicators.map((indicator, index) => (
                  <li key={index} className={`flex items-center ${getItemTextClasses()}`}>
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={getDisclaimerClasses()}>
            <strong>Disclaimer:</strong> This analysis is for educational purposes. Always verify suspicious 
            emails through official channels and trust your instincts.
          </div>
        </div>
      </div>
    </div>
  );
};
