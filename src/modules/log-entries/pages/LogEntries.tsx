import { getLogEntrieses } from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  Col,
  Input,
  Row,
  Select,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LogEntries = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    user_id: undefined,
    action_flag: undefined,
    content_type: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["data-log-entries", filters],
    queryFn: () =>
      getLogEntrieses({
        page: pagination.current,
        limit: pagination.pageSize,
        ...filters,
      }),
  });

  const columns = [
    {
      title: t("tR"),
      key: "id",
      width: "10px",
      render: (_value: any, _record: any, index: number) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: t("user"),
      dataIndex: "user",
      key: "user",
    },
    {
      title: t("contentType"),
      dataIndex: "content_type",
      key: "content_type",
    },
    {
      title: t("changeMessage"),
      dataIndex: "change_message",
      key: "change_message",
      render: (val: string) => <span>{val || "---"}</span>,
    },
    {
      title: t("objectRepr"),
      dataIndex: "object_repr",
      key: "object_repr",
      render: (val: string) => <span>{val || "--"}</span>,
    },

    {
      title: t("action"),
      dataIndex: "action_flag",
      key: "action_flag",
      render: (value: number, record: any) => {
        const color = value === 1 ? "green" : value === 2 ? "blue" : "red";

        return <Tag color={color}>{record.action_label}</Tag>;
      },
    },
    {
      title: t("createdAt"),
      dataIndex: "action_time",
      key: "action_time",
      width: "200px",
    },
  ];

  const handleTableChange = (p: TablePaginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: p.current || 1,
      pageSize: p.pageSize || 10,
    }));

    if (p.pageSize !== pagination.pageSize) {
      queryClient.invalidateQueries({ queryKey: ["data-log-entries"] });
    }
  };

  return (
    <Card title={t("logEntries")}>
      <div className="flex items-center gap-5 mb-4">
        <Input
          placeholder={t("contentType")}
          style={{ width: "250px" }}
          value={filters.content_type}
          allowClear
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              content_type: e.target.value,
            }))
          }
        />

        <Select
          allowClear
          style={{ width: "250px" }}
          placeholder={t("action")}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              action_flag: value,
            }))
          }
          options={[
            { label: "Qo'shish", value: 1 },
            { label: "O'zgartirish", value: 2 },
            { label: "O'chirish", value: 3 },
          ]}
        />

        {/* <Col span={8}>
          <Input
            placeholder="User ID"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                user_id: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />
        </Col> */}
      </div>
      <Table
        loading={isLoading}
        rowKey="id"
        columns={columns}
        dataSource={data?.results}
        onChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.count,
          pageSizeOptions: [10, 20, 30, 50, 70, 100],
          showSizeChanger: true,
          locale: { items_per_page: "" },
          showTotal: (total) => (
            <Tag className="pagination_tag">
              Jami: <b>{total}</b>
            </Tag>
          ),
        }}
        scroll={{ x: 1200 }}
        // pagination={false}
      />
    </Card>
  );
};

export default LogEntries;
