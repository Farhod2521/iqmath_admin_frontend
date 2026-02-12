import { axiosApi } from "@/configs/api";

export const getManagementSystemSettings = () =>
  axiosApi.get("/management/system-settings/");
