import { axiosApi } from "@/configs/api";

export type TeacherRewardFormData = {
  student_id: string;
  reward_type: string;
  amount: string;
  reason: string;
};

export const postTeacherReward = (data: TeacherRewardFormData) =>
  axiosApi.post("/func_teacher/teacher/reward/", data);
