import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTheme } from '../store/slices/uiSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }

    // Apply theme to document
    const applyTheme = (theme: 'light' | 'dark' | 'system') => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', systemTheme === 'dark');
      } else {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    };

    applyTheme(currentTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (currentTheme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [currentTheme, dispatch]);

  const toggleTheme = () => {
    if (currentTheme === 'light') {
      dispatch(setTheme('dark'));
    } else if (currentTheme === 'dark') {
      dispatch(setTheme('system'));
    } else {
      dispatch(setTheme('light'));
    }
  };

  const setThemeMode = (theme: 'light' | 'dark' | 'system') => {
    dispatch(setTheme(theme));
  };

  return {
    theme: currentTheme,
    toggleTheme,
    setTheme: setThemeMode,
    isDark: currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
  };
};
