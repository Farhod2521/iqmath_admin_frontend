import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  isLoading: boolean;
}

const PlansRevenueChart = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();

  if (!data || !data.plans_revenue) return null;

  const maxRevenue = Math.max(...data.plans_revenue.map((p: any) => p.revenue));

  const colors = [
    "bg-[#5B7CFA]",
    "bg-[#13D6B3]",
    "bg-[#FF8A00]",
    "bg-[#8B5CF6]",
  ];

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6">
      <h3 className="mb-6 text-[20px] font-bold text-[#2A3547]">
        {t("plansRevenue")}
      </h3>

      <div className="space-y-6">
        {data.plans_revenue.map((plan: any, index: number) => {
          const percentage =
            maxRevenue > 0 ? (plan.revenue / maxRevenue) * 100 : 0;

          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] font-medium text-[#243B63]">
                  {plan.plan}
                </span>

                <span className="text-[14px] font-semibold text-[#5B7CFA]">
                  {plan.revenue.toLocaleString()} so&apos;m
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-[#E5E7EB] overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors[index % colors.length]} transition-all duration-700`}
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

export default PlansRevenueChart;
