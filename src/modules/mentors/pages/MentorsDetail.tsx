import { getTeacherOnlineDuration, OnlineDurationData } from "@/services";
import { Card, Button, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  HiOutlineClock,
  HiOutlinePlay,
  HiOutlineHashtag,
  HiOutlineIdentification,
  HiOutlineSignal,
} from "react-icons/hi2";
import { HiOutlineRefresh } from "react-icons/hi";

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  iconBg,
  iconColor,
}) => (
  <Card className="!rounded-2xl !border !border-gray-100 hover:!shadow-md transition-shadow duration-200">
    <div className="flex items-start gap-3">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 m-0">
          {label}
        </p>
        <p className="text-[22px] font-semibold text-gray-800 leading-tight m-0 mt-1 break-words">
          {value}
        </p>
      </div>
    </div>
  </Card>
);

// ─── Info Row ─────────────────────────────────────────────────────────────────
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
    <span className="text-gray-400 text-base flex-shrink-0">{icon}</span>
    <span className="text-sm text-gray-400 w-36 flex-shrink-0">{label}</span>
    <span className="text-sm font-medium text-gray-700 ml-auto text-right">
      {value ?? "—"}
    </span>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const MentorsDetail: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<OnlineDurationData>();
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTeacherOnlineDuration(Number(id));
      setData(res);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const isOnline = data?.is_currently_online;

  const initials = data?.teacher
    ? data.teacher
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "M";

  return (
    <Spin spinning={loading}>
      <Card
        className="!rounded-2xl !border !border-gray-100 !shadow-sm overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* ── HEADER ───────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-4 px-6 py-5 border-b border-gray-100">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-xl font-bold flex-shrink-0 select-none">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 m-0 leading-snug">
                {data?.teacher || "Mentor"}
              </h2>
            </div>
          </div>

          {/* Status badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${
              isOnline
                ? "bg-green-50 text-green-600 border-green-100"
                : "bg-red-50 text-red-500 border-red-100"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full inline-block flex-shrink-0 ${
                isOnline ? "bg-green-500 animate-pulse" : "bg-red-400"
              }`}
            />
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>

        {/* ── STATS GRID ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-6 py-5 border-b border-gray-100 bg-gray-50/60">
          <StatCard
            icon={<HiOutlineClock />}
            label="Umumiy vaqt"
            value={data?.total_online_formatted || "—"}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-500"
          />
          <StatCard
            icon={<HiOutlinePlay />}
            label="Hozirgi sessiya"
            value={data?.current_session_formatted || "—"}
            iconBg="bg-sky-50"
            iconColor="text-sky-500"
          />
          <StatCard
            icon={<HiOutlineHashtag />}
            label="Sessiyalar soni"
            value={data?.total_sessions ?? 0}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
          />
        </div>

        {/* ── EXTRA INFO ───────────────────────────────────────── */}
        <div className="px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
            Qo'shimcha ma'lumot
          </p>

          <InfoRow
            icon={<HiOutlineSignal />}
            label="Hozirgi online sekund"
            value={data?.current_session_seconds ?? 0}
          />

          <div className="flex justify-end pt-4">
            <Button
              onClick={getData}
              loading={loading}
              icon={!loading && <HiOutlineRefresh size={14} />}
              className="!rounded-lg !text-gray-500 !border-gray-200 !text-sm !font-medium hover:!text-indigo-500 hover:!border-indigo-300 transition-colors"
            >
              Yangilash
            </Button>
          </div>
        </div>
      </Card>
    </Spin>
  );
};

export default MentorsDetail;
