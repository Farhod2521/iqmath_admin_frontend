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
import React, { useCallback, useEffect, useState } from "react";
import { FaEdit, FaRandom } from "react-icons/fa";
import ModalCategory from "../components/ModalCategory";
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isOpen, setisOpen] = useState(false);
  const [dataId, setDataId] = useState<number>();

  const openModal = () => setisOpen(true);
  const closeModal = () => {
    setisOpen(false);
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

  const columns: ColumnsType<ManagementCategoryData> = [
    {
      title: "T/r",
      key: "id",
      width: "10px",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Nomi",
      dataIndex: "title",
      key: "title",
      render: (val: string) => val || "-",
    },
    {
      title: "Amal",
      dataIndex: "id",
      key: "action",
      width: "10%",
      render: (val: number) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              color="blue"
              onClick={() => handleRowChange(val)}
            >
              <FaEdit />
            </Button>
            <Popconfirm
              title="Kategoriyani ochirmoqchimisz"
              okText={t("yes")}
              cancelText={t("no")}
              onConfirm={() => handleDelete(val)}
            >
              <Button variant="outlined" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleRowChange = (id: number) => {
    getManagementCategory(id)
      .then((res) => {
        setDataId(res.id);
        form.setFieldsValue(res);
        openModal();
      })
      .catch((err) => handleApiError(err));
  };

  const handleDelete = (id: number) => {
    deleteManagementCategory(id)
      .then((res) => {
        refetch();
      })
      .catch((err) => handleApiError(err));
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
      }).catch((err) => handleApiError(err));
    });
  };

  return (
    <Card
      title="Kategoriyalar"
      extra={
        <Button onClick={openModal} type="primary">
          + Kategoriya qo'shish
        </Button>
      }
    >
      <Table
        rowKey="id"
        dataSource={data}
        loading={isLoading}
        columns={columns}
        pagination={false}
        size="small"
        bordered
        scroll={{ x: 800 }}
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
