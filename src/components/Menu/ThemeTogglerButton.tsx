import { FaSun } from 'react-icons/fa';
import { IoMoon } from 'react-icons/io5';

import { useTheme } from '@/stores/useTheme';

import { Button } from '@/components/ui';

import { cn } from '@/utilities';

import type { ThemeTogglerButtonProps } from '@/components/interface';

const ThemeTogglerButton = (props: ThemeTogglerButtonProps): JSX.Element => {
  const { className, ...buttonProps } = props;

  const { theme, toggleTheme } = useTheme();

  const icon =
    theme === 'light' ? <IoMoon size="1.5em" /> : <FaSun size="1.5em" />;

  const handleClick = (): void => {
    toggleTheme();
  };

  return (
    <Button
      unbordered
      className={cn(
        'theme-controller h-12 w-12 justify-center p-0 font-light md:tooltip md:tooltip-top hover:bg-sky-200 dark:hover:bg-slate-700 md:flex',
        className
      )}
      colorDark="dark:bg-slate-600"
      colorLight="bg-sky-100"
      data-tip="Cambiar tema"
      textColorDark="dark:text-white"
      onClick={handleClick}
      {...buttonProps}
    >
      {icon}
    </Button>
  );
};

export default ThemeTogglerButton;
