import { axiosApi } from "@/configs/api";

export type ManagementMatematicianData = {
  id: number;
  title_uz: string;
  title_ru: string;
  subtitle_ru: string;
  subtitle_uz: string;
  life_years_uz: string;
  life_years_ru: string;
  description_uz: string;
  description_ru: string;
  image: string;
  is_active: boolean;
  created_at: string;
};

export type ManagementMatematicianFormData = {
  title_uz: string;
  title_ru: string;
  subtitle_ru: string;
  subtitle_uz: string;
  life_years_uz: string;
  life_years_ru: string;
  description_uz: string;
  description_ru: string;
  image: string;
  is_active: boolean;
};

export const getManagementMatematicians = () =>
  axiosApi.get<ManagementMatematicianData[]>(
    "/management/superadmin/mathematician/",
  );
export const getManagementMatematician = (id: number) =>
  axiosApi.get<ManagementMatematicianData>(
    `/management/superadmin/mathematician/${id}/`,
  );
export const postManagementMatematician = (
  data: ManagementMatematicianFormData,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  return axiosApi.post<{
    message: string;
  }>("/management/superadmin/mathematician/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const putManagementMatematician = (
  id: number,
  data: Partial<ManagementMatematicianFormData>,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  return axiosApi.put<{
    message: string;
  }>(`/management/superadmin/mathematician/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteManagementMatematician = (id: number) =>
  axiosApi.delete<{
    message: string;
  }>(`/management/superadmin/mathematician/${id}/`);
