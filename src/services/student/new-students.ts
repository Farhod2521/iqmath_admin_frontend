import { axiosApi } from "@/configs/api";

export type NewStudentData = {
  academy_or_school: string;
  academy_or_school_name: string;
  address: string;
  brithday: string;
  class_num: string;
  districts: string;
  document: string;
  document_type: string;
  full_name: string;
  id: number;
  identification: string;
  last_login_time: string;
  last_payment_amount: number;
  region: string;
  registration_date: string;
  registration_time: string;
  remaining_days: number;
  status: boolean;
  subject_name_ru: string;
  subject_name_uz: string;
  subscription_end_date: string;
  type_of_education: string;
};

export const getNewStudents = () =>
  axiosApi.get<NewStudentData[]>(
    "/func_teacher/students/without-group/new-students/",
  );
