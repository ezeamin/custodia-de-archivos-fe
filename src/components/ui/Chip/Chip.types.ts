import type { DataTestId } from '../../types';
import type { ButtonColorType } from '../../types/tailwind';

export type ChipPropsType = DataTestId & {
  children?: string | React.ReactNode;
  className?: string;
  colorDark?: ButtonColorType['dark'];
  colorLight?: ButtonColorType['light'];
  deletable?: boolean;
  onDelete?: () => void;
  size?: 'small' | 'medium';
};
