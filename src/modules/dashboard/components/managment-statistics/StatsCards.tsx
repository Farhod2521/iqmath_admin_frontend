import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaUserGroup,
  FaUser,
  FaUserTie,
  FaChalkboardUser,
  FaWallet,
  FaRegCalendar,
  FaDatabase,
  FaCirclePlus,
  FaFileLines,
  FaRegStar,
  FaTicket,
  FaRegClock,
  FaCircleCheck,
} from "react-icons/fa6";
import type { DashboardOverview, OverviewTrend } from "@/services";
import { IconTile, SparkBars, SparkLine, TrendBadge, formatNumber, panelClass } from "../overview/ui";

interface Props {
  data: any;
  isLoading: boolean;
  trends?: DashboardOverview["trends"];
}

type Stat = {
  key: string;
  title: string;
  label: string;
  value: React.ReactNode;
  Icon: React.ComponentType<{ size?: number }>;
  color: string;
  soft: string;
  trend?: OverviewTrend;
  chart?: "line" | "bars";
  filter?: string;
  extraParams?: Record<string, string>;
};

const som = (value: number | undefined) => `${formatNumber(value)} so'm`;

const StatsCards = ({ data, isLoading, trends }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleNavigateClick = (filter?: string, extraParams?: Record<string, string>) => {
    if (!filter) return;
    const params = new URLSearchParams({ role: filter, ...extraParams });
    navigate(`/users/pupils?${params.toString()}`);
  };

  const main: Stat[] = [
    {
      key: "teachers", title: t("teachers"), label: t("totalTeachers"), filter: "teacher",
      value: formatNumber(data?.total_teachers), Icon: FaUserGroup, color: "#3B82F6", soft: "#EAF2FF",
      trend: trends?.teachers, chart: "line",
    },
    {
      key: "students", title: t("students"), label: t("totalStudents"), filter: "student",
      value: formatNumber(data?.total_students), Icon: FaUser, color: "#EC4899", soft: "#FDEBF4",
      trend: trends?.students, chart: "line",
    },
    {
      key: "parents", title: t("parents"), label: t("totalParents"), filter: "parent",
      value: formatNumber(data?.total_parents), Icon: FaUserTie, color: "#F59E0B", soft: "#FFF4E0",
      trend: trends?.parents, chart: "line",
    },
    {
      key: "tutors", title: t("tutors"), label: t("totalTutors"), filter: "tutor",
      value: formatNumber(data?.total_tutors), Icon: FaChalkboardUser, color: "#6366F1", soft: "#EEF0FF",
      trend: trends?.tutors, chart: "line",
    },
    {
      key: "revenue", title: t("totalRevenue"), label: t("totalRevenue"),
      value: som(data?.total_amount), Icon: FaWallet, color: "#3B82F6", soft: "#EAF2FF",
      trend: trends?.revenue, chart: "bars",
    },
    {
      key: "year", title: t("year2025").replace("2025", String(year)), label: t("year2025").replace("2025", String(year)),
      value: som(data?.[`year_${year}`]), Icon: FaRegCalendar, color: "#F43F5E", soft: "#FDECEF", chart: "bars",
      trend: trends ? { change: 0, spark: trends.revenue?.spark || [] } : undefined,
    },
    {
      key: "studentCashback", title: t("studentCashback"), label: t("studentCashback"),
      value: som(data?.total_student_cashback), Icon: FaDatabase, color: "#8B5CF6", soft: "#F2ECFF",
      trend: trends?.student_cashback, chart: "bars",
    },
    {
      key: "teacherCashback", title: t("teacherCashback"), label: t("teacherCashback"),
      value: som(data?.total_teacher_cashback), Icon: FaCirclePlus, color: "#2563EB", soft: "#EAF2FF",
      trend: trends?.teacher_cashback, chart: "bars",
    },
    {
      key: "subscribers", title: t("activeSubscribers"), label: t("activeSubscribers"),
      filter: "student", extraParams: { status: "active" },
      value: formatNumber(data?.active_subscribers), Icon: FaFileLines, color: "#F59E0B", soft: "#FFF4E0",
      trend: trends?.subscribers, chart: "bars",
    },
    {
      key: "mostSold", title: t("mostSold"), label: t("mostSoldPlan"),
      value: data?.most_sold_plan || "—", Icon: FaRegStar, color: "#EC4899", soft: "#FDEBF4", chart: "bars",
      trend: trends ? { change: 0, spark: trends.payments?.spark || [] } : undefined,
    },
  ];

  const extra: Stat[] = [
    {
      key: "coupon", title: t("mostUsed"), label: t("topCouponType"),
      value: data?.top_coupon_type || "—", Icon: FaTicket, color: "#F97316", soft: "#FFEFE3",
    },
    {
      key: "due", title: t("dueIn5Days"), label: t("studentsDueWithin5Days"),
      value: formatNumber(data?.students_due_within_5_days), Icon: FaRegClock, color: "#64748B", soft: "#F1F3F7",
    },
    {
      key: "payments", title: t("successful"), label: t("successfulPayments"),
      value: formatNumber(data?.successful_payments), Icon: FaCircleCheck, color: "#16A34A", soft: "#E8F8EF",
      trend: trends?.payments, chart: "bars",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={`${panelClass} h-[112px] animate-pulse p-5`}>
            <div className="flex gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#F1F4FA]" />
              <div className="flex-1 space-y-2.5">
                <div className="h-3 w-20 rounded bg-[#F1F4FA]" />
                <div className="h-5 w-24 rounded bg-[#F1F4FA]" />
                <div className="h-3 w-16 rounded bg-[#F1F4FA]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const renderCard = (stat: Stat, compact = false) => {
    // Bir xil (masalan 0) qiymatlardan iborat grafik ma'nosiz — ko'rsatilmaydi
    const spark = stat.trend?.spark?.some((v) => v) ? stat.trend.spark : [];
    const isClickable = Boolean(stat.filter);
    return (
      <div
        key={stat.key}
        onClick={() => handleNavigateClick(stat.filter, stat.extraParams)}
        className={`${panelClass} group relative min-w-0 px-4 py-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-30px_rgba(30,41,99,0.5)] ${
          isClickable ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex items-start gap-3.5">
          <IconTile Icon={stat.Icon} color={stat.color} soft={stat.soft} size={compact ? 44 : 50} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p className="truncate text-[13.5px] font-semibold text-[#334155]">{stat.title}</p>
              {stat.trend && stat.key !== "year" && stat.key !== "mostSold" ? (
                <TrendBadge change={stat.trend.change} />
              ) : null}
            </div>
            <p className="mt-1 truncate text-[20px] font-extrabold leading-tight tracking-tight text-[#0F172A] 2xl:text-[22px]">
              {stat.value}
            </p>
            <div className="mt-1 flex items-end justify-between gap-2">
              <p className="truncate text-[12.5px] text-[#94A3B8]">{stat.label}</p>
              {spark.length ? (
                <span className="-mb-1 shrink-0">
                  {stat.chart === "line" ? (
                    <SparkLine values={spark} color={stat.color} />
                  ) : (
                    <SparkBars values={spark} color={stat.color} />
                  )}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {main.map((stat) => renderCard(stat))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{extra.map((stat) => renderCard(stat, true))}</div>
    </div>
  );
};

export default StatsCards;
