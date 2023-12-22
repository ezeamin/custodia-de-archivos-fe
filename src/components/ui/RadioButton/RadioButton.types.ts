import type {
  CheckboxColorType,
  TextColorType,
} from '@/components/interface/tailwind';

export interface RadioButtonProps {
  ariaLabel: string;
  className?: string;
  colorDark?: CheckboxColorType['dark'];
  colorLight?: CheckboxColorType['light'];
  defaultChecked?: boolean;
  disabled?: boolean;
  id: string;
  label?: string;
  textColorDark?: TextColorType['dark'];
  textColorLight?: TextColorType['light'];
}
