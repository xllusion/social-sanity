// For daisyUI theme - https://daisyui.com/docs/themes/
// themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],

import { useState, useEffect, useCallback } from 'react';

const initialThemeState: string = 'light';

export function useThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<string>(initialThemeState);

  const setLightTheme = (): void => {
    setTheme('light');
  };

  const setDarkTheme = (): void => {
    setTheme('dark');
  };

  const setTheme = useCallback((theme: string): void => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      window.localStorage.setItem('data-theme', theme);
      setCurrentTheme(theme);
    } catch (e) {
      console.log((e as Error).message);
    }
  }, []);

  useEffect(() => {
    try {
      // Initial theme
      const colorTheme = window.localStorage.getItem('data-theme');
      if (
        colorTheme === 'dark' ||
        (!('data-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        setTheme('dark');
      } else {
        setTheme(colorTheme ? colorTheme : 'light');
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  }, [setTheme]);

  return {currentTheme, setTheme, setLightTheme, setDarkTheme};
}
