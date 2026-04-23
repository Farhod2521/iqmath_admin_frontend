import { axiosApi } from "@/configs/api";

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

export const getTeacherRewardLog = () =>
  axiosApi.get<TeacherRewardLogData[]>(
    "/func_teacher/superadmin/teacher-reward-log/",
  );

export const deleteTeacherRewardLog = (pk: number) =>
  axiosApi.delete<{
    message: string;
  }>(`/func_teacher/superadmin/teacher-reward-log/${pk}/`);
