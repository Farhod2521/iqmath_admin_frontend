import { get } from "@/http/request";

export type DeadlinesLateParamType = {
  limit?: number;
  page?: number;
  search?: string;
  organisationId?: string;
  statusId?: string;
  regionSoato?: string;
  districtSoato?: string;
  neighborhoodId?: string;
};

export type DeadlinesLateType = {
  id: string;
  actionTime: string;
  cadastralNumber: string;
  createdAt: string;
  currentStatusName: string;
  deadline: string;
  deadlineStatusName: string;
  deadlineStatusCode?: string;
  districtName: string;
  organisationName: string;
  regionName: string;
  neighborhoodName?: string;
  status: any;
};

export type DeadlinesLateDataType = {
  lateDeadlinesList: DeadlinesLateType[];
  totalCount: number;
};

export const getDeadlinesLate = (params: DeadlinesLateParamType) =>
  get<DeadlinesLateDataType>("/dashboard/properties/deadlines/late", params);

export const getDeadlinesLateDownloadExcel = (params: DeadlinesLateParamType) =>
  get<DeadlinesLateDataType>(
    "/dashboard/properties/deadlines/late/excel",
    params,
  );
