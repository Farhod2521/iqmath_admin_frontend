import { axiosApi } from "@/configs/api";

export type AnnouncementData = {
  id: number;
  categories: number[];
  created_at: string;
  image: string | null;
  news_status: boolean;
  notification_status: boolean;
  tags: number[];
  text_ru: string;
  text_uz: string;
  title_ru: string;
  title_uz: string;
  updated_at: string;
  video: string | null;
};

export type AnnouncementFormData = {
  categories?: number[];
  image?: string | null;
  news_status: boolean;
  notification_status: boolean;
  tags?: number[];
  text_ru: string;
  text_uz: string;
  title_ru: string;
  title_uz: string;
  video?: string | null;
};

export const getAnnouncements = () =>
  axiosApi.get<AnnouncementData[]>("/management/superadmin/elon/");
export const postAnnouncements = (data: AnnouncementFormData) =>
  axiosApi.post("/management/superadmin/elon/", data);
export const putAnnouncements = (id: number, data: AnnouncementFormData) =>
  axiosApi.put(`/management/superadmin/elon/${id}/`, data);
export const deleteAnnouncements = (id: number) =>
  axiosApi.delete(`/management/superadmin/elon/${id}/`);

export const getAnnouncementDetail = (id: string) =>
  axiosApi.get(`/management/superadmin/elon/${id}/`);
