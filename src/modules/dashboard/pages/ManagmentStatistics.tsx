import { getManagementStatistics } from "@/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import StatsCards from "../components/managment-statistics/StatsCards";
import MentorClosedChatsStats from "../components/closed/MentorClosedChatsStats";
import RevenueSummary from "../components/managment-statistics/RevenueSummary";
import PlansRevenueChart from "../components/managment-statistics/PlansRevenueChart";
import MonthlySubscriptionsChart from "../components/managment-statistics/MonthlySubscriptionsChart";
import CashbackReport from "../components/managment-statistics/CashbackReport";
import Statistics from "./Statistics";

const ManagmentStatistics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["ManagmentStatistics-data"],
    queryFn: getManagementStatistics,
  });

  return (
    <div className="px-8 pt-2 pb-4 md:px-10 md:pt-4 md:pb-5">
      <StatsCards data={data} isLoading={isLoading} />
      <div className="my-8">
        {/* <MentorClosedChatsStats /> */}
        <Statistics />
      </div>
      <div className="grid grid-cols-1 gap-8 mb-8 xl:grid-cols-2">
        <RevenueSummary data={data} isLoading={isLoading} />
        <PlansRevenueChart data={data} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
        <MonthlySubscriptionsChart data={data} isLoading={isLoading} />
        <CashbackReport data={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ManagmentStatistics;
