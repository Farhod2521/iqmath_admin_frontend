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
};

export const getBooks = () => axiosApi.get<BooksData[]>("/book/books/");
