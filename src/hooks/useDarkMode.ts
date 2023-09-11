// For Tailwind dark mode

import { useState, useEffect, useCallback } from 'react';

const initialState: boolean = false;

export function useDarkMode() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(initialState);

  const toggleDarkMode = (): void => {
      enableDarkMode(!isDarkModeEnabled);
  };

  const enableDarkMode = useCallback((enabled: boolean): void => {
    try {
      if (enabled) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      window.localStorage.setItem('color-theme', enabled ? 'dark' : 'light');
      setIsDarkModeEnabled(enabled);
    } catch (e) {
      console.log((e as Error).message);
    }
  }, []);

  useEffect(() => {
    try {
      // Initial theme
      const colorTheme = window.localStorage.getItem('color-theme');
      if (
        colorTheme === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        enableDarkMode(true);
      } else {
        enableDarkMode(false);
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  }, [enableDarkMode]);

  return {isDarkModeEnabled, toggleDarkMode, enableDarkMode};
}
