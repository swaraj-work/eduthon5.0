import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaCheck, FaArrowLeft, FaCrown, FaGem, FaMedal, FaAward, FaStore, FaTable } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SponsorshipTiers = () => {
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

  // Parallax effect for background
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleParallax = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.05}px)`;
      }
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const sponsorshipTiers = [
    {
      category: 'PLATINUM',
      amount: 'Booked',
      deliverables: [
        'Powered by Chitkara University'
      ],
      color: '#e5e4e2',
      highlight: true,
      icon: <FaCrown size={24} />,
      gradient: 'linear-gradient(135deg, #e5e4e2 0%, #b8b8b8 100%)',
      shadowColor: 'rgba(229, 228, 226, 0.5)'
    },
    {
      category: 'GOLD',
      amount: '10,00,000/- +GST',
      deliverables: [
        '25 minutes exclusive slot (for product launch)',
        '5 standees and stall for product display',
        'A relevant podcast',
        'Database sharing',
        'Promotional material in the invite bags',
        'Social Media Advertisements and Media coverage',
        'Prominent branding in the flex, stage backdrop, entry gate, sponsors\' board, and event flags',
        'Organisation logo in event announcements (print & digital)'
      ],
      color: '#FFD700',
      count: '(2)',
      icon: <FaGem size={24} />,
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFC400 100%)',
      shadowColor: 'rgba(255, 215, 0, 0.5)'
    },
    {
      category: 'SILVER',
      amount: '8,00,000/- +GST',
      deliverables: [
        '3 standees and prominent stall',
        'Panel seat and special mention',
        'Intro video will be played (4 minutes)',
        'A relevant podcast',
        'Promotional material in the invite bags',
        'Prominent branding in the flex, standees, backdrop, social media',
        'Media coverage',
        'Database sharing'
      ],
      color: '#C0C0C0',
      count: '(2)',
      icon: <FaMedal size={24} />,
      gradient: 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)',
      shadowColor: 'rgba(192, 192, 192, 0.5)'
    },
    {
      category: 'BRONZE',
      amount: '4,00,000/- +GST',
      deliverables: [
        '2 standees',
        'Special mention Logo branding',
        'Social Media Advertisement',
        'For stall occupancy charges apply'
      ],
      color: '#CD7F32',
      icon: <FaAward size={24} />,
      gradient: 'linear-gradient(135deg, #CD7F32 0%, #B87333 100%)',
      shadowColor: 'rgba(205, 127, 50, 0.5)'
    },
    {
      category: 'STALL',
      amount: '50,000/- + GST',
      deliverables: [
        'Strategically placed stall outside the Grand Ballroom where Hi-tea will be served'
      ],
      color: '#2E8B57',
      icon: <FaStore size={24} />,
      gradient: 'linear-gradient(135deg, #2E8B57 0%, #267349 100%)',
      shadowColor: 'rgba(46, 139, 87, 0.5)'
    },
    {
      category: 'Desk Area',
      amount: '25,000/- +GST',
      deliverables: [
        'Strategically placed Desk Area outside the Grand Ballroom where Hi-tea will be served'
      ],
      color: '#2E8B57',
      icon: <FaTable size={24} />,
      gradient: 'linear-gradient(135deg, #2E8B57 0%, #267349 100%)',
      shadowColor: 'rgba(46, 139, 87, 0.5)'
    }
  ];

  const otherOpportunities = [
    'Speaking Opportunities',
    'Event Mixer Sponsorship',
    'After-party Sponsorship',
    'Podcast Sponsor Opportunities'
  ];

  // Animation variants for framer motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className={`section ${isMobile ? 'mt-[-10px]' : 'mt-[-144px]'}`} style={{
      backgroundColor: '#0c0c0c',
      paddingTop: isMobile ? '2rem' : '4rem',
      paddingBottom: isMobile ? '3rem' : '4rem',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <motion.div variants={itemVariants}>
        <Link
          to="/"
          className="back-button"
          style={{
            position: 'fixed',
            top: '1.25rem',
            left: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            backgroundColor: 'rgba(15, 15, 15, 0.6)',
            color: '#D4AF37',
            transition: 'all 0.2s ease',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
            fontSize: '0.9rem',
            transform: 'translateX(0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-3px)';
            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.backgroundColor = 'rgba(15, 15, 15, 0.6)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateX(-1px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateX(-3px)';
          }}
          aria-label="Back to homepage"
        >
          <FaArrowLeft />
        </Link>
      </motion.div>
      {/* Animated background elements */}
      <div className="animated-bg" ref={parallaxRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              position: 'absolute',
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }} />
          ))}
        </div>
        <div className="gradient-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(12, 12, 12, 0.5) 0%, rgba(12, 12, 12, 0.9) 100%)',
          zIndex: 1
        }} />
      </div>

      <div className="container" style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 1rem',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}>
        <motion.div
          ref={ref}
          className="content"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={headerVariants} className="header-content" style={{
            position: 'relative',
            marginBottom: isMobile ? '1.2rem' : '2rem',
            marginTop: isMobile ? '-3rem' : '2rem',
            height: isMobile ? '200px' : '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'end',

          }}>
            <div className="glowing-circle" style={{
              position: 'absolute',
              top: isMobile ? '-50px' : '-80px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: isMobile ? '150px' : '200px',
              height: isMobile ? '100px' : '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0) 70%)',
              filter: 'blur(20px)',
              zIndex: -1
            }} />

            <h1 className="text-center" style={{
              fontSize: isMobile ? '1.6rem' : '2.2rem',
              fontWeight: 'bold',
              marginBottom: '0.8rem',
              background: 'linear-gradient(90deg, var(--secondary-color) 0%, #FFF8E1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              position: 'relative'
            }}>
              Sponsorship Tiers
              <div className="underline" style={{
                width: isMobile ? '80px' : '120px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, var(--secondary-color), transparent)',
                margin: '0.4rem auto',
                borderRadius: '2px'
              }} />
            </h1>

            <p className="text-center" style={{
              fontSize: isMobile ? '0.85rem' : '1rem',
              maxWidth: '700px',
              margin: '0 auto 0.8rem',
              color: '#e0e0e0',
              lineHeight: 1.5
            }}>
              Partner with EDUTHON 5.0 and position your brand at the forefront of educational innovation
            </p>
          </motion.div>

          <motion.div
            className="sponsorship-tiers"
            variants={containerVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            {sponsorshipTiers.map((tier, index) => (
              <motion.div
                key={index}
                className="tier-card"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: `0 15px 30px ${tier.shadowColor}, 0 5px 15px rgba(0, 0, 0, 0.5)`
                }}
                style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: `0 8px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)`,
                  border: 'none',
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transform: tier.highlight ? 'scale(1.03)' : 'scale(1)',
                  position: 'relative'
                }}
              >
                {/* Glowing border effect */}
                <div className="glow-effect" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '15px',
                  pointerEvents: 'none',
                  boxShadow: `0 0 15px ${tier.shadowColor}`,
                  opacity: 0.5,
                  zIndex: 0
                }} />

                <div className="tier-header" style={{
                  background: tier.gradient,
                  padding: '1rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div className="header-content" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <div className="title-area" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem'
                    }}>
                      <div className="icon-container" style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
                      }}>
                        {tier.icon}
                      </div>
                      <h3 style={{
                        margin: 0,
                        color: '#000',
                        fontSize: isMobile ? '1.1rem' : '1.25rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }}>
                        {tier.category} {tier.count && <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{tier.count}</span>}
                      </h3>
                    </div>
                    <div className="amount" style={{
                      marginLeft: isMobile ? '1rem' : 'auto',
                      fontWeight: 'bold',
                      color: '#000',
                      fontSize: isMobile ? '0.9rem' : '1.1rem',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(5px)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                      {tier.amount}
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="header-decoration" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    background: `radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.8) 0%, transparent 80%)`,
                    zIndex: 1
                  }} />
                </div>

                <div className="tier-body" style={{
                  padding: '1.2rem',
                  position: 'relative',
                  background: 'linear-gradient(to bottom, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.95))'
                }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {tier.deliverables.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                          marginBottom: '0.6rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.6rem',
                          fontSize: isMobile ? '0.75rem' : '0.85rem',
                          lineHeight: 1.4,
                          padding: '0.35rem',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          backdropFilter: 'blur(5px)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <div style={{
                          color: tier.color,
                          marginTop: '0.1rem',
                          flexShrink: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FaCheck size={10} />
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="other-opportunities"
            variants={itemVariants}
            style={{
              backgroundColor: 'rgba(26, 26, 26, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '1.5rem',
              marginTop: '2rem',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative elements */}
            <div className="glow-circle" style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0) 70%)',
              filter: 'blur(20px)',
              zIndex: 0
            }} />

            <motion.h3
              variants={itemVariants}
              style={{
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                marginBottom: '1.2rem',
                textAlign: 'center',
                color: 'var(--secondary-color)',
                position: 'relative',
                fontWeight: 'bold',
                textShadow: '0 2px 8px rgba(212, 175, 55, 0.3)'
              }}
            >
              OTHER SPONSORSHIP OPPORTUNITIES
              <div className="underline" style={{
                width: isMobile ? '60px' : '80px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--secondary-color), transparent)',
                margin: '0.3rem auto',
                borderRadius: '1px'
              }} />
            </motion.h3>

            <motion.div
              variants={containerVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                position: 'relative',
                zIndex: 1
              }}
            >
              {otherOpportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)'
                  }}
                  style={{
                    backgroundColor: 'rgba(42, 42, 42, 0.7)',
                    borderRadius: '8px',
                    padding: '0.6rem 1rem',
                    fontSize: isMobile ? '0.75rem' : '0.85rem',
                    border: '1px solid rgba(255, 215, 0, 0.15)',
                    color: '#e0e0e0',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  {opportunity}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{
              marginTop: '2rem',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Button glow effect */}
            <div className="button-glow" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '160px',
              height: '45px',
              borderRadius: '25px',
              background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
              filter: 'blur(12px)',
              zIndex: 0
            }} />

            <Link to="/register/sponsor" style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}>
              <motion.button
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  padding: isMobile ? '0.7rem 1.5rem' : '0.9rem 2rem',
                  background: 'linear-gradient(135deg, var(--secondary-color) 0%, #B8860B 100%)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 20px rgba(212, 175, 55, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  Register as a Sponsor
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                {/* Button shine effect */}
                <div className="shine" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  animation: 'shine 3s infinite',
                  zIndex: 1
                }} />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .back-button:hover {
          color: #fff;
          transform: translateX(-3px);
        }
        
        @media (max-width: 768px) {
          .sponsorship-tiers {
            grid-template-columns: 1fr;
          }
          
          .tier-card {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SponsorshipTiers; 