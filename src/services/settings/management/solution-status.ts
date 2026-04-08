import { axiosApi } from "@/configs/api";
import { ApiResponse, ApiResponseData } from "@/types/response";
import { ManagementMatematicianData } from "./matematician";

export type ManagementSolutionStatusData = {
  id: number;
  subject_is_active: boolean;
  recommendation_is_active: boolean;
};

export type ManagementSolutionStatusFormData = {
  subject_is_active: boolean;
  recommendation_is_active: boolean;
};

export const getManagementSolutionStatus = () =>
  axiosApi.get<ManagementSolutionStatusData[]>(
    "/management/superadmin/solution-status/",
  );

export const postManagementSolutionStatus = (
  data: ManagementSolutionStatusFormData,
) =>
  axiosApi.post<ApiResponseData<ManagementSolutionStatusData>>(
    "/management/superadmin/solution-status/",
    data,
  );

export const putManagementSolutionStatus = (
  id: number,
  data: ManagementSolutionStatusFormData,
) =>
  axiosApi.put<ApiResponseData<ManagementSolutionStatusData>>(
    `/management/superadmin/solution-status/${id}/`,
    data,
  );

export const deleteManagementSolutionStatus = (id: number) =>
  axiosApi.delete<ApiResponseData<ManagementSolutionStatusData>>(
    `/management/superadmin/solution-status/${id}/`,
  );
