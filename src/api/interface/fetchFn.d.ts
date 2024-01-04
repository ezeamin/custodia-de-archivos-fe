import { ApiRoute } from './routes';

export interface FetchFnProps {
  request: ApiRoute;
  adapter: (data: T) => V | null;
  body?: Record<string, unknown> | FormData;
}
