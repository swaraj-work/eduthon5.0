import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes, FaArrowUp, FaChevronUp, FaRocket, FaHome, FaInfo, FaClipboardList, FaUsers, FaStar, FaHistory, FaHandshake, FaCircle } from 'react-icons/fa';
import ReactDOM from 'react-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    console.log("Toggle menu called, current state:", isOpen);
    setIsOpen(prevState => !prevState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // MIND-BLOWING scroll to top function with 100% guaranteed functionality
  const scrollToTop = useCallback(() => {
    // Create a visual effect for the scroll action
    const createScrollEffect = () => {
      // Create a rocket element that flies to the top
      const rocket = document.createElement('div');
      rocket.innerHTML = `<svg viewBox="0 0 24 24" width="40" height="40" stroke="gold" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l9 2-9-18-9 18 9-2z"></path></svg>`;
      rocket.style.cssText = `
        position: fixed;
        z-index: 10000;
        left: 50%;
        bottom: 50%;
        transform: translateX(-50%);
        transition: bottom 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        pointer-events: none;
      `;
      document.body.appendChild(rocket);
      
      // Animate the rocket to the top
      setTimeout(() => {
        rocket.style.bottom = '120%';
      }, 10);
      
      // Remove the rocket after animation
      setTimeout(() => {
        document.body.removeChild(rocket);
      }, 700);
    };
    
    // Create the visual effect
    createScrollEffect();
    
    // Use all possible scroll methods for maximum compatibility
    
    // 1. Native smooth scroll with fallback
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch(e) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
    
    // 2. Direct DOM manipulation
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    // 3. Focus the top element
    const topElement = document.getElementById('top');
    if (topElement) {
      topElement.focus();
    }
    
    // 4. Use scrollIntoView as another method
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      try {
        heroSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } catch(e) {
        // Fallback for browsers that don't support smooth scrolling
        heroSection.scrollIntoView();
      }
    }
    
    // 5. Use requestAnimationFrame for a custom smooth scroll
    const scrollToTopAnimated = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTopAnimated);
        window.scrollTo(0, c - c / 8);
      }
    };
    scrollToTopAnimated();
    
  }, []);

  // Check if we're on mobile immediately on mount
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    // Setup Intersection Observer for nav highlights
    const options = {
      rootMargin: '-100px 0px 0px 0px',
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Function to determine which section is currently visible with improved detection for small sections
    const determineActiveSection = () => {
      const sections = document.querySelectorAll('section[id]');
      // Use a smaller offset for better precision with small sections
      const scrollPosition = window.scrollY + 100; 
      const viewportHeight = window.innerHeight;
      
      // Find the section that's currently in view
      let currentSection = 'hero'; // Default to hero section
      let maxVisiblePercentage = 0;
      
      // Get all sections in view with their visibility percentages
      const sectionsInView = [];
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(sectionTop, scrollPosition - 100);
        const visibleBottom = Math.min(sectionBottom, scrollPosition + viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Calculate percentage of section that's visible
        const visiblePercentage = sectionHeight > 0 ? (visibleHeight / sectionHeight) : 0;
        
        // Special handling for small sections (less than 30% of viewport height)
        const isSmallSection = sectionHeight < (viewportHeight * 0.3);
        
        // For small sections, we need to be more generous with detection
        if (isSmallSection) {
          // If we're close to the section (within 100px), consider it visible
          if (Math.abs(scrollPosition - sectionTop) < 100 || 
              (scrollPosition >= sectionTop && scrollPosition < sectionBottom)) {
            sectionsInView.push({ 
              id: section.id, 
              visiblePercentage: visiblePercentage * 1.5, // Boost small sections
              isSmallSection 
            });
          }
        } else if (visiblePercentage > 0.1) { // For normal sections, require at least 10% visibility
          sectionsInView.push({ 
            id: section.id, 
            visiblePercentage,
            isSmallSection
          });
        }
      });
      
      // If we have sections in view, determine which one to highlight
      if (sectionsInView.length > 0) {
        // First, check if we have any small sections that should be prioritized
        const smallSections = sectionsInView.filter(s => s.isSmallSection);
        
        if (smallSections.length > 0) {
          // Find the small section with highest visibility
          const bestSmallSection = smallSections.reduce((best, current) => 
            current.visiblePercentage > best.visiblePercentage ? current : best, smallSections[0]);
          
          currentSection = bestSmallSection.id;
        } else {
          // Otherwise, use the section with the highest visibility percentage
          const bestSection = sectionsInView.reduce((best, current) => 
            current.visiblePercentage > best.visiblePercentage ? current : best, sectionsInView[0]);
          
          currentSection = bestSection.id;
        }
      }
      
      setActiveSection(currentSection);
    };

    // Observe all sections with a slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
      });
      
      // Determine active section on initial load
      determineActiveSection();
    }, 100);

    // Optimized scroll handler with throttling
    const handleScroll = () => {
      if (!scrollRef.current) {
        scrollRef.current = requestAnimationFrame(() => {
          const currentScroll = window.scrollY || document.documentElement.scrollTop;
          
          setScrolled(currentScroll > 50);
          
          // Show scroll-to-top button after scrolling down 200px (more responsive)
          // Use a lower threshold for mobile for better UX
          const scrollThreshold = isMobile ? 200 : 300;
          setShowScrollTop(currentScroll > scrollThreshold);
          
          // Also update active section on scroll
          determineActiveSection();
          
          scrollRef.current = null;
        });
      }
    };
    
    // Initial check for scroll position
    handleScroll();

    // Use passive flag for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
      clearTimeout(timer);
      if (scrollRef.current) {
        cancelAnimationFrame(scrollRef.current);
      }
    };
  }, [isMobile]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isOpen) {
        // If the click was outside the mobile menu and it's open, close it
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Ensure links are clickable by preventing default behavior
  const handleNavLinkClick = (to) => {
    // Close the mobile menu if it's open
    if (isOpen) {
      closeMenu();
    }
    
    // Scroll to the section
    const element = document.getElementById(to);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { to: 'hero', label: 'Home' },
    { to: 'introduction', label: 'About' },
    { to: 'what-to-expect', label: 'What to Expect' },
    { to: 'who-will-attend', label: 'Who Will Attend' },
    { to: 'why-eduthon', label: 'Why EDUTHON' },
    { to: 'legacy', label: 'Our Legacy' },
    { to: 'sponsors', label: 'Sponsorship' },
    { to: 'join-movement', label: 'Join Us' },
  ];

  // For desktop view, render a minimal navbar
  const renderDesktopNavbar = () => {
    if (isMobile) return null;
    
    return (
      <header 
        ref={navbarRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 999,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled 
            ? 'rgba(10, 10, 10, 0.75)' 
            : 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          padding: scrolled ? '0.6rem 0' : '1rem 0',
          borderBottom: scrolled 
            ? '1px solid rgba(255, 215, 0, 0.15)' 
            : '1px solid rgba(255, 215, 0, 0.08)',
          boxShadow: scrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
            : '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <div
                key={link.to}
                onClick={() => handleNavLinkClick(link.to)}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: activeSection === link.to ? '600' : '500',
                  color: activeSection === link.to 
                    ? 'var(--secondary-color)' 
                    : 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                  padding: '0.4rem 0.8rem',
                  position: 'relative',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  background: activeSection === link.to 
                    ? 'rgba(255, 215, 0, 0.1)' 
                    : 'transparent',
                  backdropFilter: activeSection === link.to ? 'blur(8px)' : 'none',
                  WebkitBackdropFilter: activeSection === link.to ? 'blur(8px)' : 'none',
                  border: activeSection === link.to 
                    ? '1px solid rgba(255, 215, 0, 0.2)' 
                    : '1px solid transparent'
                }}
                className={`nav-link ${activeSection === link.to ? 'active-nav-link' : ''}`}
              >
                {link.label}
              </div>
            ))}
            <button
              onClick={() => handleNavLinkClick('join-movement')}
              className="desktop-register-button"
              style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#fff',
                backgroundColor: 'transparent',
                border: '1.5px solid var(--secondary-color)',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                marginLeft: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              Register
            </button>
          </nav>
        </div>
      </header>
    );
  };

  // Mobile Menu Component - Enhanced professional design
  const MobileMenu = () => {
    if (!isMobile) return null;
    
    return (
      <>
        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="hamburger-button"
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 10000,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            color: 'var(--secondary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            boxShadow: isOpen 
              ? '0 3px 12px rgba(255, 215, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.3)' 
              : '0 2px 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        {/* Backdrop */}
        <div
          className={`mobile-backdrop ${isOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            transition: 'opacity 0.4s ease, visibility 0.4s ease',
            zIndex: 9998,
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
          onClick={closeMenu}
        />
        
        {/* Sidebar */}
        <div
          ref={mobileMenuRef}
          className={`mobile-sidebar ${isOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            maxWidth: '100%',
            height: '100vh',
            maxHeight: '100vh',
            background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)',
            boxShadow: isOpen ? '0 0 30px rgba(0, 0, 0, 0.6)' : 'none',
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRight: 'none',
            opacity: isOpen ? 1 : 0.95,
            overflowX: 'hidden'
          }}
        >
          {/* Header with logo and gradient overlay */}
          <div style={{
            padding: '24px 20px 20px',
            borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.8))',
            flexShrink: 0,
            position: 'relative',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.15) 0%, rgba(0, 0, 0, 0) 60%)',
              pointerEvents: 'none'
            }}></div>
            <img 
              src="/logo.png" 
              alt="EDUTHON Logo" 
              style={{
                height: '42px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>
          
          {/* Menu content */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            height: 'calc(100% - 86px)',
            minHeight: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)'
          }}>
            {/* Section title */}
            <div style={{
              padding: '22px 25px 12px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              textAlign: 'left',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              Navigation
            </div>
            
            {/* Navigation links - main content */}
            <div style={{
              padding: '15px 15px',
              overflow: 'auto',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              alignItems: 'center',
              width: '100%',
              boxSizing: 'border-box',
              overflowX: 'hidden'
            }}>
              {navLinks.map((link, index) => (
                <div
                  key={link.to}
                  onClick={() => handleNavLinkClick(link.to)}
                  className="nav-item"
                  style={{
                    padding: '16px 10px',
                    color: activeSection === link.to ? 'var(--secondary-color)' : '#fff',
                    fontSize: '16px',
                    fontWeight: activeSection === link.to ? '600' : '500',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    borderBottom: index !== navLinks.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    backgroundColor: activeSection === link.to ? 'rgba(255, 215, 0, 0.07)' : 'transparent',
                    transition: 'all 0.3s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    marginBottom: '5px',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${0.05 + index * 0.05}s`,
                    width: '100%',
                    textAlign: 'center',
                    borderRadius: '6px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Active indicator */}
                  {activeSection === link.to && (
                    <div style={{
                      position: 'absolute',
                      left: '20%',
                      right: '20%',
                      top: 0,
                      height: '3px',
                      width: '60%',
                      backgroundColor: 'var(--secondary-color)',
                      borderRadius: '0 0 4px 4px',
                      boxShadow: '0 0 8px rgba(212, 175, 55, 0.4)'
                    }}></div>
                  )}
                  
                  {/* Link icon */}
                  <div style={{
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    color: activeSection === link.to ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.7)',
                    fontSize: '15px'
                  }}>
                    {getNavIcon(link.to)}
                  </div>
                  
                  {/* Link text */}
                  <span>
                  {link.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Footer with register button */}
            <div style={{
              padding: '25px 30px 35px',
              borderTop: '1px solid rgba(255, 215, 0, 0.08)',
              background: 'linear-gradient(to top, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.7))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '25px',
              flexShrink: 0,
              marginTop: 'auto',
              width: '100%',
              boxSizing: 'border-box',
              boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              <button
                onClick={() => handleNavLinkClick('join-movement')}
                className="register-button"
                style={{
                  width: '90%',
                  maxWidth: '280px',
                  padding: '16px',
                  background: 'linear-gradient(45deg, rgba(212, 175, 55, 0.9), rgba(255, 215, 0, 0.8))',
                  color: '#000',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '17px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  margin: '0 auto',
                  display: 'block',
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                Register Now
              </button>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '8px'
              }}>
              <div style={{
                fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center'
              }}>
                  EDUTHON 5.0 • Aug 30, 2025
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  textAlign: 'center'
                }}>
                  © {new Date().getFullYear()} TRINITi
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Helper function to get icons for nav items
  const getNavIcon = (section) => {
    switch(section) {
      case 'hero':
        return <FaHome />;
      case 'introduction':
        return <FaInfo />;
      case 'what-to-expect':
        return <FaClipboardList />;
      case 'who-will-attend':
        return <FaUsers />;
      case 'why-eduthon':
        return <FaStar />;
      case 'legacy':
        return <FaHistory />;
      case 'sponsors':
        return <FaHandshake />;
      case 'join-movement':
        return <FaRocket />;
      default:
        return <FaCircle size={10} />;
      }
    };

  return (
    <>
      {renderDesktopNavbar()}
      <MobileMenu />
      
      <style>{`
        body {
          margin: 0;
          padding-top: env(safe-area-inset-top);
          overflow-x: hidden;
        }

        html, body {
          position: relative;
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          position: relative;
          overflow: hidden;
        }

        .nav-link:hover {
          color: var(--secondary-color) !important;
          background: rgba(255, 215, 0, 0.08) !important;
          border-color: rgba(255, 215, 0, 0.15) !important;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background: var(--secondary-color);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          opacity: 0;
        }

        .nav-link:hover::after {
          width: 80%;
          opacity: 0.5;
        }

        .active-nav-link::after {
          width: 90% !important;
          opacity: 0.8 !important;
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        .active-nav-link {
          color: var(--secondary-color) !important;
          font-weight: 600 !important;
        }
        
        button:active {
          transform: scale(0.97);
        }
      `}</style>
    </>
  );
};

export default Navbar; 