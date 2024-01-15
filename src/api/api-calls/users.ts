import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { postUserAdapter } from '../adapters/users';

import { API_PostUser, User } from '../interface/users';

export const postUserFn = async (employeeId: string) => {
  const request = apiRoutes.USERS.POST_USER();

  const data = await fetchFn<API_PostUser, User>({
    request,
    adapter: postUserAdapter,
    body: { employeeId },
  });

  return data;
};
