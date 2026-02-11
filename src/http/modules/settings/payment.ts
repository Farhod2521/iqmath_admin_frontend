import { get, post, put } from "@/http/request";
import { DistrictType, NeighborhoodsType, RegionType } from "./division";
import { LawAccordanceType } from "./law-accordance";

import { PaymentStatusEnum } from "@/constants/payment";

export type PaymentFormDataType = {
  minimalWage: number;
};

type PaymentDataType = {
  minimalWage: string;
};

export type PaymentDataInvoysItemType = {
  id: string;
  ownerId: string;
  propertyId: string;
  requestId: string;
  fee: string;
  balance: string;
  amount: string;
  serial: string;
  budgetAccount: string;
  bankAccount: string;
  note: string;
  issueDate: string;
  expireDate: string;
  createdAt: string;
  status: PaymentStatusEnum;
  paymentsList: [];
  smsLog: any;
};

type PaymentDataInvoysType = {
  invoicesList: PaymentDataInvoysItemType[];
};

type PaymentScheduleParamsType = {
  limit: number;
  page: number;
};

type PaymentScheduleFormDataType = {
  newMinimalWage: number;
  scheduledDate: string;
};

export type PaymentScheduleDataItem = {
  newMinimalWage: string;
  scheduledDate: string;
  id: string;
};

type PaymentScheduleData = {
  scheduleWageUpdateList: PaymentScheduleDataItem[];
  totalCount: number;
};

export type DecisonDataType = {
  paid_sum: string;
  sum: string;
};

export type DecisinParamsType = {
  property_id: string;
  decision_id: string;
};

type PaymentBillingSyncType = {
  serial: string;
};

export const getPayment = () => get<PaymentDataType>("/settings/payments");
export const putPayment = (data: PaymentFormDataType) =>
  put("/settings/payments", data);
export const getPaymentScheduleWage = (params: PaymentScheduleParamsType) =>
  get<PaymentScheduleData>("/settings/payments/schedule-wage-update", params);
export const postPaymentScheduleWage = (data: PaymentScheduleFormDataType) =>
  post("/settings/payments/schedule-wage-update", data);

export const getPaymentInvoys = (id: string) =>
  get<PaymentDataInvoysType>(`/payments/properties/${id}/invoices`);
export const postPaymentBillingSync = (data: PaymentBillingSyncType) =>
  post("/payments/billing/sync", data);
export const getMyGovDecision = (param: DecisinParamsType) =>
  get<DecisonDataType>("/payments/my-gov-decision", param);
export const getPaymentProperty = (id: string) =>
  get(`/payments/property/my-gov-decision/${id}`);

type InvoicesParamsType = {
  page?: number;
  limit?: number;
  search?: string;
  regionSoato?: string;
  districtSoato?: string;
  neighborhoodId?: string;
  status?: string;
};

export type InvoiceItemType = {
  region: RegionType;
  district: DistrictType;
  neighborhood: NeighborhoodsType;
  lawAccordance: LawAccordanceType;
  owner: any;
  cadastral_number: string;
  serial: string;
  balance: number;
  fee: number;
  status: string;
  id: string;
};

type InvoicesDataType = {
  invoices: InvoiceItemType[];
  totalCount: number;
};

export type DistributionsParamsType = {
  page?: number;
  limit?: number;
  search?: string;
  regionSoato?: string;
  districtSoato?: string;
  neighborhoodId?: string;
  type: DistributionsEnum;
};

export enum DistributionsEnum {
  A_LAW = "a-law",
  B_LAW = "b-law",
}

export type DistributionsDataType = {
  invoices: DistributionsItemType[];
  totalCount: number;
};

export type DistributionsItemType = {
  id: string;
  serial: string;
  balance: string;
  cadastral_number: string;
  region: string;
  district: string;
  neighborhood: string;
  fee: number;
  agentlik: number;
  adliya: number;
  kosmos: number;
  eHukumat: number;
  hokimiyat: number;
};

type InvoicesVaultParamsType = {
  by: string;
  soato: number;
};

export type InvoicesVaultDataType = {
  statusesList: string[];
  vaultList: VaultItemType[];
};

export type VaultItemType = {
  soato: number;
  name: string;
  totalFee: string;
  totalCount: string;
  statusesList: {
    count: string;
    fee: string;
    status: string;
  }[];
};

export const getInvoices = (params: InvoicesParamsType) =>
  get<InvoicesDataType>("/invoices", params);
export const getInvoiceId = (id: string) => get(`/invoices/${id}/payments`);

export const getInvoicesDistributions = (params: DistributionsParamsType) =>
  get<DistributionsDataType>("/invoices/distributions", params);

export const getExcelInvoicesDistributions = (
  params: DistributionsParamsType,
) => get<any>("/invoices/distributions/excel", params);

export const getExcelPaymentInvoices = (params: InvoicesParamsType) =>
  get<any>("/invoices/excel", params);

export const getInvoicesVault = (params: InvoicesVaultParamsType) =>
  get<InvoicesVaultDataType>("/invoices/vault", params);

export const getExcelInvoicesVault = (params: InvoicesVaultParamsType) =>
  get<any>("/invoices/vault/excel", params);
