import { apiRoutes } from './routes/apiRoutes';

import { useSession } from '@/stores/useSession';

import { paths } from '@/constants/routes/paths';

import { postLoginAdapter } from './adapters/auth';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const refreshTokenFetch = async (
  input: string,
  init?: RequestInit | undefined
) => {
  let isAuthRoute = false;
  if (input.includes('/auth/')) isAuthRoute = true;

  // Try to fetch the initial query
  let result = await fetch(input, init);

  // Authentication requests can fail with 401 and has nothing to do with the token being expired
  // Also, any other valid response status should be returned inmediately
  if (isAuthRoute || result.status !== 401) return result;

  // Otherwise, it's an expired token error
  // Try to get a new token

  // 1. Build the refresh token request
  const { url: refreshUrl, ...refreshRequest } =
    apiRoutes.AUTH.POST_REFRESH_TOKEN();

  const fullPath = `${baseUrl}${refreshUrl}`;

  // 2. Send the refresh token request
  const refreshResponse = await fetch(fullPath, refreshRequest);
  const refreshResult = await refreshResponse.json();

  // 3. Process the refresh token response
  if (refreshResult?.data) {
    // Adapt the response
    const formatRes = postLoginAdapter(refreshResult);
    const newAccessToken = formatRes.token;

    console.log(formatRes);

    // Login the user with the new token
    useSession.getState().login(newAccessToken);

    // Retry the initial query with the new token
    result = await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  } else {
    // Logout the user (refresh token is already expired, so user has been logged out automatically)
    const currentPath = window.location.pathname;
    window.location.replace(`${paths.AUTH.LOGIN}?redirectTo=${currentPath}`);
  }

  return result;
};
