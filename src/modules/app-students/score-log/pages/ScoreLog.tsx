import {
  deleteFuncStudentScoreLog,
  FuncStudentScoreLogsParams,
  FuncStudentScoreLogsResultsData,
  getFuncStudentScoreLogs,
  getStudentList,
  getUsers,
} from "@/services";
import MathText from "@/shared/components/latex/MathText";
import SelectInfinite from "@/shared/components/selects/SelectInfinite";
import { AwardTypeLabel } from "@/shared/utils/constants";
import { handleApiError } from "@/shared/utils/handleApiError";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, DatePicker, Popconfirm, Select, Table, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;

const ScoreLog = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [filterData, setFilterData] = useState<FuncStudentScoreLogsParams>({
    student_id: undefined,
    award_type: undefined,
    date_from: undefined,
    date_to: undefined,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["score-log-key", filterData],
    queryFn: () => getFuncStudentScoreLogs({ ...filterData }),
  });

  useEffect(() => {
    if (error) {
      handleApiError(error);
    }
  }, [error]);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFuncStudentScoreLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["score-log-key"] });
      toast.success(t("deletedSuccessfully") || "O‘chirildi");
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
      render: (text: string, record: any, index: number) => (
        <span>{index + 1}</span>
      ),
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
      title: "Mukofotlangan",
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

  return (
    <Card title={t("scoreLog.title")}>
      <div className="flex items-center gap-2 mb-5">
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
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={data?.results}
        pagination={false}
        scroll={{ x: 1200 }}
      />
    </Card>
  );
};

export default ScoreLog;
