import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getManagementConversionRates,
  postManagementConversionRate,
  putManagementConversionRate,
  ManagementConversionRateData,
  ManagementConversionRateFormData,
} from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { formatDateColumn } from "@/shared/components/tables/formatters";
import { useTranslation } from "react-i18next";

const ConversionRates = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<ManagementConversionRateData | null>(
    null,
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["conversion-rates"],
    queryFn: getManagementConversionRates,
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  const createMutation = useMutation({
    mutationFn: postManagementConversionRate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversion-rates"] });
      closeModal();
    },
    onError: (error) => handleApiError(error),
  });

  const updateMutation = useMutation({
    mutationFn: putManagementConversionRate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversion-rates"] });
      closeModal();
    },
    onError: (error) => handleApiError(error),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log("delete id:", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversion-rates"] });
    },
  });

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setEditData(null);
    form.resetFields();
  };

  const handleEdit = (record: ManagementConversionRateData) => {
    setEditData(record);
    form.setFieldsValue({
      coin_to_score: record.coin_to_score,
      coin_to_money: record.coin_to_money,
    });
    openModal();
  };

  const handleSubmit = async () => {
    try {
      const values: ManagementConversionRateFormData =
        await form.validateFields();

      if (editData) {
        await updateMutation.mutateAsync(values);
      } else {
        await createMutation.mutateAsync(values);
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const columns = [
    {
      title: t("conversions.coinToScore"),
      dataIndex: "coin_to_score",
    },
    {
      title: t("conversions.coinToMoney"),
      dataIndex: "coin_to_money",
    },
    {
      title: t("conversions.updatedAt"),
      dataIndex: "updated_at",
      render: (val: string) => formatDateColumn(val),
    },
    {
      title: t("action"),
      render: (_: any, record: ManagementConversionRateData) => (
        <Space>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(record)}
          >
            <FaEdit />
          </Button>

          {/* DELETE future */}
          {/* <Popconfirm
            title={t("confirmDelete")}
            okText={t("yes")}
            cancelText={t("no")}
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={t("conversions.conversionRates")}
      extra={
        <Button type="primary" onClick={openModal}>
          {t("conversions.add")}
        </Button>
      }
    >
      <Table
        rowKey="id"
        dataSource={data ? [data] : []}
        loading={isLoading}
        columns={columns}
        bordered
        size="small"
        pagination={false}
      />

      <Modal
        open={isOpen}
        onCancel={closeModal}
        onOk={handleSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        title={editData ? t("conversions.edit") : t("conversions.createNew")}
        okText={editData ? t("save") : t("create")}
        cancelText={t("cancel")}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="coin_to_score"
            label={t("conversions.coinToScoreLabel")}
            rules={[
              { required: true, message: t("conversions.requiredField") },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="coin_to_money"
            label={t("conversions.coinToMoneyLabel")}
            rules={[
              { required: true, message: t("conversions.requiredField") },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ConversionRates;
