import { axiosApi } from "@/configs/api";

export type UserResetPassowrdFormData = {
  user_id: number;
  new_password: string;
};

export const postUserRestPassword = (data: UserResetPassowrdFormData) =>
  axiosApi.post("/auth/user/reset-password/", data);
