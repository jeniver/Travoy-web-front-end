// Environment configuration
export const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'https://api.travoy.com/api/v1',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  
  // Analytics
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID || '',
  HOTJAR_ID: import.meta.env.VITE_HOTJAR_ID || '',
  
  // Feature Flags
  ENABLE_PWA: import.meta.env.VITE_ENABLE_PWA !== 'false',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',
  ENABLE_OFFLINE: import.meta.env.VITE_ENABLE_OFFLINE !== 'false',
  
  // Performance
  ENABLE_PERFORMANCE_MONITORING: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING !== 'false',
  ENABLE_LAZY_LOADING: import.meta.env.VITE_ENABLE_LAZY_LOADING !== 'false',
  
  // Development
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  IS_TEST: import.meta.env.MODE === 'test',
};

// Environment-specific configurations
export const getEnvironmentConfig = () => {
  if (ENV.IS_PRODUCTION) {
    return {
      enableSourceMaps: false,
      enableDevTools: false,
      enableHotReload: false,
      enableErrorBoundary: true,
      enablePerformanceMonitoring: true,
    };
  }
  
  if (ENV.IS_DEVELOPMENT) {
    return {
      enableSourceMaps: true,
      enableDevTools: true,
      enableHotReload: true,
      enableErrorBoundary: false,
      enablePerformanceMonitoring: true,
    };
  }
  
  // Test environment
  return {
    enableSourceMaps: false,
    enableDevTools: false,
    enableHotReload: false,
    enableErrorBoundary: true,
    enablePerformanceMonitoring: false,
  };
};

// Feature flag checks
export const isFeatureEnabled = (feature: keyof typeof ENV): boolean => {
  return ENV[feature] === true;
};

// API configuration
export const getApiConfig = () => ({
  baseURL: ENV.API_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
