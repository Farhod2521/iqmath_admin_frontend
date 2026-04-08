import { axiosApi } from "@/configs/api";

export const getDiagnostStudentsSubjects = (id: number) =>
  axiosApi.get<any>(`/func_student/diagnost/students/${id}/subjects/`);

export const getStudentsSubjects = (id: number) =>
  axiosApi.get<any>(`/func_student/students/${id}/subjects/`);

export const getStudentsSubjectsChapters = (id: number, subjectId: number) =>
  axiosApi.get<any>(
    `/func_student/students/${id}/subjects/${subjectId}/chapters/`,
  );
