import { instance } from "common/api/common.api";

type regPayloadType = {
  email: string;
  password: string;
};

export const AuthApi = {
  register: (params: regPayloadType) => {
    return instance.post("auth/register", { params });
  },
};
