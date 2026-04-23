import { deleteTeacherRewardLog, getTeacherRewardLog } from "@/services";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { handleApiError } from "@/shared/utils/handleApiError";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Popconfirm, Table } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const RewardLog = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["reward-log-data"],
    queryFn: getTeacherRewardLog,
  });

  useEffect(() => {
    if (error) {
      handleApiError(error);
    }
  }, [error]);

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
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: t("teachers"),
      dataIndex: "teacher_name",
      key: "teacher_name",
      render: (value: string) => value || "---",
    },

    {
      title: t("student"),
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
      width: 80,
      render: (_: any, record: any) => (
        <Popconfirm
          title={t("deleteConfirm")}
          okText={t("yes")}
          cancelText={t("no")}
          onConfirm={() => deleteItem(record.id)}
        >
          <Button
            danger
            variant="outlined"
            icon={<DeleteOutlined />}
            loading={isDeleting}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card title={t("teacherRewardLog")}>
      <Table
        loading={isLoading}
        dataSource={data}
        size="small"
        rowKey="id"
        pagination={false}
        columns={columns}
        bordered
      />
    </Card>
  );
};

export default RewardLog;
