import { useInView } from 'react-intersection-observer';
import React, { useState, useEffect } from 'react';

const JoinMovement = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section id="join-movement" className="section" style={{
      backgroundColor: '#050505',
      paddingTop: isMobile ? '3.5rem' : '5rem',
      paddingBottom: isMobile ? '4rem' : '5.5rem',
      background: `
        linear-gradient(
          rgba(0, 0, 0, 0.8), 
          rgba(0, 0, 0, 0.85)
        ),
        url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden',
      filter: 'brightness(1.1) contrast(0.9)'
    }}>
      {/* Geometric decorative elements */}
      <div className="geometric-element left-top" style={{
        position: 'absolute',
        top: '10%',
        left: '-40px',
        width: '150px',
        height: '150px',
        border: '2px solid rgba(212, 175, 55, 0.15)',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        transform: 'rotate(-15deg)',
        opacity: 0.4,
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      <div className="geometric-element right-bottom" style={{
        position: 'absolute',
        bottom: '15%',
        right: '-60px',
        width: '180px',
        height: '180px',
        border: '2px solid rgba(212, 175, 55, 0.15)',
        borderRadius: '63% 37% 37% 63% / 43% 37% 63% 57%',
        transform: 'rotate(20deg)',
        opacity: 0.4,
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Main gradient overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4) 60%, transparent)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Golden glow effects */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Particles animation removed as requested */}
      
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <div className="content-wrapper" style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          padding: isMobile ? '0 1rem' : '0 1.5rem',
          position: 'relative'
        }}>        
          <h2 className="text-center" style={{ 
            maxWidth: '700px', 
            margin: '0 auto 1rem',
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
            background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(212, 175, 55, 0.9))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            display: 'inline-block'
          }}>
            Join the Movement
          </h2>
          
          <p className="text-center" style={{
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            maxWidth: '600px',
            margin: isMobile ? '1rem auto 2rem' : '1.2rem auto 2.5rem',
            color: 'var(--secondary-color)',
            padding: '0 0.8rem',
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: '0.01em',
            textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)'
          }}>
            Want to attend? Want to partner? Start here.
          </p>
          
          <div className="join-buttons-container" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '1.25rem' : 'clamp(1.5rem, 3vw, 2.5rem)',
            flexWrap: 'wrap',
            padding: '0 0.8rem',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            maxWidth: isMobile ? '280px' : '650px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <a 
              href="https://forms.gle/S4ey4bQbQHV3Y4ir8"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                textDecoration: 'none',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              <button 
                className="btn primary-join-btn"
                style={{
                  width: isMobile ? '100%' : 'auto',
                  minWidth: isMobile ? 'auto' : 'clamp(180px, 35vw, 230px)',
                  fontSize: isMobile ? '0.9rem' : 'clamp(0.9rem, 1.5vw, 1rem)',
                  padding: isMobile ? '0.8rem 1.2rem' : 'clamp(0.8rem, 1.5vw, 1rem) clamp(1.5rem, 2.5vw, 1.8rem)',
                  margin: isMobile ? '0 auto' : '0',
                  minHeight: isMobile ? '48px' : '54px',
                  fontWeight: '600',
                  letterSpacing: '0.02em',
                  borderRadius: '10px',
                  boxShadow: '0 6px 20px rgba(212, 175, 55, 0.25), 0 3px 8px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, rgba(212, 175, 55, 1), rgba(182, 149, 35, 1))',
                  color: '#000'
                }}
              >
                Register Now
              </button>
            </a>
            
            <button 
              className="btn btn-outline secondary-join-btn"
              onClick={() => window.open('https://wa.me/919815088426', '_blank')}
              style={{
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : 'clamp(180px, 35vw, 230px)',
                fontSize: isMobile ? '0.9rem' : 'clamp(0.9rem, 1.5vw, 1rem)',
                padding: isMobile ? '0.8rem 1.2rem' : 'clamp(0.8rem, 1.5vw, 1rem) clamp(1.5rem, 2.5vw, 1.8rem)',
                minHeight: isMobile ? '48px' : '54px',
                fontWeight: '500',
                letterSpacing: '0.02em',
                borderRadius: '10px',
                borderWidth: '1.5px',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                borderColor: 'rgba(212, 175, 55, 0.6)',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(20, 20, 20, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: 'var(--secondary-color)'
              }}
            >
              Talk to Our Team
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .primary-join-btn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent
          );
          transform: rotate(45deg);
          transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 1;
        }
        
        .primary-join-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(212, 175, 55, 0.35), 0 6px 12px rgba(0, 0, 0, 0.3);
          filter: brightness(1.1);
        }
        
        .primary-join-btn:hover::before {
          left: 150%;
          transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .secondary-join-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .secondary-join-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(212, 175, 55, 0.2),
            transparent
          );
          transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .secondary-join-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.35), 0 6px 12px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.8);
          background-color: rgba(30, 30, 30, 0.6);
        }
        
        .secondary-join-btn:hover::before {
          left: 100%;
        }
        
        .geometric-element {
          animation: float 8s ease-in-out infinite;
        }
        
        .geometric-element.left-top {
          animation-delay: 0s;
        }
        
        .geometric-element.right-bottom {
          animation-delay: -4s;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(-15deg);
          }
          50% {
            transform: translate(10px, -10px) rotate(0deg);
          }
          100% {
            transform: translate(0, 0) rotate(-15deg);
          }
        }
        
        /* Particles animation styles removed as requested */
      `}</style>
    </section>
  );
};

export default JoinMovement;