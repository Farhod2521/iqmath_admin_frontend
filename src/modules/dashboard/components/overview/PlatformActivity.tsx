import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { FaRegCalendar } from "react-icons/fa6";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { OverviewActivityPoint } from "@/services";
import { panelClass } from "./ui";

const TEXT = {
  uz: {
    title: "Platforma faolligi",
    sub: (n: number) => `So'nggi ${n} kunlik faollik statistikasi`,
    last: (n: number) => `So'nggi ${n} kun`,
    newStudents: "Yangi o'quvchilar",
    payments: "Yangi to'lovlar",
    active: "Faol foydalanuvchilar",
    months: ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"],
    empty: "Ma'lumot topilmadi",
  },
  ru: {
    title: "Активность платформы",
    sub: (n: number) => `Статистика активности за последние ${n} дней`,
    last: (n: number) => `Последние ${n} дней`,
    newStudents: "Новые ученики",
    payments: "Новые оплаты",
    active: "Активные пользователи",
    months: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    empty: "Нет данных",
  },
};

const SERIES = [
  { key: "new_students", color: "#2563EB", label: "newStudents" },
  { key: "payments", color: "#8B5CF6", label: "payments" },
  { key: "active_users", color: "#10B981", label: "active" },
] as const;

interface Props {
  data?: OverviewActivityPoint[];
  isLoading: boolean;
  days: number;
  onDaysChange: (days: number) => void;
}

const PlatformActivity = ({ data, isLoading, days, onDaysChange }: Props) => {
  const { i18n } = useTranslation();
  const text = TEXT[i18n.language?.startsWith("ru") ? "ru" : "uz"];

  const points = (data || []).map((p) => {
    const d = new Date(p.date);
    return { ...p, label: `${d.getDate()} ${text.months[d.getMonth()]}` };
  });

  return (
    <div className={`${panelClass} flex h-full flex-col p-5 sm:p-6`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-[18px] font-extrabold text-[#0F172A]">{text.title}</h3>
          <p className="mt-0.5 text-[13px] text-[#64748B]">{text.sub(days)}</p>
        </div>
        <Select
          value={days}
          onChange={onDaysChange}
          className="w-[170px]"
          prefix={<FaRegCalendar className="text-[#64748B]" />}
          options={[7, 14, 30].map((n) => ({ value: n, label: text.last(n) }))}
        />
      </div>

      <div className="mt-3 flex flex-wrap justify-end gap-x-5 gap-y-1">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-[12.5px] text-[#475569]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            {text[s.label]}
          </span>
        ))}
      </div>

      <div className="mt-2 min-h-[240px] flex-1">
        {isLoading ? (
          <div className="h-full min-h-[240px] animate-pulse rounded-2xl bg-[#F5F7FB]" />
        ) : points.length ? (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={points} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
              <defs>
                {SERIES.map((s) => (
                  <linearGradient key={s.key} id={`pa-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid stroke="#EEF1F6" strokeDasharray="4 4" vertical />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #EDF0F7", boxShadow: "0 14px 30px -18px rgba(30,41,99,0.45)" }}
                formatter={(value, name) => [value, text[SERIES.find((s) => s.key === name)?.label || "active"]]}
              />
              {[...SERIES].reverse().map((s) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={s.color}
                  strokeWidth={2.4}
                  fill={`url(#pa-${s.key})`}
                  dot={{ r: 3.5, fill: s.color, stroke: "#fff", strokeWidth: 1.5 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full min-h-[240px] items-center justify-center text-[14px] text-[#94A3B8]">{text.empty}</div>
        )}
      </div>
    </div>
  );
};

export default PlatformActivity;
