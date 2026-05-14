import { axiosApi } from "@/configs/api";

export const getBookType = () => axiosApi.get("/book/");
