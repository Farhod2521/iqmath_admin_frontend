import {
  deleteTeacherRewardLog,
  getTeacherRewardLog,
  getUsers,
} from "@/services";
import FSearch from "@/shared/components/filters/FSearch";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { useOptions } from "@/shared/hooks";
import { handleApiError } from "@/shared/utils/handleApiError";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  DatePicker,
  Popconfirm,
  Select,
  Table,
  TablePaginationConfig,
} from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type FilterData = {
  teacher_id?: string;
  student_id?: string;
  reward_type?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
};

const RewardLog = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [filterData, setFilterData] = useState<FilterData>({
    search: undefined,
    student_id: undefined,
    teacher_id: undefined,
    reward_type: undefined,
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
      "reward-log-data",
      filterData,
      pagination.current,
      pagination.pageSize,
    ],
    queryFn: () =>
      getTeacherRewardLog({
        page: pagination.current,
        page_size: pagination.pageSize,
        ...filterData,
      }),
  });

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

  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteTeacherRewardLog,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["reward-log-data"] });
      toast.success(res?.message);
    },
    onError: (err) => handleApiError(err),
  });

  const columns = [
    {
      title: t("scoreLog.tR"),
      dataIndex: "id",
      key: "id",
      width: "10px",
      render: (rol: string, d: any, idx: number) => {
        const { current, pageSize } = pagination;
        return <div>{(current - 1) * pageSize + idx + 1}</div>;
      },
    },
    {
      title: t("teachers"),
      dataIndex: "teacher_name",
      key: "teacher_name",
      render: (value: string) => value || "---",
    },

    {
      title: t("students"),
      dataIndex: "student_name",
      key: "student_name",
      render: (value: string) => value || "---",
    },
    {
      title: t("rewardType"),
      dataIndex: "reward_type_display",
      key: "reward_type_display",
      render: (value: string) => value || "---",
    },
    {
      title: t("amount"),
      dataIndex: "amount",
      key: "amount",
      render: (value: string) => value || "---",
    },
    {
      title: t("reason"),
      dataIndex: "reason",
      key: "reason",
      render: (value: string) => value || "---",
    },
    {
      title: t("createdAt"),
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => formatDateColumn(value),
    },
    {
      title: t("action"),
      key: "action",
      width: 10,
      render: (_: any, record: any) => (
        <Popconfirm
          title={t("deleteConfirm")}
          okText={t("yes")}
          cancelText={t("no")}
          onConfirm={() => deleteItem(record.id)}
        >
          <Button
            danger
            size="small"
            variant="outlined"
            icon={<DeleteOutlined />}
            loading={isDeleting}
          />
        </Popconfirm>
      ),
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

  const handleSearch = useCallback((value: string) => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
    setFilterData((prev) => ({
      ...prev,
      search: value,
    }));
  }, []);

  const fineTypeOptions = [
    { value: "score", label: t("score") },
    { value: "coin", label: t("coin") },
    { value: "subscription_day", label: t("subscriptionDays") },

    // { value: "absence", label: t("absence") },
    // { value: "homework", label: t("homework") },
  ];

  return (
    <Card title={t("teacherRewardLog")}>
      <div className="flex items-center gap-2 mb-5">
        <FSearch
          onSearchInput={handleSearch}
          className="w-50!"
          placeholder="Qidiruv..."
        />
        <SelectInfinite
          className="w-full"
          size="middle"
          style={{ width: 200 }}
          queryKey={(search) => ["reward-log-teacher", search]}
          queryFn={() =>
            getUsers({
              page: 1,
              size: 20,
              role: "teacher",
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
          value={filterData?.teacher_id}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              teacher_id: value,
            }))
          }
          placeholder={t("teachers")}
          allowClear
        />{" "}
        <SelectInfinite
          className="w-full"
          size="middle"
          style={{ width: 200 }}
          queryKey={(search) => ["reward-log-student", search]}
          queryFn={() =>
            getUsers({
              page: 1,
              size: 20,
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
        />{" "}
        <Select
          allowClear
          className="w-full"
          style={{ width: 200 }}
          placeholder={t("scoreLog.awardType")}
          value={filterData.reward_type}
          options={fineTypeOptions}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              reward_type: value,
            }))
          }
        />
        <DatePicker.RangePicker
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
        />
      </div>
      <Table
        loading={isLoading}
        dataSource={data?.results}
        size="small"
        rowKey="id"
        columns={columns}
        bordered
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
      />
    </Card>
  );
};

export default RewardLog;
