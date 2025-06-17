
import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { EmailInput } from './EmailInput';
import { ResultsDisplay } from './ResultsDisplay';

interface AnalysisResult {
  riskLevel: string;
  message: string;
  confidence: number;
  color: 'green' | 'yellow' | 'red';
  icon: string;
  detectedPatterns: string[];
  safeIndicators: string[];
}

export const PhishingDetector: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { theme } = useTheme();

  const suspiciousPatterns = [
    /urgent(ly)?|immediate(ly)?|asap|act now|limited time|expire(s|d)?.*soon|final notice/i,
    /suspend(ed)?.*account|verify.*account|update.*payment|billing.*problem|refund.*pending/i,
    /confirm.*password|verify.*identity|update.*security|click.*here.*login|sign.*in.*verify/i,
    /^dear (customer|user|member|client|sir|madam),?$/i,
    /bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly|short\.link/i,
    /congratulations.*won|lottery.*winner|claim.*prize|selected.*winner/i,
    /irs|fbi|microsoft.*security|apple.*security|google.*security|paypal.*security/i,
    /invoice.*attached|statement.*attached|receipt.*attached|document.*requires.*download/i
  ];

  const safePatterns = [
    /unsubscribe|privacy policy|terms of service|legitimate business|official communication/i
  ];

  const getPatternWeight = (index: number): number => {
    const weights = [25, 20, 25, 10, 15, 20, 15, 15];
    return weights[index] || 10;
  };

  const getPatternDescription = (index: number): string => {
    const descriptions = [
      'Urgent language detected',
      'Financial urgency tactics',
      'Credential harvesting attempt',
      'Generic greeting (mass email)',
      'Suspicious shortened URLs',
      'Prize/lottery scam language',
      'Authority impersonation',
      'Suspicious attachment references'
    ];
    return descriptions[index] || 'Suspicious pattern detected';
  };

  const analyzeContent = (content: string): AnalysisResult => {
    let suspiciousScore = 0;
    let detectedPatterns: string[] = [];
    let safeIndicators: string[] = [];

    // Check for suspicious patterns
    suspiciousPatterns.forEach((pattern, index) => {
      if (pattern.test(content)) {
        suspiciousScore += getPatternWeight(index);
        detectedPatterns.push(getPatternDescription(index));
      }
    });

    // Check for safe patterns
    safePatterns.forEach(pattern => {
      if (pattern.test(content)) {
        suspiciousScore -= 10;
        safeIndicators.push('Contains legitimate business language');
      }
    });

    // Additional checks
    const urlCount = (content.match(/https?:\/\/[^\s]+/g) || []).length;
    if (urlCount > 3) {
      suspiciousScore += 15;
      detectedPatterns.push('Multiple links detected');
    }

    const hasPersonalGreeting = /dear\s+[a-z]+\s+[a-z]+/i.test(content);
    if (hasPersonalGreeting) {
      suspiciousScore -= 5;
      safeIndicators.push('Personalized greeting');
    }

    // Calculate confidence and risk level
    const maxScore = 100;
    const normalizedScore = Math.min(suspiciousScore, maxScore);
    const confidence = Math.min(95, Math.max(60, normalizedScore + 20));

    let riskLevel: string, message: string, color: 'green' | 'yellow' | 'red', icon: string;
    
    if (normalizedScore >= 60) {
      riskLevel = 'HIGH RISK';
      message = 'This email shows multiple phishing indicators. Do not click any links or provide personal information.';
      color = 'red';
      icon = '⚠️';
    } else if (normalizedScore >= 30) {
      riskLevel = 'MEDIUM RISK';
      message = 'This email has some suspicious elements. Proceed with caution and verify the sender.';
      color = 'yellow';
      icon = '⚡';
    } else {
      riskLevel = 'LOW RISK';
      message = 'This email appears relatively safe, but always stay vigilant.';
      color = 'green';
      icon = '✅';
    }

    return {
      riskLevel,
      message,
      confidence,
      color,
      icon,
      detectedPatterns,
      safeIndicators
    };
  };

  const handleScan = () => {
    if (!emailContent.trim()) {
      alert('Please paste some email content to analyze.');
      return;
    }

    setIsScanning(true);
    setShowResults(false);
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
      const analysisResult = analyzeContent(emailContent);
      setResult(analysisResult);
      setShowResults(true);
      setIsScanning(false);
    }, 2000);
  };

  const handleClear = () => {
    setEmailContent('');
    setResult(null);
    setShowResults(false);
  };

  const getCardClasses = () => {
    switch(theme) {
      case 'light':
        return 'bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden';
      case 'dark':
        return 'bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden';
      case 'hacker':
        return 'bg-black rounded-2xl shadow-2xl border border-green-500 overflow-hidden';
      default:
        return 'bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden';
    }
  };

  return (
    <div className={getCardClasses()}>
      <EmailInput
        value={emailContent}
        onChange={setEmailContent}
        onScan={handleScan}
        onClear={handleClear}
        isScanning={isScanning}
      />
      <ResultsDisplay result={result} isVisible={showResults} />
    </div>
  );
};
