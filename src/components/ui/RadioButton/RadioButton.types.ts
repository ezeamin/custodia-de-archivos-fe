import type { CheckboxColorType, TextColorType } from '../../types/tailwind';

export interface RadioButtonProps {
  ariaLabel: string;
  className?: string;
  colorDark?: CheckboxColorType['dark'];
  colorLight?: CheckboxColorType['light'];
  defaultChecked?: boolean;
  disabled?: boolean;
  dti: string;
  id: string;
  label?: string;
  textColorDark?: TextColorType['dark'];
  textColorLight?: TextColorType['light'];
}
