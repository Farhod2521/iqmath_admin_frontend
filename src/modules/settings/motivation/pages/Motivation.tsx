import {
  MotivationData,
  MotivationFormData,
  deleteMotivations,
  getMotivations,
  postMotivations,
  putMotivations,
} from "@/services";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";

const Motivation = () => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MotivationData | null>(null);
  const [form] = Form.useForm<MotivationFormData>();

  const { data = [], isLoading } = useQuery({
    queryKey: ["motivations-data"],
    queryFn: getMotivations,
  });

  const createMutation = useMutation({
    mutationFn: postMotivations,
    onSuccess: () => {
      message.success(t("motivationCreated"));
      setOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["motivations-data"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || t("errorOccurred"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: MotivationFormData;
    }) => putMotivations(id, payload),
    onSuccess: () => {
      message.success(t("motivationUpdated"));
      setOpen(false);
      setEditingItem(null);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["motivations-data"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || t("errorOccurred"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMotivations,
    onSuccess: () => {
      message.success(t("motivationDeleted"));
      queryClient.invalidateQueries({ queryKey: ["motivations-data"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || t("errorOccurred"));
    },
  });

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({
      title_uz: "",
      title_ru: "",
      content_uz: "",
      content_ru: "",
      is_active: true,
    });
    setOpen(true);
  };

  const handleEdit = (record: MotivationData) => {
    setEditingItem(record);
    form.setFieldsValue({
      title_uz: record.title_uz,
      title_ru: record.title_ru,
      content_uz: record.content_uz,
      content_ru: record.content_ru,
      is_active: record.is_active,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingItem) {
        updateMutation.mutate({ id: editingItem.id, payload: values });
      } else {
        createMutation.mutate(values);
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const columns: ColumnsType<MotivationData> = useMemo(
    () => [
      {
        title: t("scoreLog.tR"),
        key: "index",
        width: "10px",
        render: (_, __, index: number) => <span>{index + 1}</span>,
      },
      {
        title: t("motivations.title"),
        dataIndex: i18n.language === "uz" ? "title_uz" : "title_ru",
        key: "title",
      },
      {
        title: t("status"),
        dataIndex: "is_active",
        key: "is_active",
        width: 100,
        render: (value: boolean) =>
          value ? (
            <Tag color="green">{t("active")}</Tag>
          ) : (
            <Tag color="red">{t("inactive")}</Tag>
          ),
      },
      {
        title: t("motivations.createdAt"),
        dataIndex: "created_at",
        key: "created_at",
        width: 180,
        render: (val: string) => formatDateColumn(val),
      },
      {
        title: t("motivations.updatedAt"),
        dataIndex: "updated_at",
        key: "updated_at",
        width: 120,
        render: (val: string) => formatDateColumn(val),
      },
      {
        title: t("actions"),
        key: "actions",
        width: 120,
        render: (_, record) => (
          <Space>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleEdit(record)}
            >
              <FaEdit />
            </Button>

            <Popconfirm
              title={t("motivations.deleteMotivationConfirm")}
              okText={t("yes")}
              cancelText={t("no")}
              onConfirm={() => deleteMutation.mutate(record.id)}
            >
              <Button danger size="small" loading={deleteMutation.isPending}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [i18n.language, deleteMutation.isPending],
  );

  return (
    <Card
      title={t("motivations.motivations")}
      extra={
        <Button type="primary" onClick={handleCreate}>
          + {t("motivations.addMotivation")}
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data}
        columns={columns}
        scroll={{ x: 1000 }}
        pagination={false}
      />

      <Modal
        title={
          editingItem
            ? t("motivations.editMotivation")
            : t("motivations.newMotivation")
        }
        open={open}
        onCancel={() => {
          setOpen(false);
          setEditingItem(null);
          form.resetFields();
        }}
        onOk={handleSubmit}
        okText={editingItem ? t("save") : t("create")}
        cancelText={t("cancel")}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={t("motivations.titleUz")}
            name="title_uz"
            rules={[
              { required: true, message: t("motivations.enterTitleUz") },
              { min: 3, message: t("motivations.min3Chars") },
            ]}
          >
            <Input placeholder={t("motivations.titlePlaceholderUz")} />
          </Form.Item>

          <Form.Item
            label={t("motivations.titleRu")}
            name="title_ru"
            rules={[
              { required: true, message: t("motivations.enterTitleRu") },
              { min: 3, message: t("motivations.min3Chars") },
            ]}
          >
            <Input placeholder={t("motivations.titlePlaceholderRu")} />
          </Form.Item>

          <Form.Item
            label={t("motivations.contentUz")}
            name="content_uz"
            rules={[
              { required: true, message: t("motivations.enterContentUz") },
              { min: 10, message: t("motivations.min10Chars") },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder={t("motivations.contentPlaceholderUz")}
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            label={t("motivations.contentRu")}
            name="content_ru"
            rules={[
              { required: true, message: t("motivations.enterContentRu") },
              { min: 10, message: t("motivations.min10Chars") },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder={t("motivations.contentPlaceholderRu")}
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            label={t("status")}
            name="is_active"
            valuePropName="checked"
            tooltip={t("statusTooltip")}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Motivation;
