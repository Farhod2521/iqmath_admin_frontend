import { axiosApi } from "@/configs/api";

export type PaymentsData = {
  amount: string;
  billing_id: number;
  id: number;
  invoice_uuid: string;
  payment_date: string;
  payment_gateway: string;
  receipt_url: string;
  sign: string;
  status: string;
  store_id: string;
  student: number;
  transaction_id: string;
  uuid: string;
  coupon_code: string;
  coupon_type: string;
  created_at: string;
  discount_percent: number;
  original_amount: string;
  plan_name: string;
  student_cashback_amount: string;
  student_id: number;
  student_name: string;
  student_phone: string;
  subscription_months: number;
  teacher_cashback_amount: string;
};

export type PaymentTypeData = {
  id: number;
  student_name: string;
  amount: number;
  original_amount: number;
  discount_percent: number;
  coupon_code?: string;
  coupon_type?: string;
  status: "pending" | "completed" | "failed";
  payment_gateway: string;
  teacher_cashback_amount: number;
  created_at: string;
  payment_date: string;
};

export const getPayments = () =>
  axiosApi.get<PaymentsData[]>("/payments/superadmin/payments/");

export const deletePayments = (id: number) =>
  axiosApi.delete(`/payments/superadmin/payments/${id}/`);

export const getPaymentsStudent = () =>
  axiosApi.get<PaymentTypeData[]>("/payments/teacher/payments/");
