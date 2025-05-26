import React, { useState, useEffect, useRef } from 'react';

const ImageCarousel = ({ images, isBackground = false, fullHeight = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 4000, height: 1312 });

  // Check for mobile view and update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const isMobileView = width < 768;
      setIsMobile(isMobileView);

      // Calculate height maintaining the aspect ratio (4000:1312)
      const aspectRatio = 4000 / 1312;
      const calculatedHeight = width / aspectRatio;

      setDimensions({
        width: width,
        height: isMobileView ? calculatedHeight * 1.5 : calculatedHeight // Increase height for mobile
      });
    };

    // Initial check
    updateDimensions();

    // Add event listener
    window.addEventListener('resize', updateDimensions);

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Effect for auto-advancing slides
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up a new interval
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  if (isBackground) {
    return (
      <div className="carousel-background" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
        height: fullHeight ? 'auto' : dimensions.height
      }}>
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-slide-bg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out, filter 1.5s ease-in-out',
              backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 0.6)), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: index == 3 ? 'center top' : 'center',
              filter: 'brightness(1) contrast(1)',
              zIndex: currentSlide === index ? 1 : 0,
            }}
          />
        ))}

        {/* Dots Navigation for Background Carousel */}
        {!isMobile && (
          <div className="carousel-dots" style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: isMobile ? '6px' : '8px',
            zIndex: 2,
          }}>
            {images.map((_, index) => (
              <div
                key={index}
                style={{
                  width: isMobile ? '20px' : '25px',
                  height: isMobile ? '2px' : '3px',
                  backgroundColor: currentSlide === index ? '#FAD300' : 'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.5s ease',
                  transform: currentSlide === index ? 'scaleX(1)' : 'scaleX(1)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="carousel-container rounded-[0]" style={{
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: 'auto',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <div className="carousel-track" style={{
        display: 'flex',
        width: `${images.length * 100}%`,
        transform: `translateX(-${currentSlide * (100 / images.length)}%)`,
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        height: 'auto',
      }}>
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              // width: `${100 / images.length}%`,
              // width: 'auto',
              height: 'auto',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: 'auto',
                height: 'auto',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }}
            />
            <div className="slide-overlay" style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              height: '50%',
              pointerEvents: 'none',
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel; 