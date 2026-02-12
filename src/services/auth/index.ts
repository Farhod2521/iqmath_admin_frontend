import { axiosApi } from "@/configs/api";
import { AuthDataType } from "@/configs/auth";

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

  return axiosApi.post<AuthDataType>("/auth/student/login/", formData);
};
