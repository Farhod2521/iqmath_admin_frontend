import { axiosApi } from "@/configs/api";

export type ManagementFaqData = {
  id: number;
  question: string;
  answer: string;
  url: string;
};

export type ManagementFaqFormData = {
  question: string;
  answer: string;
  url: string;
};

export const getManagementFaqs = () =>
  axiosApi.get<ManagementFaqData[]>("/management/superadmin/faq/");

export const getManagementFaq = (id: number) =>
  axiosApi.get<ManagementFaqData>(`/management/superadmin/faq/${id}/`);

export const postFileManagementFaq = (data: ManagementFaqFormData) =>
  axiosApi.post<{
    message: string;
  }>(`/management/superadmin/faq/`, data);

export const putManagementFaq = (id: number, data: ManagementFaqFormData) =>
  axiosApi.put<{
    message: string;
  }>(`/management/superadmin/faq/${id}/`, data);

export const deleteManagementFaq = (id: number) =>
  axiosApi.delete<{
    message: string;
  }>(`/management/superadmin/faq/${id}/`);
