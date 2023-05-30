import { instance } from "common/api/common.api";

export type RegPayloadType = Omit<LoginPayloadType, "rememberMe">;
export type LoginPayloadType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ProfileType = {
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
export type RestorePayloadType = {
  email: string;
  from?: string;
  message: string;
};

export type UpdatedProfileType = {
  updatedUser: ProfileType;
  error?: string;
};
export type UpdatePayloadType = {
  name?: string;
  avatar?: string;
};
export type LogoutResType = {
  info: string;
  error: string;
};

export const authApi = {
  register: (data: RegPayloadType) => {
    return instance.post<{ addedUser: ProfileType }>("auth/register", data);
  },
  login: (data: LoginPayloadType) => {
    return instance.post<ProfileType>("auth/login", data);
  },
  isAuth: () => {
    return instance.post<ProfileType>("auth/me");
  },
  logout: () => {
    return instance.delete<LogoutResType>("auth/me");
  },
  restorePassword: (data: RestorePayloadType) => {
    return instance.post("auth/forgot");
  },
  updateUser: (data: UpdatePayloadType) => {
    return instance.put<UpdatedProfileType>("auth/me", data);
  },
};
