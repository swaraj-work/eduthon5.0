import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaLightbulb, FaLandmark, FaGlobe, FaStar } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import React from 'react';

const WhoWillAttend = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const cardsRef = useRef([]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 480);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Animation for cards when in view
    if (inView) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [inView]);

  const attendees = [
    {
      icon: <FaGraduationCap color="var(--secondary-color)" />,
      title: 'Principals & School Owners',
      description: 'Key decision-makers from leading educational institutions',
    },
    {
      icon: <FaLightbulb color="var(--secondary-color)" />,
      title: 'EdTech CXOs & Innovators',
      description: 'Pioneers developing next-generation learning solutions',
    },
    {
      icon: <FaLandmark color="var(--secondary-color)" />,
      title: 'Government Policy Leaders',
      description: 'Representatives shaping national education frameworks',
    },
    {
      icon: <FaGlobe color="var(--secondary-color)" />,
      title: 'Education Influencers & Media',
      description: 'Thought leaders and content creators in the education space',
    },
    {
      icon: <FaStar color="var(--secondary-color)" />,
      title: 'Youth Delegates',
      description: 'The voices of those most impacted by educational transformation',
    },
  ];

  return (
    <section id="who-will-attend" className="section who-will-attend-section" style={{
      position: 'relative',
      backgroundColor: '#0c0c0c',
      paddingTop: isMobile ? '4rem' : '7rem',
      paddingBottom: isMobile ? '4rem' : '7rem',
      overflow: 'hidden',
    }}>
      {/* Background patterns */}
      <div className="bg-pattern-dots" style={{
        position: 'absolute',
        top: isMobile ? '10%' : '15%',
        right: isMobile ? '-50px' : '5%',
        width: isMobile ? '100px' : '200px',
        height: isMobile ? '100px' : '200px',
        backgroundImage: 'radial-gradient(rgba(255, 215, 0, 0.15) 2px, transparent 2px)',
        backgroundSize: '20px 20px',
        zIndex: 0,
        opacity: 0.6,
      }}></div>
      
      <div className="bg-pattern-dots" style={{
        position: 'absolute',
        bottom: isMobile ? '10%' : '15%',
        left: isMobile ? '-50px' : '5%',
        width: isMobile ? '100px' : '200px',
        height: isMobile ? '100px' : '200px',
        backgroundImage: 'radial-gradient(rgba(255, 215, 0, 0.15) 2px, transparent 2px)',
        backgroundSize: '20px 20px',
        zIndex: 0,
        opacity: 0.6,
      }}></div>
      
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header" style={{
          marginBottom: isMobile ? '2.5rem' : '5rem',
          textAlign: 'center',
          opacity: 1,
          visibility: 'visible'
        }}>
          <h2 style={{ 
            maxWidth: '800px', 
            margin: '0 auto 1.5rem',
            fontSize: isMobile ? '1.5rem' : '2.5rem',
            letterSpacing: '0.02em',
            fontWeight: 700,
            position: 'relative',
            display: 'inline-block',
            color: '#FFFFFF',
            opacity: 1,
            visibility: 'visible'
          }}>
            Who Will Attend?
          </h2>
          
          <p style={{
            fontSize: isMobile ? '0.9rem' : '1.3rem',
            maxWidth: '800px',
            margin: isMobile ? '1.5rem auto 0' : '2rem auto 0',
            color: '#FDC500',
            padding: '0 1rem',
            lineHeight: 1.6,
            letterSpacing: '0.01em',
            fontWeight: '500',
            opacity: 1,
            visibility: 'visible'
          }}>
            The Most Influential Room in Indian Education
          </p>
        </div>
        
        <div className="attendees-grid" style={{
          display: 'grid',
          gridTemplateColumns: isSmallMobile 
            ? '1fr' 
            : isMobile
              ? 'repeat(2, 1fr)'
              : isTablet
                ? 'repeat(3, 1fr)'
                : 'repeat(5, 1fr)',
          gap: isSmallMobile ? '0.8rem' : isMobile ? '1rem' : '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          alignItems: 'stretch',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          {attendees.map((attendee, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="card who-will-attend-card"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                margin: '0 auto',
                width: '100%',
                maxWidth: isSmallMobile ? '280px' : isMobile ? '160px' : 'none',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.95))',
                borderRadius: isMobile ? '12px' : '15px',
                border: '1px solid rgba(255, 215, 0, 0.15)',
                overflow: 'hidden',
                boxSizing: 'border-box',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                position: 'relative',
                opacity: 0,
                transform: 'translateY(20px)',
              }}
            >
              <div className="card-content" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                height: '100%',
                padding: isSmallMobile ? '0.8rem 0.6rem' : isMobile ? '1rem 0.6rem' : isTablet ? '2rem 1rem' : '3rem 1.75rem',
                width: '100%',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                <div className="icon-wrapper mr-auto" style={{
                  width: isSmallMobile ? '60px' : isMobile ? '50px' : isTablet ? '65px' : '80px',
                  height: isSmallMobile ? '60px' : isMobile ? '50px' : isTablet ? '65px' : '80px',
                  marginBottom: isSmallMobile ? '0.3rem' : isMobile ? '0.1rem' : isTablet ? '0.8rem' : '1.75rem',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(212, 175, 55, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}>
                  <div className="icon-inner" style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'rgba(25, 25, 25, 0.8)',
                    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.2)',
                  }}>
                    {React.cloneElement(attendee.icon, { 
                      size: isSmallMobile ? 24 : isMobile ? 20 : isTablet ? 26 : 34 
                    })}
                  </div>
                  <div className="icon-glow" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    filter: 'blur(5px)',
                    zIndex: -1
                  }}></div>
                </div>
                
                <h3 className="card-title" style={{ 
                  fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.4rem' : isTablet ? '0.8rem' : '1.35rem',
                  marginBottom: isSmallMobile ? '0.6rem' : isMobile ? '0.4rem' : isTablet ? '0.9rem' : '1.5rem',
                  color: 'var(--secondary-color)',
                  fontWeight: '600',
                  lineHeight: 1.3,
                  textAlign: 'center',
                  minHeight: 'auto',
                  letterSpacing: '0.02em',
                  position: 'relative',
                  paddingBottom: isSmallMobile ? '0.6rem' : isMobile ? '0.4rem' : '0.75rem'
                }}>
                  {attendee.title}
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isSmallMobile ? '35px' : isMobile ? '30px' : '50px',
                    height: isSmallMobile ? '1.5px' : isMobile ? '1px' : '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
                    borderRadius: '2px'
                  }}></span>
                </h3>
                
                <p className="card-description" style={{ 
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.6rem' : isTablet ? '0.85rem' : '1rem',
                  margin: 0,
                  lineHeight: isSmallMobile ? 1.5 : isMobile ? 1.5 : 1.7,
                  textAlign: 'center',
                  flexGrow: 1,
                  letterSpacing: '0.01em'
                }}>
                  {attendee.description}
                </p>
              </div>
              
              <div className="card-accent-top" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: isMobile ? '3px' : '5px',
                background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent)',
                opacity: 0,
                transition: 'opacity 0.4s ease'
              }}></div>
              
              <div className="card-bg-pattern" style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                opacity: 0.04,
                backgroundImage: 'radial-gradient(circle at 70% 20%, rgba(212, 175, 55, 0.4) 0%, transparent 25%)',
                zIndex: 0
              }}></div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .who-will-attend-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(to right, rgba(212, 175, 55, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
        }
        
        .who-will-attend-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        
        .who-will-attend-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35), 0 10px 20px rgba(255, 215, 0, 0.15);
          border-color: rgba(255, 215, 0, 0.4);
        }
        
        .who-will-attend-card:hover .icon-wrapper {
          transform: translateY(-5px) translateX(-50%);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 8px 15px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.5);
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.08));
        }
        
        .who-will-attend-card:hover .card-accent-top {
          opacity: 1;
        }
        
        .who-will-attend-card:hover .card-title {
          color: #fff;
        }
        
        .who-will-attend-card:active {
          transform: translateY(-2px);
          transition: transform 0.2s;
        }
        
        @media (min-width: 769px) and (max-width: 1023px) {
          .attendees-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1.5rem !important;
            padding: 0 1.5rem !important;
          }
          
          .who-will-attend-section {
            padding-top: 5rem !important;
            padding-bottom: 5rem !important;
          }
          
          .section-header {
            margin-bottom: 3.5rem !important;
          }
          
          .section-header h2 {
            font-size: 2rem !important;
          }
          
          .section-header p {
            font-size: 1.1rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 1.5rem !important;
          }
          
          .section-header p {
            font-size: 0.9rem !important;
            margin-top: 1.5rem !important;
          }
          
          .who-will-attend-card:hover {
            transform: translateY(-4px);
          }
          
          .card-title {
            font-size: 0.85rem !important;
            line-height: 1.25 !important;
          }
          
          .card-description {
            font-size: 0.72rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .attendees-grid {
            grid-template-columns: 1fr !important;
          }
          
          .who-will-attend-card {
            margin: 0 auto !important;
            width: 85% !important;
            max-width: 280px !important;
          }
          
          .card-title {
            font-size: 1.05rem !important;
          }
          
          .card-description {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhoWillAttend;