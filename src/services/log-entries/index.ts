import { axiosApi } from "@/configs/api";
import { ApiResponse } from "@/types/response";

export type LogEntries = {
  user_id: number;
  action_flag: number;
  content_type: string;
  limit: number;
};

export type LogEntriesData = {
  id: number;
  action_time: string;
  user_id: number;
  user: string;
  content_type_id: number;
  content_type: string;
  object_id: string;
  object_repr: string;
  action_flag: number;
  action_label: string;
  change_message: string;
};

export type LogEntriesFormData = {
  user_id: number;
  content_type_id: number;
  object_id: string;
  object_repr: string;
  action_flag: number;
  change_message: string;
};

export const getLogEntrieses = () =>
  axiosApi.get<ApiResponse<LogEntriesData>>("/superadmin/log-entries/");

export const getLogEntries = (id: number) =>
  axiosApi.get<LogEntriesData>(`/superadmin/log-entries/${id}/`);

export const postLogEntries = (data: LogEntriesFormData) =>
  axiosApi.post(`/superadmin/log-entries/`, data);

export const deleteLogEntries = (id: number) =>
  axiosApi.delete(`/superadmin/log-entries/${id}/`);

export const deleteLogEntrieses = (data: {
  user_id: number;
  action_flag: number;
}) => axiosApi.delete(`/superadmin/log-entries/`, data);

// action_flag = 1
// 1 = "qo'shish"
// 2 = "o'zgartirish"
// 3 = "o'chirish"
