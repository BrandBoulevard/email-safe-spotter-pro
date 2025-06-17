
import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';

export const LearnMoreSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  const getCardClasses = () => {
    switch(theme) {
      case 'light':
        return 'mt-8 bg-white rounded-2xl shadow-lg border border-slate-200';
      case 'dark':
        return 'mt-8 bg-slate-800 rounded-2xl shadow-lg border border-slate-700';
      case 'hacker':
        return 'mt-8 bg-black rounded-2xl shadow-lg border border-green-500';
      default:
        return 'mt-8 bg-white rounded-2xl shadow-lg border border-slate-200';
    }
  };

  const getButtonClasses = () => {
    switch(theme) {
      case 'light':
        return 'w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 rounded-2xl';
      case 'dark':
        return 'w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-700 transition-colors duration-200 rounded-2xl';
      case 'hacker':
        return 'w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-900 transition-colors duration-200 rounded-2xl';
      default:
        return 'w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 rounded-2xl';
    }
  };

  const getTitleClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-lg font-semibold text-slate-800';
      case 'dark':
        return 'text-lg font-semibold text-white';
      case 'hacker':
        return 'text-lg font-semibold text-green-500 font-mono';
      default:
        return 'text-lg font-semibold text-slate-800';
    }
  };

  const getDescClasses = () => {
    switch(theme) {
      case 'light':
        return 'text-slate-600 mt-1';
      case 'dark':
        return 'text-slate-300 mt-1';
      case 'hacker':
        return 'text-green-400 mt-1 font-mono';
      default:
        return 'text-slate-600 mt-1';
    }
  };

  const getContentClasses = () => {
    switch(theme) {
      case 'light':
        return 'border-t border-slate-200';
      case 'dark':
        return 'border-t border-slate-700';
      case 'hacker':
        return 'border-t border-green-500';
      default:
        return 'border-t border-slate-200';
    }
  };

  const getIconClasses = () => {
    switch(theme) {
      case 'light':
        return 'w-6 h-6 text-slate-400 transform transition-transform duration-200';
      case 'dark':
        return 'w-6 h-6 text-slate-500 transform transition-transform duration-200';
      case 'hacker':
        return 'w-6 h-6 text-green-500 transform transition-transform duration-200';
      default:
        return 'w-6 h-6 text-slate-400 transform transition-transform duration-200';
    }
  };

  return (
    <div className={getCardClasses()}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={getButtonClasses()}
      >
        <div>
          <h3 className={getTitleClasses()}>Learn More About Phishing Detection</h3>
          <p className={getDescClasses()}>Discover how to spot phishing emails and protect yourself</p>
        </div>
        <svg 
          className={getIconClasses()}
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isExpanded && (
        <div className={getContentClasses()}>
          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Red Flags to Watch For
                </h4>
                <ul className="text-red-700 space-y-2 text-sm">
                  <li>• Urgent language ("Act now!", "Limited time!")</li>
                  <li>• Suspicious sender addresses</li>
                  <li>• Requests for personal information</li>
                  <li>• Unexpected attachments or links</li>
                  <li>• Poor grammar and spelling</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Protection Tips
                </h4>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>• Verify sender through separate channels</li>
                  <li>• Don't click suspicious links</li>
                  <li>• Check URLs carefully before visiting</li>
                  <li>• Keep software updated</li>
                  <li>• Use two-factor authentication</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-3">How Our Detection Works</h4>
              <p className="text-blue-700 text-sm leading-relaxed">
                Our analyzer examines multiple factors including sender patterns, language analysis, 
                URL verification, and known phishing indicators. While highly accurate, always use 
                your judgment and verify suspicious communications through official channels.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
