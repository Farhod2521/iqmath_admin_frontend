import { axiosApi } from "@/configs/api";

export type ManagementConversionRateData = {
  id: number;
  coin_to_score: number;
  coin_to_money: string;
  updated_at: string;
};

export type ManagementConversionRateFormData = {
  coin_to_score: number;
  coin_to_money: string;
};

export const getManagementConversionRates = () =>
  axiosApi.get<ManagementConversionRateData>(
    "/management/superadmin/conversion-rate/",
  );

export const postManagementConversionRate = (
  data: ManagementConversionRateFormData,
) =>
  axiosApi.post<{
    message: string;
  }>("/management/superadmin/conversion-rate/", data);

export const putManagementConversionRate = (
  data: ManagementConversionRateFormData,
) =>
  axiosApi.put<{
    message: string;
  }>("/management/superadmin/conversion-rate/", data);
