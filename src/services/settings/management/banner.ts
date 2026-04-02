import { axiosApi } from "@/configs/api";

export type ManagementBannerData = {
  id: number;
  image: string;
  desc: string;
};

export type ManagementBannerFormData = {
  image: string;
  desc: string;
};

export const getManagementBanners = () =>
  axiosApi.get<ManagementBannerData[]>("/management/superadmin/banner/");

export const getManagementBanner = (id: number) =>
  axiosApi.get<ManagementBannerData>(`/management/superadmin/banner/${id}/`);

export const postManagementBanner = (data: ManagementBannerFormData) => {
  const formData = new FormData();

  formData.append("image", data.image as any);
  if (data.desc) formData.append("desc", data.desc);

  return axiosApi.post<{ message: string }>(
    "/management/superadmin/banner/",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
};

export const putManagementBanner = (
  id: number,
  data: Partial<ManagementBannerFormData>,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "image" && typeof value === "string") return; // ❗ skip url
      formData.append(key, value as any);
    }
  });

  return axiosApi.put<{ message: string }>(
    `/management/superadmin/banner/${id}/`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
};

export const deleteManagementBanner = (id: number) =>
  axiosApi.delete<{ message: string }>(`/management/superadmin/banner/${id}/`);
