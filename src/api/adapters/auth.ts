import {
  API_PostLogin,
  API_PostRecoverPassword,
  Login,
  RecoverPassword,
} from '../interface/auth';

export const postLoginAdapter = (data: API_PostLogin): Login => ({
  token: data.token,
});

export const postRecoverPasswordAdapter = (
  data: API_PostRecoverPassword
): RecoverPassword => ({
  email: data.email,
});
