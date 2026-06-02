import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  isLoading: boolean;
}

const MonthlySubscriptionsChart = ({ data, isLoading }: Props) => {
  const { t, i18n } = useTranslation();

  const monthNamesUz = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  const monthNamesRu = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const monthNames = i18n.language?.startsWith("ru")
    ? monthNamesRu
    : monthNamesUz;

  if (isLoading) {
    return (
      <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-6 sm:p-7">
        <div className="mb-6 h-8 w-44 animate-pulse rounded-md bg-[#F3F4F6]" />

        <div className="space-y-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <div className="mb-2 flex items-center justify-between">
                <div className="h-5 w-20 animate-pulse rounded bg-[#F3F4F6]" />
                <div className="h-5 w-12 animate-pulse rounded bg-[#F3F4F6]" />
              </div>
              <div className="h-2.5 w-full animate-pulse rounded-full bg-[#F3F4F6]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data?.monthly_subscriptions?.length) {
    return (
      <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-6 sm:p-7">
        <h3 className="mb-6 text-[20px] font-bold text-[#2A3547]">
          {t("monthlySubscriptions")}
        </h3>
        <p className="text-sm text-[#7C8DB5]">{t("noData")}</p>
      </div>
    );
  }

  const maxCount = Math.max(
    ...data.monthly_subscriptions.map((sub: any) => sub.count),
    0,
  );

  return (
    <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-6 sm:p-7">
      <h3 className="mb-6 text-[20px] font-bold text-[#243B63]">
        {t("monthlySubscriptions")}
      </h3>

      <div className="space-y-4">
        {data.monthly_subscriptions.map((subscription: any, index: number) => {
          const percentage =
            maxCount > 0 ? (subscription.count / maxCount) * 100 : 0;

          const monthName =
            monthNames[subscription.month - 1] ||
            `${t("month")} ${subscription.month}`;

          return (
            <div key={index}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-[14px] font-medium text-[#243B63]">
                  {monthName}
                </span>

                <span className=" flex flex-col shrink-0 text-[14px] font-semibold text-[#20D5B3]">
                  {subscription.count} {t("piece")}
                  <span className="text-[10px]">({subscription.year})</span>
                </span>
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                <div
                  className="h-full rounded-full bg-[#20D5B3] transition-all duration-700"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlySubscriptionsChart;
