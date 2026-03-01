import { axiosApi } from "@/configs/api";

type LocationType = {
  soato: number;
  name: string;
};

export type UserMeData = {
  id: number;
  role: string;
  full_name: string;
  academy_or_school: string;
  academy_or_school_name: string;
  address: string;
  brithday: string;
  class_name_ru: string;
  class_name_uz: string;
  districts: string;
  document: string;
  document_type: string;
  email: string;
  has_diagnost: string;
  identification: string;
  phone: string;
  region: string;
  student_date: string;
  student_time: string;
  telegram_id: string;
  type_of_education: string;
};

export const getUserMe = () => axiosApi.get<UserMeData>(`/users/me`);
export const getAuthUserMe = () =>
  axiosApi.get<UserMeData>(`/auth/student/profile/`);
