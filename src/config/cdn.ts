// CDN Configuration for external libraries
export const CDN_CONFIG = {
  // Google Fonts
  fonts: {
    google: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    preconnect: 'https://fonts.googleapis.com',
    preconnectGstatic: 'https://fonts.gstatic.com',
  },
  
  // Icon libraries
  icons: {
    lucide: 'https://unpkg.com/lucide@latest/dist/umd/lucide.js',
    heroicons: 'https://unpkg.com/@heroicons/react@2.0.18/24/outline/esm/index.js',
  },
  
  // Animation libraries
  animations: {
    framer: 'https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js',
    lottie: 'https://unpkg.com/lottie-web@5.12.2/build/player/lottie.min.js',
  },
  
  // Utility libraries
  utils: {
    lodash: 'https://unpkg.com/lodash@4.17.21/lodash.min.js',
    dayjs: 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js',
  },
  
  // Analytics and tracking
  analytics: {
    gtag: 'https://www.googletagmanager.com/gtag/js?id=',
    hotjar: 'https://static.hotjar.com/c/hotjar-',
  },
};

// Function to load CDN resources
export const loadCDNResource = (url: string, type: 'script' | 'stylesheet'): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (type === 'script') {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.head.appendChild(script);
    } else {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load stylesheet: ${url}`));
      document.head.appendChild(link);
    }
  });
};

// Preload critical CDN resources
export const preloadCriticalCDN = async () => {
  try {
    // Preload Google Fonts
    await loadCDNResource(CDN_CONFIG.fonts.preconnect, 'stylesheet');
    await loadCDNResource(CDN_CONFIG.fonts.preconnectGstatic, 'stylesheet');
    
    // Preload critical fonts
    await loadCDNResource(CDN_CONFIG.fonts.google, 'stylesheet');
    
    console.log('Critical CDN resources loaded successfully');
  } catch (error) {
    console.warn('Failed to load some CDN resources:', error);
  }
};
