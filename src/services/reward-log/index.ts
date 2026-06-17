import { axiosApi } from "@/configs/api";
import { ApiResponse } from "@/types/response";

export type TeacherRewardLogData = {
  id: number;
  teacher_id: number;
  teacher_name: string;
  student_id: number;
  student_name: string;
  reward_type: string;
  reward_type_display: string;
  amount: number;
  reason: string;
  created_at: string;
};

export type TeacherRewardLogParams = {
  teacher_id?: string;
  student_id?: string;
  reward_type?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
  page: number;
  page_size: number;
};

export const getTeacherRewardLog = (params: TeacherRewardLogParams) =>
  axiosApi.get<ApiResponse<TeacherRewardLogData[]>>(
    "/func_teacher/superadmin/teacher-reward-log/",
    params,
  );

export const deleteTeacherRewardLog = (pk: number) =>
  axiosApi.delete<{
    message: string;
  }>(`/func_teacher/superadmin/teacher-reward-log/${pk}/`);
