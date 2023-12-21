'use client';

import { Button } from 'ui';

import { cn } from 'utilities';

import { DTI, DTI_LIST } from 'dti';

import { useTheme } from 'next-themes';
import { FaSun } from 'react-icons/fa';
import { IoMoon } from 'react-icons/io5';

import type { ThemeTogglerButtonProps } from './interface';

/**
 * DO NOT import this component directly, import it from "ThemeToggler"
 * @returns
 */
const ThemeTogglerButton = (props: ThemeTogglerButtonProps): JSX.Element => {
  const { className, ...buttonProps } = props;

  const { theme, setTheme } = useTheme();

  const icon =
    theme === 'light' ? <IoMoon size="1.5em" /> : <FaSun size="1.5em" />;

  const handleClick = (): void => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button
      className={cn('w-12 h-12 p-0', className)}
      colorDark="dark:btn-ghost"
      colorLight="btn-ghost"
      dti={DTI(DTI_LIST.ACTIONS.TOGGLE_THEME)}
      onClick={handleClick}
      {...buttonProps}
    >
      {icon}
    </Button>
  );
};

export default ThemeTogglerButton;
