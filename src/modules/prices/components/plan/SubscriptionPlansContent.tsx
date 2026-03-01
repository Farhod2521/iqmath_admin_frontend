import React, { useMemo } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BiPencil } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { MdCalendarMonth, MdPaid } from "react-icons/md";
import { SubscriptionPlansData } from "../../services";
import { Button, Popconfirm } from "antd";

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

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {plans?.map((item) => (
        <div
          key={item?.id}
          className="relative flex flex-col overflow-hidden transition-all duration-300 rounded-xl sm:rounded-2xl p-px bg-linear-to-br from-blue-500 to-purple-500"
        >
          {/* CATEGORY BADGE */}
          {item.category?.title && (
            <div className="absolute top-0 right-0 z-10">
              <div className="px-3 py-1 text-[10px] sm:text-xs font-bold text-white bg-black/30 rounded-bl-xl rounded-tr-xl">
                {item.category?.title}
              </div>
            </div>
          )}

          <div className="flex flex-col h-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur">
            {/* TITLE */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {item.name}
            </h3>

            {/* MONTH */}
            <div className="mt-2">
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-blue-50 border border-blue-100">
                <MdCalendarMonth color="#5d87ff" size={16} />
                <span className="text-sm font-semibold text-gray-700">
                  {item.months} {t("month")}
                </span>
              </div>
            </div>

            {/* PRICE */}
            <div className="mt-4 space-y-2">
              {(() => {
                const original = Number(item.price_per_month);
                const sale = Number(item.sale_price || 0);
                const saved = Math.max(0, original - sale);
                const savedPercent =
                  original > 0 ? Math.round((saved / original) * 100) : 0;

                return (
                  <>
                    {original > 0 && (
                      <div className="flex items-center gap-2">
                        <MdPaid size={18} color="#1e40af" />
                        <span className="text-xl sm:text-2xl font-extrabold text-gray-900">
                          {sale.toLocaleString()} {t("pricing.currency")}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 text-[10px] sm:text-xs font-bold text-green-700 bg-green-100 rounded-full">
                        {t("pricing.youSave")}: {saved.toLocaleString()}{" "}
                        {t("pricing.currency")}
                      </span>

                      {savedPercent > 0 && (
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-500">
                          (-{savedPercent}%)
                        </span>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* BENEFITS */}
            <ul className="flex-1 mt-5 space-y-2">
              {item.benefits.map((b) => (
                <li
                  key={b.id}
                  className={`flex items-center gap-2 text-xs sm:text-sm ${
                    b.is_selected
                      ? "text-gray-800"
                      : "text-gray-400 line-through"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full
                  ${
                    b.is_selected
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  >
                    {b.is_selected ? "✓" : "✕"}
                  </span>
                  {b.title}
                </li>
              ))}
            </ul>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-2 mt-5">
              <Button
                onClick={() => onEdit(item)}
                type="default"
                className="flex items-center w-full justify-center gap-2 py-1.5 text-sm"
              >
                <BiPencil className="w-4 h-4" />
                {t("editProfile")}
              </Button>

              <Popconfirm
                title={t("deleteConfirm")}
                okText={t("yes") || "Ha"}
                cancelText={t("no") || "Yo‘q"}
                onConfirm={() => onDelete(item.id)}
              >
                <Button
                  danger
                  disabled={isDeleting}
                  className="flex items-center  w-full justify-center gap-2 py-1.5 text-sm"
                >
                  <FiTrash2 className="w-4 h-4" />
                  {t("delete")}
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
