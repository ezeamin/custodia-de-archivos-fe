// ----------------------------------------------------------------------
// ROUTES
// ----------------------------------------------------------------------

export interface Route {
  id: number;
  img: {
    src: string;
  };
  port: number;
  description: string;
  url: string;
  options: Option[];
  subpaths?: Subroute[];
}

interface Subroute {
  id: number;
  description: string;
  url: string;
  options: Option[];
  subpaths?: Subroute[];
}

export type Option = {
  id: number;
  description: string;
} & (
  | {
      url: string | -1;
      action?: never;
    }
  | {
      url?: never;
      action: () => void;
    }
);
