import { axiosApi } from "@/configs/api";

export type MotivationData = {
  content: string;
  content_ru: string;
  content_uz: string;
  created_at: string;
  id: number;
  is_active: boolean;
  title: string;
  title_ru: string;
  title_uz: string;
  updated_at: string;
};

export type MotivationFormData = {
  title_ru: string;
  title_uz: string;
  content_ru: string;
  content_uz: string;
  is_active: boolean;
};

export const getMotivations = () =>
  axiosApi.get<MotivationData[]>("/management/superadmin/motivation/");

export const postMotivations = (data: MotivationFormData) =>
  axiosApi.post<{
    message: string;
  }>("/management/superadmin/motivation/", data);

export const putMotivations = (id: number, data: MotivationFormData) =>
  axiosApi.put<{
    message: string;
  }>(`/management/superadmin/motivation/${id}`, data);

export const deleteMotivations = (id: number) =>
  axiosApi.delete<{
    message: string;
  }>(`/management/superadmin/motivation/${id}`);
