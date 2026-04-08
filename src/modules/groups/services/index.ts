import { axiosApi } from "@/configs/api";

export type MyGroupsFormData = {
  name: string;
  teacher_id: number;
  students?: number[];
};

export type GroupAddStudentFormData = {
  student_ids: number[];
};

export type StudentsType = {
  full_name: string;
  id: number;
  identification: string;
};

export type MyGroupsData = {
  created_at: string;
  id: number;
  name: string;
  student_count: number;
  students: StudentsType[];
  teacher_id: number;
  teacher_name: string;
};

export const getMyGroups = () =>
  axiosApi.get<MyGroupsData[]>("/func_teacher/superadmin/group/");

export const getMyGroupDetail = (pk: string) =>
  axiosApi.get(`/func_teacher/superadmin/group/${pk}/`);

export const postMyGroups = (data: MyGroupsFormData) =>
  axiosApi.post("/func_teacher/superadmin/group/", data);

export const postGroupAddStudent = (group_id: number, data: GroupAddStudentFormData) =>
  axiosApi.post(
    `/func_teacher/superadmin/group/${group_id}/add-students/`,
    data,
  );

export const putMyGroupDetail = (pk: number, data: any) =>
  axiosApi.put(`/func_teacher/superadmin/group/${pk}/`, data);
//Bodyda faqat o'zgartirmoqchi bo'lgan maydonlarni (masalan, {"name": "Yangi Guruh Nomi"}) yuborish mumkin.

export const deleteMyGroupDetail = (pk: number) =>
  axiosApi.delete(`/func_teacher/superadmin/group/${pk}/`);
