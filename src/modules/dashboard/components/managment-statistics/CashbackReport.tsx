import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
  isLoading: boolean;
}

const CashbackReport = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-6 sm:p-7">
        <div className="mb-6 h-8 w-44 animate-pulse rounded-md bg-[#F3F4F6]" />

        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl px-4 py-5 animate-pulse bg-[#F3F4F6]"
            >
              <div>
                <div className="mb-3 h-5 w-36 rounded bg-white/80" />
                <div className="h-7 w-24 rounded bg-white/80" />
              </div>
              <div className="h-10 w-10 rounded-md bg-white/80" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-6 sm:p-7">
      <h3 className="mb-6 text-[20px] font-bold text-[#2A3547]">
        {t("cashbackReport")}
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl bg-[#EDF7EE] px-4 py-5 sm:px-5">
          <div>
            <p className="mb-2 text-[14px] font-medium text-[#7F95BD]">
              {t("studentCashbackAmount")}
            </p>
            <p className="text-[18px] sm:text-[20px] font-bold text-[#13D6B3]">
              {data?.total_student_cashback?.toLocaleString() || 0} so&apos;m
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center text-[24px]">
            🎓
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-[#EAF3FF] px-4 py-5 sm:px-5">
          <div>
            <p className="mb-2 text-[14px] font-medium text-[#7F95BD]">
              {t("teacherCashbackAmount")}
            </p>
            <p className="text-[18px] sm:text-[20px] font-bold text-[#5B7CFA]">
              {data?.total_teacher_cashback?.toLocaleString() || 0} so&apos;m
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center text-[24px]">
            👨‍🏫
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashbackReport;
