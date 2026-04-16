import { axiosApi } from "@/configs/api";
import { ApiParams, ApiResponse } from "@/types/response";

type ListType = {
  id: number;
  name: string;
};

export type UserParams = {
  page: number;
  size: number;
  search?: string;
  status?: string;
  role?: string;
  class_num?: number;
  subject_name?: string;
  lang?: string;
  device?: string;
};

export type UserData = {
  createdAt: string;
  fullName: string;
  id: number;
  lastAuthMethod: string;
  lastLogin: string;
  oneIdLogin: string;
  organisation: ListType;
  region: {
    name: string;
    soato: number;
  };
  district: {
    name: string;
    soato: number;
  };
  role: ListType;
  status: boolean;
};

export type UserApplicantsParams = {
  page: number;
  limit: number;
  fullName?: string;
  passportNumber?: string;
  mobilePhoneNumber?: string;
  status?: string;
};

export type UserApplicantsData = {
  birthDate: string;
  fullName: string;
  id: number;
  mobilePhoneNumber: string;
  passportNumber: string;
  personAddress: string;
};

export type UserOnlineData = {
  onlineUsersCount?: number;
};

export type StudentData = {
  academy_or_school: string;
  academy_or_school_name: string;
  address: string;
  brithday: string;
  class_num: string;
  device: null;
  districts: string;
  document: string;
  document_type: string;
  email: string;
  full_name: string;
  id: number;
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
  user_id: number;
};

export type StudentDataList = {
  results: StudentData[];
  total: number;
  total_pages: number;
  student_count: number;
  superadmin_count: number;
  teacher_count: number;
  total_count: number;
  tutor_count: number;
  parent_count: number;
};

export const getUsers = (params: UserParams) =>
  axiosApi.get<StudentDataList>(`/auth/student/student_list/`, params);

export const getUsersApplicants = (params: UserApplicantsParams) =>
  axiosApi.get<ApiResponse<UserApplicantsData>>("/users/applicants", params);

export const getUsersOnline = () =>
  axiosApi.get<UserOnlineData>("/users/online");
