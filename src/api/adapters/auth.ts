import { API_PostLogin, PostLogin } from '../interface/auth';

export const postLoginAdapter = (data: API_PostLogin): PostLogin => ({
  token: data.token,
});
