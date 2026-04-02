import { axiosApi } from "@/configs/api";

export type ManagementProductData = {
  id: number;
  name_uz: string;
  name_ru: string;
  coin: number;
  count: number;
  image: string;
  price_money: number;
  price_score: number;
};

export type ManagementProductFormData = {
  name_uz: string;
  name_ru: string;
  coin: number;
  count: number;
  image: string;
};

export const getManagementProducts = () =>
  axiosApi.get<ManagementProductData[]>("/management/superadmin/product/");

export const getManagementProduct = (id: number) =>
  axiosApi.get<ManagementProductData>(`/management/superadmin/product/${id}/`);

export const postManagementProduct = (data: ManagementProductFormData) => {
  const formData = new FormData();

  formData.append("name_uz", data.name_uz);
  formData.append("name_ru", data.name_ru);
  formData.append("coin", String(data.coin));
  formData.append("count", String(data.count));
  formData.append("image", data.image as any); // file

  return axiosApi.post<{
    message: string;
  }>("/management/superadmin/product/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const putManagementProduct = (
  id: number,
  data: Partial<ManagementProductFormData>,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value as any);
    }
  });

  return axiosApi.put<{
    message: string;
  }>(`/management/superadmin/product/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteManagementProduct = (id: number) =>
  axiosApi.delete<{
    message: string;
  }>(`/management/superadmin/product/${id}/`);
