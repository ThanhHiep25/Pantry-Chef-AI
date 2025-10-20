import React, { useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from './icons';

const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    // Toggle based on the *currently displayed* theme, and always set an explicit preference.
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;