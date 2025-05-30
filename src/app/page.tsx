'use client';

import { useState, useEffect } from "react";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mwpognoa', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        // Reset status after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* Navigation Header - Space Theme */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Space Theme */}
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 mr-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <button
                onClick={() => scrollToSection('home')}
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-300"
              >
                Saran
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
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
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-md border-t border-purple-500/30">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                      activeSection === item.toLowerCase()
                        ? 'text-purple-400'
                        : 'text-gray-300 hover:text-purple-400'
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
      <section id="home" className="relative pt-16 min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 animate-ping"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">S</span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-4">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Saran</span>
            </h1>
            <p className="max-w-md mx-auto text-xl text-gray-300 sm:text-2xl md:max-w-3xl mb-3">
              🚀 Space Technology Developer
            </p>
            <p className="max-w-2xl mx-auto text-base text-gray-400 sm:text-lg mb-6">
              Building stellar applications that reach for the stars and beyond
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                🛸 View My Work
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center px-6 py-3 border border-purple-500/30 text-white bg-slate-800/50 backdrop-blur-sm font-medium rounded-lg hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
              >
                ⚛️ Get In Touch
              </button>
            </div>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group p-3 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg text-gray-400 hover:text-purple-300 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-110">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group p-3 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg text-gray-400 hover:text-blue-300 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-110">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:saransci2006@gmail.com" className="group p-3 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg text-gray-400 hover:text-green-300 hover:border-green-400/50 transition-all duration-300 transform hover:scale-110">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Space Theme */}
      <section id="about" className="relative py-12 bg-slate-800/50 backdrop-blur-sm">
        {/* Space Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              🌌 <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">About Me</span>
            </h2>
            <p className="text-lg text-gray-300">
              Exploring the infinite possibilities of code
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">S</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Space Technology Developer</h3>
                <p className="text-gray-400 text-sm">Building the future, one line of code at a time</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🚀</span>
                  Mission Statement
                </h3>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>
                    I&apos;m a dedicated software engineer passionate about building scalable web applications
                    and solving complex technical challenges. My journey in technology started with curiosity
                    about how digital systems work, leading me to develop expertise in modern web technologies.
                  </p>
                  <p>
                    Specializing in React, Next.js, Node.js, and cloud technologies, I focus on creating
                    user-centric applications that deliver exceptional experiences while maintaining clean,
                    maintainable code and following industry best practices.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-slate-700/30 backdrop-blur-sm border border-purple-500/20 rounded-lg">
                    <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">5+</div>
                    <div className="text-xs text-gray-400">Certifications</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 backdrop-blur-sm border border-blue-500/20 rounded-lg">
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">10+</div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg">
                    <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">4</div>
                    <div className="text-xs text-gray-400">Tech Areas</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 backdrop-blur-sm border border-purple-500/20 rounded-lg">
                    <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">2024</div>
                    <div className="text-xs text-gray-400">Active Year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Space Theme */}
      <section id="skills" className="relative py-12 bg-slate-900/30 backdrop-blur-sm">
        {/* Space Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              ⚡ <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Skills & Technologies</span>
            </h2>
            <p className="text-lg text-gray-300">
              Tech arsenal for building stellar applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-5 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">⚛️</span>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-white">Frontend</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'React/Next.js', level: 90, color: 'from-blue-500 to-cyan-500' },
                  { name: 'TypeScript', level: 85, color: 'from-blue-500 to-cyan-500' },
                  { name: 'Tailwind CSS', level: 95, color: 'from-blue-500 to-cyan-500' },
                  { name: 'JavaScript (ES6+)', level: 90, color: 'from-blue-500 to-cyan-500' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-blue-300">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-5 hover:border-green-400/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🛠️</span>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-white">Backend</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Node.js', level: 85, color: 'from-green-500 to-teal-500' },
                  { name: 'Python', level: 80, color: 'from-green-500 to-teal-500' },
                  { name: 'PostgreSQL', level: 75, color: 'from-green-500 to-teal-500' },
                  { name: 'MongoDB', level: 70, color: 'from-green-500 to-teal-500' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-green-300">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Cloud */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 hover:border-purple-400/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">☁️</span>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-white">Tools & Cloud</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Git/GitHub', level: 90, color: 'from-purple-500 to-pink-500' },
                  { name: 'AWS/Vercel', level: 75, color: 'from-purple-500 to-pink-500' },
                  { name: 'Docker', level: 70, color: 'from-purple-500 to-pink-500' },
                  { name: 'CI/CD', level: 65, color: 'from-purple-500 to-pink-500' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-purple-300">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🛰️</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Mission Control: Experience Loading...
              </h3>
              <p className="text-gray-300 mb-6 text-sm">
                Professional experience data is currently being compiled from various space missions
                and will be deployed to the main timeline soon.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                  🔄 Status: Compiling
                </span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">
                  ⏱️ ETA: Coming Soon
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                  🎯 Focus: Building Portfolio
                </span>
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

          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl">🔬</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Project Repository Compiling...
              </h3>
              <p className="text-gray-300 mb-8 text-sm max-w-lg mx-auto">
                Development environment is being configured. Project builds and deployments will be
                available once the codebase reaches production-ready state.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/30 backdrop-blur-sm border border-orange-500/20 rounded-lg p-4">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mx-auto mb-3 animate-pulse"></div>
                  <h4 className="font-semibold text-white mb-2 text-sm">🔧 Build Pipeline</h4>
                  <p className="text-gray-400 text-xs">Configuring CI/CD workflows</p>
                  <p className="text-orange-300 text-xs mt-1">Status: Initializing</p>
                </div>
                <div className="bg-slate-700/30 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mx-auto mb-3 animate-pulse"></div>
                  <h4 className="font-semibold text-white mb-2 text-sm">📦 Code Repository</h4>
                  <p className="text-gray-400 text-xs">Setting up version control</p>
                  <p className="text-blue-300 text-xs mt-1">Status: Preparing</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <span className="inline-flex items-center px-3 py-1 bg-slate-700/30 text-gray-300 text-xs rounded-full border border-green-500/20">
                  <svg className="w-3 h-3 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Deployment Queue: Pending
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">
                  🎯 Focus: Portfolio Development
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section - Space Theme */}
      <section id="certifications" className="relative py-12 bg-slate-900/50 backdrop-blur-sm">
        {/* Space Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              🏆 <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Certifications & Achievements</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Stellar credentials from across the tech galaxy
            </p>
          </div>

          {/* Compact Certifications List */}
          <div className="space-y-4">
            {/* Certification 1 - Prompt Engineering */}
            <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 hover:border-purple-400/50 transition-all duration-300 hover:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center p-2 flex-shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="h-6 w-auto filter brightness-0 invert" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">Prompt Engineering</h3>
                    <p className="text-purple-300 text-sm">Infosys</p>
                    <p className="text-gray-400 text-xs mt-1">Advanced AI prompt design and optimization • May 2025</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open('#', '_blank')}
                  className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  <span className="flex items-center">
                    🏆 View
                    <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Certification 2 - Data Analytics */}
            <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 hover:border-blue-400/50 transition-all duration-300 hover:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center p-2 flex-shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="h-5 w-auto filter brightness-0 invert" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">Data Analytics & Visualization</h3>
                    <p className="text-blue-300 text-sm">Accenture North America</p>
                    <p className="text-gray-400 text-xs mt-1">Job simulation in data analysis and visualization • Mar 2025</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open('#', '_blank')}
                  className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="flex items-center">
                    🏆 View
                    <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Certification 3 - Cybersecurity */}
            <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 hover:border-red-400/50 transition-all duration-300 hover:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-red-500/20 flex items-center justify-center p-2 flex-shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Tata_logo.svg" alt="Tata Group" className="h-6 w-auto filter brightness-0 invert" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-300 transition-colors">Cybersecurity Analyst</h3>
                    <p className="text-red-300 text-sm">Tata Group</p>
                    <p className="text-gray-400 text-xs mt-1">Job simulation in cybersecurity analysis and threat management • Mar 2025</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open('#', '_blank')}
                  className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                >
                  <span className="flex items-center">
                    🏆 View
                    <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Certification 4 - Data Visualization */}
            <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 hover:border-green-400/50 transition-all duration-300 hover:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-green-500/20 flex items-center justify-center p-2 flex-shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Tata_logo.svg" alt="Tata Group" className="h-6 w-auto filter brightness-0 invert" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">Data Visualisation</h3>
                    <p className="text-green-300 text-sm">Tata Group</p>
                    <p className="text-gray-400 text-xs mt-1">Empowering business with effective insights job simulation • Mar 2025</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open('#', '_blank')}
                  className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  <span className="flex items-center">
                    🏆 View
                    <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Certification 5 - Acquiring Data */}
            <div className="group relative bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 hover:border-yellow-400/50 transition-all duration-300 hover:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm border border-yellow-500/20 flex items-center justify-center p-2 flex-shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Nasscom_Logo.svg" alt="nasscom" className="h-6 w-auto filter brightness-0 invert" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors">Acquiring Data</h3>
                    <p className="text-yellow-300 text-sm">nasscom</p>
                    <p className="text-gray-400 text-xs mt-1">Data acquisition techniques and methodologies • Jun 2024</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open('#', '_blank')}
                  className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-sm font-medium rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                >
                  <span className="flex items-center">
                    🏆 View
                    <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Company Logos Compact Display */}
          <div className="mt-8 pt-6 border-t border-purple-500/20">
            <p className="text-center text-gray-400 text-sm mb-4">Certified by leading organizations</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="h-6 w-auto filter brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="h-4 w-auto filter brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Tata_logo.svg" alt="Tata Group" className="h-6 w-auto filter brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Nasscom_Logo.svg" alt="nasscom" className="h-6 w-auto filter brightness-0 invert" />
            </div>
          </div>

          {/* Achievement Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">5</div>
              <div className="text-gray-400 text-sm">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">3</div>
              <div className="text-gray-400 text-sm">Job Simulations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">4</div>
              <div className="text-gray-400 text-sm">Tech Areas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">2024-25</div>
              <div className="text-gray-400 text-sm">Active Period</div>
            </div>
          </div>


        </div>
      </section>

      {/* Contact Section - Quantum Physics Theme */}
      <section id="contact" className="relative py-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* Quantum Particles Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              ⚛️ <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Quantum Communication Portal</span>
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Establish quantum entanglement through digital channels
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info - Quantum Theme */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">🌌</span>
                Quantum Communication Channels
              </h3>
              <p className="text-gray-200 mb-8">
                Initiate quantum entanglement protocols to establish secure communication pathways across the digital multiverse.
              </p>

              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-medium">📧 Quantum Email</p>
                    <p className="text-gray-300">saransci2006@gmail.com</p>
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
              <div className="mt-12">
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <span className="mr-2">🔗</span>
                  Quantum Social Network
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {/* GitHub */}
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                     className="group relative flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-md border border-purple-500/20 rounded-xl hover:border-purple-400/60 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-800 transition-all duration-300">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-purple-300 transition-colors">GitHub</span>
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
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 p-8 rounded-xl relative overflow-hidden">
              {/* Quantum Form Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">⚛️</span>
                  Quantum Message Transmitter
                </h3>

                {formStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-400/50 text-green-300 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      ✨ Quantum message successfully transmitted across the digital multiverse!
                    </div>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      ⚠️ Quantum interference detected. Please recalibrate and try again.
                    </div>
                  </div>
                )}

                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="relative">
                    <label htmlFor="name" className="flex items-center text-sm font-medium text-white mb-3">
                      <span className="w-6 h-6 mr-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-xs">🧬</span>
                      Quantum Identity *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-4 bg-gray-800/30 border-2 border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:border-purple-400/40"
                        placeholder="Enter your quantum signature"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="flex items-center text-sm font-medium text-white mb-3">
                      <span className="w-6 h-6 mr-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs">📡</span>
                      Quantum Communication Channel *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-4 bg-gray-800/30 border-2 border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:border-purple-400/40"
                        placeholder="your.quantum@multiverse.com"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="subject" className="flex items-center text-sm font-medium text-white mb-3">
                      <span className="w-6 h-6 mr-2 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-xs">🌌</span>
                      Transmission Subject
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-4 bg-gray-800/30 border-2 border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:border-purple-400/40"
                        placeholder="Quantum collaboration proposal"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="flex items-center text-sm font-medium text-white mb-3">
                      <span className="w-6 h-6 mr-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-xs">💫</span>
                      Quantum Message *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-4 bg-gray-800/30 border-2 border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-md transition-all duration-300 resize-none hover:border-purple-400/40"
                        placeholder="Encode your message for quantum transmission across the digital multiverse..."
                      ></textarea>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Honeypot field for spam protection */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} />

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`group relative w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg text-base font-medium text-white transition-all duration-300 ${
                      formStatus === 'submitting'
                        ? 'bg-purple-400/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 blur rounded-lg transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      {formStatus === 'submitting' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          ⚛️ Transmitting Quantum Data...
                        </>
                      ) : (
                        <>
                          🚀 Initiate Quantum Transmission
                          <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </form>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Saran
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                🚀 Space Technology Developer exploring the infinite possibilities of code.
                Building stellar applications that reach for the stars and beyond.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-full bg-slate-800 border border-purple-500/30 flex items-center justify-center hover:border-purple-400 hover:bg-purple-500/20 transition-all duration-300"
                >
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
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
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="mr-2">⚡</span>
                Tech Arsenal
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'React', icon: '⚛️' },
                  { name: 'Next.js', icon: '🚀' },
                  { name: 'TypeScript', icon: '📘' },
                  { name: 'Node.js', icon: '🟢' },
                  { name: 'Python', icon: '🐍' },
                  { name: 'AWS', icon: '☁️' }
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex items-center px-3 py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <span className="mr-2 text-sm">{tech.icon}</span>
                    <span className="text-gray-300 group-hover:text-purple-300 text-sm transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-purple-500/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-gray-400 text-sm">
                  © 2024 Saran. All rights reserved.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs">System Online</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
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
  );
}