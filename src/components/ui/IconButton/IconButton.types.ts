import type { DataTestId } from '../../types';
import type { ButtonColorType } from '../../types/tailwind';

export type IconButtonPropsType =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    DataTestId & {
      className?: string;
      colorDark?: ButtonColorType['dark'];
      colorLight?: ButtonColorType['light'];
      disabled?: boolean;
      iconComponent: React.ReactNode;
      label?: string;
      unbordered?: boolean;
    };
