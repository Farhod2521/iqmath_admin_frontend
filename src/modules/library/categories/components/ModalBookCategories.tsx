import {
  BookCategoriesData,
  BookCategoriesFormData,
  postBookCategories,
  putBookCategories,
} from "@/services";
import { handleApiError } from "@/shared/utils/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Space, Switch } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type Props = {
  closeModal: () => void;
  editingCategory: BookCategoriesData | null;
  isModalOpen: boolean;
  form: any;
};

const ModalBookCategories = ({
  closeModal,
  editingCategory,
  isModalOpen,
  form,
}: Props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: ["createBookCategory"],
    mutationFn: postBookCategories,
    onSuccess: () => {
      toast.success(t("library.common.successCreate"));
      queryClient.invalidateQueries({ queryKey: ["bookCategories"] });
      closeModal();
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  // UPDATE - Edit category
  const updateMutation = useMutation({
    mutationKey: ["updateBookCategory"],
    mutationFn: ({ id, data }: { id: number; data: BookCategoriesFormData }) =>
      putBookCategories(id, data),
    onSuccess: () => {
      toast.success(t("library.common.successUpdate"));
      queryClient.invalidateQueries({ queryKey: ["bookCategories"] });
      closeModal();
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  const handleSubmit = (values: any) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <Modal
      title={
        editingCategory
          ? t("library.common.editCategory")
          : t("library.common.addCategory")
      }
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          is_active: true,
        }}
      >
        <Form.Item
          name="name"
          label={t("title")}
          rules={[
            { required: true, message: t("library.validation.required") },
            {
              min: 2,
              message: t("library.validation.min_length", { count: 2 }),
            },
          ]}
        >
          <Input placeholder={t("title")} />
        </Form.Item>

        <Form.Item name="is_active" label={t("status")} valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {editingCategory ? t("update") : t("create")}
            </Button>
            <Button onClick={closeModal}>{t("cancel")}</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalBookCategories;
