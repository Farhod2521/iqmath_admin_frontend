import { axiosApi } from "@/configs/api";
import { ApiResponseData } from "@/types/response";

export type ManagementUploadSettingsData = {
  id: number;
  max_size_mb: string;
  updated_at: string;
};

export type ManagementUploadSettingFormData = {
  max_size_mb: string;
};

export const getManagementUploadSettings = () =>
  axiosApi.get<ManagementUploadSettingsData[]>(
    "/management/superadmin/upload-setting/",
  );

export const postManagementUploadSetting = (
  data: ManagementUploadSettingFormData,
) =>
  axiosApi.post<ApiResponseData<ManagementUploadSettingsData>>(
    "/management/superadmin/upload-setting/",
    data,
  );

export const putManagementUploadSetting = (
  id: number,
  data: ManagementUploadSettingFormData,
) =>
  axiosApi.put<ApiResponseData<ManagementUploadSettingsData>>(
    `/management/superadmin/upload-setting/${id}/`,
    data,
  );

export const deleteManagementUploadSetting = (id: number) =>
  axiosApi.delete<ApiResponseData<ManagementUploadSettingsData>>(
    `/management/superadmin/upload-setting/${id}/`,
  );
