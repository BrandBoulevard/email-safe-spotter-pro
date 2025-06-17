const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div 
        id="phishing-app" 
        className="max-w-4xl mx-auto p-6"
        dangerouslySetInnerHTML={{
          __html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Phishing Mail Detector</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif'],
                        'mono': ['Fira Code', 'monospace'],
                    },
                    colors: {
                        'navy': '#1E293B',
                        'orange': '#F97316',
                        'hacker-bg': '#0a0a0a',
                        'hacker-card': '#1a1a1a',
                        'hacker-green': '#00ff41',
                        'hacker-green-dark': '#00cc33',
                    }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .scan-animation {
            animation: scanPulse 2s infinite;
        }
        @keyframes scanPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }
        .result-slide-in {
            animation: slideIn 0.5s ease-out;
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .typing-animation::after {
            content: '|';
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        .hacker-glow {
            text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41;
        }
        .hacker-border {
            border: 1px solid #00ff41;
            box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
        }
        .matrix-bg {
            background-image: 
                linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px),
                linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen transition-all duration-300" id="app-body">
    <div id="phishing-app" class="max-w-4xl mx-auto p-6">
        <!-- Theme Switcher -->
        <div class="flex justify-end mb-4">
            <div class="bg-white rounded-lg shadow-md border border-slate-200 p-2" id="theme-switcher">
                <label class="text-sm font-medium text-slate-700 mr-3">Theme:</label>
                <select id="themeSelect" class="bg-transparent border-none text-sm font-medium text-slate-700 focus:outline-none cursor-pointer">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="hacker">Hacker</option>
                </select>
            </div>
        </div>

        <!-- Header Section -->
        <div class="text-center mb-8" id="header-section">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-navy to-slate-700 rounded-full mb-4 shadow-lg" id="header-icon">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
            </div>
            <h1 class="text-4xl font-bold text-navy mb-2" id="main-title">Worried That Email Might Be a Scam?</h1>
            <p class="text-xl text-slate-600 mb-6" id="main-subtitle">Paste it below. We'll help you find out.</p>
        </div>

        <!-- Main Card -->
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden" id="main-card">
            <!-- Input Section -->
            <div class="p-8" id="input-section">
                <label for="emailContent" class="block text-sm font-medium text-slate-700 mb-3" id="email-label">
                    Email Content to Analyze
                </label>
                <textarea 
                    id="emailContent" 
                    rows="8" 
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange focus:border-transparent resize-none transition-all duration-200 text-slate-700"
                    placeholder="Paste the suspicious email content here... Include the subject line, sender info, and message body for best results."
                ></textarea>
                
                <div class="mt-6 flex flex-col sm:flex-row gap-4">
                    <button 
                        id="scanBtn" 
                        class="flex-1 bg-gradient-to-r from-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <span id="scanBtnText">🔍 Scan for Phishing</span>
                    </button>
                    <button 
                        id="clearBtn" 
                        class="sm:w-auto px-6 py-4 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <!-- Results Section -->
            <div id="resultsSection" class="hidden border-t border-slate-200 bg-slate-50">
                <div class="p-8">
                    <div id="resultContent"></div>
                </div>
            </div>
        </div>

        <!-- Learn More Section -->
        <div class="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200" id="learn-more-card">
            <button 
                id="learnMoreToggle" 
                class="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 rounded-2xl"
            >
                <div>
                    <h3 class="text-lg font-semibold text-navy" id="learn-more-title">Learn More About Phishing Detection</h3>
                    <p class="text-slate-600 mt-1" id="learn-more-desc">Discover how to spot phishing emails and protect yourself</p>
                </div>
                <svg id="learnMoreIcon" class="w-6 h-6 text-slate-400 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            
            <div id="learnMoreContent" class="hidden border-t border-slate-200">
                <div class="p-8 space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-red-50 p-6 rounded-xl border border-red-100">
                            <h4 class="font-semibold text-red-800 mb-3 flex items-center">
                                <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                Red Flags to Watch For
                            </h4>
                            <ul class="text-red-700 space-y-2 text-sm">
                                <li>• Urgent language ("Act now!", "Limited time!")</li>
                                <li>• Suspicious sender addresses</li>
                                <li>• Requests for personal information</li>
                                <li>• Unexpected attachments or links</li>
                                <li>• Poor grammar and spelling</li>
                            </ul>
                        </div>
                        
                        <div class="bg-green-50 p-6 rounded-xl border border-green-100">
                            <h4 class="font-semibold text-green-800 mb-3 flex items-center">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                Protection Tips
                            </h4>
                            <ul class="text-green-700 space-y-2 text-sm">
                                <li>• Verify sender through separate channels</li>
                                <li>• Don't click suspicious links</li>
                                <li>• Check URLs carefully before visiting</li>
                                <li>• Keep software updated</li>
                                <li>• Use two-factor authentication</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 class="font-semibold text-blue-800 mb-3">How Our Detection Works</h4>
                        <p class="text-blue-700 text-sm leading-relaxed">
                            Our analyzer examines multiple factors including sender patterns, language analysis, 
                            URL verification, and known phishing indicators. While highly accurate, always use 
                            your judgment and verify suspicious communications through official channels.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8 text-slate-500 text-sm" id="footer">
            <p>Copy written by <span class="font-medium text-slate-700">Yuster Peter</span></p>
            <p class="mt-1">Built with security and privacy in mind</p>
        </div>
    </div>

    <script>
        class ThemeManager {
            constructor() {
                this.currentTheme = 'light';
                this.initializeTheme();
            }

            initializeTheme() {
                const themeSelect = document.getElementById('themeSelect');
                themeSelect.addEventListener('change', (e) => {
                    this.setTheme(e.target.value);
                });
            }

            setTheme(theme) {
                this.currentTheme = theme;
                const body = document.getElementById('app-body');
                const app = document.getElementById('phishing-app');
                
                // Reset all theme classes
                body.className = 'min-h-screen transition-all duration-300';
                
                switch(theme) {
                    case 'light':
                        this.applyLightTheme();
                        break;
                    case 'dark':
                        this.applyDarkTheme();
                        break;
                    case 'hacker':
                        this.applyHackerTheme();
                        break;
                }
            }

            applyLightTheme() {
                const body = document.getElementById('app-body');
                body.className += ' bg-gradient-to-br from-slate-50 to-slate-100';
                
                // Reset all elements to light theme
                document.getElementById('theme-switcher').className = 'bg-white rounded-lg shadow-md border border-slate-200 p-2';
                document.getElementById('main-title').className = 'text-4xl font-bold text-navy mb-2';
                document.getElementById('main-subtitle').className = 'text-xl text-slate-600 mb-6';
                document.getElementById('main-card').className = 'bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden';
                document.getElementById('learn-more-card').className = 'mt-8 bg-white rounded-2xl shadow-lg border border-slate-200';
                document.getElementById('emailContent').className = 'w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange focus:border-transparent resize-none transition-all duration-200 text-slate-700';
                document.getElementById('clearBtn').className = 'sm:w-auto px-6 py-4 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200';
                document.getElementById('email-label').className = 'block text-sm font-medium text-slate-700 mb-3';
                document.getElementById('learn-more-title').className = 'text-lg font-semibold text-navy';
                document.getElementById('learn-more-desc').className = 'text-slate-600 mt-1';
                
                document.body.style.fontFamily = 'Inter, sans-serif';
            }

            applyDarkTheme() {
                const body = document.getElementById('app-body');
                body.className += ' bg-gradient-to-br from-slate-900 to-slate-800';
                
                document.getElementById('theme-switcher').className = 'bg-slate-800 rounded-lg shadow-md border border-slate-700 p-2';
                document.getElementById('main-title').className = 'text-4xl font-bold text-white mb-2';
                document.getElementById('main-subtitle').className = 'text-xl text-slate-300 mb-6';
                document.getElementById('main-card').className = 'bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden';
                document.getElementById('learn-more-card').className = 'mt-8 bg-slate-800 rounded-2xl shadow-lg border border-slate-700';
                document.getElementById('emailContent').className = 'w-full px-4 py-3 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange focus:border-transparent resize-none transition-all duration-200 text-white bg-slate-700';
                document.getElementById('clearBtn').className = 'sm:w-auto px-6 py-4 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors duration-200';
                document.getElementById('email-label').className = 'block text-sm font-medium text-slate-300 mb-3';
                document.getElementById('learn-more-title').className = 'text-lg font-semibold text-white';
                document.getElementById('learn-more-desc').className = 'text-slate-300 mt-1';
                
                document.body.style.fontFamily = 'Inter, sans-serif';
            }

            applyHackerTheme() {
                const body = document.getElementById('app-body');
                body.className += ' bg-hacker-bg matrix-bg';
                
                document.getElementById('theme-switcher').className = 'bg-hacker-card rounded-lg shadow-md hacker-border p-2';
                document.getElementById('main-title').className = 'text-4xl font-bold text-hacker-green mb-2 hacker-glow font-mono';
                document.getElementById('main-subtitle').className = 'text-xl text-green-400 mb-6 font-mono';
                document.getElementById('main-card').className = 'bg-hacker-card rounded-2xl shadow-2xl hacker-border overflow-hidden';
                document.getElementById('learn-more-card').className = 'mt-8 bg-hacker-card rounded-2xl shadow-lg hacker-border';
                document.getElementById('emailContent').className = 'w-full px-4 py-3 hacker-border rounded-xl focus:ring-2 focus:ring-hacker-green focus:border-transparent resize-none transition-all duration-200 text-hacker-green bg-black font-mono';
                document.getElementById('clearBtn').className = 'sm:w-auto px-6 py-4 hacker-border text-hacker-green rounded-xl hover:bg-hacker-card transition-colors duration-200 font-mono';
                document.getElementById('email-label').className = 'block text-sm font-medium text-hacker-green mb-3 font-mono';
                document.getElementById('learn-more-title').className = 'text-lg font-semibold text-hacker-green font-mono';
                document.getElementById('learn-more-desc').className = 'text-green-400 mt-1 font-mono';
                document.getElementById('scanBtn').className = 'flex-1 bg-gradient-to-r from-hacker-green to-hacker-green-dark hover:from-hacker-green-dark hover:to-hacker-green text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-mono';
                
                document.body.style.fontFamily = 'Fira Code, monospace';
                
                // Update header icon for hacker theme
                document.getElementById('header-icon').className = 'inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-hacker-green to-hacker-green-dark rounded-full mb-4 shadow-lg';
                document.getElementById('header-icon').querySelector('svg').className = 'w-8 h-8 text-black';
            }
        }

        class PhishingDetector {
            constructor() {
                this.suspiciousPatterns = [
                    // Urgent language
                    /urgent(ly)?|immediate(ly)?|asap|act now|limited time|expire(s|d)?.*soon|final notice/i,
                    
                    // Financial urgency
                    /suspend(ed)?.*account|verify.*account|update.*payment|billing.*problem|refund.*pending/i,
                    
                    // Credential requests
                    /confirm.*password|verify.*identity|update.*security|click.*here.*login|sign.*in.*verify/i,
                    
                    // Generic greetings (often used in mass phishing)
                    /^dear (customer|user|member|client|sir|madam),?$/i,
                    
                    // Suspicious domains and links
                    /bit\\.ly|tinyurl|t\\.co|goo\\.gl|ow\\.ly|short\\.link/i,
                    
                    // Prize/lottery scams
                    /congratulations.*won|lottery.*winner|claim.*prize|selected.*winner/i,
                    
                    // Authority impersonation
                    /irs|fbi|microsoft.*security|apple.*security|google.*security|paypal.*security/i,
                    
                    // Attachment warnings
                    /invoice.*attached|statement.*attached|receipt.*attached|document.*requires.*download/i
                ];

                this.safePatterns = [
                    /unsubscribe|privacy policy|terms of service|legitimate business|official communication/i
                ];

                this.initializeEventListeners();
            }

            initializeEventListeners() {
                document.getElementById('scanBtn').addEventListener('click', () => this.scanEmail());
                document.getElementById('clearBtn').addEventListener('click', () => this.clearContent());
                document.getElementById('learnMoreToggle').addEventListener('click', () => this.toggleLearnMore());
            }

            scanEmail() {
                const content = document.getElementById('emailContent').value.trim();
                
                if (!content) {
                    this.showError('Please paste some email content to analyze.');
                    return;
                }

                this.showScanning();
                
                // Simulate analysis delay for better UX
                setTimeout(() => {
                    const result = this.analyzeContent(content);
                    this.showResults(result);
                }, 2000);
            }

            analyzeContent(content) {
                let suspiciousScore = 0;
                let detectedPatterns = [];
                let safeIndicators = [];

                // Check for suspicious patterns
                this.suspiciousPatterns.forEach((pattern, index) => {
                    if (pattern.test(content)) {
                        suspiciousScore += this.getPatternWeight(index);
                        detectedPatterns.push(this.getPatternDescription(index));
                    }
                });

                // Check for safe patterns
                this.safePatterns.forEach(pattern => {
                    if (pattern.test(content)) {
                        suspiciousScore -= 10;
                        safeIndicators.push('Contains legitimate business language');
                    }
                });

                // Additional checks
                const urlCount = (content.match(/https?:\\/\\/[^\\s]+/g) || []).length;
                if (urlCount > 3) {
                    suspiciousScore += 15;
                    detectedPatterns.push('Multiple links detected');
                }

                const hasPersonalGreeting = /dear\\s+[a-z]+\\s+[a-z]+/i.test(content);
                if (hasPersonalGreeting) {
                    suspiciousScore -= 5;
                    safeIndicators.push('Personalized greeting');
                }

                // Calculate confidence and risk level
                const maxScore = 100;
                const normalizedScore = Math.min(suspiciousScore, maxScore);
                const confidence = Math.min(95, Math.max(60, normalizedScore + 20));

                let riskLevel, message, color, icon;
                
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
                    safeIndicators,
                    score: normalizedScore
                };
            }

            getPatternWeight(index) {
                const weights = [25, 20, 25, 10, 15, 20, 15, 15];
                return weights[index] || 10;
            }

            getPatternDescription(index) {
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
            }

            showScanning() {
                const scanBtn = document.getElementById('scanBtn');
                const scanBtnText = document.getElementById('scanBtnText');
                
                scanBtn.disabled = true;
                scanBtn.classList.add('scan-animation');
                scanBtnText.innerHTML = '🔄 Analyzing Email...';
                
                document.getElementById('resultsSection').classList.add('hidden');
            }

            showResults(result) {
                const scanBtn = document.getElementById('scanBtn');
                const scanBtnText = document.getElementById('scanBtnText');
                const resultsSection = document.getElementById('resultsSection');
                const resultContent = document.getElementById('resultContent');

                // Reset button
                scanBtn.disabled = false;
                scanBtn.classList.remove('scan-animation');
                scanBtnText.innerHTML = '🔍 Scan for Phishing';

                // Color schemes
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

                const scheme = colorSchemes[result.color];

                resultContent.innerHTML = \`
                    <div class="result-slide-in">
                        <div class="\${scheme.bg} \${scheme.border} border-2 rounded-xl p-6 mb-6">
                            <div class="flex items-center mb-4">
                                <span class="text-3xl mr-3">\${result.icon}</span>
                                <div>
                                    <h3 class="\${scheme.text} text-xl font-bold">\${result.riskLevel}</h3>
                                    <p class="\${scheme.text} opacity-75">Confidence: \${result.confidence}%</p>
                                </div>
                            </div>
                            <p class="\${scheme.text} text-lg leading-relaxed">\${result.message}</p>
                        </div>

                        \${result.detectedPatterns.length > 0 ? \`
                            <div class="mb-6">
                                <h4 class="font-semibold text-slate-700 mb-3">⚠️ Detected Issues:</h4>
                                <ul class="space-y-2">
                                    \${result.detectedPatterns.map(pattern => 
                                        \`<li class="flex items-center text-slate-600">
                                            <span class="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                                            \${pattern}
                                        </li>\`
                                    ).join('')}
                                </ul>
                            </div>
                        \` : ''}

                        \${result.safeIndicators.length > 0 ? \`
                            <div class="mb-6">
                                <h4 class="font-semibold text-slate-700 mb-3">✅ Positive Indicators:</h4>
                                <ul class="space-y-2">
                                    \${result.safeIndicators.map(indicator => 
                                        \`<li class="flex items-center text-slate-600">
                                            <span class="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                            \${indicator}
                                        </li>\`
                                    ).join('')}
                                </ul>
                            </div>
                        \` : ''}

                        <div class="bg-slate-100 rounded-lg p-4 text-sm text-slate-600">
                            <strong>Disclaimer:</strong> This analysis is for educational purposes. Always verify suspicious 
                            emails through official channels and trust your instincts.
                        </div>
                    </div>
                \`;

                resultsSection.classList.remove('hidden');
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            showError(message) {
                const resultContent = document.getElementById('resultContent');
                const resultsSection = document.getElementById('resultsSection');

                resultContent.innerHTML = \`
                    <div class="result-slide-in bg-red-50 border-2 border-red-200 rounded-xl p-6">
                        <div class="flex items-center">
                            <span class="text-2xl mr-3">❌</span>
                            <p class="text-red-800 font-medium">\${message}</p>
                        </div>
                    </div>
                \`;

                resultsSection.classList.remove('hidden');
            }

            clearContent() {
                document.getElementById('emailContent').value = '';
                document.getElementById('resultsSection').classList.add('hidden');
            }

            toggleLearnMore() {
                const content = document.getElementById('learnMoreContent');
                const icon = document.getElementById('learnMoreIcon');
                
                if (content.classList.contains('hidden')) {
                    content.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const themeManager = new ThemeManager();
            const phishingDetector = new PhishingDetector();
        });
    </script>
</body>
</html>
          `
        }}
      />
    </div>
  );
};

export default Index;
