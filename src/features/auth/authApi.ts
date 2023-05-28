import { instance } from "common/api/common.api";

export type RegPayloadType = Omit<LoginPayloadType, "rememberMe">;
export type LoginPayloadType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ProfileResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  // количество колод
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;
};

export const authApi = {
  register: (data: RegPayloadType) => {
    return instance.post<{ addedUser: ProfileResponseType }>("auth/register", data);
  },
  login: (data: LoginPayloadType) => {
    return instance.post<ProfileResponseType>("auth/login", data);
  },
  isAuth: () => {
    return instance.post<ProfileResponseType>("auth/me");
  },
};
