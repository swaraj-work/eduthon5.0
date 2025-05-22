/**
 * Utility functions for asset preloading and management
 */

// Cache for preloaded assets to avoid duplicate loading
const preloadedAssets = new Set();

/**
 * Preload a single image and return a promise
 * @param {string} src - Image URL to preload
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    // Skip if already preloaded or invalid
    if (!src || preloadedAssets.has(src)) {
      resolve(src);
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      preloadedAssets.add(src);
      resolve(src);
    };
    
    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      // Resolve anyway to not block the app
      resolve(src);
    };
    
    img.src = src;
  });
};

/**
 * Preload multiple images in parallel
 * @param {Array<string>} sources - Array of image URLs to preload
 * @param {Function} progressCallback - Optional callback for progress updates
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const preloadImages = (sources, progressCallback) => {
  // Filter out any undefined or empty strings and already loaded assets
  const validSources = sources.filter(src => 
    src && !preloadedAssets.has(src)
  );
  
  if (validSources.length === 0) {
    return Promise.resolve([]);
  }
  
  let loadedCount = 0;
  
  const preloadPromises = validSources.map(src => {
    return preloadImage(src).then(() => {
      loadedCount++;
      if (progressCallback) {
        progressCallback(loadedCount / validSources.length);
      }
      return src;
    });
  });
  
  return Promise.all(preloadPromises);
};

/**
 * Get a list of critical assets for the application
 * @returns {Array<string>} - Array of critical asset URLs
 */
export const getCriticalAssets = () => {
  return [
    // Logo
    'https://ik.imagekit.io/patelswadesh/logo.png',
    // Graphic images from Hero component
    'https://ik.imagekit.io/patelswadesh/GraphicImages/1.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/2.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/3.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/4.png',
    'https://ik.imagekit.io/patelswadesh/GraphicImages/5.png',
    // Add any other critical images here
    '/logo.png', // Local logo if used
    // Only include files that actually exist in the project
  ].filter(Boolean); // Filter out any undefined values
};
