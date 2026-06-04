import { axiosApi } from "@/configs/api";
import { ApiResponse } from "@/types/response";

export type withdrawalSettingsData = {
  id: number;
  min_amount: number;
  max_amount: number;
  updated_at: string;
};

export type withdrawalSettingsFormData = {
  min_amount: number;
  max_amount: number;
};

export const getwithdrawalSettings = () =>
  axiosApi.get<ApiResponse<withdrawalSettingsData>>(
    "/tutor/superadmin/withdrawal-settings/",
  );

export const getWithDrawalSetting = (id: number) =>
  axiosApi.get<withdrawalSettingsData>(
    `/tutor/superadmin/withdrawal-settings/${id}/`,
  );

export const postWithDrawalSetting = (data: withdrawalSettingsFormData) =>
  axiosApi.post(`/tutor/superadmin/withdrawal-settings/`, data);

export const putWithDrawalSetting = (
  id: number,
  data: withdrawalSettingsFormData,
) => axiosApi.put(`/tutor/superadmin/withdrawal-settings/${id}/`, data);

export const patchWithDrawalSetting = (
  id: number,
  data: withdrawalSettingsFormData,
) => axiosApi.patch(`/tutor/superadmin/withdrawal-settings/${id}/`, data);

export const deleteWithDrawalSetting = (id: number) =>
  axiosApi.delete(`/tutor/superadmin/withdrawal-settings/${id}/`);
