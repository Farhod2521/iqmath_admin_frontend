import { axiosApi } from "@/configs/api";
import { ApiResponse } from "@/types/response";

export type WithDrawalSettingsData = {
  id: number;
  min_amount: number;
  max_amount: number;
  updated_at: string;
};

export type WithDrawalSettingsFormData = {
  min_amount: number;
  max_amount: number;
};

export const getWithDrawalSettings = () =>
  axiosApi.get<ApiResponse<WithDrawalSettingsData>>(
    "/management/superadmin/withdrawal-settings/",
  );

export const getWithDrawalSetting = (id: number) =>
  axiosApi.get<WithDrawalSettingsData>(
    `/management/superadmin/withdrawal-settings/${id}/`,
  );

export const postWithDrawalSetting = (data: WithDrawalSettingsFormData) =>
  axiosApi.post(`/management/superadmin/withdrawal-settings/`, data);

export const putWithDrawalSetting = (
  id: number,
  data: WithDrawalSettingsFormData,
) => axiosApi.put(`/management/superadmin/withdrawal-settings/${id}/`, data);

export const patchWithDrawalSetting = (
  id: number,
  data: WithDrawalSettingsFormData,
) => axiosApi.patch(`/management/superadmin/withdrawal-settings/${id}/`, data);

export const deleteWithDrawalSetting = (id: number) =>
  axiosApi.delete(`/management/superadmin/withdrawal-settings/${id}/`);
