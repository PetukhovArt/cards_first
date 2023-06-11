import { instance } from "common/api/common.api";

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='https://petukhovart.github.io/cards/#/set-new-password/$token$'>
link</a>
</div>`;
const from = "test-front-admin <s1abak38@gmail.com>";

export const userApi = {
  register: (data: RegPayloadType) => {
    return instance.post<{ addedUser: ProfileType }>("auth/register", data);
  },
  forgot: (data: ForgotPayloadType) => {
    return instance.post<ForgotResType>("auth/forgot", {
      email: data.email,
      from: from,
      message: message,
    });
  },
  setNewPassword: (data: SetNewPasswordPayLoadType) => {
    return instance.post<ForgotResType>("auth/set-new-password", data);
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
  updateUser: (data: UpdatePayloadType) => {
    return instance.put<UpdatedProfileType>("auth/me", data);
  },
};

//TYPES==========//TYPES==========//TYPES==========//TYPES==========//TYPES==========//TYPES==========

export type ForgotPayloadType = {
  email: string;
};
export type ForgotResType = {
  info: string;
  success: boolean;
  error: string;
};
export type SetNewPasswordPayLoadType = {
  password: string;
  resetPasswordToken: string;
};
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
