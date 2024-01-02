import { toast } from 'sonner';

import { API_GlobalResponse } from './interface';
import { ApiRoute } from './interface/routes';

const baseUrl = import.meta.env.VITE_BASE_URL;

/**
 * @param T - How it comes (API)
 * @param V - How it goes (Frontend)
 */
export const fetchFn = async <T, V>({
  request,
  adapter,
}: {
  request: ApiRoute;
  adapter: (data: T) => V | null;
}): Promise<API_GlobalResponse<T, V>> => {
  const fullPath = `${baseUrl}${request.url}`;

  const res = await fetch(fullPath, {
    method: request.method,
  });
  const data = (await res.json()) as API_GlobalResponse<T, V>;

  if (!res.ok) {
    toast.error(data.message || 'Ocurrió un error al leer la información.');
    throw new Error();
  }

  if (data.data) {
    data.data = adapter(data.data as T);
  }

  return data;
};
