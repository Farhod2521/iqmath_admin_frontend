import {
  deleteManagementCategory,
  getManagementCategory,
  getManagementCategorys,
  ManagementCategoryData,
  postManagementCategorys,
  putManagementCategorys,
} from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Form, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import ModalCategory from "../components/ModalCategory";
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [dataId, setDataId] = useState<number>();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    form.resetFields();
    setDataId(undefined);
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["management-category"],
    queryFn: getManagementCategorys,
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  const handleRowChange = (id: number) => {
    getManagementCategory(id)
      .then((res) => {
        setDataId(res.id);
        form.setFieldsValue(res);
        openModal();
      })
      .catch(handleApiError);
  };

  const handleDelete = (id: number) => {
    deleteManagementCategory(id)
      .then(() => {
        toast.success(t("categories.deleted"));
        refetch();
      })
      .catch(handleApiError);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const fn = dataId
        ? putManagementCategorys(dataId, values)
        : postManagementCategorys(values);

      fn.then((res) => {
        toast.success(res?.message);
        closeModal();
        refetch();
      }).catch(handleApiError);
    });
  };

  const columns: ColumnsType<ManagementCategoryData> = [
    {
      title: t("categories.index"),
      render: (_, __, index) => index + 1,
    },
    {
      title: t("categories.name"),
      dataIndex: "title",
      render: (val: string) => val || "-",
    },
    {
      title: t("categories.action"),
      width: "10px",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleRowChange(record.id)}
          >
            <FaEdit />
          </Button>

          <Popconfirm
            title={t("categories.deleteConfirm")}
            okText={t("categories.yes")}
            cancelText={t("categories.no")}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card
      title={t("categories.title")}
      extra={
        <Button onClick={openModal} type="primary">
          + {t("categories.add")}
        </Button>
      }
    >
      <Table
        rowKey="id"
        dataSource={data}
        loading={isLoading}
        columns={columns}
        pagination={false}
      />

      <ModalCategory
        form={form}
        isOpen={isOpen}
        onClose={closeModal}
        handleSubmit={handleSubmit}
        dataId={dataId}
      />
    </Card>
  );
};

export default Category;