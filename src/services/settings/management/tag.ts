import { axiosApi } from "@/configs/api";
import { postFile } from "@/services";

export type ManagementTagData = {
  id: number;
  title: string;
};

export type ManagementTagFormData = {
  title: string;
};

export const getManagementTags = () =>
  axiosApi.get<ManagementTagData[]>("/management/superadmin/tag/");

export const getManagementTag = (id: number) =>
  axiosApi.get<ManagementTagData>(`/management/superadmin/tag/${id}/`);

export const postManagementTag = (data: ManagementTagFormData) =>
  axiosApi.post<{
    message: string;
  }>(`/management/superadmin/tag/`, data);

export const putManagementTag = (id: number, data: ManagementTagFormData) =>
  axiosApi.put<{
    message: string;
  }>(`/management/superadmin/tag/${id}/`, data);

export const deleteManagementTag = (id: number) =>
  axiosApi.delete<{
    message: string;
  }>(`/management/superadmin/tag/${id}/`);
