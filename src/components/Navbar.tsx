import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { LanguageSwitcher } from './common/LanguageSwitcher';
import { ThemeSwitcher } from './common/ThemeSwitcher';
import { AuthPage } from './auth/AuthPage';

const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close auth modal after successful login/signup
  useEffect(() => {
    if (isAuthenticated) {
      setShowAuth(false);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const handleAuthClick = () => {
    setShowAuth(!showAuth);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-gray-800 shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <nav className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                src="/icon-192x192.png"
                alt="Travoy Logo"
                className="h-10 w-auto border-2 border-white rounded-md"
                loading="lazy"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              {t('navigation.services')}
            </a>
            <a href="#process" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              {t('navigation.process')}
            </a>
            <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              {t('navigation.testimonials')}
            </a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              {t('navigation.contact')}
            </a>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.fullName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">{t('common.logout')}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleAuthClick}
                className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                {t('common.login')}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 dark:text-gray-300" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 w-full py-4 px-4 shadow-md">
            <div className="flex flex-col space-y-4">
              <a 
                href="#services" 
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navigation.services')}
              </a>
              <a 
                href="#process" 
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navigation.process')}
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navigation.testimonials')}
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navigation.contact')}
              </a>
              
              {/* Mobile Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{user?.fullName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">{t('common.logout')}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAuthClick();
                  }}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors w-full"
                >
                  {t('common.login')}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md mx-4">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
            >
              <XIcon size={24} />
            </button>
            <AuthPage />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;