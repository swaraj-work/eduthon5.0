import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import ImageCarousel from './ImageCarousel';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const logo = 'https://ik.imagekit.io/patelswadesh/logo.png'

  const GraphicImages = [
    'https://ik.imagekit.io/patelswadesh/GraphicImages/1.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/2.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/3.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/4.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/5.png'
  ]

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

  useEffect(() => {
    // Add appear class to fade-in element after component mounts
    const fadeElement = document.querySelector('#hero .fade-in');
    if (fadeElement) {
      setTimeout(() => {
        fadeElement.classList.add('appear');
      }, 100);
    }
  }, []);

  // Add parallax effect on mouse move
  useEffect(() => {
    // Skip parallax effect on mobile
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position relative to the center
      const x = ((e.clientX - centerX) / rect.width) * 100;
      const y = ((e.clientY - centerY) / rect.height) * 100;

      setMousePosition({ x, y });

      // Update CSS variables instead of direct style manipulation
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Function to scroll to sponsors section with improved robustness
  const scrollToSponsors = () => {

    // Approach 1: Direct element access and scrollIntoView
    const sponsorsSection = document.getElementById('sponsors');
    if (sponsorsSection) {
      // Use scrollIntoView which is more reliable than calculating positions
      sponsorsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Adding a small delay to adjust for navbar (an alternative approach)
      setTimeout(() => {
        window.scrollBy(0, -100); // Scroll back up 100px to account for navbar
      }, 100);

      return; // If found, no need to try other approaches
    } else {
      console.log("Sponsors section not found by ID");
    }

    // Approach 2: Try querySelector
    const sponsorsSectionAlt = document.querySelector('section#sponsors');
    if (sponsorsSectionAlt) {
      console.log("Found sponsors section via querySelector");
      sponsorsSectionAlt.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setTimeout(() => window.scrollBy(0, -100), 100);
      return;
    }

    // Approach 3: Fallback - find by section that contains specific text
    const allSections = document.querySelectorAll('section');
    let foundSection = null;

    allSections.forEach(section => {
      if (section.textContent.includes('Be a Sponsor') ||
        section.textContent.includes('Sponsorship') ||
        section.innerHTML.includes('sponsor')) {
        foundSection = section;
      }
    });

    if (foundSection) {
      console.log("Found sponsors section via text content");
      foundSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setTimeout(() => window.scrollBy(0, -100), 100);
      return;
    }
    window.scrollTo({
      top: window.innerHeight * 1.5, // Scroll about 1.5 viewport heights
      behavior: 'smooth'
    });
  };

  // Add these sample images - replace with your actual event images
  const carouselImages = [
    'https://ik.imagekit.io/patelswadesh/FrontPage/frontpage-1.jpg',
    'https://ik.imagekit.io/patelswadesh/FrontPage/frontpage-2.jpg',
    'https://ik.imagekit.io/patelswadesh/FrontPage/frontpage-3.jpg',
    'https://ik.imagekit.io/patelswadesh/FrontPage/frontpage-4.jpg?updatedAt=1748253239927',
    'https://ik.imagekit.io/patelswadesh/FrontPage/frontpage-5.jpg',
  ];
  // const carouselImages = [
  //   '../src/assets/images/FrontPage/frontpage-1.jpg',
  //   '../src/assets/images/FrontPage/frontpage-2.jpg',
  //   '../src/assets/images/FrontPage/frontpage-3.jpg',
  //   '../src/assets/images/FrontPage/frontpage-4.jpg',
  //   '../src/assets/images/FrontPage/frontpage-5.jpg',
  // ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-section"
      style={{
        marginTop: isMobile ? 'clamp(-100px, -12vh, -60px)' : 'clamp(-20px, -2vh, -15px)',
        minHeight: isMobile ? 'calc(100vh - clamp(60px, 10vh, 80px))' : 'calc(100vh - clamp(70px, 8vh, 80px))',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        backgroundImage: isMobile ? 'linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.9))' : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: isMobile ? 'clamp(60px, 8vh, 80px)' : '0',
        paddingBottom: isMobile ? 'clamp(20px, 3vh, 30px)' : '0',
        perspective: '1000px',
        "--mouse-x": "0px",
        "--mouse-y": "0px"
      }}
    >
      {/* Animated Particles with CSS animations instead of scroll-based parallax */}
      <div className="hero-particle particle-1"></div>
      <div className="hero-particle particle-2"></div>
      <div className="hero-particle particle-3"></div>

      {/* Full-width carousel wrapper for desktop */}
      <div className="hero-main-content-wrapper" style={{
        position: 'relative',
        width: isMobile ? '100%' : '100vw',
        maxWidth: isMobile ? '100%' : '100vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: isMobile ? '8px' : '0',
        overflow: 'hidden',
        marginTop: isMobile ? 'clamp(0.5rem, 2vh, 1rem)' : '0',
        marginBottom: isMobile ? 'clamp(-1.3rem, -1vh, -2rem)' : 'auto',
        paddingTop: isMobile ? 'clamp(0.5rem, 2vh, 1rem)' : '0',
        paddingBottom: isMobile ? 'clamp(1rem, 3vh, 1.5rem)' : '0',
        paddingLeft: isMobile ? 'clamp(0.5rem, 2vw, 0.8rem)' : '0',
        paddingRight: isMobile ? 'clamp(0.5rem, 2vw, 0.8rem)' : '0',
        boxShadow: isMobile ? '0 0 25px rgba(0, 0, 0, 0.3)' : 'none',
        backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
        backdropFilter: isMobile ? 'blur(5px)' : 'none',
        WebkitBackdropFilter: isMobile ? 'blur(5px)' : 'none',
        height: '100%',
        minHeight: isMobile ? 'calc(100vh - clamp(80px, 12vh, 100px))' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: isMobile ? 'none' : 'linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85))',
      }}>

        {/* Background Carousel - Only shown on desktop */}
        {!isMobile && <ImageCarousel images={carouselImages} isBackground={true} fullHeight={true} />}

        {/* Content overlay */}
        <div className="container fade-in hero-content" style={{
          maxWidth: isMobile ? 'clamp(300px, 95%, 1000px)' : 'clamp(800px, 90%, 1200px)',
          transform: isMobile ? 'scale(clamp(0.85, 0.9, 0.95))' : 'scale(clamp(0.8, 0.85, 0.9))',
          transformOrigin: 'center center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: isMobile ? 'auto' : 'auto',
          paddingTop: isMobile ? 'clamp(0.5rem, 2vh, 1rem)' : 'clamp(1rem, 3vh, 1.5rem)',
          paddingBottom: isMobile ? 'clamp(0.5rem, 2vh, 1rem)' : 'clamp(1rem, 3vh, 1.5rem)',
          paddingLeft: isMobile ? 'clamp(0.5rem, 3vw, 1rem)' : 'clamp(1rem, 3vw, 1.5rem)',
          paddingRight: isMobile ? 'clamp(0.5rem, 3vw, 1rem)' : 'clamp(1rem, 3vw, 1.5rem)',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: isMobile ? 'clamp(-2.5rem, -4vh, -1.5rem)' : 'clamp(-2.5rem, -5vh, -1.5rem)',
          marginBottom: isMobile ? 'clamp(-3rem, -4vh, -1.5rem)' : 'clamp(-2rem, -5vh, -1rem)',
          position: 'relative',
          zIndex: 2,
          overflow: 'visible',
          transition: 'all 0.3s ease-in-out'
        }}>

          <div
            className="hero-badge mx-auto w-auto"
            style={{
              padding: isMobile
                ? 'clamp(0.3rem, 1.5vh, 0.4rem) clamp(0.35rem, 2vw, 0.5rem)'
                : 'clamp(0.35rem, 1.2vh, 0.45rem) clamp(0.6rem, 2vw, 0.8rem)',
              margin: isMobile
                ? 'clamp(0.8rem, 3vh, 1.5rem) auto clamp(0.4rem, 1.5vh, 0.8rem)'
                : 'clamp(0.4rem, 1.5vh, 0.6rem) auto clamp(1rem, 3vh, 1.5rem)',
              position: 'relative',
              zIndex: 5,
              display: 'inline-block',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 215, 0, 0.15)',
              borderRadius: 'clamp(20px, 3vw, 25px)',
              border: '1px solid rgba(255, 215, 0, 0.4)',
              transform: 'scale(1)',
              transition: 'all 0.3s ease-in-out'
            }}
          >
            <span
              className={`text-[#FAD300] drop-shadow-md lowercase`}
              style={{
                fontWeight: isMobile ? '500' : '600',
                fontSize: isMobile ? 'clamp(11px, 1.5vw, 12px)' : 'clamp(13px, 1.8vw, 14px)',
                padding: isMobile ? 'clamp(0.12rem, 0.5vh, 0.15rem) clamp(0.35rem, 1vw, 0.4rem)' : 'clamp(0.25rem, 0.8vh, 0.3rem) clamp(0.5rem, 1.2vw, 0.6rem)',
                letterSpacing: '0.05em',
              }}
            >
              5<sup>th</sup> <span className="text-[#FAD300] uppercase">Annual Event</span>
            </span>
          </div>

          <h1 style={{
            fontSize: isMobile ? 'clamp(2rem, 7vw, 3.5rem)' : 'clamp(2.4rem, 4.5vw, 4.2rem)',
            maxWidth: isMobile ? 'clamp(300px, 95vw, 900px)' : 'clamp(600px, 90vw, 1100px)',
            margin: '0 auto',
            padding: isMobile ? 'clamp(0.3rem, 1vh, 0.5rem) clamp(0.3rem, 1.5vw, 0.5rem)' : 'clamp(0.5rem, 1.5vh, 0.8rem) clamp(0.5rem, 2vw, 0.8rem)',
            lineHeight: isMobile ? 'clamp(1, 1.1, 1.15)' : 'clamp(1.05, 1.15, 1.2)',
            letterSpacing: 'clamp(-0.04em, -0.03em, -0.02em)',
            fontWeight: 800,
            marginBottom: isMobile ? 'clamp(0.6rem, 2vh, 0.8rem)' : 'clamp(0.8rem, 2.5vh, 1.2rem)',
            transition: 'all 0.3s ease-in-out'
          }}>

            <div style={{
              position: 'relative',
              margin: isMobile ? '0 auto 1.5rem' : '0 auto',
              padding: isMobile ? '1rem 0.8rem 1.5rem' : '0',
              borderRadius: '16px',
              width: isMobile ? 'calc(100% - 20px)' : 'auto',
              maxWidth: isMobile ? '480px' : 'none'
            }}>
              {/* Mobile Carousel - positioned underneath the logo */}
              {isMobile && (
                <div style={{
                  position: 'absolute',
                  marginTop: 'clamp(-1rem, -5vh, -1rem)',
                  marginBottom: '0',
                  marginLeft: 'clamp(-5rem, -10vw, -5rem)',
                  width: '110vw',
                  height: '100%',
                  zIndex: 1,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
                  background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))',
                }}>
                  <ImageCarousel
                    images={carouselImages}
                    isBackground={true}
                    fullHeight={false}
                    opacity={0.8}
                  />
                </div>
              )}

              {/* Logo that appears over the carousel */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <span style={{
                  display: 'block',
                  marginTop: isMobile ? 'clamp(0.5rem, 1.5vh, 0.8rem)' : 'clamp(0.8rem, 2vh, 1rem)',
                  marginBottom: isMobile ? 'clamp(1.2rem, 3vh, 1.5rem)' : 'clamp(1.4rem, 3vh, 1.6rem)',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  padding: isMobile ? 'clamp(0.3rem, 1vh, 0.5rem)' : 'clamp(0.5rem, 1.5vh, 0.8rem)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease-in-out',
                  position: 'relative'
                }}>
                  <img
                    src={logo}
                    alt="EDUTHON 5.0"
                    className="mx-auto"
                    style={{
                      height: isMobile ? 'clamp(100px, 22vw, 140px)' : 'clamp(90px, 15vw, 120px)',
                      width: 'auto',
                      display: 'inline-block',
                      filter: isMobile ? 'drop-shadow(0 0 clamp(15px, 4vw, 25px) rgba(255, 215, 0, 0.8))' : 'drop-shadow(0 0 clamp(8px, 2vw, 12px) rgba(255, 215, 0, 0.5))',
                      transition: 'all 0.3s ease-in-out',
                      position: 'relative',
                      zIndex: 10
                    }}
                  />
                </span>
              </div>

            </div>
          </h1>
          {/* Heading text below logo */}
          <div style={{ position: 'relative', zIndex: 10, top: 'clamp(-2rem, -5vh, -1rem)' }}>
            <span style={{
              display: 'block',
              fontSize: isMobile ? 'clamp(1.5rem, 5.5vw, 2.8rem)' : 'clamp(1.7rem, 2.5vw, 2.3rem)',
              fontWeight: 600,
              opacity: 0.95,
              margin: isMobile
                ? 'clamp(0rem, 1vh, 0.5rem) auto clamp(0.5rem, 1.5vh, 0.8rem)'
                : 'clamp(0.5rem, 1.5vh, 0.8rem) auto clamp(-2.5rem, -4vh, -2rem)',
              padding: isMobile ? 'clamp(0.2rem, 0.8vh, 0.3rem) 0' : 'clamp(0.3rem, 1vh, 0.5rem) 0',
              letterSpacing: 'clamp(-0.02em, -0.01em, 0)',
              lineHeight: isMobile ? '1.2' : '1.3',
              transition: 'all 0.3s ease-in-out',
              textShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.7)' : 'none'
            }}>
              The Next of Education: <span className="gradient-text">AI Meets Humanity</span>
            </span>
          </div>

          <h2 className="font-[500] mx-auto opacity-95 max-w-[min(700px,85vw)] tracking-wider mt-[clamp(-2rem,-5vh,-1rem)]"
            style={{
              fontSize: 'clamp(1.2rem, 1.6vw, 1.2rem)',
              margin: isMobile ? 'clamp(0.3rem, 1vh, 0.4rem) auto' : 'clamp(1.5rem, 3vh, 2rem) auto 0',
              lineHeight: 'clamp(1.4, 1.5, 1.6)',
              letterSpacing: 'clamp(0.02em, 0.03em, 0.04em)',
              marginTop: isMobile ? 'clamp(-2rem, -5vh, -1rem)' : 'clamp(1.5rem, 3vh, 2rem)',
            }}>
            <span className={isMobile ? "text-[clamp(1.2rem,2.5vw,1.3rem)]" : "text-[clamp(1.4rem,2.8vw,1.5rem)]"}>India's Most Influential Education Summit</span>
          </h2>

          <div className="glass-container hero-event-details" style={{
            margin: isMobile
              ? 'clamp(0.5rem, 2vh, 1rem) auto clamp(0.5rem, 2vh, 1rem)'
              : 'clamp(0.8rem, 2.5vh, 1.2rem) auto clamp(0.5rem, 2vh, 1rem)',
            padding: isMobile
              ? 'clamp(0.5rem, 1.5vh, 0.8rem) clamp(0.6rem, 2vw, 1rem)'
              : 'clamp(0.7rem, 2vh, 1rem) clamp(1rem, 3vw, 1.5rem)',
            maxWidth: isMobile ? 'clamp(280px, 90%, 450px)' : 'clamp(400px, 60%, 600px)',
            gap: isMobile ? 'clamp(0.6rem, 2vw, 1rem)' : 'clamp(1rem, 3vw, 2rem)',
            display: 'inline-flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transform: isMobile ? 'scale(clamp(0.85, 0.9, 0.95))' : 'scale(clamp(0.9, 0.95, 1))',
            transformOrigin: 'center center',
            transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            borderRadius: isMobile ? 'clamp(6px, 1.5vw, 8px)' : 'clamp(8px, 1vw, 10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              margin: isMobile ? 'clamp(2px, 0.5vh, 4px)' : 'clamp(3px, 0.8vh, 5px)',
              padding: isMobile ? 'clamp(2px, 0.5vh, 4px)' : 'clamp(3px, 0.8vh, 5px)',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 'clamp(0.5rem, 1.5vw, 0.8rem)' : 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '500',
              fontSize: isMobile ? 'clamp(0.9rem, 2.8vw, 1rem)' : 'clamp(1rem, 1.5vw, 1.4rem)',
              transition: 'all 0.3s ease-in-out'
            }}>
              <FaCalendarAlt color="var(--secondary-color)" size={isMobile ? Math.max(18, Math.min(22, window.innerWidth * 0.05)) : Math.max(22, Math.min(26, window.innerWidth * 0.02))} />
              <span>August 30, 2025</span>
            </div>
            <div style={{
              margin: isMobile ? 'clamp(2px, 0.5vh, 4px)' : 'clamp(3px, 0.8vh, 5px)',
              padding: isMobile ? 'clamp(2px, 0.5vh, 4px)' : 'clamp(3px, 0.8vh, 5px)',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 'clamp(0.5rem, 1.5vw, 0.8rem)' : 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '500',
              fontSize: isMobile ? 'clamp(0.9rem, 2.8vw, 1rem)' : 'clamp(1rem, 1.5vw, 1.4rem)',
              transition: 'all 0.3s ease-in-out'
            }}>
              <FaMapMarkerAlt color="var(--secondary-color)" size={isMobile ? Math.max(18, Math.min(22, window.innerWidth * 0.05)) : Math.max(22, Math.min(26, window.innerWidth * 0.02))} />
              <span>Hyatt, Chandigarh</span>
            </div>
          </div>

          <div className="btn-container hero-buttons">
            {/* Simple flex-based responsive buttons */}
            <div style={{
              display: 'flex',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              gap: isMobile ? '0.8rem' : '1rem',
              justifyContent: 'center',
              width: '100%',
              maxWidth: isMobile ? '400px' : '800px',
              margin: isMobile ? '-1rem auto 1rem' : '1rem auto',
            }}>
              {/* Register Button */}
              <a
                href="https://forms.gle/S4ey4bQbQHV3Y4ir8"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  flex: isMobile ? '1 1 45%' : '1',
                  minWidth: isMobile ? '120px' : '180px',
                }}
              >
                <button
                  className="btn btn-outline text-sm tracking-wider hover-glow"
                  style={{
                    width: '100%',
                    borderRadius: isMobile ? '6px' : '8px',
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderWidth: isMobile ? '1px' : '1.5px',
                    borderColor: "rgba(255, 215, 0, 0.4)",
                    transition: "all 0.3s ease-in-out",
                    fontSize: isMobile ? '0.85rem' : '1rem',
                    padding: isMobile ? '0.4rem 0.8rem' : '0.6rem 1.5rem',
                    minHeight: isMobile ? '40px' : '48px',
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Register Now
                </button>
              </a>

              {/* Sponsor Button */}
              <div
                style={{
                  flex: isMobile ? '1 1 45%' : '1',
                  minWidth: isMobile ? '120px' : '180px',
                  cursor: 'pointer',
                }}
              >
                <button
                  onClick={scrollToSponsors}
                  className="btn btn-outline text-sm tracking-wider hover-glow"
                  style={{
                    width: '100%',
                    borderRadius: isMobile ? '6px' : '8px',
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderWidth: isMobile ? '1px' : '1.5px',
                    borderColor: "rgba(255, 215, 0, 0.4)",
                    transition: "all 0.3s ease-in-out",
                    fontSize: isMobile ? '0.85rem' : '1rem',
                    padding: isMobile ? '0.4rem 0.8rem' : '0.6rem 1.5rem',
                    minHeight: isMobile ? '40px' : '48px',
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Become Sponsor
                </button>
              </div>

              {/* Highlights Button */}
              <RouterLink
                to="/highlights"
                style={{
                  textDecoration: 'none',
                  flex: isMobile ? '1 1 100%' : '1',
                  minWidth: isMobile ? '120px' : '180px',
                }}
              >
                <button
                  className="btn btn-outline text-sm tracking-wider hover-glow"
                  style={{
                    width: '100%',
                    borderRadius: isMobile ? '6px' : '8px',
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderWidth: isMobile ? '1px' : '1.5px',
                    borderColor: "rgba(255, 215, 0, 0.4)",
                    transition: "all 0.3s ease-in-out",
                    fontSize: isMobile ? '0.85rem' : '1rem',
                    padding: isMobile ? '0.4rem 0.8rem' : '0.6rem 1.5rem',
                    minHeight: isMobile ? '40px' : '48px',
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  See Highlights
                </button>
              </RouterLink>
            </div>
          </div>

          <p className={`italic max-w-[800px] mx-auto mt-[0] mb-[1rem] md:mt-[1rem] opacity-85 text-[clamp(0.9rem,1.8vw,1.2rem)] px-4 leading-relaxed`}>
            A decade-defining dialogue on technology, learning, and the soul of education.
          </p>
        </div>
      </div>

      {/* Background Overlay with Golden Glow Effect */}
      <div className="hero-glow"></div>

      <style>{`
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(20px);
          z-index: 0;
        }
        
        .particle-1 {
          top: 10%;
          left: 10%;
          width: 200px; 
          height: 200px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
          opacity: 0.7;
          filter: blur(20px);
          animation: float-particle1 15s ease-in-out infinite alternate;
        }
        
        .particle-2 {
          bottom: 15%;
          right: 15%;
          width: 280px; 
          height: 280px; 
          background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
          opacity: 0.8;
          filter: blur(30px); 
          animation: float-particle2 18s ease-in-out infinite alternate;
        }
        
        .particle-3 {
          top: 40%;
          right: 10%;
          width: 150px; 
          height: 150px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%);
          opacity: 0.6; 
          filter: blur(20px); 
          animation: float-particle3 12s ease-in-out infinite alternate;
        }
        
        @keyframes float-particle1 {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(30px) translateX(25px); }
        }
        
        @keyframes float-particle2 {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-35px) translateX(-30px); }
        }
        
        @keyframes float-particle3 {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(25px) translateX(-25px); }
        }
        
        .btn-primary {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(255, 165, 0, 0.9));
          border: none;
          color: #121212;
          font-weight: 600;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 165, 0, 0.9), rgba(255, 215, 0, 0.9));
          transition: all 0.5s ease;
          z-index: -1;
        }
        
        .btn-primary:hover::before {
          left: 0;
        }
        
        .btn-primary:hover {
          box-shadow: 0 0 25px rgba(255, 215, 0, 0.5);
          transform: translateY(-3px) scale(1.02);
          color: #000;
          text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
        }
        
        .btn-primary:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 25px rgba(255, 215, 0, 0.4);
          transform: translateY(-2px);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 215, 0, 0.8);
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
        }
        
        .hero-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70%; /* Further increased height */
          background: linear-gradient(to top, rgba(255, 215, 0, 0.09), transparent); /* Further increased opacity */
          pointer-events: none;
        }
        
        @media (max-width: 768px) {
          .hero-content {
            transform: scale(clamp(0.85, 0.9, 0.95));
            padding: clamp(0.8rem, 2vh, 1rem) 0;
          }
          
          .hero-event-details {
            transform: scale(clamp(0.9, 0.95, 1));
            padding: clamp(0.6rem, 1.5vh, 0.75rem) clamp(0.8rem, 2vw, 1rem);
          }
          
          .hero-buttons {
            transform: scale(clamp(0.9, 0.95, 1));
            margin-top: clamp(1.2rem, 3vh, 1.5rem);
            gap: clamp(0.6rem, 1.5vw, 0.8rem);
            width: clamp(85%, 90%, 95%);
            max-width: clamp(200px, 50vw, 220px);
          }
          
          .hero-buttons button {
            width: 100%;
            max-width: 100%;
          }
        }
        
        @media (min-width: 1025px) {
          .hero-content {
            transform: scale(clamp(0.82, 0.85, 0.88));
          }
          
          .hero-event-details {
            transform: scale(clamp(0.82, 0.85, 0.88));
          }
          
          .hero-buttons {
            transform: scale(clamp(0.88, 0.9, 0.92));
            margin-top: clamp(0.6rem, 1.5vh, 0.8rem);
          }
          
          .hero-section {
            padding-top: clamp(40px, 8vh, 50px);
            padding-bottom: clamp(15px, 3vh, 20px);
          }
        }
        
        @media (min-height: 800px) {
          .hero-section {
            justify-content: center;
          }
        }
        
        @media (max-height: 799px) {
          .hero-section {
            justify-content: flex-start;
            padding-top: ${isMobile ? '60px' : '50px'};
          }
          
          .hero-content {
            transform: ${isMobile ? 'scale(0.85)' : 'scale(0.8)'};
            margin-top: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 