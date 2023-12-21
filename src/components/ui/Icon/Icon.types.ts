export interface IconProps {
  className?: string;
  color?: `#${string}`;
  iconComponent: React.ReactNode;
  size?: `${string}em` | `${string}rem` | `${string}px`;
  title: string;
}
