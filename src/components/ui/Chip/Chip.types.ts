import type { ButtonColorType } from '@/components/interface/tailwind';

export type ChipPropsType = {
  children?: string | React.ReactNode;
  className?: string;
  colorDark?: ButtonColorType['dark'];
  colorLight?: ButtonColorType['light'];
  deletable?: boolean;
  onDelete?: () => void;
  size?: 'small' | 'medium';
};
