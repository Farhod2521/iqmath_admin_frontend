import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegCalendarDays } from "react-icons/fa6";

const TEXT = {
  uz: {
    badge: "Statistika",
    title: "Tizim faoliyati haqida umumiy ma'lumot",
    sub: "IQmath platformasining asosiy ko'rsatkichlari va tahlili",
    today: "Bugungi sana",
    months: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
    days: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
    date: (d: Date, m: string) => `${d.getFullYear()}-yil ${d.getDate()}-${m}`,
  },
  ru: {
    badge: "Статистика",
    title: "Общая информация о работе системы",
    sub: "Основные показатели и аналитика платформы IQmath",
    today: "Сегодня",
    months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    date: (d: Date, m: string) => `${d.getDate()} ${m} ${d.getFullYear()} г.`,
  },
};

const DashboardHero = () => {
  const { i18n } = useTranslation();
  const text = TEXT[i18n.language?.startsWith("ru") ? "ru" : "uz"];
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#E3E9FB] bg-[linear-gradient(100deg,#F3F6FF_0%,#EAF0FF_42%,#C9D6FE_68%,#D6E6FE_100%)] px-6 py-7 sm:px-9 sm:py-8">
      {/* Yengil to'lqinlar */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
        <path d="M380 200 C520 120 640 170 760 90 C840 40 920 60 1000 20" stroke="white" strokeOpacity="0.55" strokeWidth="1.5" fill="none" />
        <path d="M300 200 C470 140 600 190 740 120 C840 70 930 100 1000 70" stroke="white" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
      </svg>

      <img
        src="/images/admin/stats-hero.webp"
        alt=""
        className="pointer-events-none absolute bottom-0 right-[250px] hidden h-[94%] w-auto lg:block xl:right-[300px]"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <span className="inline-flex rounded-full bg-white/80 px-3.5 py-1 text-[13px] font-semibold text-[#2563EB] shadow-[0_6px_14px_-10px_rgba(37,99,235,0.6)]">
            {text.badge}
          </span>
          <h1 className="mt-3 text-[24px] font-extrabold leading-tight tracking-tight text-[#0F172A] sm:text-[32px]">
            {text.title}
          </h1>
          <p className="mt-1.5 text-[15px] text-[#475569]">{text.sub}</p>
        </div>

        <div className="flex shrink-0 items-center gap-4 self-start rounded-2xl border border-white/80 bg-white/65 px-5 py-4 backdrop-blur-md lg:self-auto">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#6366F1]">
            <FaRegCalendarDays size={20} />
          </span>
          <span className="leading-tight">
            <span className="block text-[12.5px] text-[#64748B]">{text.today}</span>
            <span className="mt-1 block text-[17px] font-extrabold text-[#0F172A]">
              {text.date(now, text.months[now.getMonth()])}
            </span>
            <span className="mt-1 block text-[13px] text-[#475569]">
              {text.days[now.getDay()]} • {time}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
