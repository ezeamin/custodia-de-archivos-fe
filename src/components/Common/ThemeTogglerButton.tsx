import { FaSun } from 'react-icons/fa';
import { IoMoon } from 'react-icons/io5';

import { useTheme } from '@/stores/useTheme';
import { cn } from '@/utilities';

import type { ThemeTogglerButtonProps } from '../interface';
import { Button } from '@/components/ui';

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
      className={cn('w-12 h-12 p-0 theme-controller', className)}
      colorDark="dark:bg-slate-600"
      colorLight="bg-sky-100"
      textColorDark="dark:text-white"
      onClick={handleClick}
      {...buttonProps}
    >
      {icon}
    </Button>
  );
};

export default ThemeTogglerButton;
