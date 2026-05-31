import { getBookOfflineOrders, STATUS_DELIVERY } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Card, Select, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const OfflineOrders = () => {
  const { t } = useTranslation();

  const [filterData, setFilterData] = useState({
    status: undefined,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["data-offline-orders", filterData.status],
    queryFn: () => getBookOfflineOrders(filterData),
  });

  const statusMap = {
    [STATUS_DELIVERY.NEW]: {
      color: "blue",
      text: "Yangi",
    },
    [STATUS_DELIVERY.SEEN]: {
      color: "cyan",
      text: "Admin ko'rdi",
    },
    [STATUS_DELIVERY.PREPARING]: {
      color: "orange",
      text: "Tayyorlanmoqda",
    },
    [STATUS_DELIVERY.DELIVERING]: {
      color: "purple",
      text: "Yetkazilmoqda",
    },
    [STATUS_DELIVERY.DELIVERED]: {
      color: "green",
      text: "Yetkazildi",
    },
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: 10,
    },
    {
      title: t("title"),
      dataIndex: "book_name",
    },
    {
      title: t("book.customer"),
      dataIndex: "user_full_name",
    },
    {
      title: t("phone_number"),
      dataIndex: "delivery_phone",
    },
    {
      title: t("address"),
      dataIndex: "delivery_address",
    },
    {
      title: t("count"),
      dataIndex: "quantity",
    },
    {
      title: t("payment"),
      dataIndex: "paid_amount",
      render: (value: number) =>
        value ? new Intl.NumberFormat("uz-UZ").format(value) : "-",
    },
    {
      title: t("status"),
      dataIndex: "status",
      render: (status: STATUS_DELIVERY) => {
        const item = statusMap[status];

        return <Tag color={item?.color}>{item?.text || status}</Tag>;
      },
    },
    {
      title: t("date"),
      dataIndex: "created_at",
      render: (value: string) =>
        value ? new Date(value).toLocaleString("uz-UZ") : "-",
    },
  ];

  return (
    <Card title="Kitob buyurtmalar ro'yxati">
      <Space className="mb-4">
        <Select
          placeholder="Status qiymatlari"
          className="w-50!"
          options={options}
          allowClear
          value={filterData.status}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              status: value,
            }))
          }
        />
      </Space>
      <Table
        rowKey="id"
        dataSource={data?.results}
        loading={isLoading}
        columns={columns}
        scroll={{ x: 1400 }}
      />
    </Card>
  );
};

export default OfflineOrders;

const options = [
  {
    value: STATUS_DELIVERY.NEW,
    label: "Yangi",
  },
  {
    label: "Admin ko'rdi",
    value: STATUS_DELIVERY.SEEN,
  },
  {
    label: "Tayyorlanmoqda",
    value: STATUS_DELIVERY.PREPARING,
  },
  {
    label: "Yetkazilmoqda",
    value: STATUS_DELIVERY.DELIVERING,
  },
  {
    label: "Yetkazildi",
    value: STATUS_DELIVERY.DELIVERED,
  },
];
