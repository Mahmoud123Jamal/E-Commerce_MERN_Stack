import { axiosInstance } from "../../api/axiosInstance";
import type { UserType } from "../auth/authTypes";

type RegisterInput = Pick<UserType, "name" | "email"> & {
  password: string;
};
type LoginInput = Pick<UserType, "email"> & { password: string };

type AuthResponse = {
  status: "success";
  data: {
    user: UserType;
    token: string;
  };
};

export const registerUser = async (
  data: RegisterInput,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/users/register",
    data,
  );
  return response.data;
};

export const loginUser = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/users/login", data);
  return response.data;
};
