import {
  Button,
  Card,
  Form,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  getPaymentsSubscriptions,
  PaymentsSubscriptionsData,
  PaymentsSubscriptionsFormData,
  postPaymentsSubscriptions,
  putPaymentsSubscriptions,
} from "../services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ModalSubscriptions from "../components/ModalSubscriptions";
import { formatDateColumn } from "@/shared/components/tables/formatters";

const Subscriptions = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedRecord, setSelectedRecord] =
    useState<PaymentsSubscriptionsData | null>(null);
  const [form] = Form.useForm();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["payments-subscriptions-data"],
    queryFn: getPaymentsSubscriptions,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (values: PaymentsSubscriptionsFormData) =>
      postPaymentsSubscriptions(values),
    onSuccess: () => {
      toast.success("Obuna muvaffaqiyatli qo'shildi");
      queryClient.invalidateQueries({
        queryKey: ["payments-subscriptions-data"],
      });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: number;
      values: PaymentsSubscriptionsFormData;
    }) => putPaymentsSubscriptions(id, values),
    onSuccess: () => {
      toast.success("Obuna muvaffaqiyatli tahrirlandi");
      queryClient.invalidateQueries({
        queryKey: ["payments-subscriptions-data"],
      });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  // Delete mutation
  //   const deleteMutation = useMutation({
  //     mutationFn: (id: number) =>
  //       axiosApi.delete(`/payments/superadmin/subscriptions/${id}/`),
  //     onSuccess: () => {
  //       message.success("Obuna muvaffaqiyatli o'chirildi");
  //       queryClient.invalidateQueries({
  //         queryKey: ["payments-subscriptions-data"],
  //       });
  //     },
  //     onError: (error) => {
  //       handleApiError(error);
  //     },
  //   });

  useEffect(() => {
    if (isError) {
      handleApiError(isError);
    }
  }, [isError]);

  const handleCreate = () => {
    setModalType("create");
    setSelectedRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: PaymentsSubscriptionsData) => {
    setModalType("edit");
    setSelectedRecord(record);
    form.setFieldsValue({
      student: {
        value: record.student_id,
        label: record.student_name,
      },
      student_name: record.student_name,
      start_date: dayjs(record.start_date),
      end_date: dayjs(record.end_date),
      is_paid: record.is_paid,
    });
    setModalVisible(true);
  };

  //   const handleDelete = (id: number) => {
  //     deleteMutation.mutate(id);
  //   };

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      start_date: values.start_date.toISOString(),
      end_date: values.end_date.toISOString(),
    };

    if (modalType === "create") {
      createMutation.mutate(formattedValues);
    } else if (modalType === "edit" && selectedRecord) {
      updateMutation.mutate({ id: selectedRecord.id, values: formattedValues });
    }
  };

  const handleClose = () => {
    setModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    if (isError) {
      handleApiError(isError);
    }
  }, [isError]);

  const columns = [
    {
      title: t("tR"),
      key: "id",
      width: 80,
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: t("students"),
      dataIndex: "student_name",
      key: "student_name",
      render: (text: string, record: PaymentsSubscriptionsData) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: "12px", color: "#999" }}>
            {record.student_phone}
          </div>
        </div>
      ),
    },
    {
      title: t("startDate"),
      dataIndex: "start_date",
      key: "start_date",
      render: (date: string) => formatDateColumn(date),
    },
    {
      title: t("endDate"),
      dataIndex: "end_date",
      key: "end_date",
      render: (date: string) => formatDateColumn(date),
    },
    {
      title: t("nextCharge"),
      dataIndex: "next_payment_date",
      key: "next_payment_date",
      render: (date: string) => formatDateColumn(date),
    },
    {
      title: t("status"),
      dataIndex: "is_active",
      key: "is_active",
      render: (active: boolean) => (
        <Tag color={active ? "success" : "error"}>
          {active ? t("statusActive") : t("statusInactive")}
        </Tag>
      ),
    },
    {
      title: t("paymentGateway"),
      dataIndex: "is_paid",
      key: "is_paid",
      render: (paid: boolean) => (
        <span style={{ color: paid ? "#52c41a" : "#faad14" }}>
          {paid ? "To'langan" : "To'lanmagan"}
        </span>
      ),
    },
    {
      title: t("actions"),
      key: "actions",
      width: 150,
      render: (_: any, record: PaymentsSubscriptionsData) => (
        <Space>
          <Tooltip title={t("update")}>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          {/* <Popconfirm
            title="Obunani o'chirish"
            description="Rostdan ham ushbu obunani o'chirmoqchimisiz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              O'chirish
            </Button>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={t("subscriptions.title")}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          {t("adding")}
        </Button>
      }
    >
      <Table
        dataSource={data?.results}
        scroll={{ x: 1000 }}
        rowKey="id"
        size="small"
        columns={columns}
        loading={isLoading}
        pagination={{
          showTotal: (total) => t("totalSubscriptions"),
        }}
        // // pagination={false}
      />
      <ModalSubscriptions
        onClose={handleClose}
        form={form}
        modalType={modalType}
        modalVisible={modalVisible}
        handleSubmit={handleSubmit}
      />
    </Card>
  );
};

export default Subscriptions;
