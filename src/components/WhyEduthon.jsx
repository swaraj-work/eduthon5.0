import { useInView } from 'react-intersection-observer';
import { FaCheck, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import ImageCarousel from './ImageCarousel';

const WhyEduthon = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const reasons = [
    {
      text: "India's only education summit uniting 500+ decision-makers under one roof",
      // image: "../src/assets/images/Testimonial/testimonial-1.jpg"
      image: "https://ik.imagekit.io/patelswadesh/Testimonial/testimonial-1.jpg?updatedAt=1747727592098"
    },
    {
      text: "Sparks real conversations on curriculum, classrooms, and co-scholastic learning",
      // image: "../src/assets/images/Testimonial/testimonial-2.jpg"
      image: "https://ik.imagekit.io/patelswadesh/Testimonial/testimonial-2.jpg?updatedAt=1747727592987"
    },
    {
      text: "Platform for diverse voices: educators, youth, policymakers, entrepreneurs",
      // image: "../src/assets/images/Testimonial/testimonial-3.jpg"
      image: "https://ik.imagekit.io/patelswadesh/Testimonial/testimonial-3.jpg?updatedAt=1747727592533"
    },
    {
      text: "Known for inspiring action — not just dialogue",
      // image: "../src/assets/images/Testimonial/testimonial-4.jpg"
      image: "https://ik.imagekit.io/patelswadesh/Testimonial/testimonial-4.jpg?updatedAt=1747932531178"
      
    }
  ];

  const GraphicImages = [
    'https://ik.imagekit.io/patelswadesh/GraphicImages/1.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/2.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/3.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/4.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/5.png'
  ];

  return (
    <section id="why-eduthon" className="section" style={{
      backgroundColor: '#000000',
      paddingTop: isMobile ? '3rem' : '4.5rem',
      paddingBottom: isMobile ? '3rem' : '4.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="section-bg-gradient" style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.08) 0%, rgba(0, 0, 0, 0) 60%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
    
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="text-center" style={{ 
          maxWidth: '700px', 
          margin: '0 auto 0.7rem',
          fontSize: isMobile ? '1.3rem' : '1.7rem',
          fontWeight: 600,
          letterSpacing: '0.02em'
        }}>
          Why EDUTHON Matters?
        </h2>
        
        <p className="text-center" style={{
          fontSize: isMobile ? '0.85rem' : '1rem',
          maxWidth: '700px',
          margin: isMobile ? '0.7rem auto 2rem' : '1rem auto 2.5rem',
          color: 'var(--secondary-color)',
          padding: '0 1rem',
          lineHeight: 1.5,
          letterSpacing: '0.01em'
        }}>
          Not Just a Summit. A National Platform for Educational Change.
        </p>

        {/* Wide Carousel Card */}
        <div className="wide-carousel-card" style={{
          position: 'relative',
          width: isMobile ? '100%' :'52vw',
          maxWidth: '1200px',
          borderRadius: '16px',
          marginTop: isMobile ? 'clamp(2rem, 4vh, 2.5rem)' : 'clamp(2.5rem, 3vh, 3rem)',
          marginBottom: isMobile ? 'clamp(1rem, 2vh, 1.5rem)' : 'clamp(1rem, 2vh, 1.5rem)',
          marginLeft: 'auto',
          marginRight: 'auto',
          transform: 'scale(0.95)',
          transformOrigin: 'center top',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(clamp(8px, 2vw, 10px))',
          WebkitBackdropFilter: 'blur(clamp(8px, 2vw, 10px))',
          border: '1px solid rgba(255, 215, 0, 0.1)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: 'auto',
            paddingTop: '30%', // This creates the 10:3 ratio
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}>
              <ImageCarousel
                images={GraphicImages}
                isBackground={false}
                fullHeight={false}
              />
            </div>
          </div>
        </div>
        
        <div className="card why-card" style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: isMobile ? '1.5rem 1.25rem' : '1.7rem 1.8rem',
          borderRadius: '12px',
          background: 'rgba(30, 30, 30, 0.7)',
          boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '2px solid rgba(212, 175, 55, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="card-gradient-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0, 0, 0, 0) 50%)',
            pointerEvents: 'none',
            zIndex: 0
          }}></div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
            gridTemplateRows: isMobile ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)', 
            gap: isMobile ? '1.5rem' : '1.8rem',
            position: 'relative',
            zIndex: 1,
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {reasons.map((reason, index) => (
              <div key={index} className="reason-card" style={{
                display: 'flex',
                flexDirection: 'row',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: 'rgba(20, 20, 20, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                padding: '0',
                height: isMobile ? '100%' : '140px'
              }}>
                <div className="image-container" style={{
                  width: isMobile ? '100%' : '140px',
                  height: isMobile ? '120px' : '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  borderRight: isMobile ? 'none' : '1px solid rgba(212, 175, 55, 0.2)',
                  borderBottom: isMobile ? '1px solid rgba(212, 175, 55, 0.2)' : 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: isMobile ? '8px 8px 0 0' : '8px 0 0 8px',
                  flexShrink: 0
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <img 
                      src={reason.image} 
                      alt={`Eduthon - ${reason.text}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: 'transform 0.6s ease',
                        filter: 'contrast(1.05) brightness(1.05)',
                      }}
                      className="reason-image"
                    />
                  </div>
                </div>
                
                <div style={{
                  padding: isMobile ? '0.8rem' : '0.8rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  width: isMobile ? '100%' : 'calc(100% - 140px)',
                  height: '100%'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', width: '100%' }}>
                    <span style={{ 
                      color: 'var(--secondary-color)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: isMobile ? '22px' : '24px',
                      height: isMobile ? '22px' : '24px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.15)',
                      boxShadow: '0 2px 8px rgba(212, 175, 55, 0.2)',
                      marginTop: '0.2rem'
                    }}>
                      <FaCheck size={isMobile ? 10 : 12} />
                    </span>
                    <p style={{
                      fontSize: isMobile ? '0.85rem' : '0.92rem',
                      lineHeight: '1.5',
                      margin: 0,
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}>
                      {index == 2 ? <span>Platform for diverse voices: educators, youth, {isMobile ? <br /> : ''}policymakers, entrepreneurs</span> : reason.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            margin: isMobile ? '2rem 0 0' : '2.5rem 0 0',
            padding: isMobile ? '1.5rem 1rem' : '1.8rem 1.5rem',
            borderTop: '1px solid rgba(212, 175, 55, 0.3)',
            textAlign: 'center',
            background: 'rgba(212, 175, 55, 0.08)',
            borderRadius: '10px',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }} className="quote-container">
            <div className="quote-icon-left" style={{
              position: 'absolute',
              top: isMobile ? '0.8rem' : '1rem',
              left: isMobile ? '0.8rem' : '1rem',
              color: 'rgba(212, 175, 55, 0.3)',
            }}>
              <FaQuoteLeft size={isMobile ? 16 : 20} />
            </div>
            
            <p style={{
              fontSize: isMobile ? '0.8rem' : '1rem',
              fontStyle: 'italic',
              color: 'var(--secondary-color)',
              margin: 0,
              lineHeight: 1.6,
              letterSpacing: '0.01em',
              position: 'relative',
              fontWeight: 500
            }}>
              At EDUTHON, we don't just discuss the future of education — we <span style={{ color: '#FAD300', textTransform: 'uppercase', fontWeight: 600 }}>shape</span> it.
            </p>
            
            <div className="quote-icon-right" style={{
              position: 'absolute',
              bottom: isMobile ? '0.8rem' : '1rem',
              right: isMobile ? '0.8rem' : '1rem',
              color: 'rgba(212, 175, 55, 0.3)',
            }}>
              <FaQuoteRight size={isMobile ? 16 : 20} />
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .reason-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .reason-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25), 0 0 10px rgba(212, 175, 55, 0.2);
        }
        
        .reason-card:hover .reason-image {
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .reason-card {
            flex-direction: column;
            margin-bottom: 1.5rem;
          }
          
          .image-container {
            width: 100% !important;
            height: 120px !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(212, 175, 55, 0.2) !important;
          }
        }
        
        .quote-container {
          transition: all 0.3s ease;
        }
        
        .quote-container:hover {
          background: rgba(212, 175, 55, 0.12);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 768px) {
          .reason-card:hover {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </section>
  );
};

export default WhyEduthon;