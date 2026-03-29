import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Table, Tag, Rate, Skeleton, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getClosedChatsStats, ClosedChatsStatsData } from "@/services";
import { useTranslation } from "react-i18next";

const RatingCell = ({
  count,
  rating,
  color,
}: {
  count: number;
  rating: number;
  color: string;
}) => {
  const safeRating = Number.isFinite(rating) ? rating : 0;

  return (
    <div className="flex flex-col gap-1">
      <Tag color={color} className="w-fit m-0">
        {count} ta
      </Tag>

      <div className="flex items-center gap-2">
        <Rate disabled allowHalf value={safeRating} className="text-[14px]" />
        <span className="text-xs text-gray-500">{safeRating.toFixed(2)}</span>
      </div>
    </div>
  );
};

const TotalRatingCell = ({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) => {
  const safeRating = Number.isFinite(rating) ? rating : 0;

  return (
    <div className="flex flex-col gap-1">
      <Tag color="blue" className="w-fit m-0">
        {count} ta
      </Tag>
      <div className="flex items-center gap-2">
        <Rate disabled allowHalf value={safeRating} className="text-[14px]" />
        <span className="text-xs text-gray-500">{safeRating.toFixed(2)}</span>
      </div>
    </div>
  );
};

const Statistics = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["closed-chats-stats"],
    queryFn: getClosedChatsStats,
  });

  const columns: ColumnsType<ClosedChatsStatsData> = [
    {
      title: t("tutor"),
      dataIndex: "full_name",
      key: "full_name",
      fixed: "left",
      width: "160px",
      render: (text) => (
        <div className="min-w-0">
          <div className="font-normal">{text}</div>
        </div>
      ),
    },
    {
      title: t("childRegion"),
      dataIndex: "region",
      key: "region",
      fixed: "left",
      width: "120px",
      render: (region) => (
        <div className="min-w-0">
          <div className="font-normal ">{region}</div>
        </div>
      ),
    },
    {
      title: t("today"),
      key: "today",
      width: 180,
      render: (_, record) => (
        <RatingCell
          count={record.today.closed_chats_count}
          rating={record.today.average_rating}
          color="green"
        />
      ),
    },
    {
      title: t("week"),
      key: "week",
      width: 180,
      render: (_, record) => (
        <RatingCell
          count={record.week.closed_chats_count}
          rating={record.week.average_rating}
          color="orange"
        />
      ),
    },
    {
      title: t("monthly"),
      key: "month",
      width: 180,
      render: (_, record) => (
        <RatingCell
          count={record.month.closed_chats_count}
          rating={record.month.average_rating}
          color="purple"
        />
      ),
    },
    {
      title: t("yearly"),
      key: "year",
      width: 180,
      render: (_, record) => (
        <RatingCell
          count={record.year.closed_chats_count}
          rating={record.year.average_rating}
          color="cyan"
        />
      ),
    },
    {
      title: t("total"),
      key: "total_rating",
      width: 190,
      render: (_, record) => (
        <TotalRatingCell
          rating={record.total.average_rating}
          count={record.total.closed_chats_count}
        />
      ),
    },
  ];

  return (
    <Card title={t("closedStatistics")}>
      {isLoading ? (
        <Skeleton active />
      ) : isError ? (
        <Empty description="Ma’lumotlarni olishda xatolik" />
      ) : (
        <Table
          rowKey="teacher_id"
          columns={columns}
          dataSource={data || []}
          pagination={false}
          scroll={{ x: 1400 }}
        />
      )}
    </Card>
  );
};

export default Statistics;
