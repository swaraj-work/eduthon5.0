import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import React, { useEffect, useState, useRef, createRef } from 'react';
import { Link } from 'react-router-dom';

const Legacy = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeEdition, setActiveEdition] = useState(null);
    const [visibleEntries, setVisibleEntries] = useState({});
    const sectionRef = useRef(null);
    const entryRefs = useRef([]);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        const sectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    sectionObserver.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        const entryObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const id = Number(entry.target.dataset.id);
                    setVisibleEntries(prev => ({
                        ...prev,
                        [id]: entry.isIntersecting
                    }));
                });
            },
            { 
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px' // Starts fading out 100px before leaving viewport
            }
        );

        if (sectionRef.current) {
            sectionObserver.observe(sectionRef.current);
        }

        // Observe each timeline entry
        entryRefs.current.forEach(ref => {
            if (ref) entryObserver.observe(ref);
        });

        return () => {
            window.removeEventListener('resize', checkIsMobile);
            if (sectionRef.current) {
                sectionObserver.unobserve(sectionRef.current);
            }
            entryRefs.current.forEach(ref => {
                if (ref) entryObserver.unobserve(ref);
            });
        };
    }, []);

    // Create refs for all editions
    useEffect(() => {
        entryRefs.current = Array(editions.length).fill().map((_, i) => entryRefs.current[i] || createRef());
    }, []);

    const editions = [
        {
            id: 1,
            date: 'APR, 2022',
            title: '"Inaugural Edition"',
            description: 'with top educators, bureaucrats, and innovators.',
            image: 'https://ik.imagekit.io/patelswadesh/legacy/legacy1.jpg',
            // image: '../src/assets/images/legacy/legacy1.jpg',
            position: 'left'
        },
        {
            id: 2,
            date: 'DEC, 2022',
            title: '"Winds of Change"',
            description: 'with Chetan Bhagat',
            image: 'https://ik.imagekit.io/patelswadesh/legacy/legacy2.jpg',
            // image: '../src/assets/images/legacy/legacy2.jpg',
            position: 'right'
        },
        {
            id: 3,
            date: 'OCT, 2023',
            title: '"Reimagining Classrooms"',
            description: 'featuring Barkha Dutt',
            image: 'https://ik.imagekit.io/patelswadesh/legacy/legacy3.jpg',
            // image: '../src/assets/images/legacy/legacy3.jpg',
            position: 'left'
        },
        {
            id: 4,
            date: 'OCT, 2024',
            title: '"Chalkboard to Chatbot"',
            description: 'featuring Dr. Swaroop Sampat and Saurabh Dwivedi',
            image: 'https://ik.imagekit.io/patelswadesh/legacy/legacy4.jpg',
            // image: '../src/assets/images/legacy/legacy4.jpg',
            position: 'right'
        }
    ];

    return (
        <section
            id="legacy"
            className="section"
            ref={sectionRef}
            style={{
                backgroundColor: '#0a0a0a',
                paddingTop: isMobile ? '4rem' : '4.5rem',
                paddingBottom: isMobile ? '4rem' : '4.5rem',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            {/* Background elements */}
            <div className="bg-pattern"></div>

            <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                <div className={`section-header ${isVisible ? 'visible' : ''}`}>
                    <h2 className="section-title">
                        <span className="accent">Journey</span> of EDUTHON
                    </h2>
                    <p className="section-subtitle">
                        From a Local Gathering to a National Movement
                    </p>

                    <div className="stats-container">
                        <div className="stat-card">
                            <div className="stat-value">4</div>
                            <div className="stat-label">Editions</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">2000+</div>
                            <div className="stat-label">Attendees</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">50+</div>
                            <div className="stat-label">Influential Speakers</div>
                        </div>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className={`timeline-container ${isVisible ? 'visible' : ''}`}>
                    {/* Vertical Timeline Line */}
                    <div className="timeline-line"></div>

                    {/* Timeline Entries */}
                    {editions.map((edition, index) => (
                        <div
                            key={edition.id}
                            ref={el => entryRefs.current[index] = el}
                            data-id={edition.id}
                            className={`timeline-entry ${edition.position} ${activeEdition === edition.id ? 'active' : ''} ${visibleEntries[edition.id] ? 'entry-visible' : ''}`}
                            onMouseEnter={() => setActiveEdition(edition.id)}
                            onMouseLeave={() => setActiveEdition(null)}
                        >
                            {/* Date Marker */}
                            <div className="date-marker">
                                <div className="date-flag">{edition.date}</div>
                                <div className="date-dot"></div>
                            </div>

                            {/* Edition Card */}
                            <div className="edition-card">
                                <div className="edition-image-container">
                                    <img 
                                        src={edition.image} 
                                        alt={`EDUTHON ${edition.id}.0`} 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease-in-out',
                                            filter: 'contrast(1.05) brightness(1.05)',
                                            transform: activeEdition === edition.id ? 'scale(1.08)' : 'scale(1.02)',
                                        }}
                                    />
                                    <div className="image-overlay"></div>
                                </div>
                                <div className="badge-container">
                                    <div className="image-date-badge">{edition.date}</div>
                                    <div className="edition-badge">EDUTHON {edition.id}.0</div>
                                </div>
                                <div className="edition-content">
                                    <h3 className="edition-title">{edition.title}</h3>
                                    <p className="edition-description">{edition.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`section-footer ${isVisible ? 'visible' : ''}`}>
                    <p className="teaser-text">
                        Now, EDUTHON 5.0 asks the biggest question yet.
                    </p>
                    <Link to="/highlights" className="highlights-button">
                        <span>See Highlights from Past Editions</span>
                        <FaArrowRight className="arrow-icon" />
                    </Link>
                </div>
            </div>

            <style>{`
        /* Background */
        .bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(253, 197, 0, 0.05) 0%, transparent 25%),
            radial-gradient(circle at 80% 70%, rgba(253, 197, 0, 0.05) 0%, transparent 25%);
          opacity: 0.5;
          z-index: 1;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
          position: relative;
        }
        
        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: ${isMobile ? '3rem' : '4rem'};
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-header.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-title {
          font-size: ${isMobile ? '2.2rem' : '2.5rem'};
          color: white;
          margin-bottom: 0.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        
        .accent {
          color: #FDC500;
          position: relative;
        }
        
        .accent::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #FDC500;
          transform: scaleX(0.7);
          transform-origin: left;
          opacity: 0.6;
        }
        
        .section-subtitle {
          font-size: ${isMobile ? '1rem' : '1.1rem'};
          color: rgba(255, 255, 255, 0.8);
          margin: 0 auto 2rem;
          max-width: 700px;
        }
        
        /* Stats */
        .stats-container {
          display: flex;
          justify-content: center;
          gap: ${isMobile ? '1rem' : '2.5rem'};
          margin: 2rem auto;
          flex-wrap: wrap;
        }
        
        .stat-card {
          background: rgba(30, 30, 35, 0.4);
          border-radius: 12px;
          padding: ${isMobile ? '0.8rem 1.2rem' : '1.2rem 1.8rem'};
          min-width: ${isMobile ? '90px' : '120px'};
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .stat-value {
          font-size: ${isMobile ? '1.8rem' : '1.9rem'};
          font-weight: 700;
          color: #FDC500;
          margin-bottom: 0.3rem;
        }
        
        .stat-label {
          font-size: ${isMobile ? '0.8rem' : '0.9rem'};
          color: rgba(255, 255, 255, 0.8);
        }
        
        /* Timeline */
        .timeline-container {
          position: relative;
          padding: ${isMobile ? '2rem 0 2rem 20px' : '3rem 0'};
          margin: ${isMobile ? '2rem 0' : '4rem 0'};
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .timeline-container.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline-line {
          position: absolute;
          ${isMobile ?
                    'left: 0; top: 0; bottom: 0; width: 3px;' :
                    'left: 50%; top: 0; bottom: 0; width: 3px; transform: translateX(-50%);'}
          background: #FDC500;
          opacity: 0.7;
          z-index: 2;
        }
        
        .timeline-entry {
          position: relative;
          margin-bottom: ${isMobile ? '5rem' : '5.5rem'};
          display: flex;
          ${isMobile ? 'flex-direction: column;' : ''}
          ${!isMobile ? 'align-items: center; justify-content: center;' : ''}
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          opacity: 0;
          transform: translateY(40px);
        }
        
        .timeline-entry.entry-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline-entry.active {
          z-index: 10;
        }
        
        /* Entry appearance animation with different delays */
        .timeline-entry:nth-child(1) {
          transition-delay: 0.1s;
        }
        
        .timeline-entry:nth-child(2) {
          transition-delay: 0.2s;
        }
        
        .timeline-entry:nth-child(3) {
          transition-delay: 0.3s;
        }
        
        .timeline-entry:nth-child(4) {
          transition-delay: 0.4s;
        }
        
        /* Date Marker */
        .date-marker {
          position: relative;
          ${isMobile ?
                    'margin-bottom: 1.5rem; margin-left: 2rem;' :
                    'position: absolute; left: 50%; transform: translateX(-50%);'}
          z-index: 5;
        }
        
        .date-flag {
          background: #FDC500;
          color: #000;
          font-weight: 700;
          padding: 0.5rem 1rem;
          ${isMobile ?
                    'border-radius: 8px; position: absolute; left: 20px; top: -15px;' :
                    'position: absolute; left: 50%; transform: translateX(-50%); top: -45px; border-radius: 8px;'
                }
          white-space: nowrap;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          ${!isMobile ? 'opacity: 0.7;' : ''}
          display: none;
        }
        
        .active .date-flag {
          transform: ${isMobile ? 'none' : 'translateX(-50%) scale(1.1)'};
          opacity: 1;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .date-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #111;
          border: 3px solid #FDC500;
          ${isMobile ?
                    'position: absolute; left: -8px; top: 0;' :
                    'position: absolute; left: 50%; top: 0; transform: translateX(-50%);'
                }
          z-index: 5;
          transition: all 0.3s ease;
        }
        
        .active .date-dot {
          transform: ${isMobile ? 'scale(1.3)' : 'translateX(-50%) scale(1.3)'};
          box-shadow: 0 0 15px rgba(253, 197, 0, 0.5);
        }
        
        /* Edition Card */
        .edition-card {
          background: rgba(25, 25, 30, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          max-width: ${isMobile ? '100%' : '38%'};
          transition: all 0.3s ease;
          position: relative;
          ${isMobile ? '' : 'margin-top: 3rem;'}
          ${!isMobile ? 'margin-left: 0; margin-right: 1rem;' : ''}
        }
        
        .badge-container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0.4rem 1rem;
          margin: 0.5rem 0;
          border-bottom: 1px solid rgba(253, 197, 0, 0.15);
        }
        
        .edition-badge {
          display: inline-block;
          background: linear-gradient(135deg, #FDC500, #E0A800);
          color: #0a0a0a;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: ${isMobile ? '0.7rem' : '0.75rem'};
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(253, 197, 0, 0.25);
          margin: 0;
        }
        
        .image-date-badge {
          position: static;
          display: block;
          width: fit-content;
          margin: 0;
          background-color: rgba(45, 45, 50, 0.85);
          color: #FDC500;
          padding: 0.3rem 0.8rem;
          border-radius: 5px;
          font-size: ${isMobile ? '0.7rem' : '0.75rem'};
          font-weight: 600;
          top: auto;
          right: auto;
          z-index: auto;
          text-shadow: none;
          border: none;
        }
        
        .timeline-entry.left .edition-card {
          margin-left: auto;
          margin-right: calc(50% + 40px);
        }
        
        .timeline-entry.right .edition-card {
          margin-left: calc(50% + 40px);
          margin-right: auto;
        }
        
        .timeline-entry.active .edition-card {
          transform: ${isMobile ? 'scale(1.02)' : 'scale(1.03)'};
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.4), 0 0 15px rgba(253, 197, 0, 0.1);
          border-color: rgba(253, 197, 0, 0.35);
        }
        
        /* Entry fade-out effect */
        .timeline-entry:not(.entry-visible) {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .edition-image-container {
          height: 200px;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(253, 197, 0, 0.4);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, 
            rgba(0, 0, 0, 0), 
            rgba(0, 0, 0, 0.4));
        }
        
        .edition-content {
          padding: ${isMobile ? '1.5rem' : '1.2rem'};
          color: #fff;
          ${!isMobile ? 'text-align: left;' : ''}
        }
        
        .edition-title {
          font-size: ${isMobile ? '1.3rem' : '1.1rem'};
          font-weight: 700;
          margin-bottom: 0.7rem;
          color: #fff;
        }
        
        .edition-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: ${isMobile ? '0.95rem' : '0.85rem'};
          line-height: 1.5;
        }
        
        /* Footer */
        .section-footer {
          text-align: center;
          margin-top: 3rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        
        .section-footer.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .teaser-text {
          font-size: ${isMobile ? '1.1rem' : '1.15rem'};
          color: #fff;
          margin-top: 0;
          margin-bottom: ${isMobile ? '0.5rem' : '0'};
          font-weight: 600;
          position: relative;
          display: inline-block;
          background: linear-gradient(90deg, #FDC500, #E0A800);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          text-shadow: 0 2px 10px rgba(253, 197, 0, 0.2);
          width: fit-content;
        }
                
        @keyframes pulse {
          0% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.05); }
          100% { transform: translateX(-50%) scale(1); }
        }
        
        .highlights-button {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          background: rgba(30, 30, 35, 0.5);
          color: #FDC500;
          border: 1px solid rgba(253, 197, 0, 0.3);
          padding: ${isMobile ? '0.8rem 1.5rem' : '0.9rem 1.8rem'};
          border-radius: 30px;
          font-size: ${isMobile ? '0.9rem' : '1rem'};
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .highlights-button:hover {
          background: rgba(253, 197, 0, 0.1);
          border-color: rgba(253, 197, 0, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .arrow-icon {
          font-size: ${isMobile ? '0.8rem' : '0.9rem'};
          transition: transform 0.3s ease;
        }
        
        .highlights-button:hover .arrow-icon {
          transform: translateX(5px);
        }
        
        /* For larger screens - fix positioning */
        @media (min-width: 992px) {
          .timeline-entry::before {
          content: '';
          position: absolute;
            top: 50px;
          width: 40px;
            height: 3px;
            background: rgba(253, 197, 0, 0.5);
            z-index: 1;
          }
          
          .timeline-entry.left::before {
            left: 50%;
          }
          
          .timeline-entry.right::before {
            right: 50%;
          }
        }
        
        /* Mobile Specific Styles */
        @media (max-width: 768px) {
          .section-title .accent {
            text-shadow: 0 0 10px rgba(253, 197, 0, 0.3);
          }

          .section-subtitle {
            font-size: 0.9rem;
            margin-bottom: 2.5rem;
            color: rgba(200, 200, 210, 0.8);
            letter-spacing: 0.01em;
          }

          .stats-container {
            gap: 1rem;
            margin: 2rem auto;
          }

          .stat-card {
            padding: 0.8rem 1.2rem;
            min-width: 85px;
            background: rgba(35, 35, 40, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.07); 
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          }
        
          .timeline-container {
            padding-top: 1rem;
          }

          .timeline-line {
            display: none;
          }
          
          .timeline-entry {
            width: 100%;
            margin-bottom: 3rem;
            padding-left: 0;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .timeline-entry.left,
          .timeline-entry.right {
            transform: none;
          }

          .timeline-entry.left .edition-card,
          .timeline-entry.right .edition-card {
            margin-left: auto;
            margin-right: auto;
            width: 90%;
            animation: cardFadeUp 0.6s ease-out 0.2s forwards;
            opacity: 0;
          }
          
          .date-marker {
            display: none;
          }
          
          .date-dot {
            display: none;
          }
          
          .edition-card {
            max-width: 100%; 
            padding: 1rem;
            text-align: center; 
            background: linear-gradient(145deg, rgba(40, 40, 45, 0.92), rgba(25, 25, 30, 0.97)); 
            border: 1px solid rgba(253, 197, 0, 0.2); 
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35); 
            border-radius: 12px; 
          }

          .timeline-entry.active .edition-card { 
            transform: scale(1.03); 
            box-shadow: 0 22px 50px rgba(0, 0, 0, 0.4), 0 0 15px rgba(253, 197, 0, 0.1);
            border-color: rgba(253, 197, 0, 0.35);
          }

          .edition-badge {
            font-size: 0.7rem;
            padding: 0.3rem 0.7rem; 
            margin: 0.4rem auto 0.6rem auto;
          }

          .image-date-badge {
            margin: 0;
            padding: 0.25rem 0.65rem; 
            font-size: 0.65rem; 
          }

          .edition-image-container {
            height: auto; 
            aspect-ratio: 16 / 9; 
            width: 100%; 
            border-radius: 12px;
            margin-bottom: 0;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            border: 2px solid rgba(253, 197, 0, 0.4);
          }
          
          .edition-image-container img { 
             width: 100%;
             height: 100%;
             object-fit: cover;
             filter: contrast(1.05) brightness(1.05);
             transition: transform 0.6s ease-in-out;
          }

          .edition-content { 
            text-align: left; 
            padding-top: 0.2rem;
          }

          .edition-title {
            font-size: 1.1rem; 
            margin-bottom: 0.5rem;
            color: #FFFFFF; 
            letter-spacing: 0.015em; 
          }

          .edition-description {
            font-size: 0.85rem;
            line-height: 1.7;
            color: rgba(225, 225, 235, 0.85);
          }

          .section-footer {
            padding: 0 1rem;
            margin-top: 1rem;
            gap: 0.5rem;
          }

          .teaser-text {
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }

          .highlights-button {
            font-size: 0.85rem;
            padding: 0.75rem 1.3rem;
          }

          .section-title .accent {
            text-shadow: 0 0 10px rgba(253, 197, 0, 0.3);
          }
        }
        
        /* Support for high-end devices */
        @supports (backdrop-filter: blur(10px)) {
          .stat-card, .edition-card, .highlights-button {
            backdrop-filter: blur(10px);
          }
        }

        @keyframes cardFadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .timeline-entry.active .edition-image-container img {
          transform: scale(1.08);
          filter: contrast(1.1) brightness(1.08) saturate(1.1);
        }
        
        .image-overlay {
          .timeline-entry.active .edition-card { 
            transform: scale(1.03); 
            box-shadow: 0 22px 50px rgba(0, 0, 0, 0.4), 0 0 15px rgba(253, 197, 0, 0.1);
            border-color: rgba(253, 197, 0, 0.35);
            /* No image scaling here for mobile active state needed if desktop is removed */
          }

          .edition-badge {
            font-size: 0.7rem;
            padding: 0.3rem 0.7rem; 
            margin: 0.4rem auto 0.6rem auto;
          }

          .image-date-badge {
            margin: 0.4rem auto;
            padding: 0.25rem 0.65rem;
            font-size: 0.65rem;
          }

          .edition-image-container {
            /* height: 180px; */
            height: auto;
            aspect-ratio: 16 / 9;
            border-radius: 8px;
            margin-bottom: 0;
          }
          
          .edition-card {
            max-width: 100%; 
            padding: 1rem;
            text-align: center; 
            background: linear-gradient(145deg, rgba(40, 40, 45, 0.92), rgba(25, 25, 30, 0.97)); 
            border: 1px solid rgba(253, 197, 0, 0.2); 
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35); 
            border-radius: 12px; 
            animation: cardFadeUp 0.6s ease-out 0.2s forwards;
            opacity: 0;
          }

          .edition-content { 
            text-align: left; 
            padding-top: 0.2rem;
          }

          .edition-title {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: #FFFFFF; 
            letter-spacing: 0.015em; 
          }

          .edition-description {
            font-size: 0.85rem;
            line-height: 1.7;
            color: rgba(225, 225, 235, 0.85);
          }
        }

        /* Enhanced Image Styling for Desktop */
        .edition-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease-in-out, filter 0.6s ease-in-out;
          transform: scale(1.02);
          backface-visibility: hidden;
          filter: contrast(1.05) brightness(1.05);
        }
        
        /* Target all potential active/hover states for enhanced zoom */
        .timeline-entry:hover .edition-image-container img,
        .timeline-entry.active .edition-image-container img,
        .edition-card:hover .edition-image-container img,
        .edition-card.active .edition-image-container img,
        .edition-image-container:hover img {
          transform: scale(1.08);
          transition: transform 0.6s ease-in-out, filter 0.6s ease-in-out;
          filter: contrast(1.1) brightness(1.08) saturate(1.1);
        }
        
        /* Make the image container visually enhanced */
        .edition-image-container {
          overflow: hidden;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(253, 197, 0, 0.4);
        }
        
        /* Ensure card hover doesn't affect image */
        .timeline-entry.active .edition-card,
        .timeline-entry:hover .edition-card {
          transform-style: flat;
        }
        
        /* Image overlay - exists in current styles */
        .image-overlay {
          /* Existing styles */
        }
      `}</style>
        </section>
    );
};

export default Legacy;