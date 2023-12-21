import type { DataTestId } from '../../types';
import type { CheckboxColorType, TextColorType } from '../../types/tailwind';

export interface CheckboxProps {
  dti: DataTestId;
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
