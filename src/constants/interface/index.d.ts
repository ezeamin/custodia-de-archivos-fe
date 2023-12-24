// ----------------------------------------------------------------------
// ROUTES
// ----------------------------------------------------------------------

export interface Route {
  id: number;
  title: string;
  description: string;
  path: string;
  options: RouteOption[];
  subpaths?: Route[];
  hidden?: boolean;
  icon?: JSX.Element;
  element: JSX.Element;
}

export type RouteOption = {
  id: number;
  description: string;
} & (
  | {
      path: string | -1;
      action?: never;
    }
  | {
      path?: never;
      action: () => void;
    }
);
