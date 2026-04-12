import {
  deleteManagementUploadSetting,
  getManagementUploadSettings,
  postManagementUploadSetting,
  putManagementUploadSetting,
} from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import {
  Button,
  Card,
  Form,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import UploadSettingsModal from "../components/UploadSettingsModal";
import { DeleteOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";

const UploadSettings = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  // GET
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["upload-settings"],
    queryFn: getManagementUploadSettings,
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  // CREATE / UPDATE
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      if (editing) {
        return putManagementUploadSetting(editing.id, values);
      }
      return postManagementUploadSetting(values);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["upload-settings"] });
      setOpen(false);
      form.resetFields();
    },
    onError: handleApiError,
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (values: number) => deleteManagementUploadSetting(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["upload-settings"] });
    },
    onError: (err) => handleApiError(err),
  });

  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
    },
    {
      title: t("uploadSettings.maxSize"),
      dataIndex: "max_size_mb",
    },
    {
      title: t("uploadSettings.updatedAt"),
      dataIndex: "updated_at",
      render: (val: string) => formatDateColumn(val),
    },
    {
      title: t("action"),
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
            title={t("uploadSettings.confirmDelete")}
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
      title={t("uploadSettings.title")}
      extra={
        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          + {t("uploadSettings.add")}
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data}
        columns={columns}
      />

      <UploadSettingsModal
        open={open}
        onClose={() => setOpen(false)}
        initialValues={editing}
        onSubmit={(values) => mutation.mutate(values)}
      />
    </Card>
  );
};

export default UploadSettings;
