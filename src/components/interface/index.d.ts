import type { Route, RouteOption } from '@/constants/interface';
import type { AnyProp } from '@/interface';

// ----------------------------------------------------------------------
// COMMON
// ----------------------------------------------------------------------

export interface TitleProps extends AnyProp {
  title: string;
  showBackButton?: boolean;
}

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
