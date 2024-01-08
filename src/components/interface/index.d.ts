import type { Route, RouteOption } from '@/constants/interface';
import type { AnyProp } from '@/interface';

// ----------------------------------------------------------------------
// COMMON
// ----------------------------------------------------------------------

export type TitleProps = {
  title: string;
} & (
  | {
      onClick: () => void;
      buttonText: string;
      buttonClassName?: string;
      href?: never;
    }
  | {
      href: string;
      buttonText: string;
      buttonClassName?: string;
      onClick?: never;
    }
  | {
      buttonText?: never;
      buttonClassName?: never;
      href?: never;
      onClick?: never;
    }
) &
  AnyProp;

// ----------------------------------------------------------------------
// MENU
// ----------------------------------------------------------------------

export interface LandscapeMenuProps extends AnyProps {
  children: React.ReactNode;
}

export interface LogoutButtonProps extends AnyProps {
  className?: string;
  open?: boolean;
}

export interface MenuModuleButtonProps extends AnyProps {
  el: Route;
  open?: boolean;
}

export interface MenuOptionButtonProps extends AnyProp {
  option: RouteOption;
}

// ----------------------------------------------------------------------
// OTHER
// ----------------------------------------------------------------------

export interface ThemeTogglerButtonProps extends AnyProp {
  className?: string;
}
