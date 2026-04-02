import { axiosApi } from "@/configs/api";

export type ManagementUploadFileParams = {
  page: number;
  limit: number;
};

export type ManagementUploadFileData = {
  id: number;
  file_url: string;
  uploaded_at: string;
};

export type ManagementUploadFileFormData = {
  title: string;
};

export const getManagementUploadFiles = (params: ManagementUploadFileParams) =>
  axiosApi.get<ManagementUploadFileData[]>(
    "/management/upload-file-list/",
    params,
  );

export const getManagementUploadFile = (id: number) =>
  axiosApi.get<ManagementUploadFileData>(`/management/upload-file-list/${id}/`);

export const postFileManagementUploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosApi.post<{
    message: string;
    file_url: string;
    max_allowed_mb: number;
  }>("/management/upload-file/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// export const putFileManagementUploadFile = (id: number, data: ManagementUploadFileFormData) =>
//   axiosApi.put<{
//     message: string;
//   }>(`/management/superadmin/UploadFile/${id}/`, data);

export const deleteManagementUploadFile = (id: number) =>
  axiosApi.delete<{
    message: string;
  }>(`/management/upload-file-delete/${id}/`);
