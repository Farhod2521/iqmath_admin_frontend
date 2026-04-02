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

const ConversionRates = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<ManagementConversionRateData | null>(
    null,
  );

  // 🔥 GET
  const { data, isLoading, error } = useQuery({
    queryKey: ["conversion-rates"],
    queryFn: async () => {
      const res = await getManagementConversionRates();
      return res;
    },
  });

  useEffect(() => {
    if (error) handleApiError(error);
  }, [error]);

  //  CREATE
  const createMutation = useMutation({
    mutationFn: postManagementConversionRate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversion-rates"] });
      closeModal();
    },
    onError: (error) => handleApiError(error),
  });

  //  UPDATE
  const updateMutation = useMutation({
    mutationFn: putManagementConversionRate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversion-rates"] });
      closeModal();
    },
    onError: (error) => handleApiError(error),
  });

  // ❗ DELETE yo‘q API → fake qilib qo‘yamiz (yoki keyin qo‘shasan)
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

  //  EDIT
  const handleEdit = (record: ManagementConversionRateData) => {
    setEditData(record);
    form.setFieldsValue({
      coin_to_score: record.coin_to_score,
      coin_to_money: record.coin_to_money,
    });
    openModal();
  };

  // SUBMIT
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

  // TABLE
  const columns = [
    {
      title: "1 tangaga teng ball miqdori",
      dataIndex: "coin_to_score",
    },
    {
      title: "1 tangaga teng pul miqdori",
      dataIndex: "coin_to_money",
    },
    {
      title: "O'zgargan vaqti",
      dataIndex: "updated_at",
      render: (val: string) => formatDateColumn(val),
    },
    {
      title: "Amal",
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

          {/* <Popconfirm
            title="O'chirishni tasdiqlaysizmi?"
            okText="Ha"
            cancelText="Yo'q"
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
      title="Konversiya kurslari"
      extra={
        <Button type="primary" onClick={openModal}>
          Qo‘shish
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
        title={editData ? "Tahrirlash" : "Yangi qo‘shish"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="coin_to_score"
            label="1 tangaga teng ball"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="coin_to_money"
            label="1 tangaga teng pul"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ConversionRates;
