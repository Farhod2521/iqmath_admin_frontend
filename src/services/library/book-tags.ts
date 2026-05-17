import { axiosApi } from "@/configs/api";

export type BookTagsFormData = {
  name_uz: string;
  name_ru: string;
  is_active: boolean;
};

export type BookTagsData = {
  id: number;
  name: string;
  name_uz: string;
  name_ru: string;
  is_active: boolean;
  created_at: string;
};

export const getBookTags = () => axiosApi.get<BookTagsData[]>("/book/tags/");
export const postBookTags = (data: BookTagsFormData) =>
  axiosApi.post("/book/tags/", data);

export const putBookTags = (id: number, data: BookTagsFormData) =>
  axiosApi.put(`/book/tags/${id}/`, data);

export const deleteBookTags = (id: number) =>
  axiosApi.delete(`/book/tags/${id}/`);
