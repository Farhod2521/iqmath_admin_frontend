import { axiosApi } from "@/configs/api";
import { ApiResponse } from "@/types/response";

export type PaymentsSubscriptionsData = {
  end_date: string;
  id: number;
  is_active: boolean;
  is_paid: boolean;
  next_payment_date: string;
  start_date: string;
  student_id: number;
  student_name: string;
  student_phone: string;
};

export type PaymentsSubscriptionsFormData = {
  student: number;
  end_date: string;
  next_payment_date: string;
  is_paid: boolean;
};

export const getPaymentsSubscriptions = () =>
  axiosApi.get<ApiResponse<PaymentsSubscriptionsData>>(
    "/payments/superadmin/subscriptions/",
  );

export const postPaymentsSubscriptions = (
  data: PaymentsSubscriptionsFormData,
) =>
  axiosApi.post<ApiResponse<PaymentsSubscriptionsData>>(
    "/payments/superadmin/subscriptions/",
    data,
  );

export const putPaymentsSubscriptions = (
  id: number,
  data: PaymentsSubscriptionsFormData,
) =>
  axiosApi.put<ApiResponse<PaymentsSubscriptionsData>>(
    `/payments/superadmin/subscriptions/${id}`,
    data,
  );
