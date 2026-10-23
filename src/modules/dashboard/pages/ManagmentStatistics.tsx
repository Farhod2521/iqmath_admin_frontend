import { useState } from "react";
import { getDashboardOverview, getManagementStatistics } from "@/services";
import { useQuery } from "@tanstack/react-query";
import StatsCards from "../components/managment-statistics/StatsCards";
import RevenueSummary from "../components/managment-statistics/RevenueSummary";
import PlansRevenueChart from "../components/managment-statistics/PlansRevenueChart";
import MonthlySubscriptionsChart from "../components/managment-statistics/MonthlySubscriptionsChart";
import CashbackReport from "../components/managment-statistics/CashbackReport";
import DashboardHero from "../components/overview/DashboardHero";
import PlatformActivity from "../components/overview/PlatformActivity";
import UsersShare from "../components/overview/UsersShare";
import Statistics from "./Statistics";

const ManagmentStatistics = () => {
  const [days, setDays] = useState(7);

  const { data, isLoading } = useQuery({
    queryKey: ["ManagmentStatistics-data"],
    queryFn: getManagementStatistics,
  });

  // O'sish foizlari, kichik grafiklar va kunlik faollik
  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ["dashboard-overview", days],
    queryFn: () => getDashboardOverview(days),
    placeholderData: (previous) => previous,
    retry: 1,
  });

  return (
    <div className="space-y-6 px-4 pb-8 pt-3 font-['Manrope',sans-serif] sm:px-6 lg:px-8">
      <DashboardHero />

      <StatsCards data={data} isLoading={isLoading} trends={overview?.trends} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
        <PlatformActivity
          data={overview?.activity}
          isLoading={overviewLoading && !overview}
          days={days}
          onDaysChange={setDays}
        />
        <UsersShare data={data} isLoading={isLoading} />
      </div>

      <Statistics />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RevenueSummary data={data} isLoading={isLoading} />
        <PlansRevenueChart data={data} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MonthlySubscriptionsChart data={data} isLoading={isLoading} />
        <CashbackReport data={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ManagmentStatistics;
