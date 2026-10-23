import { axiosApi } from "@/configs/api";

export const getManagementStatistics = () =>
  axiosApi.get("/management/statistics/");

export type OverviewTrend = {
  /** Oxirgi 30 kun va undan oldingi 30 kun solishtiruvi (foiz) */
  change: number;
  /** 8 haftalik kichik grafik qiymatlari */
  spark: number[];
};

export type OverviewActivityPoint = {
  date: string;
  new_students: number;
  payments: number;
  active_users: number;
};

export type DashboardOverview = {
  trends: {
    teachers: OverviewTrend;
    students: OverviewTrend;
    parents: OverviewTrend;
    tutors: OverviewTrend;
    revenue: OverviewTrend;
    student_cashback: OverviewTrend;
    teacher_cashback: OverviewTrend;
    subscribers: OverviewTrend;
    payments: OverviewTrend;
  };
  activity: OverviewActivityPoint[];
};

export const getDashboardOverview = (days: number) =>
  axiosApi.get<DashboardOverview>("/management/statistics/overview/", { days });
