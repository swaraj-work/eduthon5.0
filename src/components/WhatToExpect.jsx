import { useInView } from 'react-intersection-observer';
import { FaMicrophone, FaBrain, FaFlask, FaGraduationCap, FaUsers, FaPuzzlePiece } from 'react-icons/fa';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const WhatToExpect = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const carouselRef = useRef(null);
  const itemsRef = useRef([]);
  const autoRotateIntervalRef = useRef(null);
  const ROTATION_INTERVAL = 4000; // 4 seconds between rotations

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

  const features = [
    {
      icon: <FaMicrophone size={isMobile ? 20 : 22} color="var(--secondary-color)" />,
      title: 'Keynotes & Fireside Chats',
      description: 'Insightful talks from education leaders and innovators',
      image: 'https://ik.imagekit.io/patelswadesh/EDUTHON%202.0/eduthon2.0-1.jpg?updatedAt=1747256217103'
      // image: '../src/assets/images/EDUTHON_2.0/eduthon2.0-1.jpg'
    },
    {
      icon: <FaBrain size={isMobile ? 20 : 22} color="var(--secondary-color)" />,
      title: 'Thought Panels',
      description: 'Diverse perspectives on education\'s pressing questions',
      image: 'https://ik.imagekit.io/patelswadesh/EDUTHON%202.0/eduthon2.0-5.jpg?updatedAt=1747256164078'
      // image: '../src/assets/images/EDUTHON_2.0/eduthon2.0-5.jpg'
    },
    {
      icon: <FaFlask size={isMobile ? 20 : 22} color="var(--secondary-color)" />,
      title: 'EdTech & AI Showcases',
      description: 'Cutting-edge technologies shaping tomorrow\'s classrooms',
      image: 'https://ik.imagekit.io/patelswadesh/EDUTHON%204.0/eduthon4.0-15.jpg?updatedAt=1747255457652'
      // image: '../src/assets/images/EDUTHON_4.0/eduthon4.0-15.jpg'
    },
    {
      icon: <FaGraduationCap size={isMobile ? 20 : 22} color="var(--secondary-color)" />,
      title: 'Master Classes for Educators',
      description: 'Practical skill-building sessions for education professionals',
      image: 'https://ik.imagekit.io/patelswadesh/EDUTHON%204.0/eduthon4.0-3.jpg?updatedAt=1747255716220'
      // image: '../src/assets/images/EDUTHON_4.0/eduthon4.0-3.jpg'
    },
    {
      icon: <FaUsers size={isMobile ? 20 : 22} color="var(--secondary-color)" />,
      title: 'Networking Zones',
      description: 'Connect with peers, potential partners, and industry leaders',
      image: 'https://ik.imagekit.io/patelswadesh/EDUTHON%201.0/eduthon1.0-6.jpg?updatedAt=1747252214222'
      // image: '../src/assets/images/EDUTHON_1.0/eduthon1.0-6.jpg'
    },
    {
      icon: <FaPuzzlePiece size={isMobile ? 20 : 22} color="var(--secondary-color)" />,
      title: 'Student Workshops',
      description: 'Engaging learning experiences for the next generation',
      image: 'https://ik.imagekit.io/patelswadesh/EDUTHON%202.0/eduthon2.0-3.jpg?updatedAt=1747256244762'
      // image: '../src/assets/images/EDUTHON_2.0/eduthon2.0-3.jpg'
    },
  ];

  const getVisibleItems = () => {
    const items = [];
    const totalItems = features.length;
    
    // For mobile, show ONLY the active card
    if (isMobile) {
      items.push({ item: features[activeIndex], index: activeIndex, position: 'center' });
      return items;
    }
    
    // For desktop, show the current card with cards on each side
    const prevIndex = (activeIndex - 1 + totalItems) % totalItems;
    const nextIndex = (activeIndex + 1) % totalItems;
    
    // Add one more card on each side for smoother transitions
    const prevPrevIndex = (activeIndex - 2 + totalItems) % totalItems;
    const nextNextIndex = (activeIndex + 2) % totalItems;
    
    items.push({ item: features[prevPrevIndex], index: prevPrevIndex, position: 'far-left' });
    items.push({ item: features[prevIndex], index: prevIndex, position: 'left' });
    items.push({ item: features[activeIndex], index: activeIndex, position: 'center' });
    items.push({ item: features[nextIndex], index: nextIndex, position: 'right' });
    items.push({ item: features[nextNextIndex], index: nextNextIndex, position: 'far-right' });
    
    return items;
  };

  // Auto-rotation functionality
  const rotateToNext = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('next');
    
    setActiveIndex(prevIndex => {
      const newIndex = prevIndex === features.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [isAnimating, features.length]);

  // Setup auto-rotation when component is in view
  useEffect(() => {
    // Start auto-rotation when component is in view
    if (inView) {
      // Clear any existing interval first
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
      
      // Set up new interval
      autoRotateIntervalRef.current = setInterval(() => {
        rotateToNext();
      }, ROTATION_INTERVAL);
    }
    
    // Cleanup function to clear interval when component unmounts or goes out of view
    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [inView, rotateToNext]);

  // Pause auto-rotation when user interacts with indicators
  const handleIndicatorClick = (index) => {
    // Clear the current auto-rotation interval
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
    }
    
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(index > activeIndex ? 'next' : 'prev');
    
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => {
        setIsAnimating(false);
        
        // Restart auto-rotation after a brief pause
        autoRotateIntervalRef.current = setInterval(() => {
          rotateToNext();
        }, ROTATION_INTERVAL);
      }, 800);
    }, 50);
  };



  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        // Navigate left with keyboard
        if (isAnimating) return;
        setIsAnimating(true);
        setDirection('prev');
        
        setActiveIndex(prevIndex => {
          const newIndex = prevIndex === 0 ? features.length - 1 : prevIndex - 1;
          return newIndex;
        });
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      } else if (e.key === 'ArrowRight') {
        // Navigate right with keyboard
        rotateToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, features.length, rotateToNext]);

  // Create an animation when the section becomes visible
  useEffect(() => {
    if (inView && carouselRef.current) {
      carouselRef.current.classList.add('initial-animation');
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.classList.remove('initial-animation');
        }
      }, 1500);
    }
  }, [inView]);

  return (
    <section id="what-to-expect" className="section" style={{
      backgroundColor: '#000000',
      paddingTop: isMobile ? '3rem' : '4.5rem',
      paddingBottom: isMobile ? '3rem' : '4.5rem',
      position: 'relative',
      overflow: 'hidden',
      perspective: '1000px',
    }}>
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative' }}>
        <h2 className="text-center" style={{ 
          maxWidth: '750px', 
          margin: '0 auto 0.7rem',
          fontSize: isMobile ? '1.4rem' : '1.8rem',
          letterSpacing: '0.02em',
          fontWeight: 700
        }}>
          What to Expect?
        </h2>
        
        <p className="text-center" style={{
          fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
          maxWidth: '700px',
          margin: isMobile ? '0.7rem auto 1.8rem' : '1rem auto 2.2rem',
          color: 'var(--secondary-color)',
          padding: '0 1rem',
          lineHeight: 1.5,
          letterSpacing: '0.01em'
        }}>
          A full-circle summit: Thought leadership, grassroots voices, and future-ready ideas — all in one room.
        </p>
        
        {/* Main Carousel Container */}
        <div className="carousel-outer-container" style={{
          position: 'relative',
          maxWidth: '900px',
          margin: isMobile ? '2rem auto 3rem' : '5rem auto 3rem',
          padding: '0',
        }}>
          
          {/* 3D CAROUSEL CONTAINER */}
          <div className="carousel-container" style={{
            position: 'relative',
            margin: '0 auto',
            padding: isMobile ? '0 15px' : '0',
            perspective: '1500px',
            transformStyle: 'preserve-3d',
            height: isMobile ? '380px' : '320px',
            marginBottom: '30px'
          }}>
            {/* 3D Carousel */}
            <div 
              ref={carouselRef}
              className={`carousel-3d ${direction === 'prev' ? 'rotate-prev' : direction === 'next' ? 'rotate-next' : ''}`}
              style={{
                position: 'relative',
                height: '100%',
                width: '100%',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
            >
              {getVisibleItems().map(({ item, index, position }, i) => (
                <div 
                  key={index}
                  ref={el => itemsRef.current[i] = el}
                  className={`carousel-item ${position} ${direction}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: isMobile 
                      ? 'translateZ(0px)' 
                      : position === 'center' 
                        ? 'translateZ(150px) rotateY(0deg)' 
                        : position === 'left' 
                          ? 'translateZ(90px) translateX(-38%) rotateY(25deg)' 
                          : position === 'right' 
                            ? 'translateZ(90px) translateX(38%) rotateY(-25deg)'
                            : position === 'far-left'
                              ? 'translateZ(0px) translateX(-90%) rotateY(35deg)'
                              : 'translateZ(0px) translateX(90%) rotateY(-35deg)',
                    opacity: isMobile 
                      ? 1 
                      : position === 'center' 
                        ? 1 
                        : position === 'left' || position === 'right'
                          ? 0.7
                          : 0.3,
                    zIndex: isMobile 
                      ? 5 
                      : position === 'center' 
                        ? 5 
                        : position === 'left' || position === 'right'
                          ? 3
                          : 1,
                    filter: isMobile 
                      ? 'none' 
                      : position === 'center' 
                        ? 'none' 
                        : 'brightness(0.7) blur(1px)',
                  }}
                >
                  <div 
                    className={`card what-to-expect-card ${position}`}
                    style={{
                      width: isMobile ? '100%' : position === 'center' ? '60%' : '75%',
                      maxWidth: isMobile ? '280px' : position === 'center' ? '260px' : '230px',
                      height: isMobile ? '320px' : position === 'center' ? '270px' : '230px',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'rgba(25, 25, 25, 0.85)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: position === 'center' 
                        ? '0 10px 25px rgba(0, 0, 0, 0.4), 0 0 8px rgba(255, 215, 0, 0.3)' 
                        : '0 6px 15px rgba(0, 0, 0, 0.3), 0 0 5px rgba(255, 215, 0, 0.2)',
                      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      transform: position === 'center' ? 'scale(1)' : 'scale(0.9)',
                      border: position === 'center' 
                        ? '2px solid rgba(255, 215, 0, 0.5)' 
                        : '1px solid rgba(255, 215, 0, 0.3)',
                      transformStyle: 'preserve-3d',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div className="card-image-container" style={{
                      width: '100%',
                      height: isMobile ? '65%' : '60%',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        }}
                        className="card-image"
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '30%',
                        background: 'linear-gradient(to top, rgba(25, 25, 25, 1), rgba(25, 25, 25, 0))',
                      }}></div>
                    </div>
                    
                    <div className="card-content" style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      height: isMobile ? '50%' : '40%',
                      padding: position === 'center' ? '1rem' : '0.7rem',
                      position: 'relative',
                      justifyContent: 'center',
                    }}>
                      <div className="icon-wrapper" style={{
                        width: isMobile ? '20px' : '45px',
                        height: isMobile ? '20px' : '45px',
                        position: 'absolute',
                        top: '-22px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(25, 25, 25, 0.95)',
                        border: '2px solid rgba(255, 215, 0, 0.5)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 215, 0, 0.3)',
                        zIndex: 2,
                        backdropFilter: 'blur(8px)',
                      }}>
                        {item.icon}
                      </div>
                      
                      <h3 style={{ 
                        color: 'var(--secondary-color)',
                        fontSize: isMobile ? '1.1rem' : '0.95rem',
                        fontWeight: '600',
                        marginTop: '1rem',
                        marginBottom: '0.3rem',
                        textAlign: 'center',
                        letterSpacing: '0.02em',
                      }}>
                        {item.title}
                      </h3>
                      
                      <p style={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: isMobile ? '0.85rem' : '0.75rem',
                        textAlign: 'center',
                        margin: 0,
                        lineHeight: 1.4,
                        opacity: 0.9,
                      }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div className="carousel-indicators" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            margin: '2.5rem auto 0',
            position: 'relative',
            zIndex: 10
          }}>
            {features.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleIndicatorClick(index)}
                style={{
                  width: index === activeIndex ? '20px' : '6px',
                  height: '6px',
                  borderRadius: index === activeIndex ? '10px' : '50%',
                  border: 'none',
                  backgroundColor: index === activeIndex ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  padding: 0,
                  transform: index === activeIndex ? 'scale(1)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .carousel-container {
          perspective: 2000px;
          position: relative; 
          z-index: 1;
        }
        
        .carousel-3d {
          transform-style: preserve-3d;
          transform-origin: center center;
          position: relative;
          z-index: 1;
        }
        
        .carousel-item {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        
        .what-to-expect-card {
          backface-visibility: hidden;
          transform-style: preserve-3d;
          position: relative;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .what-to-expect-card:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 215, 0, 0.5) !important;
          border-color: rgba(255, 215, 0, 0.7) !important;
        }
        
        .what-to-expect-card:hover .card-image {
          transform: scale(1.1) !important;
        }
        
        .indicator.active {
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
        }
        
        .carousel-indicators {
          margin-top: 1.5rem;
          position: relative;
          padding-top: 1rem;
        }
        
        /* Spectacular Animations */
        .spectacular-next {
          animation: spectacularNext 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        .spectacular-prev {
          animation: spectacularPrev 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        .initial-animation {
          animation: initialLoad 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        @keyframes spectacularNext {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(15deg) scale(0.95); }
          100% { transform: rotateY(0deg); }
        }
        
        @keyframes spectacularPrev {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-15deg) scale(0.95); }
          100% { transform: rotateY(0deg); }
        }
        
        @keyframes initialLoad {
          0% { transform: rotateY(40deg) scale(0.7); opacity: 0; }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
        
        .card-image {
          transform: scale(1.05);
          transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          filter: saturate(1.05);
        }
        
        .center .card-image {
          animation: pulseImage 5s infinite alternate ease-in-out;
        }
        
        @keyframes pulseImage {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.12); }
        }
        
        /* Card content animation */
        .what-to-expect-card:hover h3 {
          color: #fff !important;
          transition: color 0.3s ease;
        }
        
        .what-to-expect-card:hover .icon-wrapper {
          border-color: rgba(255, 215, 0, 0.4) !important;
          transition: border-color 0.3s ease;
        }
        
        /* High-end device enhancements */
        @supports (backdrop-filter: blur(10px)) {
          .what-to-expect-card {
            backdrop-filter: blur(10px);
            background-color: rgba(25, 25, 25, 0.75);
          }
          
          .icon-wrapper {
            backdrop-filter: blur(5px);
          }
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .carousel-outer-container {
            padding: 0 40px;
          }
          
          /* Fix position of icon in mobile view */
          .icon-wrapper {
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
          
          /* Mobile Animation */
          .spectacular-next {
            animation: mobileNext 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          
          .spectacular-prev {
            animation: mobilePrev 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          
          @keyframes mobileNext {
            0% { transform: translateX(0); opacity: 1; }
            50% { transform: translateX(-30px); opacity: 0; }
            51% { transform: translateX(30px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes mobilePrev {
            0% { transform: translateX(0); opacity: 1; }
            50% { transform: translateX(30px); opacity: 0; }
            51% { transform: translateX(-30px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
        }
      `}</style>
    </section>
  );
};

export default WhatToExpect;