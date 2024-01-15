import { API_PostUser, User } from '../interface/users';

export const postUserAdapter = (data: API_PostUser): User => ({
  username: data.username,
  password: data.password,
});
