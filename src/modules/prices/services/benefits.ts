import { axiosApi } from "@/configs/api";

export type SubscriptionBenefitsData = {
  id: number;
  title_uz: string;
  title_ru: string;
  description_uz: string;
  description_ru: string;
  is_active: boolean;
  created_at: string;
};

export type SubscriptionBenefitsFormData = {
  title_uz: string;
  title_ru: string;
  description_uz: string;
  description_ru: string;
  is_active: boolean;
};

export const getSubscriptionBenefits = () =>
  axiosApi.get<SubscriptionBenefitsData[]>(
    "/payments/superadmin/subscription-benefits/",
  );

export const postSubscriptionBenefits = (data: SubscriptionBenefitsFormData) =>
  axiosApi.post("/payments/superadmin/subscription-benefits/", data);

export const putSubscriptionBenefits = (
  id: number,
  data: SubscriptionBenefitsFormData,
) => axiosApi.post(`/payments/superadmin/subscription-benefits/${id}/`, data);

export const deleteSubscriptionBenefits = (id: number) =>
  axiosApi.delete(`/payments/superadmin/subscription-benefits/${id}/`);
