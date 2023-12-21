export type ModeTypes = 'json' | 'blob' | undefined;

/**
 * @param T - is the (data) adapter return type, or Blob if it is a File
 * @param Mode - is the mode of the fetch function. "json" (default) | "blob"
 */
export interface FetchFnResult<T> {
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: T | null;
  statusCode: number | null;
}

/**
 * T is the adapter return type, or Blob if it is a File.
 */
export interface FetchFnProps<T> {
  adapter?: (data: unknown) => T;
  baseUrl?: string;
  cache?: boolean;
  log?: boolean;
  mode?: ModeTypes;
  options?: RequestInit & {
    next?: {
      revalidate: false | number;
      tags?: string[];
    };
  };
  params?: Record<string, string>;
  skip?: boolean;
  url: string;
}

export interface MutateFnProps<APIResT, T> {
  adapter?: (data: APIResT) => T;
  baseUrl?: string;
  body?: object;
  url: string;
  token?: string;
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

export interface MutateFnResult<APIResT, T> {
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: T | APIResT | null;
  statusCode: number | null;
}
