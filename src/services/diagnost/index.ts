import { axiosApi } from "@/configs/api";
import { ApiResponse } from "@/types/response";

export type DiagnostParams = {
  student_id: number;
  subject_id: number;
};

export type DiagnostData = {
  id: number;
  student_id: number;
  student_name: string;
  subject_id: number;
  subject_name_uz: string;
  subject_name_ru: string;
  level: number;
  result: {};
  chapters: number[];
  topics: number[];
  create_date: string;
};

export const getDiagnosts = (params: DiagnostParams) =>
  axiosApi.get<ApiResponse<DiagnostData>>("/superadmin/diagnost/", params);

export const getDiagnost = (id: number) =>
  axiosApi.get<DiagnostData>(`/superadmin/diagnost/${id}/`);

export const deleteDiagnost = (id: number) =>
  axiosApi.delete(`/superadmin/diagnost/${id}/`);
