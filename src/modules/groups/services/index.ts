import { axiosApi } from "@/configs/api";

export type MyGroupsFormData = {
  name: string;
  students?: number[];
};

export type GroupAddStudentFormData = {
  student_ids: number[];
};

export type MyGroupsData = {
  id: number;
  name: string;
  students: number[];
  teacher: number;
};

export const getMyGroups = () =>
  axiosApi.get<MyGroupsData[]>("/func_teacher/my-groups/list");

export const getMyGroupDetail = (pk: string) =>
  axiosApi.get(`/func_teacher/my-groups/detail/${pk}/`);

export const postMyGroups = (data: MyGroupsFormData) =>
  axiosApi.post("/func_teacher/my-groups/create", data);

export const postGroupAddStudent = (
  group_id: number,
  data: GroupAddStudentFormData,
) => axiosApi.post(`/func_teacher/my-groups/${group_id}/add-students/`, data);

export const putMyGroupDetail = (pk: number, data: any) =>
  axiosApi.put(`/func_teacher/my-groups/detail/<${pk}>/`, data);
//Bodyda faqat o'zgartirmoqchi bo'lgan maydonlarni (masalan, {"name": "Yangi Guruh Nomi"}) yuborish mumkin.

export const deleteMyGroupDetail = (pk: number) =>
  axiosApi.delete(`/func_teacher/my-groups/detail/${pk}/`);
