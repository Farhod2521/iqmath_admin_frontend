import { axiosApi } from "@/configs/api";
import { ApiResponse } from "@/types/response";

export type TeacherFineFormData = {
  student_id: number;
  fine_type: string;
  amount: number;
  reason: string;
};

export type TeacherFineParams = {
  student_id: number;
  given_by_id: number;
  fine_type: string;
};

export type TeacherFineData = {
  fine_id: number;
  fine_type: string;
  fine_type_display: string;
  amount: number;
  reason: string;
  created_at: string;
  student: { id: number; full_name: string; phone: string };
};

export const postTeacherFine = (data: TeacherFineFormData) =>
  axiosApi.post("/teacher/teacher/fine/", data);

export const getTeacherFine = (params: TeacherFineParams) =>
  axiosApi.get<ApiResponse<TeacherFineData>>("/teacher/teacher/fine/", params);
