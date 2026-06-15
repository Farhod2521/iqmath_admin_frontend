import { getFuncStudentConversionHistorys, getUsers } from "@/services";
import FSearch from "@/shared/components/filters/FSearch";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import { Card, DatePicker, Table, TablePaginationConfig, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const ConversionHistory = () => {
  const { t } = useTranslation();
  const [filterData, setFilterData] = useState({
    search: undefined,
    student_id: undefined,
    date_from: undefined,
    date_to: undefined,
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 20,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "data-conversion-history",
      pagination.current,
      pagination.pageSize,
      filterData,
    ],
    queryFn: () =>
      getFuncStudentConversionHistorys({
        page: pagination.current,
        limit: pagination.pageSize,
        ...filterData,
      }),
  });

  // Error handling
  useEffect(() => {
    if (error) {
      handleApiError(error);
    }
  }, [error]);

  useEffect(() => {
    if (data?.count) {
      setPagination((prev) => ({
        ...prev,
        total: data?.count,
        current:
          data?.count > 0 && data?.results?.length === 0 ? 1 : prev?.current,
      }));
    }
  }, [data?.results]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "10px",
      render: (rol: string, d: any, idx: number) => {
        const { current, pageSize } = pagination;
        return <div>{(current - 1) * pageSize + idx + 1}</div>;
      },
    },
    {
      title: t("student"),
      dataIndex: ["student", "full_name"],
      key: "student",
      render: (value: string, record: any) => (
        <div>
          <div className="font-medium">{value || "-"}</div>
          <div className="text-xs text-gray-500">
            {record.student?.phone || "-"}
          </div>
        </div>
      ),
    },
    {
      title: t("comment"),
      dataIndex: "comment",
      render: (value: string) => value || "-",
    },
    {
      title: t("conversionType"),
      dataIndex: "conversion_type_display",
      key: "conversion_type_display",
      render: (value: string) => <Tag color="blue">{value || "-"}</Tag>,
    },
    {
      title: t("amount"),
      key: "amount_from",
      dataIndex: "amount_from",
      render: (value: string, record: any) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">{value || "-"}</div> →
          <div className="font-medium">{record.amount_to || "-"}</div>
        </div>
      ),
    },
    // {
    //   title: t("amountTo"),
    //   dataIndex: "amount_to",
    //   key: "amount_to",
    //   render: (value: number) => value?.toLocaleString() || "-",
    // },
    {
      title: t("status"),
      dataIndex: "status_display",
      key: "status",
      render: (value: string, record: any) => {
        let color = "default";
        if (record.status === "approved") color = "green";
        if (record.status === "waiting") color = "orange";
        if (record.status === "failed") color = "red";
        return <Tag color={color}>{value || record.status || "-"}</Tag>;
      },
    },
    {
      title: t("createdAt"),
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (created_at: string) => created_at || "-",
    },
  ];

  // To'g'ri holat:
  const handleTableChange = (paginationConfig: TablePaginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationConfig.current || 1,
      pageSize: paginationConfig.pageSize || 10,
    }));
  };

  return (
    <Card title={t("conversionHistory")}>
      <div className="flex items-center gap-2">
        {/* <FSearch
          onSearchInput={(value) =>
            setFilterData((prev) => ({
              ...prev,
              search: value,
            }))
          }
          className="w-50!"
          placeholder="Qidiruv..."
        /> */}
        {/* <SelectInfinite
          className="w-full"
          size="middle"
          style={{ width: 200 }}
          queryKey={(search) => ["score-log-student", search]}
          queryFn={() =>
            getUsers({
              page: 1,
              size: 10,
              role: "student",
              status: "active",
            })
          }
          getOptions={(data) =>
            data?.results?.map((item) => ({
              label: item.full_name,
              value: item.id,
            })) || []
          }
          getTotal={(data) => data?.total || 1000}
          value={filterData?.student_id}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              student_id: value,
            }))
          }
          placeholder={t("students")}
          allowClear
        />{" "} */}
        {/* <RangePicker
          style={{ width: 280 }}
          format="DD.MM.YYYY"
          placeholder={[t("dates.fromDate"), t("dates.toDate")]}
          onChange={(dates) => {
            setFilterData((prev) => ({
              ...prev,
              date_from: dates?.[0]
                ? dayjs(dates[0]).format("YYYY-MM-DD")
                : undefined,
              date_to: dates?.[1]
                ? dayjs(dates[1]).format("YYYY-MM-DD")
                : undefined,
            }));
          }}
        /> */}
      </div>
      <Table
        size="small"
        rowKey="id"
        loading={isLoading}
        dataSource={data?.results}
        columns={columns}
        onChange={handleTableChange}
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 20, 30, 50, 70, 100],
          showSizeChanger: true,
          locale: { items_per_page: "" },
          showTotal: (total, range) => (
            <span className="pagination_tatal">
              <b>
                {range[0]} – {range[1]}
              </b>{" "}
              {t("until")} <b>{total}</b> {t("total")}
            </span>
          ),
        }}
        scroll={{ x: 1200 }}
      />
    </Card>
  );
};

export default ConversionHistory;
