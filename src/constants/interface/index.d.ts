// ----------------------------------------------------------------------
// ROUTES
// ----------------------------------------------------------------------

export interface Route {
  id: number;
  title: string;
  description: string;
  path: string;
  subpaths?: Route[];
  hidden?: boolean;
  icon?: JSX.Element;
  element: JSX.Element;
  privateRoute: boolean;
}
