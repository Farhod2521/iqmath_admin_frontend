import { axiosApi } from "@/configs/api";
import { ApiParams, ApiResponse } from "@/types/response";

export type FuncStudentConversionHistoryData = {
  id: number;
  student: {
    id: number;
    full_name: string;
    phone: string;
  };
  conversion_type: string;
  conversion_type_display: string;
  amount_from: number;
  amount_to: number;
  som_after: number;
  comment: string;
  status: string;
  status_display: string;
  created_at: string;
};

export const getFuncStudentConversionHistorys = (params: ApiParams) =>
  axiosApi.get<ApiResponse<FuncStudentConversionHistoryData>>(
    "/func_student/conversion-history/",
    params,
  );

export const getFuncStudentConversionHistory = (id: number) =>
  axiosApi.get<FuncStudentConversionHistoryData>(
    `/func_student/conversion-history/${id}/`,
  );
