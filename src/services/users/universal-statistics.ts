import { axiosApi } from "@/configs/api";

export type UsersUniversalStatisticsData = {
  coin: number;
  coupon_students: any[];
  coupon_students_count: number;
  districts: string;
  full_name: string;
  identification: string;
  is_active: boolean;
  last_payment_amount: number;
  last_payment_date: string;
  last_payment_time: string;
  payment_status_count: { pending: number; success: number; failed: number };
  phone: string;
  referral_students: any[];
  referral_students_count: number;
  region: string;
  role: string;
  score: number;
  status: boolean;
  student_diagnost: any[];
  student_id: number;
  total_paid_amount: number;
  children: ChildrenStudetData[];
  children_count: number;
};

export type ChildrenStudetData = {
  class_name: string;
  coin: number;
  districts: string;
  full_name: string;
  identification: string;
  is_active: boolean;
  phone: string;
  region: string;
  remaining_days: number;
  score: number;
  status: boolean;
  student_id: number;
  subscription_end: string;
};

export type UsersUniversalStatisticsParams = {
  role?: string;
};

export const postUsersUniversalStatistics = (
  id: number,
  params: UsersUniversalStatisticsParams,
) =>
  axiosApi.post<UsersUniversalStatisticsData>(
    `/universal/statistics/${id}/`,
    params,
  );
