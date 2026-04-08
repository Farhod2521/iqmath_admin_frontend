import { axiosApi } from "@/configs/api";

export type DailyCoinData = {
  id: number;
  daily_coin_limit: number;
  updated_at: string;
};

export type DailyCoinFormData = {
  daily_coin_limit: number;
};

export const getDailyCoinSettings = () =>
  axiosApi.get<DailyCoinData[]>("/management/daily-coin-settings/");
export const getDailyCoinSetting = (id: number) =>
  axiosApi.get<DailyCoinData>(`/management/daily-coin-settings/${id}/`);
export const postDailyCoinSettings = (id: number, data: DailyCoinFormData) =>
  axiosApi.post(`/management/daily-coin-settings/${id}/`, data);
export const deleteDailyCoinSettings = (id: number) =>
  axiosApi.delete(`/management/daily-coin-settings/${id}/`);
