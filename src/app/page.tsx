'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner, { SkeletonLoader } from '../components/LoadingSpinner';
import SecureContactForm from '../components/SecureContactForm';
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

  // Optimized scroll handler with throttling for better performance
  const handleScroll = useCallback(() => {
    const sections = [
      'home',
      'about',
      'skills',
      'experience',
      'projects',
      'certifications',
      'contact',
    ];
    const scrollPosition = window.scrollY + 100;

    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offsetTop = window.scrollY + rect.top;
          const offsetHeight = rect.height;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    });
  }, [activeSection]);

  useEffect(() => {
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
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
      title: 'Prompt Engineering',
      company: 'Infosys',
      description: 'Advanced AI prompt design and optimization',
      date: 'May 2025',
      link: 'https://drive.google.com/file/d/1WhxCnwiHSbOMmePQ-L7Yf2xHfURCIbFc/view',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Infosys-Logo.png',
      color: 'from-purple-600 to-blue-600',
      borderColor: 'border-purple-500/20',
      hoverColor: 'hover:border-purple-400/50',
    },
    {
      id: 2,
      title: 'Developer Virtual Experience',
      company: 'Accenture',
      description: 'Software development lifecycle and modern practices',
      date: 'Jan 2025',
      link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/hzmoNKtzvAzXsEqx8_Accenture%20North%20America_qzDS3fCN9ThbDFmSR_1737462755009_completion_certificate.pdf',
      logo: 'https://logos-world.net/wp-content/uploads/2021/02/Accenture-Logo.png',
      color: 'from-blue-600 to-cyan-600',
      borderColor: 'border-blue-500/20',
      hoverColor: 'hover:border-blue-400/50',
    },
    {
      id: 3,
      title: 'Data Science Job Simulation',
      company: 'Accenture',
      description: 'Data cleaning, modeling, and visualization techniques',
      date: 'Jan 2025',
      link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20North%20America/hzmoNKtzvAzXsEqx8_Accenture%20North%20America_qzDS3fCN9ThbDFmSR_1737462755009_completion_certificate.pdf',
      logo: 'https://logos-world.net/wp-content/uploads/2021/02/Accenture-Logo.png',
      color: 'from-cyan-600 to-teal-600',
      borderColor: 'border-cyan-500/20',
      hoverColor: 'hover:border-cyan-400/50',
    },
    {
      id: 4,
      title: 'Data Visualisation',
      company: 'Tata Group',
      description: 'Empowering business with effective insights job simulation',
      date: 'Mar 2025',
      link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_qzDS3fCN9ThbDFmSR_1742738755009_completion_certificate.pdf',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Tata-Logo.png',
      color: 'from-green-600 to-teal-600',
      borderColor: 'border-green-500/20',
      hoverColor: 'hover:border-green-400/50',
    },
    {
      id: 5,
      title: 'Acquiring Data',
      company: 'nasscom',
      description: 'Data acquisition techniques and methodologies',
      date: 'Jun 2024',
      link: 'https://inspiration-fun-7467.my.salesforce-sites.com/CDACcertificatePage2?id=a02Vy0000030JW4IAM',
      logo: 'https://www.nasscom.in/sites/default/files/media/images/nasscom_logo.png',
      color: 'from-yellow-600 to-orange-600',
      borderColor: 'border-yellow-500/20',
      hoverColor: 'hover:border-yellow-400/50',
    },
  ];

  // Navigation functions for certification slider
  const nextCertification = () => {
    setCurrentCertification(prev => (prev + 1) % certifications.length);
  };

  const prevCertification = () => {
    setCurrentCertification(prev => (prev - 1 + certifications.length) % certifications.length);
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
        <div className="mx-auto max-w-sm text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 sm:mb-6 sm:h-20 sm:w-20">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                S
              </span>
            </div>
          </div>
          <LoadingSpinner size="lg" text="Initializing Space Technology..." />
          {/* {serviceWorkerReady && (
            <p className="text-xs sm:text-sm text-green-400 mt-3 sm:mt-4">🚀 Offline support enabled</p>
          )} */}
          <button
            onClick={() => setIsLoading(false)}
            className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-xs text-white transition-colors hover:bg-purple-700 sm:mt-6 sm:text-sm"
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
        <nav className="fixed top-0 z-50 w-full border-b border-purple-500/30 bg-slate-900/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
            <div className="flex h-14 items-center justify-between sm:h-16">
              {/* Logo with Space Theme */}
              <div className="flex flex-shrink-0 items-center">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 sm:mr-3 sm:h-10 sm:w-10">
                  <svg
                    className="h-4 w-4 text-white sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
                <button
                  onClick={() => scrollToSection('home')}
                  className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-lg font-bold text-transparent transition-all duration-300 hover:from-purple-300 hover:to-blue-300 sm:text-xl lg:text-2xl"
                >
                  Saran
                </button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-4 flex items-baseline space-x-3 lg:ml-10 lg:space-x-6 xl:space-x-8">
                  {[
                    'Home',
                    'About',
                    'Skills',
                    'Experience',
                    'Projects',
                    'Certifications',
                    'Contact',
                  ].map(item => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`group relative px-2 py-2 text-xs font-medium transition-all duration-300 lg:px-3 lg:text-sm ${
                        activeSection === item.toLowerCase()
                          ? 'text-purple-400'
                          : 'text-gray-300 hover:text-purple-400'
                      }`}
                    >
                      {item}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 w-full transform bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 ${
                          activeSection === item.toLowerCase()
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-slate-800/50 hover:text-purple-400"
                  aria-label="Toggle menu"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="space-y-1 border-t border-purple-500/30 bg-slate-900/95 px-3 pt-2 pb-3 backdrop-blur-md">
                  {[
                    'Home',
                    'About',
                    'Skills',
                    'Experience',
                    'Projects',
                    'Certifications',
                    'Contact',
                  ].map(item => (
                    <button
                      key={item}
                      onClick={() => {
                        scrollToSection(item.toLowerCase());
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors sm:text-base ${
                        activeSection === item.toLowerCase()
                          ? 'bg-purple-500/10 text-purple-400'
                          : 'text-gray-300 hover:bg-slate-800/50 hover:text-purple-400'
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

        {/* Hero Section - Enhanced AI/ML Theme */}
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 pt-14 sm:pt-16"
        >
          {/* Enhanced AI Neural Network Background */}
          <div className="absolute inset-0">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
                  backgroundSize: '50px 50px',
                  animation: 'pulse 4s ease-in-out infinite',
                }}
              ></div>
            </div>

            {/* Enhanced Neural Network Nodes with Glow Effects */}
            <div className="absolute top-20 left-10 h-4 w-4 animate-pulse rounded-full bg-cyan-400 opacity-70 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute top-32 left-32 h-3 w-3 animate-bounce rounded-full bg-blue-400 opacity-60 shadow-lg shadow-blue-400/50"></div>
            <div className="absolute top-40 left-20 h-5 w-5 animate-pulse rounded-full bg-purple-400 opacity-80 shadow-lg shadow-purple-400/50"></div>
            <div className="absolute top-60 left-40 h-2 w-2 animate-ping rounded-full bg-green-400 opacity-70 shadow-lg shadow-green-400/50"></div>
            <div className="absolute top-80 left-60 h-3 w-3 animate-bounce rounded-full bg-pink-400 opacity-60 shadow-lg shadow-pink-400/50"></div>

            <div className="absolute top-24 right-16 h-4 w-4 animate-pulse rounded-full bg-pink-400 opacity-70 shadow-lg shadow-pink-400/50"></div>
            <div className="absolute top-48 right-32 h-3 w-3 animate-ping rounded-full bg-cyan-400 opacity-60 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute top-36 right-24 h-5 w-5 animate-bounce rounded-full bg-blue-400 opacity-80 shadow-lg shadow-blue-400/50"></div>
            <div className="absolute top-64 right-48 h-2 w-2 animate-pulse rounded-full bg-purple-400 opacity-50 shadow-lg shadow-purple-400/50"></div>

            <div className="absolute bottom-32 left-16 h-4 w-4 animate-ping rounded-full bg-purple-400 opacity-70 shadow-lg shadow-purple-400/50"></div>
            <div className="absolute bottom-48 left-40 h-3 w-3 animate-pulse rounded-full bg-cyan-400 opacity-60 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute right-20 bottom-40 h-4 w-4 animate-bounce rounded-full bg-green-400 opacity-70 shadow-lg shadow-green-400/50"></div>
            <div className="absolute right-40 bottom-24 h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-60 shadow-lg shadow-blue-400/50"></div>
            <div className="absolute right-60 bottom-60 h-3 w-3 animate-pulse rounded-full bg-pink-400 opacity-50 shadow-lg shadow-pink-400/50"></div>

            {/* Enhanced Neural Network Connections */}
            <svg
              className="absolute inset-0 h-full w-full opacity-25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="neuralGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="neuralGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main neural pathways */}
              <path
                d="M80,160 Q200,120 320,200 T560,180"
                stroke="url(#neuralGradient1)"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="3s"
                  repeatCount="indefinite"
                  values="0,200;100,100;200,0;0,200"
                />
              </path>
              <path
                d="M120,240 Q300,200 480,280 T720,260"
                stroke="url(#neuralGradient2)"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="4s"
                  repeatCount="indefinite"
                  values="0,200;100,100;200,0;0,200"
                />
              </path>
              <path
                d="M60,320 Q250,280 440,360 T680,340"
                stroke="url(#neuralGradient1)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.4"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="5s"
                  repeatCount="indefinite"
                  values="0,200;100,100;200,0;0,200"
                />
              </path>

              {/* Secondary connections */}
              <path
                d="M160,100 Q300,150 440,120 T680,140"
                stroke="url(#neuralGradient2)"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="6s"
                  repeatCount="indefinite"
                  values="0,150;75,75;150,0;0,150"
                />
              </path>
              <path
                d="M100,400 Q250,350 400,420 T640,400"
                stroke="url(#neuralGradient1)"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="7s"
                  repeatCount="indefinite"
                  values="0,150;75,75;150,0;0,150"
                />
              </path>

              {/* Vertical connections */}
              <path
                d="M200,80 Q180,200 220,320 T240,480"
                stroke="url(#neuralGradient2)"
                strokeWidth="1"
                fill="none"
                opacity="0.2"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="8s"
                  repeatCount="indefinite"
                  values="0,100;50,50;100,0;0,100"
                />
              </path>
              <path
                d="M600,100 Q580,220 620,340 T640,500"
                stroke="url(#neuralGradient1)"
                strokeWidth="1"
                fill="none"
                opacity="0.2"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="9s"
                  repeatCount="indefinite"
                  values="0,100;50,50;100,0;0,100"
                />
              </path>
            </svg>

            {/* AI Data Particles */}
            <div className="absolute top-1/4 left-1/3 h-1 w-1 animate-ping rounded-full bg-cyan-300"></div>
            <div
              className="absolute top-1/3 right-1/4 h-1 w-1 animate-ping rounded-full bg-purple-300"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/4 h-1 w-1 animate-ping rounded-full bg-blue-300"
              style={{ animationDelay: '2s' }}
            ></div>
            <div
              className="absolute right-1/3 bottom-1/4 h-1 w-1 animate-ping rounded-full bg-green-300"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="text-center">
              {/* Enhanced AI Brain Icon */}
              <div className="mb-6 sm:mb-8">
                <div className="group relative mx-auto mb-4 h-24 w-24 sm:mb-6 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                  {/* Neural Network Brain with Enhanced Effects */}
                  <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-1.5 shadow-2xl shadow-cyan-500/25">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-900">
                      {/* Enhanced Brain Neural Pattern */}
                      <svg
                        className="h-14 w-14 text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300 sm:h-16 sm:w-16 lg:h-18 lg:w-18"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11S11 10.1 11 9V7.5L5 7V9C5 10.1 4.1 11 3 11S1 10.1 1 9V7C1 5.9 1.9 5 3 5H21C22.1 5 23 5.9 23 7V9C23 10.1 22.1 11 21 11S19 10.1 19 9ZM12 13C13.1 13 14 13.9 14 15S13.1 17 12 17S10 16.1 10 15S10.9 13 12 13ZM18 13C19.1 13 20 13.9 20 15S19.1 17 18 17S16 16.1 16 15S16.9 13 18 13ZM6 13C7.1 13 8 13.9 8 15S7.1 17 6 17S4 16.1 4 15S4.9 13 6 13ZM12 18C13.1 18 14 18.9 14 20S13.1 22 12 22S10 21.1 10 20S10.9 18 12 18Z" />
                      </svg>

                      {/* Multi-layered Pulsing Neural Connections */}
                      <div className="absolute inset-0 animate-ping rounded-full border-2 border-cyan-400/40"></div>
                      <div className="absolute inset-1 animate-pulse rounded-full border border-purple-400/50"></div>
                      <div
                        className="absolute inset-3 animate-ping rounded-full border border-pink-400/30"
                        style={{ animationDelay: '1s' }}
                      ></div>

                      {/* Inner Neural Activity */}
                      <div className="absolute inset-4 animate-pulse rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-400/10"></div>
                    </div>
                  </div>

                  {/* Enhanced Floating Data Points with Orbiting Animation */}
                  <div className="absolute -top-3 -right-3 h-4 w-4 animate-bounce rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
                  <div className="absolute -bottom-3 -left-3 h-3 w-3 animate-ping rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
                  <div className="absolute top-1/2 -left-4 h-3 w-3 animate-pulse rounded-full bg-pink-400 shadow-lg shadow-pink-400/50"></div>
                  <div className="absolute top-1/2 -right-4 h-3 w-3 animate-bounce rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
                  <div className="absolute -top-2 left-1/2 h-2 w-2 animate-ping rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
                  <div className="absolute -bottom-2 left-1/2 h-2 w-2 animate-pulse rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>

                  {/* Orbiting Particles */}
                  <div className="animate-spin-slow absolute inset-0">
                    <div className="absolute -top-1 left-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300 opacity-70"></div>
                    <div className="absolute top-1/2 -right-1 h-1.5 w-1.5 rounded-full bg-purple-300 opacity-70"></div>
                    <div className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 rounded-full bg-pink-300 opacity-70"></div>
                    <div className="absolute top-1/2 -left-1 h-1.5 w-1.5 rounded-full bg-blue-300 opacity-70"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced AI-themed Greeting */}
              <div className="mb-4 sm:mb-6">
                <div className="mb-4 inline-flex items-center rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 px-5 py-3 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                    <span className="text-sm font-medium text-cyan-400 sm:text-base">
                      🤖 AI/ML Engineer in Training
                    </span>
                    <div className="flex space-x-1">
                      <div className="h-1 w-1 animate-ping rounded-full bg-cyan-400"></div>
                      <div
                        className="h-1 w-1 animate-ping rounded-full bg-purple-400"
                        style={{ animationDelay: '0.5s' }}
                      ></div>
                      <div
                        className="h-1 w-1 animate-ping rounded-full bg-pink-400"
                        style={{ animationDelay: '1s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="mb-4 px-2 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="mb-2 block">Building the Future with</span>
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Artificial Intelligence
                </span>
              </h1>

              <p className="mx-auto mb-3 max-w-2xl px-4 text-lg text-gray-300 sm:mb-4 sm:text-xl lg:text-2xl">
                Hi, I'm <span className="font-semibold text-cyan-400">Saran</span> — Transforming
                data into intelligence,
                <br className="hidden sm:block" />
                one algorithm at a time
              </p>

              <p className="mx-auto mb-6 max-w-3xl px-4 text-base text-gray-400 sm:mb-8 sm:text-lg">
                🧠 Machine Learning • 🐍 Python & Java • 📊 Data Science • 🤖 Neural Networks • 📈
                Algorithmic Trading
              </p>
              {/* Enhanced AI/ML Action Buttons */}
              <div className="mb-8 flex flex-col justify-center gap-4 px-4 sm:flex-row">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group fast-transition hover-scale relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-xl hover:from-cyan-700 hover:to-purple-700 hover:shadow-cyan-500/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <svg
                    className="relative z-10 mr-3 h-5 w-5 transition-transform group-hover:rotate-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                  </svg>
                  <span className="relative z-10">Explore AI Projects</span>
                  <svg
                    className="relative z-10 ml-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute top-0 left-0 h-full w-full -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                </button>

                <button
                  onClick={() => scrollToSection('skills')}
                  className="group fast-transition hover-scale relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-cyan-500/40 bg-slate-800/60 px-8 py-4 font-semibold text-white shadow-lg backdrop-blur-sm hover:border-cyan-400/60 hover:bg-cyan-500/15 hover:shadow-cyan-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <svg
                    className="relative z-10 mr-3 h-5 w-5 transition-transform group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" />
                  </svg>
                  <span className="relative z-10">View Skills</span>
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="group fast-transition hover-scale relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-purple-500/40 bg-slate-800/60 px-8 py-4 font-semibold text-white shadow-lg backdrop-blur-sm hover:border-purple-400/60 hover:bg-purple-500/15 hover:shadow-purple-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <svg
                    className="relative z-10 mr-3 h-5 w-5 group-hover:animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="relative z-10">Let's Connect</span>
                </button>
              </div>

              {/* Enhanced AI/ML Concepts Showcase */}
              <div className="mb-8">
                <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
                  <div className="group fast-transition hover-scale relative cursor-pointer overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 p-5 text-center hover:border-cyan-400/50 hover:bg-gradient-to-br hover:from-cyan-500/25 hover:to-blue-500/25">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div className="relative z-10">
                      <div className="mb-3 text-3xl transition-transform group-hover:scale-110">
                        🧠
                      </div>
                      <div className="mb-1 text-sm font-semibold text-cyan-400">
                        Neural Networks
                      </div>
                      <div className="text-xs text-gray-400">Deep Learning</div>
                      <div className="absolute top-2 right-2 h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </div>
                  </div>

                  <div className="group fast-transition hover-scale relative cursor-pointer overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/15 to-pink-500/15 p-5 text-center hover:border-purple-400/50 hover:bg-gradient-to-br hover:from-purple-500/25 hover:to-pink-500/25">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div className="relative z-10">
                      <div className="mb-3 text-3xl transition-transform group-hover:scale-110">
                        📊
                      </div>
                      <div className="mb-1 text-sm font-semibold text-purple-400">Data Science</div>
                      <div className="text-xs text-gray-400">Analytics</div>
                      <div className="absolute top-2 right-2 h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </div>
                  </div>

                  <div className="group fast-transition hover-scale relative cursor-pointer overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/15 to-teal-500/15 p-5 text-center hover:border-green-400/50 hover:bg-gradient-to-br hover:from-green-500/25 hover:to-teal-500/25">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-teal-400/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div className="relative z-10">
                      <div className="mb-3 text-3xl transition-transform group-hover:scale-110">
                        🤖
                      </div>
                      <div className="mb-1 text-sm font-semibold text-green-400">
                        Machine Learning
                      </div>
                      <div className="text-xs text-gray-400">Algorithms</div>
                      <div className="absolute top-2 right-2 h-2 w-2 animate-ping rounded-full bg-green-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </div>
                  </div>

                  <div className="group fast-transition hover-scale relative cursor-pointer overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/15 to-red-500/15 p-5 text-center hover:border-orange-400/50 hover:bg-gradient-to-br hover:from-orange-500/25 hover:to-red-500/25">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-red-400/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div className="relative z-10">
                      <div className="mb-3 text-3xl transition-transform group-hover:scale-110">
                        📈
                      </div>
                      <div className="mb-1 text-sm font-semibold text-orange-400">Algo Trading</div>
                      <div className="text-xs text-gray-400">Automation</div>
                      <div className="absolute top-2 right-2 h-2 w-2 animate-ping rounded-full bg-orange-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Enhanced AI-themed Social Links */}
              <div className="flex justify-center space-x-6 px-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group fast-transition hover-scale relative rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-800/60 to-slate-700/60 p-4 text-gray-400 shadow-lg backdrop-blur-sm hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-cyan-500/20"
                  aria-label="GitHub"
                >
                  <svg
                    className="h-6 w-6 transition-transform group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="fast-transition absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute top-1 right-1 h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </a>

                <a
                  href="https://www.linkedin.com/in/saran-r-b2b1a5275/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group fast-transition hover-scale relative rounded-xl border border-blue-500/30 bg-gradient-to-br from-slate-800/60 to-slate-700/60 p-4 text-gray-400 shadow-lg backdrop-blur-sm hover:border-blue-400/60 hover:text-blue-300 hover:shadow-blue-500/20"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-6 w-6 transition-transform group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <div className="fast-transition absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute top-1 right-1 h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </a>

                <a
                  href="mailto:saransci2006@gmail.com"
                  className="group fast-transition hover-scale relative rounded-xl border border-purple-500/30 bg-gradient-to-br from-slate-800/60 to-slate-700/60 p-4 text-gray-400 shadow-lg backdrop-blur-sm hover:border-purple-400/60 hover:text-purple-300 hover:shadow-purple-500/20"
                  aria-label="Email"
                >
                  <svg
                    className="h-6 w-6 transition-transform group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="fast-transition absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute top-1 right-1 h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Space Theme */}
        <section
          id="about"
          ref={aboutRef}
          className="relative bg-slate-800/50 py-8 backdrop-blur-sm sm:py-12"
        >
          {/* Space Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-6 left-4 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 sm:top-10 sm:left-10 sm:h-16 sm:w-16"></div>
            <div className="absolute right-4 bottom-6 h-16 w-16 animate-bounce rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 sm:right-10 sm:bottom-10 sm:h-20 sm:w-20"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 text-center sm:mb-8">
              <h2 className="mb-3 px-2 text-2xl font-bold text-white sm:mb-4 sm:text-3xl lg:text-4xl">
                🌌{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className="px-4 text-base text-gray-300 sm:text-lg">
                Exploring the infinite possibilities of code
              </p>
            </div>

            {!aboutInView ? (
              <SkeletonLoader lines={5} className="mx-auto max-w-4xl" avatar />
            ) : (
              <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                <div className="lg:col-span-1">
                  <div className="rounded-xl border border-purple-500/20 bg-slate-800/30 p-4 text-center backdrop-blur-sm sm:p-6">
                    <div className="mx-auto mb-3 h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 sm:mb-4 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
                          S
                        </span>
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">techno_saran</h3>
                    <p className="text-xs text-gray-400 sm:text-sm">
                      AI & ML Student | Java Developer | Trading Enthusiast
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="rounded-xl border border-purple-500/20 bg-slate-800/30 p-4 backdrop-blur-sm sm:p-6">
                    <h3 className="mb-3 flex items-center text-lg font-bold text-white sm:mb-4 sm:text-xl">
                      <span className="mr-2">🧠</span>
                      My Journey in Tech
                    </h3>
                    <div className="space-y-2 text-xs text-gray-300 sm:space-y-3 sm:text-sm">
                      <p>
                        Hello! I&apos;m Saran, also known as{' '}
                        <strong className="text-purple-300">techno_saran</strong>, a tech enthusiast
                        currently pursuing my
                        <strong className="text-blue-300">
                          {' '}
                          Bachelor&apos;s in Artificial Intelligence and Machine Learning
                        </strong>{' '}
                        at
                        <strong className="text-cyan-300">
                          {' '}
                          Panimalar Engineering College, Chennai
                        </strong>
                        .
                      </p>
                      <p>
                        From a young age, I was fascinated by how machines &quot;think.&quot; This
                        curiosity led me into the world of
                        <strong className="text-purple-300">
                          {' '}
                          AI, software development, and automated trading systems
                        </strong>
                        . My learning journey has included real-world internships, online projects,
                        and self-guided deep dives into{' '}
                        <strong className="text-orange-300">Java, Python, and MQL5</strong>.
                      </p>
                      <p>
                        What drives me is{' '}
                        <strong className="text-green-300">problem-solving</strong> — whether
                        it&apos;s building an AI-powered model, designing a minimalistic website, or
                        developing a smart trading bot. I thrive on learning, collaborating, and
                        applying cutting-edge technology to create real impact.
                      </p>
                    </div>

                    {/* Current Goals */}
                    <div className="mt-4 sm:mt-6">
                      <h4 className="mb-2 flex items-center text-base font-semibold text-white sm:mb-3 sm:text-lg">
                        <span className="mr-2">🎯</span>
                        Current Goals
                      </h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                        <div className="flex items-center text-xs text-gray-300 sm:text-sm">
                          <span className="mr-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-400"></span>
                          Master Java full-stack development
                        </div>
                        <div className="flex items-center text-xs text-gray-300 sm:text-sm">
                          <span className="mr-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400"></span>
                          Build production-grade trading system
                        </div>
                        <div className="flex items-center text-xs text-gray-300 sm:text-sm">
                          <span className="mr-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-400"></span>
                          Contribute to open-source AI tools
                        </div>
                        <div className="flex items-center text-xs text-gray-300 sm:text-sm">
                          <span className="mr-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400"></span>
                          Land AI-focused internship in 2025
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 lg:grid-cols-4 lg:gap-4">
                      <div className="rounded-lg border border-purple-500/20 bg-slate-700/30 p-2 text-center backdrop-blur-sm sm:p-3">
                        <div className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                          5+
                        </div>
                        <div className="text-xs text-gray-400">Certifications</div>
                      </div>
                      <div className="rounded-lg border border-blue-500/20 bg-slate-700/30 p-2 text-center backdrop-blur-sm sm:p-3">
                        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                          3
                        </div>
                        <div className="text-xs text-gray-400">Internships</div>
                      </div>
                      <div className="rounded-lg border border-cyan-500/20 bg-slate-700/30 p-2 text-center backdrop-blur-sm sm:p-3">
                        <div className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                          4+
                        </div>
                        <div className="text-xs text-gray-400">Projects</div>
                      </div>
                      <div className="rounded-lg border border-purple-500/20 bg-slate-700/30 p-2 text-center backdrop-blur-sm sm:p-3">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl">
                          2023-27
                        </div>
                        <div className="text-xs text-gray-400">B.Tech Period</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Skills Section - Neural Network Theme */}
        <section
          id="skills"
          ref={skillsRef}
          className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900/50 to-purple-900/30 py-12 backdrop-blur-sm sm:py-16 lg:py-20"
        >
          {/* Advanced Neural Network Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Tech Grid */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
                  backgroundSize: '60px 60px',
                  animation: 'pulse 6s ease-in-out infinite',
                }}
              ></div>
            </div>

            {/* Floating Tech Nodes */}
            <div className="absolute top-16 left-16 h-6 w-6 animate-pulse rounded-full bg-blue-400 opacity-60 shadow-lg shadow-blue-400/50"></div>
            <div className="absolute top-32 right-20 h-4 w-4 animate-bounce rounded-full bg-cyan-400 opacity-70 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute top-48 left-32 h-5 w-5 animate-ping rounded-full bg-purple-400 opacity-80 shadow-lg shadow-purple-400/50"></div>
            <div className="absolute right-16 bottom-32 h-6 w-6 animate-pulse rounded-full bg-green-400 opacity-60 shadow-lg shadow-green-400/50"></div>
            <div className="absolute bottom-48 left-20 h-4 w-4 animate-bounce rounded-full bg-orange-400 opacity-70 shadow-lg shadow-orange-400/50"></div>
            <div className="absolute top-64 right-32 h-3 w-3 animate-ping rounded-full bg-pink-400 opacity-50 shadow-lg shadow-pink-400/50"></div>

            {/* Tech Connection Lines */}
            <svg
              className="absolute inset-0 h-full w-full opacity-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="techFlow1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="techFlow2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <path
                d="M100,200 Q300,150 500,220 T800,200"
                stroke="url(#techFlow1)"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="4s"
                  repeatCount="indefinite"
                  values="0,200;100,100;200,0;0,200"
                />
              </path>
              <path
                d="M150,350 Q350,300 550,370 T850,350"
                stroke="url(#techFlow2)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="5s"
                  repeatCount="indefinite"
                  values="0,150;75,75;150,0;0,150"
                />
              </path>
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Enhanced Header */}
            <div className="mb-12 text-center sm:mb-16">
              {/* Tech Brain Icon */}
              <div className="mb-8">
                <div className="relative mx-auto mb-6 h-20 w-20 sm:h-24 sm:w-24">
                  <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-1 shadow-2xl shadow-blue-500/25">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-900">
                      <svg
                        className="h-10 w-10 text-blue-400 sm:h-12 sm:w-12"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                      </svg>
                      <div className="absolute inset-0 animate-ping rounded-full border border-blue-400/30"></div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 h-3 w-3 animate-bounce rounded-full bg-cyan-400"></div>
                  <div className="absolute -bottom-2 -left-2 h-2 w-2 animate-ping rounded-full bg-purple-400"></div>
                </div>
              </div>

              <h2 className="mb-4 px-2 text-3xl font-bold text-white sm:mb-6 sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Skills & Technologies
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-3xl px-4 text-lg text-gray-300 sm:text-xl">
                Mastering the tools that power tomorrow's innovations
              </p>
            </div>

            {!skillsInView ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <SkeletonLoader
                    key={i}
                    lines={4}
                    className="rounded-xl border border-gray-500/20 bg-slate-800/30 p-4 backdrop-blur-sm sm:p-5"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* AI & ML */}
                <div className="rounded-xl border border-purple-500/20 bg-slate-800/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 sm:p-5">
                  <div className="mb-3 flex items-center sm:mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 sm:h-10 sm:w-10">
                      <span className="text-sm text-white sm:text-lg">🧠</span>
                    </div>
                    <h3 className="ml-2 text-base font-semibold text-white sm:ml-3 sm:text-lg">
                      AI & ML
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      {
                        name: 'Python (Pandas, NumPy)',
                        level: 85,
                        color: 'from-purple-500 to-pink-500',
                      },
                      { name: 'Scikit-learn', level: 80, color: 'from-purple-500 to-pink-500' },
                      { name: 'Machine Learning', level: 75, color: 'from-purple-500 to-pink-500' },
                      { name: 'Data Analysis', level: 80, color: 'from-purple-500 to-pink-500' },
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="mb-1 flex justify-between text-xs sm:text-sm">
                          <span className="truncate pr-2 text-gray-300">{skill.name}</span>
                          <span className="flex-shrink-0 text-purple-300">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-700/50 sm:h-2">
                          <div
                            className={`bg-gradient-to-r ${skill.color} h-1.5 rounded-full transition-all duration-300 sm:h-2`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Programming Languages */}
                <div className="rounded-xl border border-orange-500/20 bg-slate-800/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/50 sm:p-5">
                  <div className="mb-3 flex items-center sm:mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500 sm:h-10 sm:w-10">
                      <span className="text-sm text-white sm:text-lg">☕</span>
                    </div>
                    <h3 className="ml-2 text-base font-semibold text-white sm:ml-3 sm:text-lg">
                      Programming
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { name: 'Java (OOP, JDBC)', level: 80, color: 'from-orange-500 to-red-500' },
                      { name: 'Python', level: 85, color: 'from-orange-500 to-red-500' },
                      { name: 'Pine Script', level: 90, color: 'from-orange-500 to-red-500' },
                      { name: 'SQL', level: 75, color: 'from-orange-500 to-red-500' },
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="mb-1 flex justify-between text-xs sm:text-sm">
                          <span className="truncate pr-2 text-gray-300">{skill.name}</span>
                          <span className="flex-shrink-0 text-orange-300">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-700/50 sm:h-2">
                          <div
                            className={`bg-gradient-to-r ${skill.color} h-1.5 rounded-full transition-all duration-300 sm:h-2`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frontend */}
                <div className="rounded-xl border border-blue-500/20 bg-slate-800/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50 sm:p-5">
                  <div className="mb-3 flex items-center sm:mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 sm:h-10 sm:w-10">
                      <span className="text-sm text-white sm:text-lg">⚛️</span>
                    </div>
                    <h3 className="ml-2 text-base font-semibold text-white sm:ml-3 sm:text-lg">
                      Web Development
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { name: 'HTML & CSS', level: 90, color: 'from-blue-500 to-cyan-500' },
                      { name: 'JavaScript', level: 85, color: 'from-blue-500 to-cyan-500' },
                      { name: 'React/Next.js', level: 75, color: 'from-blue-500 to-cyan-500' },
                      { name: 'Responsive Design', level: 90, color: 'from-blue-500 to-cyan-500' },
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="mb-1 flex justify-between text-xs sm:text-sm">
                          <span className="truncate pr-2 text-gray-300">{skill.name}</span>
                          <span className="flex-shrink-0 text-blue-300">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-700/50 sm:h-2">
                          <div
                            className={`bg-gradient-to-r ${skill.color} h-1.5 rounded-full transition-all duration-300 sm:h-2`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div className="rounded-xl border border-green-500/20 bg-slate-800/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-green-400/50 sm:p-5">
                  <div className="mb-3 flex items-center sm:mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-teal-500 sm:h-10 sm:w-10">
                      <span className="text-sm text-white sm:text-lg">🛠️</span>
                    </div>
                    <h3 className="ml-2 text-base font-semibold text-white sm:ml-3 sm:text-lg">
                      Backend
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { name: 'Node.js', level: 85, color: 'from-green-500 to-teal-500' },
                      { name: 'Python', level: 80, color: 'from-green-500 to-teal-500' },
                      { name: 'PostgreSQL', level: 75, color: 'from-green-500 to-teal-500' },
                      { name: 'MongoDB', level: 70, color: 'from-green-500 to-teal-500' },
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="mb-1 flex justify-between text-xs sm:text-sm">
                          <span className="truncate pr-2 text-gray-300">{skill.name}</span>
                          <span className="flex-shrink-0 text-green-300">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-700/50 sm:h-2">
                          <div
                            className={`bg-gradient-to-r ${skill.color} h-1.5 rounded-full transition-all duration-300 sm:h-2`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Cloud */}
                <div className="rounded-xl border border-purple-500/20 bg-slate-800/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 sm:p-5">
                  <div className="mb-3 flex items-center sm:mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 sm:h-10 sm:w-10">
                      <span className="text-sm text-white sm:text-lg">☁️</span>
                    </div>
                    <h3 className="ml-2 text-base font-semibold text-white sm:ml-3 sm:text-lg">
                      Tools & Platforms
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { name: 'VS Code, IntelliJ', level: 90, color: 'from-green-500 to-teal-500' },
                      { name: 'Git & GitHub', level: 85, color: 'from-green-500 to-teal-500' },
                      { name: 'TradingView/MT5', level: 90, color: 'from-green-500 to-teal-500' },
                      { name: 'Jupyter Notebook', level: 80, color: 'from-green-500 to-teal-500' },
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="mb-1 flex justify-between text-xs sm:text-sm">
                          <span className="truncate pr-2 text-gray-300">{skill.name}</span>
                          <span className="flex-shrink-0 text-green-300">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-700/50 sm:h-2">
                          <div
                            className={`bg-gradient-to-r ${skill.color} h-1.5 rounded-full transition-all duration-300 sm:h-2`}
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
        <section id="experience" className="relative bg-slate-800/50 py-12 backdrop-blur-sm">
          {/* Space Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20"></div>
            <div className="absolute right-10 bottom-10 h-16 w-16 animate-bounce rounded-full bg-gradient-to-br from-green-400/20 to-teal-400/20"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                🚀{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
              <p className="text-lg text-gray-300">Professional journey through the tech cosmos</p>
            </div>

            <div className="mx-auto max-w-4xl">
              {/* Experience Timeline */}
              <div className="space-y-6">
                {/* CodSoft Internship */}
                <div className="group relative rounded-xl border border-orange-500/20 bg-slate-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/50 hover:bg-slate-800/50">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-orange-500/30 bg-white/90 p-2 backdrop-blur-sm">
                        <img
                          src="https://yt3.googleusercontent.com/dW6to_x5Crmzgsc-70UYnEOqcQNdZltjZLolmkEb9dp8-ocvbR9B8m45_bUesKPGp9g3dz_M=s900-c-k-c0x00ffffff-no-rj"
                          alt="CodSoft"
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-orange-300">
                          Java & Web Development Intern
                        </h3>
                        <p className="text-sm font-medium text-orange-300">CodSoft</p>
                        <p className="mt-1 text-sm text-gray-400">Ongoing • Remote</p>
                        <p className="mt-2 text-sm text-gray-300">
                          Developing Java applications and web development projects, focusing on OOP
                          principles and modern development practices.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-1 text-xs text-orange-300">
                        Java
                      </span>
                      <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                        Web Dev
                      </span>
                      <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs text-green-300">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tata Group Virtual Internship */}
                <div className="group relative rounded-xl border border-blue-500/20 bg-slate-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50 hover:bg-slate-800/50">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-white/90 p-2 backdrop-blur-sm">
                        <img
                          src="https://logos-world.net/wp-content/uploads/2020/09/Tata-Logo.png"
                          alt="Tata Group"
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
                          Virtual Internship
                        </h3>
                        <p className="text-sm font-medium text-blue-300">Tata Group (Forage)</p>
                        <p className="mt-1 text-sm text-gray-400">2025 • Virtual</p>
                        <p className="mt-2 text-sm text-gray-300">
                          Completed virtual work experience program focusing on business strategy,
                          data analysis, and corporate operations.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                        Strategy
                      </span>
                      <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                        Analysis
                      </span>
                      <span className="rounded-full border border-gray-500/30 bg-gray-500/20 px-2 py-1 text-xs text-gray-300">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accenture Virtual Internship */}
                <div className="group relative rounded-xl border border-purple-500/20 bg-slate-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 hover:bg-slate-800/50">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-purple-500/30 bg-white/90 p-2 backdrop-blur-sm">
                        <img
                          src="https://logos-world.net/wp-content/uploads/2021/02/Accenture-Logo.png"
                          alt="Accenture"
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
                          Developer Program Virtual Internship
                        </h3>
                        <p className="text-sm font-medium text-purple-300">Accenture (Forage)</p>
                        <p className="mt-1 text-sm text-gray-400">2025 • Virtual</p>
                        <p className="mt-2 text-sm text-gray-300">
                          Participated in developer-focused virtual experience covering software
                          development lifecycle and modern development practices.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                        Development
                      </span>
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
                        SDLC
                      </span>
                      <span className="rounded-full border border-gray-500/30 bg-gray-500/20 px-2 py-1 text-xs text-gray-300">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Space Theme */}
        <section id="projects" className="relative bg-slate-900/30 py-12 backdrop-blur-sm">
          {/* Space Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-green-400/20 to-teal-400/20"></div>
            <div className="absolute bottom-10 left-10 h-16 w-16 animate-bounce rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                🛸{' '}
                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-lg text-gray-300">
                Stellar applications from across the development galaxy
              </p>
            </div>

            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Advanced PA Signals Project */}
                <div className="group relative rounded-xl border border-green-500/20 bg-slate-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-green-400/50 hover:bg-slate-800/50">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-green-500/30 bg-green-500/20 backdrop-blur-sm">
                      <span className="text-xl text-green-300">📊</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="rounded-lg bg-slate-700/50 p-2 transition-colors hover:bg-green-500/20">
                        <svg
                          className="h-4 w-4 text-gray-400 hover:text-green-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button className="rounded-lg bg-slate-700/50 p-2 transition-colors hover:bg-blue-500/20">
                        <svg
                          className="h-4 w-4 text-gray-400 hover:text-blue-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-green-300">
                    Advanced PA Signals
                  </h3>
                  <p className="mb-4 text-sm text-gray-300">
                    A robust Pine Script-based TradingView indicator that fuses Price Action
                    Patterns, EMA Trend Filters, Support/Resistance Zones, and ATR-Based Dynamic
                    Stop Loss for smart trading automation.
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs text-green-300">
                      Pine Script
                    </span>
                    <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                      TradingView
                    </span>
                    <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                      Technical Analysis
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
                      Production Ready
                    </span>
                  </div>
                </div>

                {/* Student Success Predictor */}
                <div className="group relative rounded-xl border border-purple-500/20 bg-slate-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 hover:bg-slate-800/50">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/20 backdrop-blur-sm">
                      <span className="text-xl text-purple-300">🧠</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="rounded-lg bg-slate-700/50 p-2 transition-colors hover:bg-purple-500/20">
                        <svg
                          className="h-4 w-4 text-gray-400 hover:text-purple-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
                    Student Success Predictor
                  </h3>
                  <p className="mb-4 text-sm text-gray-300">
                    Machine learning model that forecasts student outcomes using logistic regression
                    and decision trees, emphasizing feature engineering and model evaluation for
                    educational insights.
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                      Python
                    </span>
                    <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                      Scikit-learn
                    </span>
                    <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs text-green-300">
                      ML
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-blue-400"></span>
                      Academic Project
                    </span>
                  </div>
                </div>

                {/* Portfolio Website */}
                <div className="group relative rounded-xl border border-blue-500/20 bg-slate-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50 hover:bg-slate-800/50">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/20 backdrop-blur-sm">
                      <span className="text-xl text-blue-300">🌐</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="rounded-lg bg-slate-700/50 p-2 transition-colors hover:bg-blue-500/20">
                        <svg
                          className="h-4 w-4 text-gray-400 hover:text-blue-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button className="rounded-lg bg-slate-700/50 p-2 transition-colors hover:bg-green-500/20">
                        <svg
                          className="h-4 w-4 text-gray-400 hover:text-green-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
                    Portfolio Website
                  </h3>
                  <p className="mb-4 text-sm text-gray-300">
                    Modern, responsive portfolio website built with Next.js and TypeScript,
                    featuring a sleek 3D neural-inspired design that reflects minimalist design
                    preferences and modern interfaces.
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                      Next.js
                    </span>
                    <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                      TypeScript
                    </span>
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
                      Tailwind CSS
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
                      Live & Deployed
                    </span>
                  </div>
                </div>

                {/* Java Expense Tracker */}
                <div className="group relative rounded-xl border border-orange-500/20 bg-slate-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/50 hover:bg-slate-800/50">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/20 backdrop-blur-sm">
                      <span className="text-xl text-orange-300">☕</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="rounded-lg bg-slate-700/50 p-2 transition-colors hover:bg-orange-500/20">
                        <svg
                          className="h-4 w-4 text-gray-400 hover:text-orange-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-orange-300">
                    Java Expense Tracker
                  </h3>
                  <p className="mb-4 text-sm text-gray-300">
                    Simple yet effective Java console application that records and visualizes
                    monthly expenses. Helped strengthen understanding of OOP principles and file
                    handling in Java.
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-1 text-xs text-orange-300">
                      Java
                    </span>
                    <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                      OOP
                    </span>
                    <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs text-green-300">
                      Console App
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-yellow-400"></span>
                      Learning Project
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section - Neural Network Theme */}
        <section
          id="certifications"
          className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-8 sm:py-10 lg:py-12"
        >
          {/* Neural Network Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Neural Network Nodes */}
            <div className="absolute top-16 left-12 h-4 w-4 animate-pulse rounded-full bg-blue-400 opacity-70"></div>
            <div className="absolute top-32 left-32 h-3 w-3 rounded-full bg-cyan-400 opacity-60"></div>
            <div className="absolute top-48 left-20 h-5 w-5 animate-pulse rounded-full bg-purple-400 opacity-80"></div>
            <div className="absolute top-64 left-48 h-2 w-2 rounded-full bg-violet-400 opacity-50"></div>
            <div className="absolute top-80 left-16 h-3 w-3 animate-pulse rounded-full bg-blue-300 opacity-60"></div>

            <div className="absolute top-20 right-16 h-4 w-4 rounded-full bg-cyan-400 opacity-70"></div>
            <div className="absolute top-40 right-32 h-3 w-3 animate-pulse rounded-full bg-purple-400 opacity-60"></div>
            <div className="absolute top-56 right-20 h-5 w-5 rounded-full bg-blue-400 opacity-80"></div>
            <div className="absolute top-72 right-40 h-2 w-2 animate-pulse rounded-full bg-violet-300 opacity-50"></div>

            <div className="absolute bottom-32 left-20 h-4 w-4 rounded-full bg-purple-400 opacity-70"></div>
            <div className="absolute bottom-48 left-44 h-3 w-3 animate-pulse rounded-full bg-cyan-400 opacity-60"></div>
            <div className="absolute bottom-64 left-28 h-2 w-2 rounded-full bg-blue-300 opacity-50"></div>
            <div className="absolute right-24 bottom-32 h-4 w-4 animate-pulse rounded-full bg-violet-400 opacity-70"></div>
            <div className="absolute right-48 bottom-48 h-3 w-3 rounded-full bg-blue-400 opacity-60"></div>

            {/* Neural Network Connections */}
            <svg
              className="absolute inset-0 h-full w-full opacity-25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="neuralFlow1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="neuralFlow2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>

              {/* Horizontal connections */}
              <path
                d="M96,128 Q200,100 320,160 T560,140"
                stroke="url(#neuralFlow1)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="4s"
                  repeatCount="indefinite"
                  values="0,200;100,100;200,0;0,200"
                />
              </path>
              <path
                d="M128,320 Q300,280 480,340 T720,320"
                stroke="url(#neuralFlow2)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.5"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="5s"
                  repeatCount="indefinite"
                  values="0,200;100,100;200,0;0,200"
                />
              </path>

              {/* Vertical connections */}
              <path
                d="M200,80 Q180,200 220,320 T240,480"
                stroke="url(#neuralFlow1)"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="6s"
                  repeatCount="indefinite"
                  values="0,150;75,75;150,0;0,150"
                />
              </path>
              <path
                d="M600,100 Q580,220 620,340 T640,500"
                stroke="url(#neuralFlow2)"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="7s"
                  repeatCount="indefinite"
                  values="0,150;75,75;150,0;0,150"
                />
              </path>

              {/* Diagonal connections */}
              <path
                d="M80,200 Q300,150 520,250 T800,200"
                stroke="url(#neuralFlow1)"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="8s"
                  repeatCount="indefinite"
                  values="0,300;150,150;300,0;0,300"
                />
              </path>
            </svg>

            {/* Data Flow Particles */}
            <div className="absolute top-1/4 left-1/4 h-1 w-1 animate-ping rounded-full bg-cyan-300"></div>
            <div
              className="absolute top-1/3 right-1/3 h-1 w-1 animate-ping rounded-full bg-purple-300"
              style={{ animationDelay: '1.5s' }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/3 h-1 w-1 animate-ping rounded-full bg-blue-300"
              style={{ animationDelay: '3s' }}
            ></div>
            <div
              className="absolute right-1/4 bottom-1/4 h-1 w-1 animate-ping rounded-full bg-violet-300"
              style={{ animationDelay: '0.8s' }}
            ></div>
            <div
              className="absolute top-2/3 left-1/2 h-1 w-1 animate-ping rounded-full bg-cyan-300"
              style={{ animationDelay: '2.2s' }}
            ></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 text-center sm:mb-8">
              {/* Neural Network Brain Icon */}
              <div className="mb-4 sm:mb-6">
                <div className="relative mx-auto mb-3 h-12 w-12 sm:h-16 sm:w-16">
                  <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 p-1">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-900">
                      <svg
                        className="h-6 w-6 text-cyan-400 sm:h-8 sm:w-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11S11 10.1 11 9V7.5L5 7V9C5 10.1 4.1 11 3 11S1 10.1 1 9V7C1 5.9 1.9 5 3 5H21C22.1 5 23 5.9 23 7V9C23 10.1 22.1 11 21 11S19 10.1 19 9ZM12 13C13.1 13 14 13.9 14 15S13.1 17 12 17S10 16.1 10 15S10.9 13 12 13ZM18 13C19.1 13 20 13.9 20 15S19.1 17 18 17S16 16.1 16 15S16.9 13 18 13ZM6 13C7.1 13 8 13.9 8 15S7.1 17 6 17S4 16.1 4 15S4.9 13 6 13ZM12 18C13.1 18 14 18.9 14 20S13.1 22 12 22S10 21.1 10 20S10.9 18 12 18Z" />
                      </svg>
                      <div className="absolute inset-0 animate-ping rounded-full border border-cyan-400/30"></div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 h-2 w-2 animate-bounce rounded-full bg-cyan-400"></div>
                  <div className="absolute -bottom-1 -left-1 h-1.5 w-1.5 animate-ping rounded-full bg-purple-400"></div>
                </div>
              </div>

              <h2 className="mb-3 px-2 text-2xl font-bold text-white sm:mb-4 sm:text-3xl lg:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  My Certifications
                </span>
              </h2>
              <h3 className="mb-3 px-2 text-lg font-semibold text-gray-200 sm:text-xl">
                Proof of Passion for AI & ML
              </h3>
              <p className="mx-auto mb-4 max-w-2xl px-4 text-sm text-gray-300 sm:mb-6 sm:text-base">
                Each certificate represents a step forward in my journey through data, models, and
                innovation.
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 sm:text-sm">
                <span>{currentCertification + 1}</span>
                <span>/</span>
                <span>{certifications.length}</span>
                <span className="ml-2">•</span>
                <span className="ml-2">Use arrows to navigate</span>
              </div>
            </div>

            {/* Certification Carousel */}
            <div className="relative mx-auto max-w-4xl">
              {/* Main Certification Card */}
              <div className="relative overflow-hidden">
                <div
                  className="carousel-container carousel-slide flex"
                  style={{ transform: `translate3d(-${currentCertification * 100}%, 0, 0)` }}
                >
                  {certifications.map(cert => (
                    <div key={cert.id} className="w-full flex-shrink-0 px-2">
                      <div
                        className={`group smooth-transition hover-scale relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-800/40 to-slate-900/60 p-4 backdrop-blur-sm hover:border-cyan-400/40 hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-900/80 sm:p-6`}
                      >
                        {/* Neural Network Card Background */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-4 left-4 h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
                          <div className="absolute top-8 right-8 h-1 w-1 animate-ping rounded-full bg-purple-400"></div>
                          <div className="absolute bottom-6 left-8 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></div>
                          <div className="absolute right-4 bottom-4 h-1 w-1 animate-ping rounded-full bg-violet-400"></div>
                          <svg
                            className="absolute inset-0 h-full w-full"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M32,32 Q80,20 128,40 T224,32"
                              stroke="#06b6d4"
                              strokeWidth="0.5"
                              fill="none"
                              opacity="0.3"
                            >
                              <animate
                                attributeName="stroke-dasharray"
                                dur="6s"
                                repeatCount="indefinite"
                                values="0,100;50,50;100,0;0,100"
                              />
                            </path>
                          </svg>
                        </div>

                        <div className="relative z-10">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 flex-1 items-center space-x-3">
                              {/* Neural Network Company Logo */}
                              <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-white/95 to-gray-100/95 p-2 backdrop-blur-sm transition-colors group-hover:border-cyan-400/60 sm:h-14 sm:w-14 sm:p-3">
                                <img
                                  src={cert.logo}
                                  alt={cert.company}
                                  className="h-6 w-auto object-contain sm:h-8"
                                />
                                <div className="absolute inset-0 rounded-xl bg-cyan-400/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                              </div>

                              <div className="min-w-0 flex-1">
                                <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-xl">
                                  {cert.title}
                                </h3>
                                <p className="mb-1 flex items-center text-sm font-semibold text-cyan-400 sm:text-base">
                                  <svg
                                    className="mr-1 h-3 w-3"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                                  </svg>
                                  {cert.company}
                                </p>
                                <p className="flex items-center text-xs leading-relaxed text-gray-300 sm:text-sm">
                                  <svg
                                    className="mr-1 h-3 w-3 text-purple-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  {cert.description} • {cert.date}
                                </p>
                              </div>
                            </div>

                            {/* Neural Network View Button */}
                            <button
                              onClick={() => window.open(cert.link, '_blank')}
                              className="fast-transition hover-scale group/btn w-full flex-shrink-0 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 px-4 py-2 font-medium text-white shadow-lg hover:from-cyan-700 hover:to-purple-700 hover:shadow-cyan-500/25 sm:w-auto"
                            >
                              <span className="flex items-center justify-center text-sm">
                                <svg
                                  className="mr-1 h-4 w-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" />
                                </svg>
                                View Credential
                                <svg
                                  className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neural Network Navigation Controls */}
              <div className="mt-6 flex items-center justify-between sm:mt-8">
                {/* Previous Button - Neural Style */}
                <button
                  onClick={prevCertification}
                  className="group fast-transition hover-scale relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-cyan-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm hover:border-cyan-400/60 hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-purple-500/20 sm:h-12 sm:w-12"
                  aria-label="Previous certification"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <svg
                    className="relative z-10 h-5 w-5 text-gray-400 transition-colors group-hover:text-cyan-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div className="absolute top-1 right-1 h-1 w-1 animate-ping rounded-full bg-cyan-400 opacity-60"></div>
                </button>

                {/* Neural Dots Indicator */}
                <div className="flex space-x-2 sm:space-x-3">
                  {certifications.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCertification(index)}
                      className={`fast-transition relative h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 ${
                        index === currentCertification
                          ? 'scale-125 bg-gradient-to-r from-cyan-400 to-purple-400 shadow-lg shadow-cyan-400/50'
                          : 'bg-gray-600 hover:scale-110 hover:bg-gradient-to-r hover:from-cyan-500/50 hover:to-purple-500/50'
                      }`}
                      aria-label={`Go to certification ${index + 1}`}
                    >
                      {index === currentCertification && (
                        <div className="absolute inset-0 animate-ping rounded-full border border-cyan-400/50"></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Next Button - Neural Style */}
                <button
                  onClick={nextCertification}
                  className="group fast-transition hover-scale relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-cyan-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm hover:border-cyan-400/60 hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-purple-500/20 sm:h-12 sm:w-12"
                  aria-label="Next certification"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <svg
                    className="relative z-10 h-5 w-5 text-gray-400 transition-colors group-hover:text-cyan-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <div className="absolute top-1 left-1 h-1 w-1 animate-ping rounded-full bg-purple-400 opacity-60"></div>
                </button>
              </div>

              {/* Neural Network Navigation Indicator */}
              <div className="mt-4 text-center sm:mt-6">
                <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-gradient-to-r from-slate-800/50 to-slate-900/50 px-3 py-1.5 backdrop-blur-sm">
                  <div className="mr-2 flex items-center space-x-1.5">
                    <div className="h-1 w-1 animate-pulse rounded-full bg-cyan-400"></div>
                    <div
                      className="h-1 w-1 animate-ping rounded-full bg-purple-400"
                      style={{ animationDelay: '0.5s' }}
                    ></div>
                    <div
                      className="h-1 w-1 animate-pulse rounded-full bg-blue-400"
                      style={{ animationDelay: '1s' }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400">Neural learning • Navigate with arrows</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Quantum Physics Theme */}
        <section
          id="contact"
          className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 sm:py-12"
        >
          {/* Quantum Particles Background - Optimized */}
          <div className="absolute inset-0">
            <div className="absolute top-6 left-4 h-1.5 w-1.5 rounded-full bg-cyan-400/60 sm:top-10 sm:left-10 sm:h-2 sm:w-2"></div>
            <div className="absolute top-12 right-8 h-1 w-1 rounded-full bg-pink-400/60 sm:top-20 sm:right-20"></div>
            <div className="absolute bottom-12 left-8 h-2 w-2 rounded-full bg-blue-400/60 sm:bottom-20 sm:left-20 sm:h-3 sm:w-3"></div>
            <div className="absolute right-4 bottom-6 h-1 w-1 rounded-full bg-purple-400/60 sm:right-10 sm:bottom-10"></div>
            <div className="absolute top-1/2 left-1/4 h-1.5 w-1.5 rounded-full bg-green-400/60 sm:h-2 sm:w-2"></div>
            <div className="absolute top-1/3 right-1/3 h-1 w-1 rounded-full bg-yellow-400/60"></div>
          </div>

          {/* Quantum Wave Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="h-full w-full"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,500 Q250,300 500,500 T1000,500"
                stroke="url(#quantumGradient)"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              >
                <animate
                  attributeName="d"
                  dur="8s"
                  repeatCount="indefinite"
                  values="M0,500 Q250,300 500,500 T1000,500;M0,500 Q250,700 500,500 T1000,500;M0,500 Q250,300 500,500 T1000,500"
                />
              </path>
              <defs>
                <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="mb-3 px-2 text-2xl font-bold text-white sm:mb-4 sm:text-3xl lg:text-4xl">
                ⚛️{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Quantum Communication Portal
                </span>
              </h2>
              <p className="mb-6 px-4 text-base text-gray-200 sm:mb-8 sm:text-lg">
                Establish quantum entanglement through digital channels
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
              {/* Contact Info - Quantum Theme */}
              <div>
                <h3 className="mb-4 flex items-center text-xl font-bold text-white sm:mb-6 sm:text-2xl">
                  <span className="mr-2 sm:mr-3">🌌</span>
                  Quantum Communication Channels
                </h3>
                <p className="mb-6 text-sm text-gray-200 sm:mb-8 sm:text-base">
                  Initiate quantum entanglement protocols to establish secure communication pathways
                  across the digital multiverse.
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <div className="group flex items-center">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                      <svg
                        className="h-5 w-5 text-white sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 min-w-0 flex-1 sm:ml-4">
                      <p className="text-sm font-medium text-white sm:text-base">
                        📧 Quantum Email
                      </p>
                      <p className="text-xs break-all text-gray-300 sm:text-sm">
                        saransci2006@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-110">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-white">📱 Quantum Phone</p>
                      <p className="text-gray-300">+91 6382957740</p>
                    </div>
                  </div>

                  <div className="group flex items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-500 transition-transform duration-300 group-hover:scale-110">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-white">🌍 Quantum Location</p>
                      <p className="text-gray-300">India</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Quantum Network */}
                <div className="mt-8 sm:mt-12">
                  <h4 className="mb-4 flex items-center text-base font-semibold text-white sm:mb-6 sm:text-lg">
                    <span className="mr-2">🔗</span>
                    Quantum Social Network
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    {/* GitHub */}
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group backdrop-blur-light fast-transition hover-scale relative flex flex-col items-center rounded-xl border border-purple-500/20 bg-gray-800/30 p-3 hover:border-purple-400/60 hover:bg-purple-500/10 sm:p-4 lg:p-6"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-900 transition-all duration-300 group-hover:from-purple-600 group-hover:to-purple-800 sm:mb-3 sm:h-10 sm:w-10 lg:h-12 lg:w-12">
                          <svg
                            className="h-4 w-4 text-white sm:h-5 sm:w-5 lg:h-7 lg:w-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-300 transition-colors group-hover:text-purple-300 sm:text-sm">
                          GitHub
                        </span>
                      </div>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group backdrop-blur-light fast-transition hover-scale relative flex flex-col items-center rounded-xl border border-purple-500/20 bg-gray-800/30 p-6 hover:border-blue-400/60 hover:bg-blue-500/10"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 transition-all duration-300 group-hover:from-blue-500 group-hover:to-blue-700">
                          <svg
                            className="h-7 w-7 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-blue-300">
                          LinkedIn
                        </span>
                      </div>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex transform flex-col items-center rounded-xl border border-purple-500/20 bg-gray-800/30 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-pink-400/60 hover:bg-pink-500/10"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 transition-all duration-300 group-hover:from-pink-400 group-hover:to-purple-500">
                          <svg
                            className="h-7 w-7 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-pink-300">
                          Instagram
                        </span>
                      </div>
                    </a>

                    {/* Twitter/X */}
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex transform flex-col items-center rounded-xl border border-purple-500/20 bg-gray-800/30 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400/60 hover:bg-cyan-500/10"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 transition-all duration-300 group-hover:from-cyan-400 group-hover:to-blue-500">
                          <svg
                            className="h-7 w-7 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-cyan-300">
                          Twitter
                        </span>
                      </div>
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex transform flex-col items-center rounded-xl border border-purple-500/20 bg-gray-800/30 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-red-400/60 hover:bg-red-500/10"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-800 transition-all duration-300 group-hover:from-red-500 group-hover:to-red-700">
                          <svg
                            className="h-7 w-7 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-red-300">
                          YouTube
                        </span>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:saransci2006@gmail.com"
                      className="group relative flex transform flex-col items-center rounded-xl border border-purple-500/20 bg-gray-800/30 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-green-400/60 hover:bg-green-500/10"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-teal-700 transition-all duration-300 group-hover:from-green-500 group-hover:to-teal-600">
                          <svg
                            className="h-7 w-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-green-300">
                          Email
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quantum Contact Form */}
              <div className="relative overflow-hidden rounded-xl border border-purple-500/30 bg-gray-900/50 p-4 backdrop-blur-sm sm:p-6 lg:p-8">
                {/* Quantum Form Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5"></div>
                <div className="relative z-10">
                  <h3 className="mb-4 flex items-center text-lg font-bold text-white sm:mb-6 sm:text-xl">
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
        <footer className="relative overflow-hidden border-t border-purple-500/30 bg-slate-900">
          {/* Space Background Elements - Optimized */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 h-24 w-24 rounded-full bg-gradient-to-br from-purple-400/5 to-blue-400/5 opacity-50"></div>
            <div className="absolute right-10 bottom-10 h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/3 to-purple-400/3 opacity-30"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-3">
              {/* Brand Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 sm:h-12 sm:w-12">
                    <svg
                      className="h-5 w-5 text-white sm:h-6 sm:w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <h3 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                    Saran
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                  🚀 Space Technology Developer exploring the infinite possibilities of code.
                  Building stellar applications that reach for the stars and beyond.
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group fast-transition flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/30 bg-slate-800 hover:border-purple-400 hover:bg-purple-500/20 sm:h-10 sm:w-10"
                  >
                    <svg
                      className="h-4 w-4 text-gray-400 transition-colors group-hover:text-purple-300 sm:h-5 sm:w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group fast-transition flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/30 bg-slate-800 hover:border-blue-400 hover:bg-blue-500/20"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:saransci2006@gmail.com"
                    className="group fast-transition flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/30 bg-slate-800 hover:border-cyan-400 hover:bg-cyan-500/20"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400 transition-colors group-hover:text-cyan-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <h3 className="mb-6 flex items-center text-lg font-semibold text-white">
                  <span className="mr-2">🛸</span>
                  Mission Control
                </h3>
                <ul className="space-y-3">
                  {[
                    'Home',
                    'About',
                    'Skills',
                    'Experience',
                    'Projects',
                    'Certifications',
                    'Contact',
                  ].map(item => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-purple-300"
                      >
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500/50 transition-colors group-hover:bg-purple-400"></span>
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="mb-4 flex items-center text-base font-semibold text-white sm:mb-6 sm:text-lg">
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
                    { name: 'Trading', icon: '📈' },
                  ].map(tech => (
                    <div
                      key={tech.name}
                      className="group fast-transition flex items-center rounded-lg border border-purple-500/20 bg-slate-800/50 px-2 py-1.5 hover:border-purple-400/50 hover:bg-purple-500/10 sm:px-3 sm:py-2"
                    >
                      <span className="mr-1.5 text-xs sm:mr-2 sm:text-sm">{tech.icon}</span>
                      <span className="text-xs text-gray-300 transition-colors group-hover:text-purple-300 sm:text-sm">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 border-t border-purple-500/30 pt-6 sm:mt-12 sm:pt-8">
              <div className="flex flex-col items-center justify-between space-y-3 sm:space-y-4 md:flex-row md:space-y-0">
                <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <p className="text-center text-xs text-gray-400 sm:text-left sm:text-sm">
                    © 2024 Saran. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 sm:h-2 sm:w-2"></div>
                    <span className="text-xs text-green-400">System Online</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-400 sm:space-x-4 sm:text-sm">
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
