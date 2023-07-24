'use client';
import React from 'react';

import {useTheme} from 'next-themes';
import {DarkModeSwitch} from 'react-toggle-dark-mode';

import {useMounted} from '@/hooks/mounted';
import {classNames} from '@/utils/react';


export const ThemeSwitcher = () => {
  const {mounted} = useMounted();
  const {theme, setTheme} = useTheme();

  if (!mounted) {
    return null;
  }

  const toggleDarkMode = (isDark: boolean) => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className={classNames(
      'h-6 w-6 rounded border p-1 group',
      'transition-colors border-neutral-700 hover:bg-neutral-700 dark:border-neutral-300 hover:dark:bg-neutral-300',
    )}>
      <DarkModeSwitch
        className={classNames(
          'h-full w-full',
          '[&>*]:fill-black [&>*]:stroke-black',
          '[&>*]:group-hover:fill-white [&>*]:group-hover:stroke-white',
          '[&>*]:dark:fill-white [&>*]:dark:stroke-white',
          '[&>*]:group-hover:dark:fill-black [&>*]:group-hover:dark:stroke-black',
        )}
        checked={theme === 'light'}
        onChange={toggleDarkMode}
        size={120}
      />
    </div>
  );
};
