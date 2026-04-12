import { Button, Card, Form, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SubscriptionSettingModal from "../components/setting/SubscriptionSettingModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteSubscriptionSetting,
  getSubscriptionSetting,
  postSubscriptionSetting,
  putSubscriptionSetting,
} from "../services";
import { toast } from "react-toastify";
import { handleApiError } from "@/shared/utils/handleApiError";
import { DeleteOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";

const SubscriptionSetting = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  // GET
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subscription-setting"],
    queryFn: getSubscriptionSetting,
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // CREATE / UPDATE
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      if (editing) {
        return putSubscriptionSetting(editing.id, values);
      }
      return postSubscriptionSetting(values);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["subscription-setting"] });
      setOpen(false);
      setEditing(null);
    },
    onError: handleApiError,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubscriptionSetting,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["subscription-setting"] });
    },
    onError: (err) => handleApiError(err),
  });

  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
    },
    {
      title: t("subscription.freeTrialDays"),
      dataIndex: "free_trial_days",
    },
    {
      title: t("action"),
      width: "10px",
      render: (_: any, record: any) => (
        <Space>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              setEditing(record);
              form.setFieldsValue(record);
              setOpen(true);
            }}
          >
            <FaEdit />
          </Button>

          <Popconfirm
            title={t("confirmDelete")}
            okText={t("yes")}
            cancelText={t("no")}
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={t("subscription.title")}
      extra={
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          + {t("adding")}
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data}
        columns={columns}
        pagination={false}
      />

      <SubscriptionSettingModal
        open={open}
        form={form}
        onClose={() => {
          setOpen(false);
          setEditing(null);
          form.resetFields();
        }}
        initialValues={editing}
        onSubmit={(values) => mutation.mutate(values)}
      />
    </Card>
  );
};

export default SubscriptionSetting;
