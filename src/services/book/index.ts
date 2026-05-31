import { axiosApi } from "@/configs/api";
import { ApiResponse } from "@/types/response";

export type BookMyPurchasesParams = {
  type?: string;
};

export type BookOfflineOrdersParams = {
  status?: STATUS_DELIVERY;
};

export type BookOfflineOrdersFormData = {
  delivery_statusatus?: STATUS_DELIVERY;
  admin_note: string;
};

export const getBookMyPurchases = (param: BookMyPurchasesParams) =>
  axiosApi.get("/book/my-purchases/", param);

export const getBookOfflineOrders = (param: BookOfflineOrdersParams) =>
  axiosApi.get<ApiResponse<any>>("/book/offline-orders/", param);

export const putBookOfflineOrders = (
  id: number,
  data: BookOfflineOrdersFormData,
) => axiosApi.put(`/book/offline-orders/${id}/`, data);

export enum STATUS_DELIVERY {
  NEW = "new",
  SEEN = "seen",
  PREPARING = "preparing",
  DELIVERING = "delivering",
  DELIVERED = "delivered",
}
