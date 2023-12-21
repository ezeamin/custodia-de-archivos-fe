import type { Option } from '../../interface';
import type { AnyProp } from '@/interface';

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
  el: {
    id: number;
    img: {
      src: string;
    };
    description: string;
    url: string;
  };
  open?: boolean;
}

export interface MenuOptionButtonProps extends AnyProp {
  option: Option;
}

// ----------------------------------------------------------------------
// OTHER
// ----------------------------------------------------------------------

export interface ThemeTogglerButtonProps extends AnyProp {
  className?: string;
}

export interface LoadingBackdropProps extends AnyProp {
  open: boolean;
}
