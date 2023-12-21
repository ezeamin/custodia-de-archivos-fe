import type { DataTestId } from '../../types';
import type { ButtonColorType, TextColorType } from '../../types/tailwind';
import type { IconProps } from '../Icon/Icon.types';

export type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement> &
  DataTestId & {
    /**
     * @remarks either activeButton or outlineButton, not both.
     */
    activeButton?: boolean;
    ariaHidden?: boolean;
    ariaLabel?: string;
    children?: string | React.ReactNode;
    colorLight: ButtonColorType['light'];
    colorDark?: ButtonColorType['dark'];
    endIcon?: {
      className?: IconProps['className'];
      color?: IconProps['color'];
      iconComponent: IconProps['iconComponent'];
      size?: IconProps['size'];
      title?: IconProps['title'];
    };
    glass?: boolean;
    ignoreDefaultColor?: boolean;
    loading?: boolean;
    lowerCase?: boolean;
    name?: string;
    /**
     * @remarks Use either activeButton or outlineButton, not both.
     */
    outlineButton?: boolean;
    size?: 'btn-xs' | 'btn-sm' | 'btn-md' | 'btn-lg';
    sizeText?:
      | 'text-xs'
      | 'text-sm'
      | 'text-base'
      | 'text-lg'
      | 'text-xl'
      | 'text-2xl'
      | 'text-3xl'
      | 'text-4xl'
      | 'text-5xl'
      | 'text-6xl'
      | 'text-7xl'
      | 'text-8xl'
      | `text-[${number}px]`;
    startIcon?: {
      className?: IconProps['className'];
      color?: IconProps['color'];
      iconComponent: IconProps['iconComponent'];
      size?: IconProps['size'];
      title?: IconProps['title'];
    };
    textColorDark?: TextColorType['dark'];
    textColorLight?: TextColorType['light'];
    type?: 'button' | 'reset' | 'submit';
    unbordered?: boolean;
    unstyled?: boolean;
    withoutAnimation?: boolean;
  } & (
    | {
        activeButton?: true;
        outlineButton?: never;
      }
    | {
        activeButton?: never;
        outlineButton?: true;
      }
  );
