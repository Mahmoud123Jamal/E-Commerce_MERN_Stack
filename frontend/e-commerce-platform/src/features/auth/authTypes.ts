export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthState = {
  user: UserType | null;
  token: string | null;
  isAuth: boolean;
};
