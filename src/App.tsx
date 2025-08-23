import React, { Suspense, lazy, useEffect } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import LoadingSpinner from './components/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import './config/i18n';
import { useTheme } from './hooks/useTheme';

// Lazy load components for code splitting
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Process = lazy(() => import('./components/Process'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (React Query v5 uses gcTime instead of cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      if (savedTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', systemTheme === 'dark');
      } else {
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      }
    }

    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      // i18n.changeLanguage will be handled by the LanguageSwitcher component
    }
  }, [theme]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <>
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar />
        </Suspense>
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Hero />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Services />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Process />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#f9fafb' : '#111827',
          },
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}