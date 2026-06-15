import { axiosApi } from "@/configs/api";
import { ApiParams } from "@/types/response";

export type FuncStudentScoreLogsResultsData = {
  award_type: string;
  awarded_at: string;
  awarded_coin: boolean;
  chapter: {
    id: number;
    name_ru: string;
    name_uz: string;
  };
  id: number;
  question: {
    id: number;
    question_text_ru: string;
    question_text_uz: string;
  };
  student_full_name: string;
  student_id: number;
  student_identification: string;
  subject: {
    class_name: string;
    id: 7;
    name_ru: string;
    name_uz: string;
  };
  topic: {
    id: number;
    name_ru: string;
    name_uz: string;
  };
};

export type FuncStudentScoreLogsData = {
  count: number;
  // next: string;
  // previous: string;
  results: FuncStudentScoreLogsResultsData[];
};

export type FuncStudentScoreLogsParams = {
  search?: string;
  student_id?: number;
  award_type?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  limit?: number;
};

export const getFuncStudentScoreLogs = (params: FuncStudentScoreLogsParams) =>
  axiosApi.get<FuncStudentScoreLogsData>("/func_student/score-log/", params);

export const getFuncStudentScoreLog = (id: number) =>
  axiosApi.get<FuncStudentScoreLogsResultsData>(
    `/func_student/score-log/${id}/`,
  );

export const deleteFuncStudentScoreLog = (id: number) =>
  axiosApi.delete(`/func_student/score-log/${id}/`);
