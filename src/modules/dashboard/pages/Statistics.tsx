import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Empty } from "antd";
import { FaArrowRight, FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { getClosedChatsStats, ChatsRating } from "@/services";
import { useTranslation } from "react-i18next";
import { panelClass } from "../components/overview/ui";

const PREVIEW_ROWS = 5;

const TONES = {
  today: "bg-[#E8F8EF] text-[#16A34A] border-[#BFEBD0]",
  week: "bg-[#FFF4E5] text-[#EA8A0B] border-[#FBD9A8]",
  month: "bg-[#F3EDFF] text-[#8B5CF6] border-[#DCCBFE]",
  year: "bg-[#EAF2FF] text-[#2563EB] border-[#C3D8FE]",
};

const Stars = ({ value }: { value: number }) => (
  <span className="flex items-center gap-0.5 text-[13px] text-[#FBBF24]">
    {[1, 2, 3, 4, 5].map((i) =>
      value >= i ? (
        <FaStar key={i} />
      ) : value >= i - 0.5 ? (
        <FaStarHalfStroke key={i} />
      ) : (
        <FaRegStar key={i} className="text-[#D6DBE5]" />
      ),
    )}
  </span>
);

const PeriodCell = ({ stat, tone }: { stat?: ChatsRating; tone?: keyof typeof TONES }) => {
  const count = stat?.closed_chats_count || 0;
  const rating = Number.isFinite(stat?.average_rating) ? Number(stat?.average_rating) : 0;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tone ? (
        <span className={`rounded-md border px-2 py-0.5 text-[12px] font-semibold ${TONES[tone]}`}>{count} ta</span>
      ) : null}
      {rating > 0 ? (
        <span className="flex items-center gap-1.5">
          <Stars value={rating} />
          <span className="text-[12px] text-[#64748B]">{rating.toFixed(2)}</span>
        </span>
      ) : null}
    </div>
  );
};

const Statistics = () => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language?.startsWith("ru");
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["closed-chats-stats"],
    queryFn: getClosedChatsStats,
  });

  const rows = data || [];
  const visible = showAll ? rows : rows.slice(0, PREVIEW_ROWS);

  return (
    <div className={`${panelClass} p-5 sm:p-6`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[18px] font-extrabold text-[#0F172A]">{t("closedStatistics")}</h3>
        {rows.length > PREVIEW_ROWS ? (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#C9D8FB] px-3.5 py-1.5 text-[13px] font-semibold text-[#2563EB] transition hover:bg-[#F1F5FF]"
          >
            {showAll ? (isRu ? "Свернуть" : "Yig'ish") : isRu ? "Показать все" : "Barchasini ko'rish"}
            <FaArrowRight size={12} className={showAll ? "-rotate-90" : ""} />
          </button>
        ) : null}
      </div>

      {isLoading ? (
        <div className="mt-4 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-[#F5F7FB]" />
          ))}
        </div>
      ) : isError ? (
        <Empty className="py-8" description="Ma'lumotlarni olishda xatolik" />
      ) : !rows.length ? (
        <Empty className="py-8" />
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-[13px] font-semibold text-[#334155]">
                {[t("tutor"), t("childRegion"), t("today"), t("week"), t("monthly"), t("yearly"), t("total")].map(
                  (title, i) => (
                    <th
                      key={i}
                      className={`bg-[#F6F8FC] px-4 py-3 ${i === 0 ? "rounded-l-xl" : ""} ${i === 6 ? "rounded-r-xl" : ""}`}
                    >
                      {title}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.teacher_id} className="text-[14px] text-[#0F172A] transition hover:bg-[#FAFBFE]">
                  <td className="border-b border-[#F0F2F7] px-4 py-3">
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF1F6] text-[13px] font-bold text-[#475569]">
                        {(row.full_name || "?").trim().charAt(0).toUpperCase()}
                      </span>
                      <span className="font-semibold">{row.full_name}</span>
                    </span>
                  </td>
                  <td className="border-b border-[#F0F2F7] px-4 py-3 text-[#334155]">{row.region || "—"}</td>
                  <td className="border-b border-[#F0F2F7] px-4 py-3"><PeriodCell stat={row.today} tone="today" /></td>
                  <td className="border-b border-[#F0F2F7] px-4 py-3"><PeriodCell stat={row.week} tone="week" /></td>
                  <td className="border-b border-[#F0F2F7] px-4 py-3"><PeriodCell stat={row.month} tone="month" /></td>
                  <td className="border-b border-[#F0F2F7] px-4 py-3"><PeriodCell stat={row.year} tone="year" /></td>
                  <td className="border-b border-[#F0F2F7] px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-semibold text-[#0F172A]">{row.total?.closed_chats_count || 0} ta</span>
                      <PeriodCell stat={row.total} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Statistics;
