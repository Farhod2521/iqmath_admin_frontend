import {
  BookCategoriesData,
  deleteBookCategories,
  getBookCategories,
} from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, Popconfirm, Space, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import ModalBookCategories from "../components/ModalBookCategories";
import { formatDateColumn } from "@/shared/components/tables/formatters";

const BookCategories = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<BookCategoriesData | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookCategories"],
    queryFn: getBookCategories,
  });

  // DELETE - Remove category
  const deleteMutation = useMutation({
    mutationKey: ["deleteBookCategory"],
    mutationFn: deleteBookCategories,
    onSuccess: () => {
      toast.success(t("library.common.successDelete"));
      queryClient.invalidateQueries({ queryKey: ["bookCategories"] });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  const handleOpenModal = (category?: any) => {
    if (category) {
      setEditingCategory(category);
      form.setFieldsValue({
        name: category.name,
        is_active: category.is_active,
      });
    } else {
      setEditingCategory(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const columns = [
    {
      title: t("#"),
      dataIndex: "id",
      key: "id",
      width: "10px",
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: t("title"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("status"),
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active: boolean) => <Switch checked={is_active} disabled />,
    },
    {
      title: t("createdAt"),
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (created_at: string) => formatDateColumn(created_at),
    },
    {
      title: t("actions"),
      key: "actions",
      width: 150,
      render: (_: any, record: any) => (
        <Space>
          <Button
            variant="outlined"
            color="primary"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
          />
          <Popconfirm
            title={t("deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("yes")}
            cancelText={t("no")}
          >
            <Button variant="outlined" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={t("library.categories")}
      extra={
        <Button type="primary" onClick={() => handleOpenModal()}>
          {t("adding")}
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
        pagination={false}
      />

      <ModalBookCategories
        closeModal={handleCloseModal}
        form={form}
        editingCategory={editingCategory}
        isModalOpen={isModalOpen}
      />
    </Card>
  );
};

export default BookCategories;
