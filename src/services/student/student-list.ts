import { axiosApi } from "@/configs/api";

export type StudentListData = {
  id: number;
  user_id: number;
  academy_or_school: string;
  academy_or_school_name: string;
  address: string;
  brithday: string;
  class_num: string;
  device: string;
  districts: string;
  document: string;
  document_type: string;
  email: string;
  full_name: string;
  lang: string;
  last_login_time: string;
  last_payment_amount: number;
  phone: string;
  region: string;
  registration_date: string;
  registration_time: string;
  remaining_days: number;
  role: string;
  status: boolean;
  subject_name_ru: string;
  subject_name_uz: string;
  subscription_end_date: string;
  type_of_education: string;
};
export type StudentParamsData = {
  page: number;
  size: number;
  role?: string;
  status?: string;
};

export type StudentListDataList = {
  page: number;
  results: StudentListData[];
  size: number;
  total: number;
  total_pages: number;
};

export const getStudentList = (params: StudentParamsData) =>
  axiosApi.get<StudentListDataList>("/auth/student/student_list/", params);
