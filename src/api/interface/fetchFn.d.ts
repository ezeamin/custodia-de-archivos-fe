import { ApiRoute } from './routes';

export interface FetchFnProps<T, V> {
  request: ApiRoute;
  adapter: (data: T) => V | null;
  body?: Record<string, unknown> | FormData;
  useToken?: boolean;
}
