import { axiosApi } from "@/configs/api";

export type ManagementReferalCouponsData = {
  id: number;
  teacher_referral_bonus_points: number;
  student_referral_bonus_points: number;
  coupon_discount_percent: number;
  coupon_discount_percent_teacher: number;
  coupon_valid_days: number;
  referral_valid_days: number;
  coupon_student_cashback_percent: number;
  coupon_teacher_cashback_percent: number;
  created_at: string;
  updated_at: string;
};

export type ManagementReferalCouponsFormData = {
  teacher_referral_bonus_points: number;
  student_referral_bonus_points: number;
  coupon_discount_percent: number;
  coupon_discount_percent_teacher: number;
  coupon_valid_days: number;
  referral_valid_days: number;
  coupon_student_cashback_percent: number;
  coupon_teacher_cashback_percent: number;
};

export const getManagementReferalCoupons = () =>
  axiosApi.get<ManagementReferalCouponsData>(
    "/management/superadmin/referral-coupon-settings/",
  );

export const postManagementReferalCoupons = (
  data: ManagementReferalCouponsFormData,
) =>
  axiosApi.post<{
    message: string;
    data: ManagementReferalCouponsData;
  }>("/management/superadmin/referral-coupon-settings/", data);

export const putManagementReferalCoupons = (
  data: Partial<ManagementReferalCouponsFormData>,
) =>
  axiosApi.put<{
    message: string;
    data: ManagementReferalCouponsData;
  }>("/management/superadmin/referral-coupon-settings/", data);
