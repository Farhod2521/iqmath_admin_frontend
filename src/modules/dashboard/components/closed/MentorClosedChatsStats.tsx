import {
  BarChartOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Card, Col, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { BiMessageSquare } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { getMentroClosedChats, MentorClosedChats } from "@/services";

type StatKey = keyof MentorClosedChats;

type StatItem = {
  key: StatKey;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
};

const MentorClosedChatsStats = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<MentorClosedChats | null>(null);
  const [loading, setLoading] = useState(true);

  const STAT_ITEMS: StatItem[] = [
    {
      key: "today",
      label: t("today"),
      icon: ClockCircleOutlined,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      key: "week",
      label: t("week"),
      icon: CalendarOutlined,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      key: "month",
      label: t("monthly"),
      icon: FiTrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      key: "year",
      label: t("year"),
      icon: BarChartOutlined,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      key: "total",
      label: t("total"),
      icon: BiMessageSquare,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  useEffect(() => {
    getMentroClosedChats()
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-3">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton.Avatar active size={40} shape="square" />
          <Skeleton.Input active style={{ width: 240, height: 32 }} />
        </div>

        <Row gutter={[16, 16]}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={i}>
              <Card className="rounded-xl">
                <Skeleton active paragraph={{ rows: 2 }} title={false} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className="py-3">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-r from-blue-500 to-purple-600">
          <BiMessageSquare className="text-white text-[18px]" />
        </div>
        <h2 className="m-0 text-[20px] font-bold text-[#2A3547]">
          {t("chatsResponded")}
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {STAT_ITEMS.map((item) => {
          const Icon = item.icon;
          const count = data?.[item.key]?.closed_chats_count ?? 0;
          const rating = data?.[item.key]?.average_rating ?? 0;

          return (
            <div key={item.key}>
              <Card
                bordered
                className="relative h-full overflow-hidden border border-gray-100 shadow-sm rounded-xl group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                bodyStyle={{ padding: 16 }}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative">
                  {/* Icon & Label */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${item.bgColor}`}>
                      <Icon className="text-[16px] text-gray-700" />
                    </div>

                    <span className="text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-500">
                      {item.label}
                    </span>
                  </div>

                  {/* Count */}
                  <div className="mb-1 text-[28px] leading-none font-bold text-[#1a1a1a]">
                    {count}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <StarFilled className="text-yellow-500! text-[14px]!" />
                    <span className="text-[13px] font-medium text-gray-500">
                      {rating ? rating.toFixed(1) : "—"}
                    </span>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-full bg-linear-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorClosedChatsStats;
