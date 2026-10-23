import React, { useId } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

export const panelClass =
  "rounded-[20px] border border-[#EDF0F7] bg-white shadow-[0_18px_40px_-34px_rgba(30,41,99,0.45)]";

export const formatNumber = (value: number | string | undefined | null) =>
  Math.round(Number(value) || 0)
    .toLocaleString("ru-RU")
    .replace(/,/g, " ");

/** O'sish foizi: yashil — o'sish, qizil — pasayish, kulrang — o'zgarishsiz */
export const TrendBadge = ({ change }: { change?: number }) => {
  if (change === undefined || change === null || Number.isNaN(change)) return null;
  const value = Math.round(change * 10) / 10;
  const tone =
    value > 0
      ? "bg-[#E8F8EF] text-[#16A34A]"
      : value < 0
        ? "bg-[#FDECEC] text-[#DC2626]"
        : "bg-[#F1F3F7] text-[#64748B]";
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${tone}`}>
      {value > 0 ? <FaArrowUp size={9} /> : value < 0 ? <FaArrowDown size={9} /> : null}
      {value > 0 ? "+" : ""}
      {value}%
    </span>
  );
};

/** Kichik chiziqli grafik (silliq egri chiziq + yengil soya) */
export const SparkLine = ({ values, color }: { values: number[]; color: string }) => {
  const id = useId().replace(/:/g, "");
  if (!values?.length) return null;
  const w = 76;
  const h = 34;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => [
    (i / Math.max(values.length - 1, 1)) * w,
    h - 3 - ((v - min) / range) * (h - 8),
  ]);
  const line = pts.reduce((d, [x, y], i) => {
    if (!i) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[34px] w-[76px] overflow-visible">
      <defs>
        <linearGradient id={`sl-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#sl-${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};

/** Kichik ustunli grafik (oxirgi ustunlar to'qroq) */
export const SparkBars = ({ values, color }: { values: number[]; color: string }) => {
  const bars = values?.length ? values.slice(-6) : [];
  if (!bars.length) return null;
  const max = Math.max(...bars) || 1;
  return (
    <div className="flex h-[34px] items-end gap-[3px]">
      {bars.map((v, i) => (
        <span
          key={i}
          className="w-[6px] rounded-[3px]"
          style={{
            height: `${Math.max(18, (v / max) * 100)}%`,
            backgroundColor: color,
            opacity: 0.35 + (0.65 * (i + 1)) / bars.length,
          }}
        />
      ))}
    </div>
  );
};

export const IconTile = ({
  Icon,
  color,
  soft,
  size = 48,
}: {
  Icon: React.ComponentType<{ size?: number }>;
  color: string;
  soft: string;
  size?: number;
}) => (
  <span
    className="flex shrink-0 items-center justify-center rounded-2xl"
    style={{ width: size, height: size, backgroundColor: soft, color }}
  >
    <Icon size={Math.round(size * 0.42)} />
  </span>
);
