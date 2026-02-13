import { axiosApi } from "@/configs/api";
import { AuthDataType } from "@/configs/auth";
import { BASE_URL } from "@/libs/env";
import axios from "axios";

export type AuthLoginFormData = {
  phone: number;
  password: string;
  redirect: boolean;
  remember: boolean;
};

export const postAuthLogin = (data: AuthLoginFormData) => {
  const formData = new FormData();

  formData.append("phone", String(data.phone));
  formData.append("password", data.password);
  formData.append("redirect", String(data.redirect));
  formData.append("remember", String(data.remember));

  return axios.post<AuthDataType>(
    `${BASE_URL}/api/v1/auth/student/login/`,
    formData,
  );
};
