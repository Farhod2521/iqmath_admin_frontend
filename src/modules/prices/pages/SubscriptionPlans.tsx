import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import {
  deleteSubscriptionPlan,
  getSubscriptionPlans,
  postSubscriptionPlan,
  putSubscriptionPlan,
  SubscriptionPlanFormData,
  SubscriptionPlansData,
} from "../services";
import { handleApiError } from "@/shared/utils/handleApiError";
import SubscriptionPlansContent from "../components/plan/SubscriptionPlansContent";
import ModalSubcriptionPlans from "../components/plan/ModalSubcriptionPlans";

type Mode = "create" | "edit";

type PlanForm = SubscriptionPlanFormData & {
  category?: string; // editda ixtiyoriy
  benefits?: number[]; // editda checkboxlardan keladi
};

const SubscriptionPlans = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [mode, setMode] = useState<Mode>("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataId, setDataId] = useState<number | undefined>(undefined);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlansData | null>(
    null,
  );

  const [form] = Form.useForm<PlanForm>();

  const { data: plansRes } = useQuery({
    queryKey: ["subscription-plans-data"],
    queryFn: getSubscriptionPlans,
  });

  const plans = useMemo(() => plansRes ?? [], [plansRes]);

  // kategoriyalarni existing planlardan yig'ib olamiz
  const categoryOptions = useMemo(() => {
    const map = new Map<number, string>();
    plans.forEach((p) => {
      if (p.category?.id) map.set(p.category.id, p.category.title);
    });
    return Array.from(map.entries()).map(([id, title]) => ({
      label: title,
      value: String(id),
    }));
  }, [plans]);

  // ===== Mutations =====
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
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      putSubscriptionPlan(id, data),
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

  // ===== Modal open/close =====
  const openCreateModal = () => {
    setMode("create");
    setIsModalOpen(true);
    setDataId(undefined);
    setEditingPlan(null);

    form.resetFields();
    form.setFieldsValue({
      is_active: true,
      discount_percent: 0,
      months: 1,
    } as any);
  };

  const openEditModal = (plan: SubscriptionPlansData) => {
    setMode("edit");
    setIsModalOpen(true);
    setDataId(plan.id);
    setEditingPlan(plan);

    const selectedBenefits = (plan.benefits || [])
      .filter((b) => b.is_selected)
      .map((b) => b.id);

    form.setFieldsValue({
      name: plan.name,
      months: plan.months,
      price_per_month: String(plan.price_per_month ?? ""),
      discount_percent: Number(plan.discount_percent || 0),
      is_active: Boolean(plan.is_active),

      // editda ixtiyoriy
      category: plan.category?.id ? String(plan.category.id) : undefined,
      benefits: selectedBenefits,
    } as any);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setDataId(undefined);
    setEditingPlan(null);
    form.resetFields();
  };

  const handleDelete = (id: number) => deleteMutation.mutate(id);

  // ===== Submit =====
  const handleSubmit = async () => {
    const values = await form.validateFields();

    // payload base
    const basePayload: any = {
      name: String(values.name),
      months: Number(values.months),
      price_per_month: String(values.price_per_month),
      discount_percent: Number(values.discount_percent || 0),
      is_active: Boolean(values.is_active),
    };

    if (mode === "create") {
      //  create’da category/benefits yubormaymiz (UI ham ko‘rsatmaymiz)
      createMutation.mutate(basePayload);
      return;
    }

    //  edit’da category ixtiyoriy, benefits optional
    const editPayload: any = { ...basePayload };

    // category bo‘sh bo‘lsa umuman yubormaymiz
    if (values.category) editPayload.category = String(values.category);

    // benefits: [id, id, ...]
    if (Array.isArray(values.benefits)) editPayload.benefits = values.benefits;

    updateMutation.mutate({ id: dataId!, data: editPayload });
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Card title="" className="container border-none!">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("subscriptionPlans") || "Obuna rejalari"}
            </h1>
          </div>
          <p className="text-sm text-gray-600 sm:text-base">
            {t("manageSubscriptionPlans") ||
              "Barcha obuna rejalarini boshqaring"}
          </p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="rounded-xl px-6"
          onClick={openCreateModal}
        >
          {t("newPlans") || "Yangi reja"}
        </Button>
      </div>

      <SubscriptionPlansContent
        plans={plans}
        onEdit={openEditModal}
        onDelete={handleDelete}
        isDeleting={deleteMutation.isPending}
      />

      {/* MODAL */}
      <ModalSubcriptionPlans
        isSubmitting={isSubmitting}
        mode={mode}
        handleSubmit={handleSubmit}
        categoryOptions={categoryOptions}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        form={form}
        editingPlan={editingPlan}
      />
    </Card>
  );
};

export default SubscriptionPlans;
