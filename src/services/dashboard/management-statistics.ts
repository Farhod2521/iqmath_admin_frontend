import { axiosApi } from "@/configs/api";

export const getManagementStatistics = () =>
  axiosApi.get("/management/statistics/");
