import React, { useState, useEffect } from 'react';
import { preloadImages, getCriticalAssets } from '../utils/assetLoader';

// This component preloads all critical assets for the homepage
const AssetPreloader = ({ onLoadComplete, children }) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Get the critical assets to preload
    const criticalAssets = getCriticalAssets();
    
    // Only run in production mode or when forced for testing
    if (process.env.NODE_ENV === 'production' || true) { // Force preloading for testing
      // Update progress as assets load
      const updateProgress = (progress) => {
        setLoadingProgress(Math.round(progress * 100));
      };
      
      // Preload all critical assets
      preloadImages(criticalAssets, updateProgress)
        .then(() => {
          console.log('All assets preloaded successfully');
          // Add a small delay to ensure smooth transition
          setTimeout(() => {
            setAssetsLoaded(true);
            if (onLoadComplete) onLoadComplete();
          }, 500);
        })
        .catch(error => {
          console.error('Error preloading assets:', error);
          // Continue anyway after error
          setAssetsLoaded(true);
          if (onLoadComplete) onLoadComplete();
        });
    } else {
      // In development, skip preloading
      setAssetsLoaded(true);
      if (onLoadComplete) onLoadComplete();
    }
  }, [onLoadComplete]);

  // Preloader UI
  if (!assetsLoaded) {
    return (
      <div className="preloader-container">
        <div className="preloader-content">
          <img 
            src="https://ik.imagekit.io/patelswadesh/logo.png" 
            alt="EDUTHON Logo" 
            className="preloader-logo" 
          />
          <div className="preloader-progress-container">
            <div 
              className="preloader-progress-bar" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="preloader-text">
            Loading EDUTHON {loadingProgress}%
          </div>
        </div>
        
        <style jsx="true">{`
          .preloader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #111111 0%, #1a1a1a 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          
          .preloader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 80%;
          }
          
          .preloader-logo {
            width: 180px;
            height: auto;
            margin-bottom: 30px;
            animation: pulse 2s infinite;
          }
          
          .preloader-progress-container {
            width: 300px;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 15px;
          }
          
          .preloader-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, rgba(212, 175, 55, 0.7), rgba(255, 215, 0, 0.9));
            border-radius: 4px;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
          
          .preloader-text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
              filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
            }
            50% {
              transform: scale(1.05);
              filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.7));
            }
            100% {
              transform: scale(1);
              filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
            }
          }
        `}</style>
      </div>
    );
  }

  // Once assets are loaded, render children
  return <>{children}</>;
};

export default AssetPreloader;
