
import React from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Header } from '../components/Header';
import { PhishingDetector } from '../components/PhishingDetector';
import { LearnMoreSection } from '../components/LearnMoreSection';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-300">
        <div className="max-w-4xl mx-auto p-6">
          <ThemeSwitcher />
          <Header />
          <PhishingDetector />
          <LearnMoreSection />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
