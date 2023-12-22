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
      className={cn('w-12 h-12 p-0', className)}
      colorDark="dark:btn-ghost"
      colorLight="btn-ghost"
      onClick={handleClick}
      {...buttonProps}
    >
      {icon}
    </Button>
  );
};

export default ThemeTogglerButton;
