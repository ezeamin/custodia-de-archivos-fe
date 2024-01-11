import { toast } from 'sonner';

import { useSession } from '@/stores/useSession';

import { API_GlobalResponse } from './interface';
import { FetchFnProps } from './interface/fetchFn';

const baseUrl = import.meta.env.VITE_BASE_URL;

/**
 * @param T - How it comes (API)
 * @param V - How it goes (Frontend)
 */
export const fetchFn = async <T, V = T>({
  request,
  adapter,
  body,
  useToken,
}: FetchFnProps): Promise<API_GlobalResponse<V>> => {
  const fullPath = `${baseUrl}${request.url}`;

  const isFormData = body instanceof FormData;

  const token = useSession.getState().accessToken;

  if (!token && useToken) {
    toast.error('No se ha iniciado sesión. Esta petición no puede realizarse');
    throw new Error();
  }

  const optionObj =
    request.method === 'POST'
      ? {
          method: request.method,
          headers: {
            'Content-Type': isFormData
              ? 'multipart/form-data'
              : 'application/json',
            ...(useToken ? { Authorization: `Bearer ${token}` } : {}),
            ...(request.headers || {}),
          },
          body: isFormData ? body : JSON.stringify(body),
        }
      : // GET
        {
          method: request.method,
          headers: {
            ...(useToken ? { Authorization: `Bearer ${token}` } : {}),
            ...(request.headers || {}),
          },
        };

  const res = await fetch(fullPath, optionObj);
  const data = (await res.json()) as API_GlobalResponse<V>;

  if (!res.ok) {
    toast.error(data.message || 'Ocurrió un error al leer la información.');
    throw new Error();
  }

  if (data.data) {
    data.data = adapter(data.data as T);
  }

  return data;
};
