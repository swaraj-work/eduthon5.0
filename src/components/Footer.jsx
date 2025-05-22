import { FaEnvelope, FaPhone, FaGlobe, FaInstagram, FaLongArrowAltUp } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile);
    
    // Scroll event for "back to top" button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" style={{
      backgroundColor: '#0a0a0a',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(212, 175, 55, 0.2)',
      paddingTop: isMobile ? '1.2rem' : '4rem',
      paddingBottom: isMobile ? '1rem' : '3.5rem'
    }}>
      {/* Background elements */}
      <div className="footer-bg-pattern" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 1px, transparent 1px)',
        backgroundSize: '25px 25px',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
      
      <div className="footer-bg-glow" style={{
        position: 'absolute',
        top: '-100px',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
      
      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div className="footer-top" style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'flex-start',
          marginBottom: isMobile ? '0.8rem' : '3rem',
          gap: isMobile ? '0.8rem' : '1rem'
        }}>
          {/* Brand section */}
          <div className="footer-brand" style={{
            flex: isMobile ? '1 1 100%' : '0 0 30%',
            textAlign: isMobile ? 'center' : 'left',
            marginBottom: isMobile ? '0' : 0
          }}>
            <div className="footer-logo" style={{
              marginBottom: isMobile ? '0.3rem' : '1.25rem'
            }}>
              <h3 style={{
                fontSize: isMobile ? '1rem' : '1.75rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                marginBottom: isMobile ? '0.2rem' : '0.5rem',
                background: 'linear-gradient(to right, #fff, var(--secondary-color))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                EDUTHON 5.0
              </h3>
              <div style={{
                width: isMobile ? '30px' : '100px',
                height: isMobile ? '1px' : '2px',
                background: 'linear-gradient(to right, var(--secondary-color), transparent)',
                margin: isMobile ? '0 auto' : '0'
              }}></div>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: isMobile ? '0.9rem' : '0.95rem',
              lineHeight: 1.5,
              maxWidth: '300px',
              margin: isMobile ? '0 auto' : '0',
              display: isMobile ? 'none' : 'block' /* Hide on mobile to save space */
            }}>
              Where AI meets Humanity - The next evolution of education begins here.
            </p>
          </div>
          
          {/* Contact links */}
          <div className="footer-links" style={{
            flex: isMobile ? '1 1 100%' : '0 0 60%',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'row',
            justifyContent: isMobile ? 'center' : 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-start',
            gap: isMobile ? '1.5rem' : '3rem',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            width: '100%'
          }}>
            <div className="contact-info" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '0.4rem' : '1.25rem',
              alignItems: isMobile ? 'flex-start' : 'flex-start',
              flex: isMobile ? '1 1 40%' : 'auto'
            }}>
              <h4 style={{
                fontSize: isMobile ? '0.7rem' : '1.1rem',
                fontWeight: 600,
                marginBottom: isMobile ? '0.15rem' : '0.5rem',
                color: 'var(--secondary-color)'
              }}>
                Contact Us
              </h4>
              <div className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.35rem' : '0.75rem'
              }}>
                <div className="icon-circle" style={{
                  width: isMobile ? '20px' : '36px',
                  height: isMobile ? '20px' : '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                  <FaEnvelope style={{ color: 'var(--secondary-color)', fontSize: isMobile ? '8px' : '14px' }} />
                </div>
                <a href="mailto:trinitichd@gmail.com" className="footer-link" style={{ 
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: isMobile ? '0.65rem' : '0.95rem',
                  transition: 'all 0.3s ease',
                  fontWeight: 400,
                  position: 'relative',
                  paddingBottom: '2px'
                }}>
                  trinitichd@gmail.com
                </a>
              </div>
              
              <div className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.35rem' : '0.75rem'
              }}>
                <div className="icon-circle" style={{
                  width: isMobile ? '20px' : '36px',
                  height: isMobile ? '20px' : '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                  <FaPhone style={{ color: 'var(--secondary-color)', fontSize: isMobile ? '8px' : '14px' }} />
                </div>
                <a href="tel:+919815088426" className="footer-link" style={{ 
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: isMobile ? '0.65rem' : '0.95rem',
                  transition: 'all 0.3s ease',
                  fontWeight: 400,
                  position: 'relative',
                  paddingBottom: '2px'
                }}>
                  +91 98150 88426
                </a>
              </div>
            </div>
            
            <div className="social-links" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '0.4rem' : '1.25rem',
              alignItems: isMobile ? 'flex-start' : 'flex-start',
              flex: isMobile ? '1 1 40%' : 'auto'
            }}>
              <h4 style={{
                fontSize: isMobile ? '0.7rem' : '1.1rem',
                fontWeight: 600,
                marginBottom: isMobile ? '0.15rem' : '0.5rem',
                color: 'var(--secondary-color)'
              }}>
                Follow Us
              </h4>
              <div className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.35rem' : '0.75rem'
              }}>
                <div className="icon-circle" style={{
                  width: isMobile ? '20px' : '36px',
                  height: isMobile ? '20px' : '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                  <FaGlobe style={{ color: 'var(--secondary-color)', fontSize: isMobile ? '8px' : '14px' }} />
                </div>
                <a href="https://www.triniti.org.in" target="_blank" rel="noreferrer" className="footer-link" style={{ 
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: isMobile ? '0.65rem' : '0.95rem',
                  transition: 'all 0.3s ease',
                  fontWeight: 400,
                  position: 'relative',
                  paddingBottom: '2px'
                }}>
                  www.triniti.org.in
                </a>
              </div>
              
              <div className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.35rem' : '0.75rem'
              }}>
                <div className="icon-circle" style={{
                  width: isMobile ? '20px' : '36px',
                  height: isMobile ? '20px' : '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                  <FaInstagram style={{ color: 'var(--secondary-color)', fontSize: isMobile ? '8px' : '14px' }} />
                </div>
                <a href="https://www.instagram.com/triniti_org" target="_blank" rel="noreferrer" className="footer-link" style={{ 
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: isMobile ? '0.65rem' : '0.95rem',
                  transition: 'all 0.3s ease',
                  fontWeight: 400,
                  position: 'relative',
                  paddingBottom: '2px'
                }}>
                  @triniti_org
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(212, 175, 55, 0.1)',
          paddingTop: isMobile ? '0.5rem' : '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.3rem' : '0'
        }}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: isMobile ? '0.6rem' : '0.9rem',
            fontWeight: 400,
            textAlign: isMobile ? 'center' : 'left'
          }}>
            © {currentYear} TRINITi | EDUTHON 5.0. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {/* <button 
        onClick={scrollToTop} 
        className="scroll-to-top"
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          width: isMobile ? '36px' : '40px',
          height: isMobile ? '36px' : '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(212, 175, 55, 0.15)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: showScrollTop ? 1 : 0,
          visibility: showScrollTop ? 'visible' : 'hidden',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        <FaLongArrowAltUp style={{ color: 'var(--secondary-color)', fontSize: '18px' }} />
      </button> */}
      
      <style>{`
        .site-footer a.footer-link {
          position: relative;
        }
        
        .site-footer a.footer-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--secondary-color);
          transition: width 0.3s ease;
        }
        
        .site-footer a.footer-link:hover::after {
          width: 100%;
        }
        
        .site-footer a.footer-link:hover {
          color: var(--secondary-color) !important;
          transform: translateX(2px);
        }
        
        .site-footer a.nav-link:hover {
          color: var(--secondary-color) !important;
          transform: translateY(-1px);
        }
        
        .site-footer .contact-item:hover .icon-circle {
          background-color: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.5);
          transform: scale(1.1);
        }
        
        .scroll-to-top:hover {
          background-color: rgba(212, 175, 55, 0.25) !important;
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 768px) {
          .site-footer {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 