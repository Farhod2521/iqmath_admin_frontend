import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BiPencil } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { MdCalendarMonth, MdPaid } from "react-icons/md";
import { Button, Popconfirm } from "antd";
import { SubscriptionPlansData } from "../../services";

type Lang = "uz" | "ru";

type Props = {
  plans: SubscriptionPlansData[] | undefined;
  onEdit: (plan: SubscriptionPlansData) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

export default function SubscriptionPlansContent({
  plans,
  onEdit,
  onDelete,
  isDeleting,
}: Props) {
  const { t, i18n } = useTranslation();

  const lang = useMemo<Lang>(() => {
    const l = (i18n.language || "uz").slice(0, 2);
    return l === "ru" ? "ru" : "uz";
  }, [i18n.language]);

  if (!plans?.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
        {t("noData") || "Ma’lumot yo‘q"}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
      {plans?.map((item) => {
        const original = Number(item.price_per_month || 0);
        const sale = Number(item.sale_price || 0);
        const saved = Math.max(0, original - sale);
        const savedPercent =
          original > 0 ? Math.round((saved / original) * 100) : 0;

        return (
          <div
            key={item.id}
            className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-blue-400 bg-linear-to-br from-blue-500 to-purple-500 p-px transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {item.category?.title && (
              <div className="absolute right-0 top-0 z-10 max-w-[45%] sm:max-w-[50%]">
                <div className="truncate rounded-bl-xl rounded-tr-2xl bg-black/35 px-2.5 py-1 text-[10px] font-bold text-white sm:px-3 sm:text-xs">
                  {item.category.title}
                </div>
              </div>
            )}

            <div className="flex h-full flex-col rounded-[15px] bg-white/95 p-4 backdrop-blur sm:rounded-[17px] sm:p-5 lg:p-6">
              <h3 className="pr-16 text-base font-bold leading-6 text-gray-900 sm:pr-20 sm:text-lg lg:text-xl">
                {item.name}
              </h3>

              <div className="mt-2">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1">
                  <MdCalendarMonth
                    className="shrink-0 text-blue-600"
                    size={16}
                  />
                  <span className="truncate text-xs font-semibold text-gray-700 sm:text-sm">
                    {item.months} {t("month")}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                {original > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <MdPaid className="shrink-0 text-blue-900" size={18} />
                    <span className="wrap-break-word text-xl font-extrabold leading-tight text-gray-900 sm:text-2xl">
                      {sale.toLocaleString()} {t("pricing.currency")}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700 sm:text-xs">
                    {t("pricing.youSave")}: {saved.toLocaleString()}{" "}
                    {t("pricing.currency")}
                  </span>

                  {savedPercent > 0 && (
                    <span className="text-[10px] font-semibold text-gray-500 sm:text-xs">
                      (-{savedPercent}%)
                    </span>
                  )}
                </div>
              </div>

              <ul className="mt-4 flex-1 space-y-2.5 sm:mt-5">
                {(item.benefits || []).map((b) => (
                  <li
                    key={b.id}
                    className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                      b.is_selected
                        ? "text-gray-800"
                        : "text-gray-400 line-through"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        b.is_selected
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {b.is_selected ? "✓" : "✕"}
                    </span>

                    <span className="leading-5 wrap-break-word">{b.title}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row">
                <Button
                  onClick={() => onEdit(item)}
                  type="default"
                  className="flex! h-10! w-full items-center! justify-center! gap-2 rounded-xl! px-3! text-sm!"
                >
                  <BiPencil className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {t("editProfile") || "Tahrirlash"}
                  </span>
                </Button>

                <Popconfirm
                  title={t("deleteConfirm") || "O‘chirishni tasdiqlaysizmi?"}
                  okText={t("yes") || "Ha"}
                  cancelText={t("no") || "Yo‘q"}
                  onConfirm={() => onDelete(item.id)}
                >
                  <Button
                    danger
                    disabled={isDeleting}
                    className="flex! h-10! w-full items-center! justify-center! gap-2 rounded-xl! px-3! text-sm!"
                  >
                    <FiTrash2 className="h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {t("delete") || "O‘chirish"}
                    </span>
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
