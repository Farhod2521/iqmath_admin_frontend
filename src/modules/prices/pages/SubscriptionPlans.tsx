import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, Table } from "antd";
import React, { useState } from "react";
import {
  deleteSubscriptionPlan,
  getSubscriptionPlans,
  postSubscriptionPlan,
  putSubscriptionPlan,
  SubscriptionPlanFormData,
} from "../services";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { handleApiError } from "@/shared/utils/handleApiError";
import SubscriptionPlansContent from "../components/plan/SubscriptionPlansContent";
import { PlusOutlined } from "@ant-design/icons";

const SubscriptionPlans = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form] = Form.useForm();
  const [dataId, setDataId] = useState<number>();
  const { t, i18n } = useTranslation();

  const handleShow = () => {
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setDataId(undefined);
    form.resetFields();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["subscription-plans-data"],
    queryFn: getSubscriptionPlans,
  });

  const createMutation = useMutation({
    mutationFn: postSubscriptionPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans-data"] });
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
      data: SubscriptionPlanFormData;
    }) => putSubscriptionPlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans-data"] });
      toast.success(t("updatedSuccessfully") || "Yangilandi");
      handleClose();
    },
    onError: (err: any) => handleApiError(err),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteSubscriptionPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-plans-data"] });
      toast.success(t("deletedSuccessfully") || "O‘chirildi");
    },
    onError: (err: any) => handleApiError(err),
  });

  const openEditModal = () => {
    //
  };

  function handleDelete(id: number) {
    if (window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      deleteMutation.mutate(id);
    }
  }

  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (dataId) {
      updateMutation.mutate({ id: dataId, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const isDeleting = deleteMutation.isPending;

  return (
    <Card title="" className="container border-none!">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("subscriptionPlans")}
            </h1>
          </div>
          <p className="text-sm text-gray-600 sm:text-base">
            {t("manageSubscriptionPlans")}
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="rounded-xl px-6"
          onClick={handleShow}
        >
          {t("newPlans")}
        </Button>
      </div>

      <SubscriptionPlansContent
        plans={data}
        onEdit={openEditModal}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </Card>
  );
};

export default SubscriptionPlans;
