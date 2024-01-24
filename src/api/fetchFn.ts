import { refreshTokenFetch } from './refreshToken';
import { apiRoutes } from './routes/apiRoutes';
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
}: FetchFnProps<T, V>): Promise<API_GlobalResponse<V>> => {
  const fullPath = request.omitBaseUrl
    ? request.url
    : `${baseUrl}${request.url}`;

  const isFormData = body instanceof FormData;

  const token = useSession.getState().accessToken;

  if (!token && request.useToken) {
    toast.error('No se ha iniciado sesión. Esta petición no puede realizarse');
    throw new Error();
  }

  const optionObj =
    request.method === 'POST' || request.method === 'PUT'
      ? {
          ...request,
          headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...(request.useToken ? { Authorization: `Bearer ${token}` } : {}),
            ...(request.headers || {}),
          },
          body: isFormData ? body : JSON.stringify(body),
        }
      : // GET
        {
          ...request,
          headers: {
            ...(request.useToken ? { Authorization: `Bearer ${token}` } : {}),
            ...(request.headers || {}),
          },
        };

  let res;
  let data;

  try {
    res = await refreshTokenFetch(fullPath, optionObj);
    data = (await res.json()) as API_GlobalResponse<V>;
  } catch (error) {
    toast.error('Ocurrió un error en la solicitud');
    throw new Error();
  }

  if (!res.ok) {
    // Avoid showing error message when trying to refresh token
    if (!(request.url === apiRoutes.AUTH.POST_REFRESH_TOKEN().url))
      toast.error(data.message || 'Ocurrió un error al leer la información.');
    throw new Error();
  }

  if (data) {
    data.data = adapter((data.data ?? data) as T);
  }

  return data;
};
