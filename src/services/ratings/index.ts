import { axiosApi } from "@/configs/api";

export type StudentTopFormData = {
  top_count: number;
  type: string;
};

export type StudentTopResutsDataList = {
  coin: number;
  full_name: string;
  phone: string;
  score: number;
  som: number;
  student_id: number;
};

export type StudentTopResutsData = {
  results: StudentTopResutsDataList[];
};

export const postStudenttop = (data: StudentTopFormData) =>
  axiosApi.post<StudentTopResutsData>(
    "/func_student/student/studenttop/app",
    data,
  );
