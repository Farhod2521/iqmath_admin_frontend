import { axiosApi } from "@/configs/api";
import { ApiResponseData } from "@/types/response";

export type SubscriptionSettingData = {
  id: number;
  free_trial_days: number;
};

export type SubscriptionSettingFormData = {
  free_trial_days: number;
};

export const getSubscriptionSetting = () =>
  axiosApi.get<SubscriptionSettingData[]>(
    "/payments/superadmin/subscription-setting/",
  );

export const postSubscriptionSetting = (data: SubscriptionSettingFormData) =>
  axiosApi.post<ApiResponseData<SubscriptionSettingData>>(
    `/payments/superadmin/subscription-setting/`,
    data,
  );

export const putSubscriptionSetting = (
  id: number,
  data: SubscriptionSettingFormData,
) =>
  axiosApi.put<ApiResponseData<SubscriptionSettingData>>(
    `/payments/superadmin/subscription-setting/${id}/`,
    data,
  );

export const deleteSubscriptionSetting = (id: number) =>
  axiosApi.delete<ApiResponseData<SubscriptionSettingData>>(
    `/payments/superadmin/subscription-setting/${id}/`,
  );
