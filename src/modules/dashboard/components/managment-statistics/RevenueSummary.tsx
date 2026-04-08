import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  isLoading: boolean;
}

const RevenueSummary = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();

  const revenueData = [
    {
      title: t("totalRevenue"),
      amount: data?.total_amount || 0,
      amountColor: "text-[#14D5B5]",
      iconBg: "bg-[#E8F7EC]",
      icon: "💰",
    },
    {
      title: t("lastMonthRevenue"),
      amount: data?.last_month_amount || 0,
      amountColor: "text-[#5B74FF]",
      iconBg: "bg-[#E8F1FF]",
      icon: "🗓️",
    },
    {
      title: t("year2025Revenue"),
      amount: data?.year_2025 || 0,
      amountColor: "text-[#FF8A00]",
      iconBg: "bg-[#FFF1E6]",
      icon: "📊",
    },
  ];

  if (isLoading) {
    return (
      <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
        <div className="h-7 w-44 rounded bg-[#F3F4F6] animate-pulse mb-6" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[14px] border border-[#E5E7EB] bg-white px-4 py-5 animate-pulse"
            >
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#F3F4F6]" />
              <div className="mx-auto mb-3 h-4 w-28 rounded bg-[#F3F4F6]" />
              <div className="mx-auto h-7 w-36 rounded bg-[#F3F4F6]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
      <h3 className="mb-6 text-[20px] font-bold leading-8 text-[#2A3547]">
        {t("revenueReport")}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {revenueData.map((item, index) => (
          <div
            key={index}
            className="rounded-[14px] border border-[#E5E7EB] bg-white px-4 py-5 text-center min-h-37"
          >
            <div
              className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${item.iconBg}`}
            >
              <span className="text-[24px] leading-none">{item.icon}</span>
            </div>

            <h4 className="mb-3 text-[15px] font-medium text-[#7C8DB5]">
              {item.title}
            </h4>

            <p
              className={`text-[18px] sm:text-[20px] font-bold ${item.amountColor}`}
            >
              {Number(item.amount || 0).toLocaleString()} so&apos;m
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueSummary;
