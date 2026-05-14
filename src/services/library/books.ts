import { axiosApi } from "@/configs/api";
import { BookTagsData } from "./book-tags";
import { BookCategoriesData } from "./book-categories";

export type BooksData = {
  id: number;
  name: string;
  description: string;
  category: BookCategoriesData;
  tags: BookTagsData[];
  file: string;
  cover_image: string;
  price: string;
  status: string;
  date: string;
  created_at: string;
  updated_at: string;
  is_offline: boolean;
  quantity: number | null;
};

export type BooksParams = {
  category?: number;
  status?: string;
  tag?: number;
};

export type BooksFormData = {
  name: string;
  description: string;
  category: number;
  tags: number[];
  price: number;
  status: string;
  is_offline: boolean;
  quantity: number | null;
  date: string;
  cover_image?: string | File;
};

export const getBooks = (params?: BooksParams) =>
  axiosApi.get<BooksData[]>("/book/books/", params);

export const getBook = (id?: number) =>
  axiosApi.get<BooksData>(`/book/books/${id}/`);

export const postBook = (data: BooksFormData) =>
  axiosApi.post("/book/books/", data);

export const putBook = (id: number, data: BooksFormData) =>
  axiosApi.put(`/book/books/${id}/`, data);

export const deleteBook = (id: number) => axiosApi.delete(`/book/books/${id}/`);
