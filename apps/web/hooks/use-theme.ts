'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useThemeMode() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'dark';

  return {
    theme: currentTheme,
    setTheme,
    mounted,
    isDark: currentTheme === 'dark',
  };
}
