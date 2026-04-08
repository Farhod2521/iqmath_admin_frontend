// SolutionStatus.tsx

import {
  getManagementSolutionStatus,
  postManagementSolutionStatus,
  putManagementSolutionStatus,
  deleteManagementSolutionStatus,
  ManagementSolutionStatusData,
  ManagementSolutionStatusFormData,
} from "@/services";

import {
  Table,
  Button,
  Card,
  Space,
  Tag,
  Popconfirm,
  Form,
  message,
} from "antd";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import SolutionStatusModal from "../components/SolutionStatusModal";
import { toast } from "react-toastify";

const SolutionStatus = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<ManagementSolutionStatusData | null>(null);

  const [form] = Form.useForm<ManagementSolutionStatusFormData>();

  // GET
  const { data = [], isLoading } = useQuery({
    queryKey: ["solution-status"],
    queryFn: async () => {
      const res = await getManagementSolutionStatus();
      return res;
    },
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: postManagementSolutionStatus,
    onSuccess: () => {
      toast.success(t("solutionStatus.created"));
      queryClient.invalidateQueries({ queryKey: ["solution-status"] });
      setOpen(false);
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: ManagementSolutionStatusFormData;
    }) => putManagementSolutionStatus(id, data),
    onSuccess: () => {
      toast.success(t("solutionStatus.updated"));
      queryClient.invalidateQueries({ queryKey: ["solution-status"] });
      setOpen(false);
      setEditingItem(null);
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteManagementSolutionStatus,
    onSuccess: () => {
      toast.success(t("solutionStatus.deleted"));
      queryClient.invalidateQueries({ queryKey: ["solution-status"] });
    },
  });

  const handleSubmit = async (values: ManagementSolutionStatusFormData) => {
    if (editingItem) {
      await updateMutation.mutateAsync({
        id: editingItem.id,
        data: values,
      });
    } else {
      await createMutation.mutateAsync(values);
    }
  };

  const columns = [
    {
      title: "T/r",
      dataIndex: "id",
      key: "id",
      width: "10px",
      render: (text: string, record: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: t("solutionStatus.subject"),
      dataIndex: "subject_is_active",
      render: (val: boolean) =>
        val ? <Tag color="green">{t("yes")}</Tag> : <Tag>{t("no")}</Tag>,
    },
    {
      title: t("solutionStatus.recommendation"),
      dataIndex: "recommendation_is_active",
      render: (val: boolean) =>
        val ? <Tag color="blue">{t("yes")}</Tag> : <Tag>{t("no")}</Tag>,
    },
    {
      title: t("actions"),
      render: (_: any, record: ManagementSolutionStatusData) => (
        <Space>
          <Button
            onClick={() => {
              setEditingItem(record);
              form.setFieldsValue(record);
              setOpen(true);
            }}
          >
            <FaEdit />
          </Button>

          <Popconfirm
            title={t("solutionStatus.delete_confirm")}
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={t("solutionStatus.title")}
      extra={
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            setEditingItem(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          {t("create")}
        </Button>
      }
    >
      <Table
        rowKey="id"
        dataSource={data}
        loading={isLoading}
        columns={columns}
      />

      <SolutionStatusModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        editingItem={editingItem}
        form={form}
      />
    </Card>
  );
};

export default SolutionStatus;
