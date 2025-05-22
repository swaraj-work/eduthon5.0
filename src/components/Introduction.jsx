import { useInView } from 'react-intersection-observer';
import React, { useState, useEffect } from 'react';

const Introduction = () => {
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
    <section id="introduction" className="section" style={{
      backgroundColor: '#0c0c0c',
      paddingTop: isMobile ? '3rem' : '4.5rem',
      paddingBottom: isMobile ? '3rem' : '4.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="section-bg-gradient" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 10% 90%, rgba(212, 175, 55, 0.08) 0%, rgba(0, 0, 0, 0) 60%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="text-center" style={{
          maxWidth: '850px',
          margin: '0 auto 1.2rem',
          fontSize: isMobile ? '1.3rem' : '1.7rem',
          padding: '0 0.6rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.95))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          About EDUTHON 5.0
        </h2>

        <div style={{
          maxWidth: '750px',
          margin: '0 auto',
          lineHeight: '1.7',
          fontSize: isMobile ? '0.9rem' : 'clamp(0.9rem, 1.8vw, 1rem)',
          padding: '0 1rem',
          textAlign: isMobile ? 'center' : 'left',
          letterSpacing: '0.01em',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          <p style={{ marginBottom: isMobile ? '1.4rem' : '1.8rem' }}>
            EDUTHON is India's most dynamic summit on educational innovation — an annual gathering of 500+ school principals, policymakers, EdTech founders, academic visionaries, and cultural influencers.
          </p>

          <div className="intro-image-card" style={{
            width: '100%',
            maxWidth: isMobile ? '90%' : '700px',
            margin: '0 auto',
            marginBottom: isMobile ? '1.8rem' : '2.4rem',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            position: 'relative',
            background: 'rgba(20, 20, 20, 0.7)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            cursor: 'pointer',
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 35px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
            }}
          >
            <div style={{
              padding: isMobile ? '12px 12px 8px' : '16px 16px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
            }}>
              <div style={{
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                fontWeight: 600,
                color: 'var(--secondary-color)',
              }}>
                AI & Education Innovation
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                EDUTHON 5.0
              </div>
            </div>

            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1682159672286-40790338349b?q=80&w=2158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI and Education Innovation"
                style={{
                  width: '100%',
                  height: isMobile ? '160px' : '280px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.8s ease',
                }}
                onMouseOver={(e) => { e.target.style.transform = 'scale(1.05)' }}
                onMouseOut={(e) => { e.target.style.transform = 'scale(1)' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0) 80%)',
                padding: '45px 20px 15px',
              }}></div>
            </div>

            <div style={{
              padding: isMobile ? '12px' : '16px',
              borderTop: '1px solid rgba(212, 175, 55, 0.15)'
            }}>
              <p style={{
                margin: 0,
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                lineHeight: 1.5
              }}>
                Where technology empowers human potential and transforms the educational landscape
              </p>
            </div>
          </div>

          <p style={{ marginBottom: isMobile ? '1.4rem' : '1.8rem' }}>
            After 4 successful editions, this landmark summit returns with EDUTHON 5.0 unleashing a transformative theme:
          </p>

          <div className="theme-highlight" style={{
            fontSize: isMobile ? '0.8rem' : 'clamp(1.1rem, 2.5vw, 1.3rem)',
            fontWeight: '600',
            textAlign: 'center',
            margin: isMobile ? '1.8rem 0' : '2.2rem 0',
            padding: isMobile ? '1.2rem 0.8rem' : '1.6rem 1.4rem',
            color: 'var(--secondary-color)',
            fontStyle: 'italic',
            background: 'rgba(212, 175, 55, 0.08)',
            borderRadius: '10px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}>
            <span className="quote-mark left" style={{
              position: 'absolute',
              top: isMobile ? '4px' : '8px',
              left: isMobile ? '6px' : '12px',
              fontSize: isMobile ? '2rem' : '2.5rem',
              lineHeight: 1,
              color: 'rgba(212, 175, 55, 0.15)',
              fontFamily: 'serif'
            }}>&#8220;</span>
            The Next of Education: AI Meets Humanity
            <span className="quote-mark right" style={{
              position: 'absolute',
              bottom: isMobile ? '4px' : '8px',
              right: isMobile ? '6px' : '12px',
              fontSize: isMobile ? '2rem' : '2.5rem',
              lineHeight: 1,
              color: 'rgba(212, 175, 55, 0.15)',
              fontFamily: 'serif'
            }}>&#8221;</span>
          </div>

          <p style={{ marginBottom: isMobile ? '1.4rem' : '1.8rem' }}>
            How do we harness Artificial Intelligence in education while preserving the essential human elements — empathy, creativity, and co-scholastic intelligence?
            This is where innovation and humanity converge — and where the future of education takes shape.
          </p>

          <div className="theme-highlight" style={{
            fontSize: isMobile ? '0.8rem' : 'clamp(1.1rem, 2.5vw, 1.3rem)',
            fontWeight: '600',
            textAlign: 'center',
            margin: isMobile ? '1.8rem 0' : '2.2rem 0',
            padding: isMobile ? '1.2rem 0.8rem' : '1.6rem 1.4rem',
            color: 'var(--secondary-color)',
            fontStyle: 'italic',
            background: 'rgba(212, 175, 55, 0.08)',
            borderRadius: '10px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}>
            <span className="quote-mark left" style={{
              position: 'absolute',
              top: isMobile ? '4px' : '8px',
              left: isMobile ? '6px' : '12px',
              fontSize: isMobile ? '2rem' : '2.5rem',
              lineHeight: 1,
              color: 'rgba(212, 175, 55, 0.15)',
              fontFamily: 'serif'
            }}>&#8220;</span>
            Welcome to the frontline of education's most important conversation!
            <span className="quote-mark right" style={{
              position: 'absolute',
              bottom: isMobile ? '4px' : '8px',
              right: isMobile ? '6px' : '12px',
              fontSize: isMobile ? '2rem' : '2.5rem',
              lineHeight: 1,
              color: 'rgba(212, 175, 55, 0.15)',
              fontFamily: 'serif'
            }}>&#8221;</span>
          </div>
        </div>
      </div>

      <style>{`
        .intro-quote-card {
          position: relative;
          overflow: hidden;
        }
        
        .intro-quote-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0) 60%);
          z-index: 0;
        }
        
        .theme-highlight {
          transition: all 0.3s ease;
        }
        
        .theme-highlight:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
          border-color: rgba(212, 175, 55, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Introduction;