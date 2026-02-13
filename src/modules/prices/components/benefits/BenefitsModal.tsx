import React from "react";
import { Checkbox, Form, Input, Modal } from "antd";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  handleSubmit: () => void;
  handleClose: () => void;
  form: any;
  isEdit: boolean;
  loading?: boolean;
};

const BenefitsModal: React.FC<Props> = ({
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
      title={
        <div>
          <h3 className="text-xl font-bold text-gray-900 sm:text-xl">
            {isEdit ? t("editProfit") : t("newProft")}
          </h3>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            {isEdit ? t("editProfit") : t("newProft")}
          </p>
        </div>
      }
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={{ is_active: true }}
      >
        {/* TITLE UZ */}
        <Form.Item
          label={`${t("title")} (UZ)`}
          name="title_uz"
          rules={[{ required: true, message: t("enterTitleUz") }]}
        >
          <Input placeholder={t("exampleTitleUz")} />
        </Form.Item>

        {/* TITLE RU */}
        <Form.Item
          label={`${t("title")} (RU)`}
          name="title_ru"
          rules={[{ required: true, message: t("enterTitleRu") }]}
        >
          <Input placeholder={t("exampleTitleRu")} />
        </Form.Item>

        {/* DESCRIPTION UZ */}
        <Form.Item
          label={`${t("benefitsDescription")} (UZ)`}
          name="description_uz"
          rules={[{ required: true, message: t("enterDescriptionUz") }]}
        >
          <Input.TextArea
            rows={3}
            placeholder={t("exampleDescriptionUz")}
            showCount
            maxLength={300}
          />
        </Form.Item>

        {/* DESCRIPTION RU */}
        <Form.Item
          label={`${t("benefitsDescription")} (RU)`}
          name="description_ru"
          rules={[{ required: true, message: t("enterDescriptionRu") }]}
        >
          <Input.TextArea
            rows={3}
            placeholder={t("exampleDescriptionRu")}
            showCount
            maxLength={300}
          />
        </Form.Item>

        {/* STATUS (Card checkbox) */}
        <Form.Item name="is_active" valuePropName="checked" label={t("status")}>
          <div
            className={`p-3 sm:p-4 rounded-xl border transition ${
              isActive
                ? "border-blue-300 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
            // card bosilganda ham toggle bo‘lsin
            onClick={() => form.setFieldValue("is_active", !isActive)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                form.setFieldValue("is_active", !isActive);
              }
            }}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={!!isActive}
                className="mt-1"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  form.setFieldValue("is_active", e.target.checked)
                }
              />

              <div className="min-w-0">
                <div className="text-sm sm:text-base font-medium text-gray-800">
                  {t("activeStatus")}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  {t("checkedProfitVisibe")}
                </div>
              </div>
            </div>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BenefitsModal;
