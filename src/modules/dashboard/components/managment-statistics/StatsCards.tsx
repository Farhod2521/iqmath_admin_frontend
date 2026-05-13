import React from "react";
import { useTranslation } from "react-i18next";

import TeachersNew from "@/assets/icons/teachers-new.svg";
import StudentsNew from "@/assets/icons/students-new.svg";
import ParentsNew from "@/assets/icons/parents-new.svg";
import TutorsNew from "@/assets/icons/tutors-new.svg";
import WalletNew from "@/assets/icons/wallet-new.svg";
import CalendarNew from "@/assets/icons/calendar-new.svg";
import CoinsStack from "@/assets/icons/coins-stack.svg";
import CoinsSingle from "@/assets/icons/coins-single.svg";
import ActiveUsersNew from "@/assets/icons/active-users-new.svg";
import AwardNew from "@/assets/icons/award-new.svg";
import ClockOrange from "@/assets/icons/clock-orange.svg";
import ClockGray from "@/assets/icons/clock-gray.svg";
import SuccessfulNew from "@/assets/icons/successful-new.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  data: any;
  isLoading: boolean;
}

const StatsCards = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateClick = (
    filter: string | undefined,
    extraParams?: Record<string, string>,
  ) => {
    if (filter) {
      const params = new URLSearchParams();
      params.set("role", filter);

      if (extraParams) {
        Object.entries(extraParams).forEach(([key, value]) => {
          params.set(key, value);
        });
      }

      navigate(`/users/pupils?${params.toString()}`);
    }
  };

  const stats = [
    {
      key: "totalTeachers",
      title: t("teachers"),
      label: t("totalTeachers"),
      filter: "teacher",
      value: data?.total_teachers || 0,
      icon: TeachersNew,
    },
    {
      key: "totalStudents",
      title: t("students"),
      label: t("totalStudents"),
      filter: "student",
      value: data?.total_students || 0,
      icon: StudentsNew,
    },
    {
      key: "totalParents",
      title: t("parents"),
      label: t("totalParents"),
      filter: "parent",
      value: data?.total_parents || 0,
      icon: ParentsNew,
    },
    {
      key: "totalTutors",
      title: t("tutors"),
      label: t("totalTutors"),
      filter: "tutor",
      value: data?.total_tutors || 0,
      icon: TutorsNew,
    },
    {
      key: "totalAmount",
      title: t("totalRevenue"),
      label: t("totalRevenue"),
      value: `${data?.total_amount?.toLocaleString() || 0} so'm`,
      icon: WalletNew,
    },
    {
      key: "year2025",
      title: t("year2025"),
      label: t("year2025"),
      value: `${data?.year_2025?.toLocaleString() || 0} so'm`,
      icon: CalendarNew,
    },
    {
      key: "studentCashback",
      title: t("studentCashback"),
      label: t("studentCashback"),
      value: `${data?.total_student_cashback?.toLocaleString() || 0} so'm`,
      icon: CoinsStack,
    },
    {
      key: "teacherCashback",
      title: t("teacherCashback"),
      label: t("teacherCashback"),
      value: `${data?.total_teacher_cashback?.toLocaleString() || 0} so'm`,
      icon: CoinsSingle,
    },
    {
      key: "activeSubscribers",
      title: t("activeSubscribers"),
      label: t("activeSubscribers"),
      filter: "student",
      extraParams: { status: "active" },
      value: data?.active_subscribers || 0,
      icon: ActiveUsersNew,
    },
    {
      key: "mostSoldPlan",
      title: t("mostSold"),
      label: t("mostSoldPlan"),
      value: data?.most_sold_plan || "N/A",
      icon: AwardNew,
    },
    {
      key: "topCouponType",
      title: t("mostUsed"),
      label: t("topCouponType"),
      value: data?.top_coupon_type || "N/A",
      icon: ClockOrange,
    },
    {
      key: "studentsDueWithin5Days",
      title: t("dueIn5Days"),
      label: t("studentsDueWithin5Days"),
      value: data?.students_due_within_5_days || 0,
      icon: ClockGray,
    },
    {
      key: "successfulPayments",
      title: t("successful"),
      label: t("successfulPayments"),
      value: data?.successful_payments || 0,
      icon: SuccessfulNew,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#EAECEF] bg-white p-5 min-h-29.5 animate-pulse"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-[10px] bg-[#F3F4F6]" />
              <div className="flex-1">
                <div className="h-3 w-24 rounded bg-[#F3F4F6] mb-3" />
                <div className="h-6 w-20 rounded bg-[#F3F4F6] mb-6" />
              </div>
            </div>
            <div className="h-3 w-28 rounded bg-[#F3F4F6]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.key}
          onDoubleClick={() => handleNavigateClick(stat?.filter)}
          className={`${stat?.filter ? "cursor-pointer" : ""} rounded-2xl border border-[#E6E8EC] bg-white px-5 py-4 min-h-29.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-200 hover:shadow-[0_4px_14px_rgba(16,24,40,0.08)]`}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#F5F6F8] shrink-0">
              <img
                src={stat.icon}
                alt={stat.title}
                className="h-5 w-5 object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[13px] leading-5 font-medium text-[#7C8DB5] truncate">
                {stat.title}
              </p>

              <h3 className="text-[15px] sm:text-[16px] font-bold leading-6 text-[#243B63] wrap-break-word">
                {stat.value}
              </h3>
            </div>
          </div>

          <div className="mt-7 text-[13px] leading-5 text-[#9AA7C7]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
