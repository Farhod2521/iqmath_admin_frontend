import { axiosApi } from "@/configs/api";

export type BookCategoriesFormData = {
  name_uz: string;
  name_ru: string;
  is_active: boolean;
};

export type BookCategoriesData = {
  name: string;
  name_uz: string;
  name_ru: string;
  is_active: boolean;
  created_at: string;
  id: number;
};

export const getBookCategories = () =>
  axiosApi.get<BookCategoriesData[]>("/book/categories/");
export const postBookCategories = (data: BookCategoriesFormData) =>
  axiosApi.post("/book/categories/", data);

export const putBookCategories = (id: number, data: BookCategoriesFormData) =>
  axiosApi.put(`/book/categories/${id}/`, data);

export const deleteBookCategories = (id: number) =>
  axiosApi.delete(`/book/categories/${id}/`);
