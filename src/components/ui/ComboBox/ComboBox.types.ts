import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import type {
  BgColorProp,
  HeightType,
  TextColorProp,
  WidthType,
} from '../../interface/tailwind';
import type { BasicList } from '@/interface';

export type ComboBoxProps<T extends FieldValues> = {
  className?: string;
  controller: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  error?: boolean;
  inputClassName?: string;
  msgError?: string;
  name: string;
  options: BasicList[];
  placeholder: string;
  positionedColorOption?: {
    bgColor: BgColorProp['color'];
    textColor: TextColorProp['textColor'];
  };
  selectedColorOption?: BgColorProp['color'];
  sizing?: {
    height?: HeightType;
    width?: WidthType;
  };
};
