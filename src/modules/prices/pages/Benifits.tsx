import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, Popconfirm, Space, Table, Tag } from "antd";
import React, { useMemo, useState } from "react";
import {
  deleteSubscriptionBenefits,
  getSubscriptionBenefits,
  postSubscriptionBenefits,
  putSubscriptionBenefits,
  SubscriptionBenefitsData,
  SubscriptionBenefitsFormData,
} from "../services";
import { GiSparkles } from "react-icons/gi";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { handleApiError } from "@/shared/utils/handleApiError";
import BenefitsModal from "../components/benefits/BenefitsModal";

const Benifits = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [dataId, setDataId] = useState<number>();

  const handleShow = () => {
    setOpenModal(true);
    form.resetFields();
  };
  const handleClose = () => {
    setOpenModal(false);
    setDataId(undefined);
    form.resetFields();
  };

  const { data, isLoading } = useQuery<SubscriptionBenefitsData[]>({
    queryKey: ["subscription-benefits"],
    queryFn: getSubscriptionBenefits,
  });

  const handleShowEdit = (row: SubscriptionBenefitsData) => {
    setDataId(row.id);
    form.setFieldsValue({
      title_uz: row.title_uz,
      title_ru: row.title_ru,
      description_uz: row.description_uz,
      description_ru: row.description_ru,
      is_active: row.is_active,
    } as any);
    setOpenModal(true);
  };

  const createMutation = useMutation({
    mutationFn: postSubscriptionBenefits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-benefits"] });
      toast.success(t("createdSuccessfully") || "Yaratildi");
      handleClose();
    },
    onError: (err: any) => handleApiError(err),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: SubscriptionBenefitsFormData;
    }) => putSubscriptionBenefits(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-benefits"] });
      toast.success(t("updatedSuccessfully") || "Yangilandi");
      handleClose();
    },
    onError: (err: any) => handleApiError(err),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteSubscriptionBenefits(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-benefits"] });
      toast.success(t("deletedSuccessfully") || "O‘chirildi");
    },
    onError: (err: any) => handleApiError(err),
  });

  const columns = useMemo(
    () => [
      {
        title: t("title") + " (UZ)",
        dataIndex: "title_uz",
        key: "title_uz",
      },
      {
        title: t("title") + " (RU)",
        dataIndex: "title_ru",
        key: "title_ru",
      },
      {
        title: t("benefitsDescription") + " (UZ)",
        dataIndex: "description_uz",
        key: "description_uz",
      },
      {
        title: t("benefitsDescription") + " (RU)",
        dataIndex: "description_ru",
        key: "description_ru",
      },

      {
        title: t("status"),
        dataIndex: "is_active",
        key: "is_active",
        render: (status: boolean) =>
          status ? (
            <Tag color="green">{t("active") || "Faol"}</Tag>
          ) : (
            <Tag color="red">{t("inactive") || "NoFaol"}</Tag>
          ),
      },
      {
        title: t("action"),
        key: "action",
        width: 120,
        render: (_: any, row: SubscriptionBenefitsData) => (
          <Space>
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleShowEdit(row)}
            />
            <Popconfirm
              title={t("deleteConfirm")}
              okText={t("yes") || "Ha"}
              cancelText={t("no") || "Yo‘q"}
              onConfirm={() => deleteMutation.mutate(row.id)}
            >
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
                loading={deleteMutation.isPending}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [t, deleteMutation.isPending],
  );

  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (dataId) {
      updateMutation.mutate({ id: dataId, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-linear-to-r from-blue-100 to-indigo-100 rounded-xl">
              <GiSparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("subscriptionBenefits")}
            </h1>
          </div>
          <p className="text-sm text-gray-600 sm:text-base">
            {t("benefitsSubscriptionPlans")}
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="rounded-xl px-6"
          onClick={handleShow}
        >
          {t("newProfit")}
        </Button>
      </div>

      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        scroll={{ x: 1000 }}
      />

      <BenefitsModal
        form={form}
        open={openModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isEdit={!!dataId}
      />
    </Card>
  );
};

export default Benifits;
