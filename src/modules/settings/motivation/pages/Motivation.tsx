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
      message.success("Motivatsiya yaratildi");
      setOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["motivations-data"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Xatolik yuz berdi");
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
      message.success("Motivatsiya yangilandi");
      setOpen(false);
      setEditingItem(null);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["motivations-data"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Xatolik yuz berdi");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMotivations,
    onSuccess: () => {
      message.success("Motivatsiya o'chirildi");
      queryClient.invalidateQueries({ queryKey: ["motivations-data"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Xatolik yuz berdi");
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
        title: "T/r",
        dataIndex: "id",
        key: "id",
        width: "10px",
        render: (text: string, record: any, index: number) => (
          <span>{index + 1}</span>
        ),
      },
      {
        title: "Sarlavha",
        dataIndex: i18n.language === "uz" ? "title_uz" : "title_ru",
        key: "title",
        // ellipsis: true,
        // width: 200,
      },
      {
        title: "Holati",
        dataIndex: "is_active",
        key: "is_active",
        width: 100,
        render: (value: boolean) =>
          value ? (
            <Tag color="green">Faol</Tag>
          ) : (
            <Tag color="red">Faol emas</Tag>
          ),
      },
      {
        title: "Yaratilgan",
        dataIndex: "created_at",
        key: "created_at",
        width: 180,
        render: (val: string) => formatDateColumn(val),
      },
      {
        title: "O'zgargan vaqti",
        dataIndex: "updated_at",
        key: "updated_at",
        width: 120,
        render: (val: string) => formatDateColumn(val),
      },
      {
        title: "Amallar",
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
              title="Motivatsiyani o'chirishni tasdiqlaysizmi?"
              okText="Ha"
              cancelText="Yo'q"
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
      title="Motivatsiyalar"
      extra={
        <Button type="primary" onClick={handleCreate}>
          + Motivatsiya qo'shish
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
        title={editingItem ? "Motivatsiyani tahrirlash" : "Yangi motivatsiya"}
        open={open}
        onCancel={() => {
          setOpen(false);
          setEditingItem(null);
          form.resetFields();
        }}
        onOk={handleSubmit}
        okText={editingItem ? "Saqlash" : "Yaratish"}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Sarlavha (O'zbek)"
            name="title_uz"
            rules={[
              { required: true, message: "Sarlavhani o'zbek tilida kiriting" },
              { min: 3, message: "Kamida 3 ta belgi bo'lishi kerak" },
            ]}
          >
            <Input placeholder="Motivatsiya sarlavhasi (O'zbek)" />
          </Form.Item>

          <Form.Item
            label="Sarlavha (Rus)"
            name="title_ru"
            rules={[
              { required: true, message: "Sarlavhani rus tilida kiriting" },
              { min: 3, message: "Kamida 3 ta belgi bo'lishi kerak" },
            ]}
          >
            <Input placeholder="Motivatsiya sarlavhasi (Rus)" />
          </Form.Item>

          <Form.Item
            label="Matn (O'zbek)"
            name="content_uz"
            rules={[
              { required: true, message: "Matnni o'zbek tilida kiriting" },
              { min: 10, message: "Kamida 10 ta belgi bo'lishi kerak" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Motivatsiya matni (O'zbek)"
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            label="Matn (Rus)"
            name="content_ru"
            rules={[
              { required: true, message: "Matnni rus tilida kiriting" },
              { min: 10, message: "Kamida 10 ta belgi bo'lishi kerak" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Motivatsiya matni (Rus)"
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            label="Holati"
            name="is_active"
            valuePropName="checked"
            tooltip="Faol holatda foydalanuvchilarga ko'rinadi"
          >
            <Switch checkedChildren="Faol" unCheckedChildren="Faol emas" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Motivation;
