import { axiosApi } from "@/configs/api";

export type BenefitsData = {
  description: string;
  id: number;
  is_selected: boolean;
  title: string;
};

export type SubscriptionPlansData = {
  created_at: string;
  discount_percent: number;
  id: number;
  is_active: boolean;
  months: number;
  months_display: string;
  name: string;
  price_per_month: string;
  sale_price: number;
  updated_at: string;
  category: {
    id: number;
    title: string;
  };
  benefits: BenefitsData[];
};

export type SubscriptionPlanFormData = {
  name: string;
  months: number;
  category: string;
  discount_percent: number;
  price_per_month: string;
  is_active: boolean;
};

export const getSubscriptionPlans = () =>
  axiosApi.get<SubscriptionPlansData[]>(
    "/payments/superadmin/subscription-plan/",
  );

export const postSubscriptionPlan = (data: SubscriptionPlanFormData) =>
  axiosApi.post("/payments/superadmin/subscription-plan/", data);

export const putSubscriptionPlan = (
  id: number,
  data: SubscriptionPlanFormData,
) => axiosApi.put(`/payments/superadmin/subscription-plan/${id}`, data);

export const deleteSubscriptionPlan = (id: number) =>
  axiosApi.delete(`/payments/superadmin/subscription-plan/${id}`);
