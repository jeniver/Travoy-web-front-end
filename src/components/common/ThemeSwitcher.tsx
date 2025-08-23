import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun, Monitor } from 'lucide-react';
import { RootState } from '../../store';
import { setTheme } from '../../store/slices/uiSlice';
import { useTranslation } from 'react-i18next';

export const ThemeSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.ui.theme);

  const themes = [
    { value: 'light', icon: Sun, label: t('theme.light') },
    { value: 'dark', icon: Moon, label: t('theme.dark') },
    { value: 'system', icon: Monitor, label: t('theme.system') },
  ];

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    dispatch(setTheme(theme));
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    
    localStorage.setItem('theme', theme);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        {currentTheme === 'light' ? (
          <Sun className="h-5 w-5" />
        ) : currentTheme === 'dark' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
        <span className="hidden sm:block">{t('theme.toggleTheme')}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value as 'light' | 'dark' | 'system')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentTheme === theme.value
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <Icon className="inline-block h-4 w-4 mr-3" />
                {theme.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
