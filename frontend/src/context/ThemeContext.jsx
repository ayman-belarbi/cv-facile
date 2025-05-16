import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    // If no saved theme, use system preference
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return savedTheme;
  });

  // Track if user has manually set theme
  const [userSet, setUserSet] = useState(() => !!localStorage.getItem('theme'));

  useEffect(() => {
    if (userSet) {
      // Update localStorage when user manually sets theme
      localStorage.setItem('theme', theme);
    } else {
      // Remove theme from localStorage to always follow system
      localStorage.removeItem('theme');
    }
    // Update document class for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, userSet]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't manually set a theme
      if (!userSet) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    // Initial check
    if (!userSet) {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [userSet]);

  const toggleTheme = () => {
    setUserSet(true);
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const resetTheme = () => {
    setUserSet(false);
    // Will follow system preference on next render
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}