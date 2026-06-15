import {
  deleteFuncStudentScoreLog,
  FuncStudentScoreLogsParams,
  FuncStudentScoreLogsResultsData,
  getFuncStudentScoreLogs,
  getStudentList,
  getUsers,
} from "@/services";
import FSearch from "@/shared/components/filters/FSearch";
import MathText from "@/shared/components/latex/MathText";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { AwardTypeLabel } from "@/shared/utils/constants";
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
  Tag,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;

const ScoreLog = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [filterData, setFilterData] = useState<FuncStudentScoreLogsParams>({
    search: undefined,
    student_id: undefined,
    award_type: undefined,
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
      "score-log-key",
      filterData,
      pagination.current,
      pagination.pageSize,
    ],
    queryFn: () =>
      getFuncStudentScoreLogs({
        page: pagination.current,
        limit: pagination.pageSize,
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

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFuncStudentScoreLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["score-log-key"] });
      toast.success(t("deletedSuccessfully") || "O‘chirildi");
      // Agar joriy sahifada ma'lumot qolmagan bo'lsa, oldingi sahifaga o'tish
      if (data?.results?.length === 1 && pagination.current > 1) {
        setPagination((prev) => ({ ...prev, current: prev.current - 1 }));
      }
    },
    onError: (err: any) => handleApiError(err),
  });

  const awardTyoeOptions = [
    { value: "coin", label: t("coin") },
    { value: "score", label: t("score") },
  ];

  const columns = [
    {
      title: t("scoreLog.tR"),
      dataIndex: "id",
      width: 10,
      render: (rol: string, d: any, idx: number) => {
        const { current, pageSize } = pagination;
        return <div>{(current - 1) * pageSize + idx + 1}</div>;
      },
    },
    {
      title: t("student"),
      dataIndex: "student_full_name",
    },
    {
      title: t("chapter"),
      dataIndex: ["chapter", "name_uz"],
      render: (value: string, record: any) => record.chapter?.name_uz || "-",
    },
    {
      title: t("topic"),
      dataIndex: ["topic", "name_uz"],
      render: (value: string, record: any) => record.topic?.name_uz || "-",
    },
    {
      title: t("question"),
      dataIndex: ["question", "question_text_uz"],
      render: (_: any, record: any) => {
        return <MathText content={record?.question?.question_text_uz || ""} />;
      },
    },
    {
      title: t("scoreLog.awardType") || "Type",
      dataIndex: "award_type",
      render: (value: string) => (
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="font-medium">
            {AwardTypeLabel[value] || value || "-"}
          </span>
        </div>
      ),
    },
    {
      title: t("scoreLog.awarded"),
      dataIndex: "awarded_coin",
      render: (val: boolean) =>
        val ? <Tag color="blue">{t("yes")}</Tag> : <Tag>{t("no")}</Tag>,
    },
    {
      title: t("date"),
      dataIndex: "awarded_at",
    },
    {
      title: t("action"),
      render: (_: any, record: FuncStudentScoreLogsResultsData) => (
        <Popconfirm
          title={t("scoreLog.deleted")}
          okText={t("yes")}
          cancelText={t("no")}
          onConfirm={() => deleteMutation.mutate(record.id)}
        >
          <Button danger size="small">
            <DeleteOutlined />
          </Button>
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

  return (
    <Card title={t("scoreLog.title")}>
      <div className="flex items-center gap-2 mb-5">
        <FSearch
          onSearchInput={(value) =>
            setFilterData((prev) => ({
              ...prev,
              search: value,
            }))
          }
          className="w-50!"
          placeholder="Qidiruv..."
        />
        <SelectInfinite
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
        />{" "}
        <Select
          allowClear
          className="w-full"
          style={{ width: 200 }}
          placeholder={t("scoreLog.awardType")}
          value={filterData.award_type}
          options={awardTyoeOptions}
          onChange={(value) =>
            setFilterData((prev) => ({
              ...prev,
              award_type: value,
            }))
          }
        />
        <RangePicker
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
        size="small"
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={data?.results}
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

export default ScoreLog;
