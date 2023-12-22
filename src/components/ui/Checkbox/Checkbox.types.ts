import type {
  CheckboxColorType,
  TextColorType,
} from '@/components/interface/tailwind';

export interface CheckboxProps {
  ariaLabel: string;
  className?: string;
  id: string;
  label?: string;
  colorDark?: CheckboxColorType['dark'];
  colorLight?: CheckboxColorType['light'];
  textColorDark?: TextColorType['dark'];
  textColorLight?: TextColorType['light'];
  disabled?: boolean;
}
