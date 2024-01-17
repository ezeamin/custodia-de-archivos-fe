import {
  API_GetUsers,
  API_PostUser,
  BasicUser,
  CreatedUser,
} from '../interface/users';

export const getUsersAdapter = (data: API_GetUsers[]): BasicUser[] =>
  data.map((user) => ({
    id: user.id,
    username: user.username,
    imgSrc: user.imgSrc,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  }));

export const postUserAdapter = (data: API_PostUser): CreatedUser => ({
  username: data.username,
  password: data.password,
});
