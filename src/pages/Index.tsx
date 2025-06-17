
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Header } from '../components/Header';
import { PhishingDetector } from '../components/PhishingDetector';
import { LearnMoreSection } from '../components/LearnMoreSection';
import { Footer } from '../components/Footer';
import { UserMenu } from '../components/UserMenu';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <ThemeProvider>
        <div className="min-h-screen transition-all duration-300">
          <div className="max-w-4xl mx-auto p-6">
            <ThemeSwitcher />
            <div className="text-center mt-20">
              <h1 className="text-4xl font-bold mb-6">Phishing Mail Detector</h1>
              <p className="text-lg mb-8">Please sign in to use the phishing detector.</p>
              <Button onClick={() => navigate('/auth')}>
                Go to Sign In
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-300">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex justify-between items-start mb-4">
            <ThemeSwitcher />
            <UserMenu />
          </div>
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
