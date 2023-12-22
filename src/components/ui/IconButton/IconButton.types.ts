import type { ButtonColorType } from '@/components/interface/tailwind';

export type IconButtonPropsType =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    colorDark?: ButtonColorType['dark'];
    colorLight?: ButtonColorType['light'];
    disabled?: boolean;
    iconComponent: React.ReactNode;
    label?: string;
    unbordered?: boolean;
  };
