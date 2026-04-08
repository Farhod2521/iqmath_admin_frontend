import React from "react";
import { Checkbox, Form, Input, Modal, Switch } from "antd";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  handleSubmit: () => void;
  handleClose: () => void;
  form: any;
  isEdit: boolean;
  loading?: boolean;
};

const toSlug = (text: string) =>
  String(text || "")
    .trim()
    .toLowerCase()
    // uz/ru harflarini soddalashtirish
    .replace(/['"]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-а-яё]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const CategoryModal: React.FC<Props> = ({
  open,
  handleSubmit,
  handleClose,
  form,
  isEdit,
  loading = false,
}) => {
  const { t } = useTranslation();
  const isActive = Form.useWatch("is_active", form);

  return (
    <Modal
      open={open}
      onOk={handleSubmit}
      onCancel={handleClose}
      okText={isEdit ? t("save") : t("create")}
      cancelText={t("cancel")}
      confirmLoading={loading}
      title={isEdit ? t("editCategory") : t("newCategory")}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={{ is_active: true }}
      >
        <Form.Item
          label={`${t("title")} (UZ)`}
          name="title_uz"
          rules={[{ required: true, message: t("enterNameUz") }]}
        >
          <Input
            placeholder={t("exampleUz")}
            onChange={(e) => {
              const currentSlug = form.getFieldValue("slug");
              if (
                !isEdit &&
                (!currentSlug || String(currentSlug).trim() === "")
              ) {
                form.setFieldValue("slug", toSlug(e.target.value));
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label={`${t("title")} (RU)`}
          name="title_ru"
          rules={[{ required: true, message: t("enterNameRu") }]}
        >
          <Input placeholder="Например: Самый выгодный" />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            { required: true, message: t("enterSlug") },
            {
              pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/i,
              message: t("slugRules"),
            },
          ]}
        >
          <Input
            placeholder={t("exampleSlug")}
            onBlur={(e) => form.setFieldValue("slug", toSlug(e.target.value))}
          />
        </Form.Item>

        <Form.Item label={t("status")} name="is_active" valuePropName="checked">
          <div
            className={`p-3 sm:p-4 rounded-xl border transition ${
              isActive
                ? "border-blue-300 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <Checkbox checked={!!isActive} className="mt-1" />

              <div className="min-w-0">
                <div className="text-sm sm:text-base font-medium text-gray-800">
                  {t("activeStatus")}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  {t("checkedCategoryVisibe")}
                </div>
              </div>
            </div>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
