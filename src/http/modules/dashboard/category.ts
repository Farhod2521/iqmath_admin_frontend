import { get } from "@/http/request";

import { DashboardLawAccordanceParamsType } from "./law-accordance";

type DownloadStatusCountParamsType = {
  soato: string | number;
  by: string;
};

export const getExcelStatusCount = (params: DownloadStatusCountParamsType) =>
  get<any>("/report/properties/status-count", params);

export const getExcelLawAccordance = (
  params: DashboardLawAccordanceParamsType,
) => get<any>("/report/properties/law-accordance-count", params);
