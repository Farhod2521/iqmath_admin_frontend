import { get } from "@/http/request";

export type StatusCountParams = {
  regionSoato?: string;
  districtSoato?: string;
  neighborhoodId?: string;
};

export type StatusCountExcelData = {
  data: { file_content: string; file_name: string; file_type: string };
};

export type StatusCountData = {
  lawAccordanceCountsList: LawAccordanceCountsListData[];
  statusesList: CountListData[];
};

export const getStatusCount = (params: StatusCountParams) =>
  get<StatusCountData>(
    "/dashboard/properties/law-accordances/status-count",
    params,
  );
export const getStatucCountDownloadExcel = (params: StatusCountParams) =>
  get<any>("/dashboard/properties/law-accordances/status-count/excel", params);

export type LawAccordanceCountsListData = {
  id: number;
  code: string;
  lawArticle: string;
  statusCountsList: StatusCountListData[];
  totalCount: number;
};

type StatusCountListData = {
  id: number;
  code: string;
  count: number;
  indebtednessCount: string;
  name: string;
};

export type CountListData = {
  code: string;
  id: number;
  name: string;
};
