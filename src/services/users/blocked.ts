import { axiosApi } from "@/configs/api";

export type UserBlockData = {
  user_id: number;
  is_blocked: boolean;
};

export const postUserBlock = (data: UserBlockData) =>
  axiosApi.post("/auth/user/block/", data);
