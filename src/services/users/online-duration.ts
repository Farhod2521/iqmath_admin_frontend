import { axiosApi } from "@/configs/api";

export type OnlineDurationData = {
  teacher_id: number;
  teacher: string;
  total_online_seconds: number;
  total_online_formatted: string;
  is_currently_online: boolean;
  current_session_seconds: number;
  current_session_formatted: string;
  total_sessions: number;
};

export const getTeacherOnlineDuration = (id: number) =>
  axiosApi.get<OnlineDurationData>(
    `/func_teacher/teacher/online-duration/${id}/`,
  );
