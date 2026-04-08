import { axiosApi } from "@/configs/api";

export type FuncStudentScoreLogsResultsData = {
  id: number;
  student_id: number;
  student_full_name: string;
  student_identification: string;
  question_id: number;
  award_type: string;
  awarded_coin: boolean;
  awarded_at: string;
};

export type FuncStudentScoreLogsData = {
  count: number;
  results: FuncStudentScoreLogsResultsData[];
};

export type FuncStudentScoreLogsParams = {
  student_id?: number;
  award_type?: string;
  date_from?: string;
  date_to?: string;
};

export const getFuncStudentScoreLogs = (params: FuncStudentScoreLogsParams) =>
  axiosApi.get<FuncStudentScoreLogsData>("/func_student/score-log/", params);

export const getFuncStudentScoreLog = (id: number) =>
  axiosApi.get<FuncStudentScoreLogsResultsData>(
    `/func_student/score-log/${id}/`,
  );

export const deleteFuncStudentScoreLog = (id: number) =>
  axiosApi.delete(`/func_student/score-log/${id}/`);
