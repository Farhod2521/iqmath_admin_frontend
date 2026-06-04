import { STATUS_DELIVERY } from "@/services";

export const deliveryOptions = [
  {
    value: STATUS_DELIVERY.NEW,
    label: "Yangi",
  },
  {
    label: "Admin ko'rdi",
    value: STATUS_DELIVERY.SEEN,
  },
  {
    label: "Tayyorlanmoqda",
    value: STATUS_DELIVERY.PREPARING,
  },
  {
    label: "Yetkazilmoqda",
    value: STATUS_DELIVERY.DELIVERING,
  },
  {
    label: "Yetkazildi",
    value: STATUS_DELIVERY.DELIVERED,
  },
];
