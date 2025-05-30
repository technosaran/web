'use client';

import { useState, useEffect, useCallback, Suspense } from "react";
import { useInView } from 'react-intersection-observer';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner, { SkeletonLoader } from '../components/LoadingSpinner';
import SecureContactForm from '../components/SecureContactForm';
import { debounce } from '../utils/performance';
// import { trackWebVitals } from '../utils/performance';
// import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
// import { useSecurityHeaders } from '../hooks/useSecurityHeaders';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [currentCertification, setCurrentCertification] = useState(0);
  // const [serviceWorkerReady, setServiceWorkerReady] = useState(false);

  // Initialize performance and security monitoring
  // Note: Temporarily disabled to isolate loading issue
  // const performanceMonitor = usePerformanceMonitor();
  // const securityHeaders = useSecurityHeaders();

  // Initialize performance tracking and service worker
  useEffect(() => {
    console.log('Page useEffect started');

    // Track web vitals - temporarily disabled
    // try {
    //   trackWebVitals();
    // } catch (error) {
    //   console.warn('Web vitals tracking failed:', error);
    // }

    // Register service worker - temporarily disabled
    // if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    //   const swPath = process.env.NODE_ENV === 'production' ? '/web/sw.js' : '/sw.js';
    //   navigator.serviceWorker.register(swPath)
    //     .then((registration) => {
    //       console.log('Service Worker registered:', registration);
    //       setServiceWorkerReady(true);
    //     })
    //     .catch((error) => {
    //       console.error('Service Worker registration failed:', error);
    //     });
    // }

    // Simulate loading completion - force it to complete
    console.log('Setting up timers');
    const timer = setTimeout(() => {
      console.log('Primary timer: Setting loading to false');
      setIsLoading(false);
    }, 1000);

    // Fallback timer to ensure loading never gets stuck
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback timer: Setting loading to false');
      setIsLoading(false);
    }, 3000);

    return () => {
      console.log('Cleaning up timers');
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Optimized scroll handler with debouncing
  const handleScroll = useCallback(
    debounce(() => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  }, []);

  // Certifications data
  const certifications = [
    {
      id: 1,
      title: "Prompt Engineering",
      company: "Infosys",
      description: "Advanced AI prompt design and optimization",
      date: "May 2025",
      link: "https://drive.google.com/file/d/1WhxCnwiHSbOMmePQ-L7Yf2xHfURCIbFc/view",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
      color: "from-purple-600 to-blue-600",
      borderColor: "border-purple-500/20",
      hoverColor: "hover:border-purple-400/50"
    },
    {
      id: 2,
      title: "Developer Virtual Experience",
      company: "Accenture",
      description: "Software development lifecycle and modern practices",
      date: "Jan 2025",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/hzmoNKtzvAzXsEqx8_Accenture%20North%20America_qzDS3fCN9ThbDFmSR_1737462755009_completion_certificate.pdf",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
      color: "from-blue-600 to-cyan-600",
      borderColor: "border-blue-500/20",
      hoverColor: "hover:border-blue-400/50"
    },
    {
      id: 3,
      title: "Data Science Job Simulation",
      company: "Accenture",
      description: "Data cleaning, modeling, and visualization techniques",
      date: "Jan 2025",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/hzmoNKtzvAzXsEqx8_Accenture%20North%20America_qzDS3fCN9ThbDFmSR_1737462755009_completion_certificate.pdf",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
      color: "from-cyan-600 to-teal-600",
      borderColor: "border-cyan-500/20",
      hoverColor: "hover:border-cyan-400/50"
    },
    {
      id: 4,
      title: "Data Visualisation",
      company: "Tata Group",
      description: "Empowering business with effective insights job simulation",
      date: "Mar 2025",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_qzDS3fCN9ThbDFmSR_1742738755009_completion_certificate.pdf",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Tata_logo.svg",
      color: "from-green-600 to-teal-600",
      borderColor: "border-green-500/20",
      hoverColor: "hover:border-green-400/50"
    },
    {
      id: 5,
      title: "Acquiring Data",
      company: "nasscom",
      description: "Data acquisition techniques and methodologies",
      date: "Jun 2024",
      link: "https://inspiration-fun-7467.my.salesforce-sites.com/CDACcertificatePage2?id=a02Vy0000030JW4IAM",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Nasscom_Logo.svg",
      color: "from-yellow-600 to-orange-600",
      borderColor: "border-yellow-500/20",
      hoverColor: "hover:border-yellow-400/50"
    }
  ];

  // Navigation functions for certification slider
  const nextCertification = () => {
    setCurrentCertification((prev) => (prev + 1) % certifications.length);
  };

  const prevCertification = () => {
    setCurrentCertification((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  const goToCertification = (index: number) => {
    setCurrentCertification(index);
  };

  // Keyboard navigation for certification carousel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevCertification();
      } else if (event.key === 'ArrowRight') {
        nextCertification();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Intersection observer hooks for lazy loading
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: skillsRef, inView: skillsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Use the monitoring hooks to prevent unused variable warnings
  // console.log('Monitors initialized:', { performanceMonitor, securityHeaders });

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 animate-pulse">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">S</span>
            </div>
          </div>
          <LoadingSpinner size="lg" text="Initializing Space Technology..." />
          {/* {serviceWorkerReady && (
            <p className="text-xs sm:text-sm text-green-400 mt-3 sm:mt-4">🚀 Offline support enabled</p>
          )} */}
          <button
            onClick={() => setIsLoading(false)}
            className="mt-4 sm:mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm rounded-lg transition-colors"
          >
            Skip Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* Navigation Header - Space Theme */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo with Space Theme */}
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <button
                onClick={() => scrollToSection('home')}
                className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-300"
              >
                Saran
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-4 lg:ml-10 flex items-baseline space-x-3 lg:space-x-6 xl:space-x-8">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 relative group ${
                      activeSection === item.toLowerCase()
                        ? 'text-purple-400'
                        : 'text-gray-300 hover:text-purple-400'
                    }`}
                  >
                    {item}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform transition-transform duration-300 ${
                      activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 hover:text-purple-400 transition-colors rounded-lg hover:bg-slate-800/50"
                aria-label="Toggle menu"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-3 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-md border-t border-purple-500/30">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className={`block px-3 py-3 text-sm sm:text-base font-medium w-full text-left transition-colors rounded-lg ${
                      activeSection === item.toLowerCase()
                        ? 'text-purple-400 bg-purple-500/10'
                        : 'text-gray-300 hover:text-purple-400 hover:bg-slate-800/50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Space Theme */}
      <section id="home" className="relative pt-14 sm:pt-16 min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 right-4 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 animate-pulse"></div>
          <div className="absolute bottom-20 sm:bottom-32 left-4 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 animate-ping"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full relative z-10">
          <div className="text-center">
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">S</span>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 px-2">
              Hey there 👋 I&apos;m{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Saran</span>
            </h1>
            <p className="max-w-xs sm:max-w-md mx-auto text-base sm:text-lg lg:text-xl text-gray-300 mb-2 sm:mb-3 px-4">
              🧠 AI & ML Enthusiast | ☕ Java Developer in Progress
            </p>
            <p className="max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-gray-400 mb-2 px-4">
              📊 Algo Trading Strategist | 🚀 Passionate Learner
            </p>
            <p className="max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto text-xs sm:text-sm lg:text-base text-gray-500 mb-4 sm:mb-6 px-4">
              Crafting Smart Solutions with AI & Code — Building intelligent systems and meaningful software
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6 px-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                🚀 Explore My Work
                <svg className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => window.open('#', '_blank')}
                className="group inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-green-500/30 text-white bg-slate-800/50 backdrop-blur-sm text-sm sm:text-base font-medium rounded-lg hover:bg-green-500/10 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105"
              >
                📄 Download Resume
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-purple-500/30 text-white bg-slate-800/50 backdrop-blur-sm text-sm sm:text-base font-medium rounded-lg hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
              >
                💬 Get In Touch
              </button>
            </div>
            <div className="flex justify-center space-x-3 sm:space-x-4 px-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group p-2.5 sm:p-3 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg text-gray-400 hover:text-purple-300 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-110" aria-label="GitHub">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/saran-r-b2b1a5275/" target="_blank" rel="noopener noreferrer" className="group p-2.5 sm:p-3 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg text-gray-400 hover:text-blue-300 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-110" aria-label="LinkedIn">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:saransci2006@gmail.com" className="group p-2.5 sm:p-3 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg text-gray-400 hover:text-green-300 hover:border-green-400/50 transition-all duration-300 transform hover:scale-110" aria-label="Email">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Space Theme */}
      <section id="about" ref={aboutRef} className="relative py-8 sm:py-12 bg-slate-800/50 backdrop-blur-sm">
        {/* Space Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-6 sm:top-10 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 animate-pulse"></div>
          <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl mb-3 sm:mb-4 px-2">
              🌌 <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">About Me</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 px-4">
              Exploring the infinite possibilities of code
            </p>
          </div>

          {!aboutInView ? (
            <SkeletonLoader lines={5} className="max-w-4xl mx-auto" avatar />
          ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 sm:p-6 text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">S</span>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">techno_saran</h3>
                <p className="text-gray-400 text-xs sm:text-sm">AI & ML Student | Java Developer | Trading Enthusiast</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                  <span className="mr-2">🧠</span>
                  My Journey in Tech
                </h3>
                <div className="space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm">
                  <p>
                    Hello! I&apos;m Saran, also known as <strong className="text-purple-300">techno_saran</strong>, a tech enthusiast currently pursuing my
                    <strong className="text-blue-300"> Bachelor&apos;s in Artificial Intelligence and Machine Learning</strong> at
                    <strong className="text-cyan-300"> Panimalar Engineering College, Chennai</strong>.
                  </p>
                  <p>
                    From a young age, I was fascinated by how machines &quot;think.&quot; This curiosity led me into the world of
                    <strong className="text-purple-300"> AI, software development, and automated trading systems</strong>. My learning journey has included
                    real-world internships, online projects, and self-guided deep dives into <strong className="text-orange-300">Java, Python, and MQL5</strong>.
                  </p>
                  <p>
                    What drives me is <strong className="text-green-300">problem-solving</strong> — whether it&apos;s building an AI-powered model,
                    designing a minimalistic website, or developing a smart trading bot. I thrive on learning, collaborating,
                    and applying cutting-edge technology to create real impact.
                  </p>
                </div>

                {/* Current Goals */}
                <div className="mt-4 sm:mt-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-center">
                    <span className="mr-2">🎯</span>
                    Current Goals
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex items-center text-xs sm:text-sm text-gray-300">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 flex-shrink-0"></span>
                      Master Java full-stack development
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                      Build production-grade trading system
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-300">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 flex-shrink-0"></span>
                      Contribute to open-source AI tools
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-300">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 flex-shrink-0"></span>
                      Land AI-focused internship in 2025
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                  <div className="text-center p-2 sm:p-3 bg-slate-700/30 backdrop-blur-sm border border-purple-500/20 rounded-lg">
                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">5+</div>
                    <div className="text-xs text-gray-400">Certifications</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-slate-700/30 backdrop-blur-sm border border-blue-500/20 rounded-lg">
                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">3</div>
                    <div className="text-xs text-gray-400">Internships</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-slate-700/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg">
                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">4+</div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-slate-700/30 backdrop-blur-sm border border-purple-500/20 rounded-lg">
                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">2023-27</div>
                    <div className="text-xs text-gray-400">B.Tech Period</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Skills Section - Space Theme */}
      <section id="skills" ref={skillsRef} className="relative py-8 sm:py-12 bg-slate-900/30 backdrop-blur-sm">
        {/* Space Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-6 sm:top-10 right-4 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 animate-pulse"></div>
          <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl mb-3 sm:mb-4 px-2">
              ⚡ <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Skills & Technologies</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 px-4">
              Tech arsenal for building stellar applications
            </p>
          </div>

          {!skillsInView ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <SkeletonLoader key={i} lines={4} className="bg-slate-800/30 backdrop-blur-sm border border-gray-500/20 rounded-xl p-4 sm:p-5" />
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* AI & ML */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 sm:p-5 hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm sm:text-lg">🧠</span>
                </div>
                <h3 className="ml-2 sm:ml-3 text-base sm:text-lg font-semibold text-white">AI & ML</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: 'Python (Pandas, NumPy)', level: 85, color: 'from-purple-500 to-pink-500' },
                  { name: 'Scikit-learn', level: 80, color: 'from-purple-500 to-pink-500' },
                  { name: 'Machine Learning', level: 75, color: 'from-purple-500 to-pink-500' },
                  { name: 'Data Analysis', level: 80, color: 'from-purple-500 to-pink-500' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-300 truncate pr-2">{skill.name}</span>
                      <span className="text-purple-300 flex-shrink-0">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-1.5 sm:h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-1.5 sm:h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programming Languages */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-orange-500/20 rounded-xl p-4 sm:p-5 hover:border-orange-400/50 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm sm:text-lg">☕</span>
                </div>
                <h3 className="ml-2 sm:ml-3 text-base sm:text-lg font-semibold text-white">Programming</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: 'Java (OOP, JDBC)', level: 80, color: 'from-orange-500 to-red-500' },
                  { name: 'Python', level: 85, color: 'from-orange-500 to-red-500' },
                  { name: 'Pine Script', level: 90, color: 'from-orange-500 to-red-500' },
                  { name: 'SQL', level: 75, color: 'from-orange-500 to-red-500' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-300 truncate pr-2">{skill.name}</span>
                      <span className="text-orange-300 flex-shrink-0">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-1.5 sm:h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-1.5 sm:h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 sm:p-5 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm sm:text-lg">⚛️</span>
                </div>
                <h3 className="ml-2 sm:ml-3 text-base sm:text-lg font-semibold text-white">Web Development</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: 'HTML & CSS', level: 90, color: 'from-blue-500 to-cyan-500' },
                  { name: 'JavaScript', level: 85, color: 'from-blue-500 to-cyan-500' },
                  { name: 'React/Next.js', level: 75, color: 'from-blue-500 to-cyan-500' },
                  { name: 'Responsive Design', level: 90, color: 'from-blue-500 to-cyan-500' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-300 truncate pr-2">{skill.name}</span>
                      <span className="text-blue-300 flex-shrink-0">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-1.5 sm:h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-1.5 sm:h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-4 sm:p-5 hover:border-green-400/50 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm sm:text-lg">🛠️</span>
                </div>
                <h3 className="ml-2 sm:ml-3 text-base sm:text-lg font-semibold text-white">Backend</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: 'Node.js', level: 85, color: 'from-green-500 to-teal-500' },
                  { name: 'Python', level: 80, color: 'from-green-500 to-teal-500' },
                  { name: 'PostgreSQL', level: 75, color: 'from-green-500 to-teal-500' },
                  { name: 'MongoDB', level: 70, color: 'from-green-500 to-teal-500' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-300 truncate pr-2">{skill.name}</span>
                      <span className="text-green-300 flex-shrink-0">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-1.5 sm:h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-1.5 sm:h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Cloud */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 sm:p-5 hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm sm:text-lg">☁️</span>
                </div>
                <h3 className="ml-2 sm:ml-3 text-base sm:text-lg font-semibold text-white">Tools & Platforms</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: 'VS Code, IntelliJ', level: 90, color: 'from-green-500 to-teal-500' },
                  { name: 'Git & GitHub', level: 85, color: 'from-green-500 to-teal-500' },
                  { name: 'TradingView/MT5', level: 90, color: 'from-green-500 to-teal-500' },
                  { name: 'Jupyter Notebook', level: 80, color: 'from-green-500 to-teal-500' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-300 truncate pr-2">{skill.name}</span>
                      <span className="text-green-300 flex-shrink-0">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-1.5 sm:h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-1.5 sm:h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Experience Section - Space Theme */}
      <section id="experience" className="relative py-12 bg-slate-800/50 backdrop-blur-sm">
        {/* Space Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-green-400/20 to-teal-400/20 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              🚀 <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-lg text-gray-300">
              Professional journey through the tech cosmos
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Experience Timeline */}
            <div className="space-y-6">
              {/* CodSoft Internship */}
              <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300 hover:bg-slate-800/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-300 text-xl">💻</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white group-hover:text-orange-300 transition-colors">Java & Web Development Intern</h3>
                      <p className="text-orange-300 text-sm font-medium">CodSoft</p>
                      <p className="text-gray-400 text-sm mt-1">Ongoing • Remote</p>
                      <p className="text-gray-300 text-sm mt-2">Developing Java applications and web development projects, focusing on OOP principles and modern development practices.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">Java</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">Web Dev</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">Active</span>
                  </div>
                </div>
              </div>

              {/* Tata Group Virtual Internship */}
              <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:bg-slate-800/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-300 text-xl">🏢</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">Virtual Internship</h3>
                      <p className="text-blue-300 text-sm font-medium">Tata Group (Forage)</p>
                      <p className="text-gray-400 text-sm mt-1">2025 • Virtual</p>
                      <p className="text-gray-300 text-sm mt-2">Completed virtual work experience program focusing on business strategy, data analysis, and corporate operations.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">Strategy</span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">Analysis</span>
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full border border-gray-500/30">Completed</span>
                  </div>
                </div>
              </div>

              {/* Accenture Virtual Internship */}
              <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:bg-slate-800/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-300 text-xl">⚡</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">Developer Program Virtual Internship</h3>
                      <p className="text-purple-300 text-sm font-medium">Accenture (Forage)</p>
                      <p className="text-gray-400 text-sm mt-1">2025 • Virtual</p>
                      <p className="text-gray-300 text-sm mt-2">Participated in developer-focused virtual experience covering software development lifecycle and modern development practices.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">Development</span>
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30">SDLC</span>
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full border border-gray-500/30">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Space Theme */}
      <section id="projects" className="relative py-12 bg-slate-900/30 backdrop-blur-sm">
        {/* Space Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-green-400/20 to-teal-400/20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              🛸 <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">Featured Projects</span>
            </h2>
            <p className="text-lg text-gray-300">
              Stellar applications from across the development galaxy
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Advanced PA Signals Project */}
              <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300 hover:bg-slate-800/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 backdrop-blur-sm border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-300 text-xl">📊</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-slate-700/50 hover:bg-green-500/20 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-400 hover:text-green-300" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="p-2 bg-slate-700/50 hover:bg-blue-500/20 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-400 hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors mb-2">Advanced PA Signals</h3>
                <p className="text-gray-300 text-sm mb-4">A robust Pine Script-based TradingView indicator that fuses Price Action Patterns, EMA Trend Filters, Support/Resistance Zones, and ATR-Based Dynamic Stop Loss for smart trading automation.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">Pine Script</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">TradingView</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">Technical Analysis</span>
                </div>
                <div className="text-xs text-gray-400">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Production Ready
                  </span>
                </div>
              </div>

              {/* Student Success Predictor */}
              <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:bg-slate-800/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-300 text-xl">🧠</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-slate-700/50 hover:bg-purple-500/20 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-400 hover:text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">Student Success Predictor</h3>
                <p className="text-gray-300 text-sm mb-4">Machine learning model that forecasts student outcomes using logistic regression and decision trees, emphasizing feature engineering and model evaluation for educational insights.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">Python</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">Scikit-learn</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">ML</span>
                </div>
                <div className="text-xs text-gray-400">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Academic Project
                  </span>
                </div>
              </div>

              {/* Portfolio Website */}
              <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:bg-slate-800/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-300 text-xl">🌐</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-slate-700/50 hover:bg-blue-500/20 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-400 hover:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="p-2 bg-slate-700/50 hover:bg-green-500/20 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-400 hover:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors mb-2">Portfolio Website</h3>
                <p className="text-gray-300 text-sm mb-4">Modern, responsive portfolio website built with Next.js and TypeScript, featuring a sleek 3D neural-inspired design that reflects minimalist design preferences and modern interfaces.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">Next.js</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">TypeScript</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30">Tailwind CSS</span>
                </div>
                <div className="text-xs text-gray-400">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Live & Deployed
                  </span>
                </div>
              </div>

              {/* Java Expense Tracker */}
              <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300 hover:bg-slate-800/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-300 text-xl">☕</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-slate-700/50 hover:bg-orange-500/20 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-400 hover:text-orange-300" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-orange-300 transition-colors mb-2">Java Expense Tracker</h3>
                <p className="text-gray-300 text-sm mb-4">Simple yet effective Java console application that records and visualizes monthly expenses. Helped strengthen understanding of OOP principles and file handling in Java.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">Java</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">OOP</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">Console App</span>
                </div>
                <div className="text-xs text-gray-400">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    Learning Project
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section - Space Theme with Carousel */}
      <section id="certifications" className="relative py-8 sm:py-12 bg-slate-900/50 backdrop-blur-sm">
        {/* Space Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-6 sm:top-10 right-4 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 animate-pulse"></div>
          <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl mb-3 sm:mb-4 px-2">
              🏆 <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Certifications & Achievements</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 px-4">
              Stellar credentials from across the tech galaxy
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-400">
              <span>{currentCertification + 1}</span>
              <span>/</span>
              <span>{certifications.length}</span>
              <span className="ml-2">•</span>
              <span className="ml-2">Use arrows to navigate</span>
            </div>
          </div>

          {/* Certification Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Main Certification Card */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentCertification * 100}%)` }}
              >
                {certifications.map((cert, index) => (
                  <div key={cert.id} className="w-full flex-shrink-0 px-2">
                    <div className={`group relative bg-slate-800/30 backdrop-blur-sm border ${cert.borderColor} rounded-xl p-4 sm:p-6 ${cert.hoverColor} transition-all duration-300 hover:bg-slate-800/50 hover:scale-[1.02]`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                        <div className="flex items-center space-x-4 min-w-0 flex-1">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-2 sm:p-3 flex-shrink-0">
                            <img
                              src={cert.logo}
                              alt={cert.company}
                              className="h-6 sm:h-8 w-auto filter brightness-0 invert"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
                              {cert.title}
                            </h3>
                            <p className="text-purple-300 text-sm sm:text-base font-medium mb-2">
                              {cert.company}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                              {cert.description} • {cert.date}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => window.open(cert.link, '_blank')}
                          className={`flex-shrink-0 w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r ${cert.color} text-white text-sm sm:text-base font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                        >
                          <span className="flex items-center justify-center">
                            🏆 View Certificate
                            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-6 sm:mt-8">
              {/* Previous Button */}
              <button
                onClick={prevCertification}
                className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full hover:border-purple-400/60 hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-110"
                aria-label="Previous certification"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2 sm:space-x-3">
                {certifications.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCertification(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentCertification
                        ? 'bg-purple-400 scale-125'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to certification ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextCertification}
                className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full hover:border-purple-400/60 hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-110"
                aria-label="Next certification"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-xs text-gray-500">
                <span className="inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                  Swipe or use arrow keys to navigate
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Quantum Physics Theme */}
      <section id="contact" className="relative py-8 sm:py-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* Quantum Particles Background */}
        <div className="absolute inset-0">
          <div className="absolute top-6 sm:top-10 left-4 sm:left-10 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-12 sm:top-20 right-8 sm:right-20 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-12 sm:bottom-20 left-8 sm:left-20 w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-10 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
        </div>

        {/* Quantum Wave Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,500 Q250,300 500,500 T1000,500" stroke="url(#quantumGradient)" strokeWidth="2" fill="none" opacity="0.3">
              <animate attributeName="d" dur="8s" repeatCount="indefinite"
                values="M0,500 Q250,300 500,500 T1000,500;M0,500 Q250,700 500,500 T1000,500;M0,500 Q250,300 500,500 T1000,500"/>
            </path>
            <defs>
              <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4"/>
                <stop offset="50%" stopColor="#8b5cf6"/>
                <stop offset="100%" stopColor="#ec4899"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl mb-3 sm:mb-4 px-2">
              ⚛️ <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Quantum Communication Portal</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 px-4">
              Establish quantum entanglement through digital channels
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Info - Quantum Theme */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <span className="mr-2 sm:mr-3">🌌</span>
                Quantum Communication Channels
              </h3>
              <p className="text-gray-200 mb-6 sm:mb-8 text-sm sm:text-base">
                Initiate quantum entanglement protocols to establish secure communication pathways across the digital multiverse.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <p className="text-white font-medium text-sm sm:text-base">📧 Quantum Email</p>
                    <p className="text-gray-300 text-xs sm:text-sm break-all">saransci2006@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-medium">📱 Quantum Phone</p>
                    <p className="text-gray-300">+91 6382957740</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-medium">🌍 Quantum Location</p>
                    <p className="text-gray-300">India</p>
                  </div>
                </div>
              </div>

              {/* Social Media Quantum Network */}
              <div className="mt-8 sm:mt-12">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 flex items-center">
                  <span className="mr-2">🔗</span>
                  Quantum Social Network
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* GitHub */}
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                     className="group relative flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-gray-800/30 backdrop-blur-md border border-purple-500/20 rounded-xl hover:border-purple-400/60 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-2 sm:mb-3 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-800 transition-all duration-300">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-purple-300 transition-colors">GitHub</span>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                     className="group relative flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-md border border-purple-500/20 rounded-xl hover:border-blue-400/60 hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-blue-300 transition-colors">LinkedIn</span>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                     className="group relative flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-md border border-purple-500/20 rounded-xl hover:border-pink-400/60 hover:bg-pink-500/10 transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center group-hover:from-pink-400 group-hover:to-purple-500 transition-all duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-pink-300 transition-colors">Instagram</span>
                    </div>
                  </a>

                  {/* Twitter/X */}
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                     className="group relative flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-md border border-purple-500/20 rounded-xl hover:border-cyan-400/60 hover:bg-cyan-500/10 transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-cyan-300 transition-colors">Twitter</span>
                    </div>
                  </a>

                  {/* YouTube */}
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                     className="group relative flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-md border border-purple-500/20 rounded-xl hover:border-red-400/60 hover:bg-red-500/10 transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center group-hover:from-red-500 group-hover:to-red-700 transition-all duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-red-300 transition-colors">YouTube</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a href="mailto:saransci2006@gmail.com"
                     className="group relative flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-md border border-purple-500/20 rounded-xl hover:border-green-400/60 hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-green-600 to-teal-700 flex items-center justify-center group-hover:from-green-500 group-hover:to-teal-600 transition-all duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-green-300 transition-colors">Email</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Quantum Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 lg:p-8 rounded-xl relative overflow-hidden">
              {/* Quantum Form Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                  <span className="mr-2">⚛️</span>
                  Quantum Message Transmitter
                </h3>
                <Suspense fallback={<LoadingSpinner text="Loading secure form..." />}>
                  <SecureContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Space Theme */}
      <footer className="relative bg-slate-900 border-t border-purple-500/30 overflow-hidden">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/10 to-blue-400/10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-400/10 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/5 to-purple-400/5 animate-ping"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Brand Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Saran
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                🚀 Space Technology Developer exploring the infinite possibilities of code.
                Building stellar applications that reach for the stars and beyond.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 border border-purple-500/30 flex items-center justify-center hover:border-purple-400 hover:bg-purple-500/20 transition-all duration-300"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-full bg-slate-800 border border-purple-500/30 flex items-center justify-center hover:border-blue-400 hover:bg-blue-500/20 transition-all duration-300"
                >
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="mailto:saransci2006@gmail.com"
                  className="group w-10 h-10 rounded-full bg-slate-800 border border-purple-500/30 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
                >
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-cyan-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="mr-2">🛸</span>
                Mission Control
              </h3>
              <ul className="space-y-3">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="group flex items-center text-gray-400 hover:text-purple-300 transition-colors duration-300"
                    >
                      <span className="w-2 h-2 bg-purple-500/50 rounded-full mr-3 group-hover:bg-purple-400 transition-colors"></span>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 flex items-center">
                <span className="mr-2">⚡</span>
                Tech Arsenal
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { name: 'Java', icon: '☕' },
                  { name: 'Python', icon: '🐍' },
                  { name: 'Pine Script', icon: '📊' },
                  { name: 'React', icon: '⚛️' },
                  { name: 'AI/ML', icon: '🧠' },
                  { name: 'Trading', icon: '📈' }
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <span className="mr-1.5 sm:mr-2 text-xs sm:text-sm">{tech.icon}</span>
                    <span className="text-gray-300 group-hover:text-purple-300 text-xs sm:text-sm transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-purple-500/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                  © 2024 Saran. All rights reserved.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs">System Online</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-400">
                <span>🌌 Built with cosmic energy</span>
                <span>•</span>
                <span>Next.js & Tailwind CSS</span>
                <span>•</span>
                <span>🛰️ Deployed to the cloud</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </ErrorBoundary>
  );
}