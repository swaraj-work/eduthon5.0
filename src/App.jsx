import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaRocket } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// Asset Preloader
import AssetPreloader from './components/AssetPreloader';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import WhatToExpect from './components/WhatToExpect';
import WhoWillAttend from './components/WhoWillAttend';
import WhyEduthon from './components/WhyEduthon';
import Legacy from './components/Legacy';
import Sponsors from './components/Sponsors';
import JoinMovement from './components/JoinMovement';
import Footer from './components/Footer';

// Pages
import Highlights from './pages/Highlights';
import SponsorshipTiers from './pages/SponsorshipTiers';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AssetPreloader>
        <AppContent />
      </AssetPreloader>
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  // No longer need form state since we're using separate pages
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(false); // Changed to false since AssetPreloader handles loading
  const [pageReady, setPageReady] = useState(true); // Changed to true since AssetPreloader handles loading
  // Always show the back-to-top button now
  const [showBackToTop, setShowBackToTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollToTopButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Removed the loading simulation effect since AssetPreloader handles this now

  // Control back to top button visibility and track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const calculated = totalHeight > 0 ? Math.min(scrollPosition / totalHeight, 1) : 0;

      setScrollProgress(calculated);

      // Add particle trail effect on scroll if we're scrolled down enough
      // and the button reference exists
      if (scrollToTopButtonRef.current && scrollPosition > 500) {
        createParticle();
      }
    };

    // Create particle trail effect (less frequently to improve performance)
    let lastParticleTime = 0;
    const createParticle = () => {
      try {
        const now = Date.now();
        if (now - lastParticleTime < 100) return; // Limit to one particle every 100ms
        lastParticleTime = now;

        if (!scrollToTopButtonRef.current) return;

        const btnRect = scrollToTopButtonRef.current.getBoundingClientRect();
        const particle = document.createElement('div');
        particle.className = 'scroll-particle';

        // Random position around the button
        const randomAngle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 15;
        const x = btnRect.left + btnRect.width / 2 + Math.cos(randomAngle) * distance;
        const y = btnRect.top + btnRect.height / 2 + Math.sin(randomAngle) * distance;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = 0.7 + Math.random() * 0.3;
        particle.style.transform = `scale(${0.5 + Math.random() * 0.5})`;

        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            document.body.removeChild(particle);
          }
        }, 1000);
      } catch (error) {
        console.log("Error in createParticle:", error);
      }
    };

    // Initial call to set correct initial values
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Direct manipulation to ensure button visibility - improved approach
  useEffect(() => {
    // Function to force button visibility
    const forceButtonVisibility = () => {
      try {
        // First, remove any potential duplicate buttons
        const existingButtons = document.querySelectorAll('.scroll-to-top');
        existingButtons.forEach((btn, index) => {
          // Leave the referenced button alone
          if (btn !== scrollToTopButtonRef.current && existingButtons.length > 1) {
            btn.remove();
          }
        });

        // If our button exists, force its visibility properties
        if (scrollToTopButtonRef.current) {
          scrollToTopButtonRef.current.style.cssText = `
            position: fixed !important;
            bottom: 1.5rem !important;
            left: 1.5rem !important; 
            z-index: 10001 !important;
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
            pointer-events: auto !important;
            visibility: visible !important;
            display: flex !important;
            width: 60px !important;
            height: 60px !important;
            border-radius: 50% !important;
            background: linear-gradient(145deg, #222222, #101010) !important;
            border: none !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3) !important;
            cursor: pointer !important;
            color: gold !important;
          `;
        }
      } catch (error) {
        console.log("Error in forceButtonVisibility:", error);
      }
    };

    // Don't run immediately on mount - wait for the ref to be available
    // Run after a small delay to ensure the component is mounted
    const initialTimeout = setTimeout(forceButtonVisibility, 100);

    // Then run on a regular interval to ensure it stays visible
    const interval = setInterval(forceButtonVisibility, 500);

    // Add a function to window to allow manual forcing
    window.forceScrollButtonVisible = forceButtonVisibility;

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      delete window.forceScrollButtonVisible;
    };
  }, []);

  // Handle fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Utility function for smooth scrolling to top
  const smoothScrollToTop = () => {
    const scrollStep = -window.scrollY / 20;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  const handleBackToTop = () => {
    // Create a blast effect before scrolling
    createScrollBlast();

    console.log("Scroll to top clicked"); // Debug

    // Use multiple scroll methods for maximum compatibility
    try {
      // 1. Using react-scroll library
      scroll.scrollToTop({
        duration: 800,
        smooth: 'easeInOutQuart'
      });

      // 2. Native browser scroll as backup
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

      // 3. Direct DOM manipulation as fallback
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

      // 4. Custom smooth scroll implementation as last resort
      smoothScrollToTop();
    } catch (error) {
      console.error("Error scrolling to top:", error);
      // Ultimate fallback - instant scroll
      window.scrollTo(0, 0);
    }
  };

  // Create blast effect when scrolling to top
  const createScrollBlast = () => {
    try {
      let centerX, centerY;

      // Get position from the button ref if available
      if (scrollToTopButtonRef && scrollToTopButtonRef.current) {
        const btnRect = scrollToTopButtonRef.current.getBoundingClientRect();
        centerX = btnRect.left + btnRect.width / 2;
        centerY = btnRect.top + btnRect.height / 2;
      } else {
        // Fallback to a fixed position relative to the viewport if button ref not available
        centerX = 55; // Approximately where button is (left + width/2)
        centerY = window.innerHeight - 55; // Approximately where button is (bottom + height/2)
      }

      // Create blast particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'scroll-blast-particle';

        const angle = (i / 20) * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const size = 4 + Math.random() * 6;
        const lifetime = 500 + Math.random() * 1000;

        // Calculate trajectory with direct math
        const destinationX = centerX + Math.cos(angle) * velocity * 100;
        const destinationY = centerY + Math.sin(angle) * velocity * 100;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;

        // Set a custom animation with keyframes for this specific particle
        const keyframes = [
          {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1
          },
          {
            transform: `translate(${destinationX - centerX}px, ${destinationY - centerY}px) scale(0)`,
            opacity: 0
          }
        ];

        const animationOptions = {
          duration: lifetime,
          easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
          fill: 'forwards'
        };

        document.body.appendChild(particle);

        // Apply the animation
        particle.animate(keyframes, animationOptions);

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            document.body.removeChild(particle);
          }
        }, lifetime);
      }

      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'scroll-ripple';
      ripple.style.left = `${centerX}px`;
      ripple.style.top = `${centerY}px`;
      document.body.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          document.body.removeChild(ripple);
        }
      }, 1000);
    } catch (error) {
      console.log("Error in createScrollBlast:", error);
    }
  };

  if (loading) {
    return (
      <div className="preloader">
        <div className="preloader-content">
          <div className="preloader-logo">
            <img
              src="/logo.png"
              alt="EDUTHON 5.0"
              className="preloader-logo-img"
              style={{
                height: isMobile ? '90px' : '120px',
                filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))',
                animation: 'pulse-glow 2s infinite alternate'
              }}
            />
          </div>
          <div className="preloader-bar">
            <div className="preloader-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  const HomePage = () => (
    <>
      <Hero />
      <Introduction />
      <WhatToExpect />
      <WhoWillAttend />
      <WhyEduthon />
      <Legacy />
      <Sponsors />
      <JoinMovement />
      <Footer />

      {/* Registration form now on its own page */}

      {/* Professional and modern scroll-to-top button */}
      <button
        onClick={() => {
          // Direct scroll with multiple fallbacks
          createScrollBlast();
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;

          // If using alternative container
          const mainContent = document.querySelector('main');
          if (mainContent) mainContent.scrollTop = 0;
        }}
        className={isMobile ? 'mb-[9rem] ml-0' : ''}
        style={{
          position: 'fixed',
          left: '1.5rem',
          width: '55px',
          height: '55px',
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #ffd700, #e6c300)', // Subtle gold gradient
          border: '2px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#111', // Dark text for contrast
          fontSize: '22px',
          fontWeight: 'bold',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
          cursor: 'pointer',
          zIndex: 9999999,
          transform: 'none',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          overflow: 'hidden',
          outline: 'none',
          WebkitTapHighlightColor: 'transparent',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}
        aria-label="Scroll to top"
        ref={scrollToTopButtonRef}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Arrow icon with professional styling */}
          <FaRocket className="rocket-icon" />

          {/* Add subtle circular glow effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '85%',
            height: '85%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none'
          }}></div>
        </div>
      </button>

      {/* WhatsApp button in floating container */}
      <div className={isMobile ? 'floating-buttons-container mb-[9rem] mr-0' : 'floating-buttons-container'}>
        <a
          href="https://wa.me/919815088426"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp"
        >
          <FaWhatsapp size={28} color="#fff" />
        </a>
      </div>
    </>
  );

  // Check if current route is one where navbar should be hidden
  const hideNavbarRoutes = [
    '/highlights',
    '/sponsorship-tiers'
  ];

  const shouldShowNavbar = !hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div className={`app ${pageReady ? 'page-ready' : ''} p-0`}>
        <main style={{ paddingTop: isMobile ? '0' : '80px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/sponsorship-tiers" element={<SponsorshipTiers />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
