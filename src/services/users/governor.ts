import { axiosApi } from "@/configs/api";
import { ApiResponse } from "@/types/response";

export type GovernorAssistantsParams = {
  page: number;
  limit: number;
  search?: string;
  neighborhoodId?: number | null;
  districtSoato?: number | null;
  regionSoato?: number | null;
};

export type GovernorAssistantsData = {
  id: number;
  addedBy: number;
  districtName: string;
  districtSoato: number;
  neighborhoodId: number;
  neighborhoodName: string;
  regionName: string;
  regionSoato: number;
  status: boolean;
  updatedAt: string;
  userName: string;
  userOneid: string;
};

export const geGovernorAssistantsUsers = (params: GovernorAssistantsParams) =>
  axiosApi.get<ApiResponse<GovernorAssistantsData>>(
    "/users/governor-assistants",
    params,
  );
