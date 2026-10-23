import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { formatNumber, panelClass } from "./ui";

const TEXT = {
  uz: { title: "Foydalanuvchilar ulushi", sub: "Tizimdagi foydalanuvchilar taqsimoti", total: "Jami" },
  ru: { title: "Доля пользователей", sub: "Распределение пользователей в системе", total: "Всего" },
};

interface Props {
  data: any;
  isLoading: boolean;
}

const UsersShare = ({ data, isLoading }: Props) => {
  const { t, i18n } = useTranslation();
  const text = TEXT[i18n.language?.startsWith("ru") ? "ru" : "uz"];

  const items = [
    { key: "students", name: t("students"), value: Number(data?.total_students) || 0, color: "#3B82F6" },
    { key: "parents", name: t("parents"), value: Number(data?.total_parents) || 0, color: "#D946EF" },
    { key: "tutors", name: t("tutors"), value: Number(data?.total_tutors) || 0, color: "#F59E0B" },
    { key: "teachers", name: t("teachers"), value: Number(data?.total_teachers) || 0, color: "#10B981" },
  ];
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const percent = (value: number) => (total ? ((value * 100) / total).toFixed(1) : "0.0");

  return (
    <div className={`${panelClass} flex h-full flex-col p-5 sm:p-6`}>
      <h3 className="text-[18px] font-extrabold text-[#0F172A]">{text.title}</h3>
      <p className="mt-0.5 text-[13px] text-[#64748B]">{text.sub}</p>

      {isLoading ? (
        <div className="mt-4 h-[220px] animate-pulse rounded-2xl bg-[#F5F7FB]" />
      ) : (
        <div className="mt-4 flex flex-1 flex-col items-center gap-6 sm:flex-row">
          <div className="relative h-[190px] w-[190px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={total ? items : [{ key: "empty", value: 1, color: "#EEF1F6" }]}
                  dataKey="value"
                  innerRadius={64}
                  outerRadius={92}
                  paddingAngle={total ? 1.5 : 0}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {(total ? items : [{ key: "empty", color: "#EEF1F6" }]).map((item) => (
                    <Cell key={item.key} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[24px] font-extrabold leading-none text-[#0F172A]">{formatNumber(total)}</span>
              <span className="mt-1 text-[13px] text-[#64748B]">{text.total}</span>
            </div>
          </div>

          <ul className="w-full min-w-0 flex-1 space-y-3.5">
            {items.map((item) => (
              <li key={item.key} className="flex items-center gap-2.5 text-[14px]">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="min-w-0 flex-1 truncate text-[#334155]">{item.name}</span>
                <span className="w-14 text-right font-bold text-[#0F172A]">{formatNumber(item.value)}</span>
                <span className="w-12 text-right text-[#64748B]">{percent(item.value)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UsersShare;
