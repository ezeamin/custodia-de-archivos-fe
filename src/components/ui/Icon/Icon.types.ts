import { AnyProp } from '@/interface';

export interface IconProps extends AnyProp {
  className?: string;
  color?: `#${string}`;
  iconComponent: React.ReactNode;
  size?: `${string}em` | `${string}rem` | `${string}px`;
  title: string;
}
