import { getTeacherOnlineDuration, OnlineDurationData } from "@/services";
import { Card, Button, Spin, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";

import {
  HiOutlineClock,
  HiOutlinePlay,
  HiOutlineHashtag,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { HiOutlineRefresh } from "react-icons/hi";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useTranslation } from "react-i18next";

// ─── Utility Functions ────────────────────────────────────────────────────────
const formatSeconds = (seconds: number): string => {
  if (!seconds && seconds !== 0) return "—";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} soat`);
  if (minutes > 0) parts.push(`${minutes} daqiqa`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs} soniya`);

  return parts.join(" ");
};

const formatSecondsShort = (seconds: number): string => {
  if (!seconds && seconds !== 0) return "—";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const MentorsDetailModal = ({ id }: { id: number }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<OnlineDurationData>();
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const getData = useCallback(async () => {
    setLoading(true);
    await getTeacherOnlineDuration(Number(id))
      .then((res) => {
        setData(res);
        setLastUpdate(new Date());
      })
      .catch((err) => handleApiError(err))
      .finally(() => {
        setLoading(false);
      });
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

  const avgSessionSeconds = data?.total_sessions
    ? Math.floor((data.total_online_seconds || 0) / data.total_sessions)
    : 0;

  const avgSessionFormatted = formatSeconds(avgSessionSeconds);

  const currentSessionFormatted = formatSeconds(
    data?.current_session_seconds || 0,
  );

  return (
    <Spin spinning={loading}>
      <Card className="rounded-xl! border-none! overflow-hidden">
        {/* ── HEADER (COMPACT) ── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              {initials}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-800 m-0">
                {data?.teacher || t("mentorDetail.mentor")}
              </h2>
            </div>
          </div>

          {/* STATUS */}
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isOnline
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            {isOnline ? t("mentorDetail.online") : t("mentorDetail.offline")}
          </div>
        </div>

        {/* ── CURRENT SESSION (HIGHLIGHT) ── */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-indigo-50/40 mb-4">
          <div>
            <p className="text-[11px] text-gray-500">
              {t("mentorDetail.current_session")}
            </p>
            <p className="text-base font-bold text-indigo-600">
              {currentSessionFormatted}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-gray-500">
              {t("mentorDetail.last_update")}
            </p>
            <p className="text-base font-bold text-indigo-400">
              {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* ── STATS GRID (COMPACT) ── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-0 py-3">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <HiOutlineClock />
              {t("mentorDetail.total_time")}
            </div>
            <span className="text-xs font-semibold text-gray-800">
              {data?.total_online_formatted}
            </span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <HiOutlineHashtag />
              {t("mentorDetail.sessions_count")}
            </div>
            <span className="text-xs font-semibold text-gray-800">
              {data?.total_sessions}
            </span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <HiOutlineChartBar />
              {t("mentorDetail.avg_session")}
            </div>
            <span className="text-xs font-semibold text-gray-800">
              {avgSessionFormatted}
            </span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <HiOutlinePlay />
              {t("mentorDetail.current_session")}
            </div>
            <span className="text-xs font-semibold text-gray-800">
              {currentSessionFormatted}
            </span>
          </div>
        </div>

        {/* ── ACTION ── */}
        <div className="flex justify-end px-4 py-3 border-t">
          <Button
            size="small"
            onClick={getData}
            loading={loading}
            icon={<HiOutlineRefresh size={14} />}
            className="text-xs!"
          >
            {t("mentorDetail.refresh")}
          </Button>
        </div>
      </Card>
    </Spin>
  );
};

export default MentorsDetailModal;
