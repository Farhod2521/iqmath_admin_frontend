import { axiosApi } from "@/configs/api";

export interface SubscriptionCategoriesData {
  id: number;
  title_uz: string;
  title_ru: string;
  slug: string;
  is_active: boolean;
  created_at: string;
}

export type SubscriptionCategoriesFormData = {
  title_uz: string;
  title_ru: string;
  slug: string;
  is_active: boolean;
};

export const getSubscriptionCategories = () =>
  axiosApi.get<SubscriptionCategoriesData[]>(
    "/payments/superadmin/subscription-categories/",
  );
export const postSubscriptionCategories = (
  data: SubscriptionCategoriesFormData,
) => axiosApi.post("/payments/superadmin/subscription-categories/", data);

export const putSubscriptionCategories = (
  id: number,
  data: SubscriptionCategoriesFormData,
) => axiosApi.post(`/payments/superadmin/subscription-categories/${id}/`, data);

export const deleteSubscriptionCategories = (id: number) =>
  axiosApi.delete(`/payments/superadmin/subscription-categories/${id}/`);
