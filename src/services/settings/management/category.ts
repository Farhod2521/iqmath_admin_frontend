import { axiosApi } from "@/configs/api";
import { message } from "antd";

export type ManagementCategoryData = {
  id: number;
  title: string;
};

export type ManagementCategoryFormData = {
  title: string;
};

export const getManagementCategorys = () =>
  axiosApi.get<ManagementCategoryData[]>("/management/superadmin/category/");

export const getManagementCategory = (id: number) =>
  axiosApi.get<ManagementCategoryData>(
    `/management/superadmin/category/${id}/`,
  );

export const postManagementCategorys = (data: ManagementCategoryFormData) =>
  axiosApi.post<{
    message: string;
  }>("/management/superadmin/category/", data);

export const putManagementCategorys = (
  id: number,
  data: ManagementCategoryFormData,
) =>
  axiosApi.put<{
    message: string;
  }>(`/management/superadmin/category/${id}/`, data);

export const deleteManagementCategory = (id: number) =>
  axiosApi.delete<{
    message: string;
  }>(`/management/superadmin/category/${id}/`);
