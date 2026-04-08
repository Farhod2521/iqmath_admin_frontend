import {
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SubscriptionPlansData } from "../../services";

interface Props {
  mode: string;
  isSubmitting: boolean;
  handleSubmit: () => Promise<void>;
  categoryOptions: {
    label: string;
    value: string;
  }[];
  handleClose: () => void;
  form: FormInstance<any>;
  isModalOpen: boolean;
  editingPlan: SubscriptionPlansData | null;
}

const ModalSubcriptionPlans = ({
  mode,
  isModalOpen,
  handleClose,
  handleSubmit,
  isSubmitting,
  form,
  categoryOptions,
  editingPlan,
}: Props) => {
  const { t } = useTranslation();

  const watchedBenefits = Form.useWatch("benefits", form);
  const wMonths = Form.useWatch("months", form);
  const wPrice = Form.useWatch("price_per_month", form);
  const wDiscount = Form.useWatch("discount_percent", form);

  const totalPrice = useMemo(() => {
    const months = Number(wMonths || 0);
    const price = Number(wPrice || 0);
    const disc = Number(wDiscount || 0);
    const discounted = price * (1 - disc / 100);
    return months * discounted;
  }, [wMonths, wPrice, wDiscount]);

  const moneyUZ = (n: number) =>
    new Intl.NumberFormat("uz-UZ").format(Math.round(Number(n || 0)));

  return (
    <Modal
      title={mode === "create" ? t("newPlansCreate") : t("plansEdit")}
      open={isModalOpen}
      onCancel={handleClose}
      onOk={handleSubmit}
      okText={mode === "create" ? t("create") : t("save")}
      cancelText={t("cancel")}
      okButtonProps={{ loading: isSubmitting }}
    >
      <Form form={form} layout="vertical" className="subscription-plan-form">
        <Form.Item
          label={
            <span className="text-[14px] font-medium text-[#1F2937]">
              {t("planName")}
            </span>
          }
          name="name"
          rules={[{ required: true, message: `${t("planName")}ni kiriting` }]}
          className="mb-5"
        >
          <Input
            placeholder="Masalan: Premium 3 oylik"
            className="px-3! py-2! "
          />
        </Form.Item>

        {mode === "edit" && (
          <Form.Item
            label={
              <span className="text-[15px] font-medium text-[#1F2937]">
                {t("categoryOptional")}
              </span>
            }
            name="category"
            className="mb-5"
          >
            <Select
              allowClear
              placeholder={t("selectCategory")}
              options={categoryOptions}
              className="custom-plan-select"
              popupClassName="custom-plan-dropdown"
            />
          </Form.Item>
        )}

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item
              label={
                <span className="text-[15px] font-medium text-[#1F2937]">
                  {t("numberMonths")}
                </span>
              }
              name="months"
              rules={[
                { required: true, message: `${t("numberMonths")}ni kiriting` },
              ]}
              className="mb-5"
            >
              <InputNumber
                min={1}
                className="w-full custom-plan-input-number"
                placeholder="1"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {" "}
            <Form.Item
              label={
                <span className="text-[15px] font-medium text-[#1F2937]">
                  {t("discount")} (%)
                </span>
              }
              name="discount_percent"
              className="mb-5"
            >
              <InputNumber
                min={0}
                max={100}
                className="w-full  "
                placeholder="0"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={
            <span className="text-[15px] font-medium text-[#1F2937]">
              {t("monthlyPrice")}
            </span>
          }
          name="price_per_month"
          rules={[{ required: true, message: t("enterPrice") }]}
          className="mb-5"
        >
          <Input
            placeholder="299000.00"
            className="rounded-xl border-[#D0D5DD] px-4 text-[16px] shadow-none hover:border"
          />
        </Form.Item>

        {mode === "edit" && (
          <Form.Item
            label={
              <span className="text-[15px] font-medium text-[#1F2937]">
                {t("benefits")}
              </span>
            }
            name="benefits"
            className="mb-3!"
          >
            <Checkbox.Group className="w-full">
              <div className="flex flex-col gap-3">
                {(editingPlan?.benefits || []).map((b) => (
                  <label
                    key={b.id}
                    className="flex items-start gap-3 rounded-xl border border-[#D0D5DD] bg-white px-4 py-2 cursor-pointer transition-all hover:border-[#98A2B3]"
                  >
                    <Checkbox value={b.id} className="mt-0.5" />
                    <div className="flex-1">
                      <div className="text-[14px] font-medium text-[#101828]">
                        {b.title}
                      </div>
                      {b.description && b.description !== b.title && (
                        <div className=" text-[12px] text-[#667085]">
                          {b.description}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        )}

        {mode === "edit" && (
          <div className="mb-5 text-[13px] text-[#667085]">
            {t("selectedBenefits")}:{" "}
            {Array.isArray(watchedBenefits) ? watchedBenefits.length : 0}
          </div>
        )}

        <Form.Item name="is_active" valuePropName="checked" className="mb-5">
          <Checkbox className="text-[15px] font-medium text-[#1F2937]">
            {t("active")}
          </Checkbox>
        </Form.Item>

        {mode === "edit" && (
          <div className="rounded-[14px] bg-[#EEF4FF] px-4 py-4">
            <div className="text-[15px] font-medium text-[#344054]">
              {t("totalPrice")}:
            </div>

            <div className="mt-2 text-[16px] text-[#98A2B3] line-through">
              {moneyUZ(Number(wMonths || 0) * Number(wPrice || 0))}{" "}
              {t("currency")}
            </div>

            <div className="mt-1 text-[18px] font-bold text-[#155EEF]">
              {moneyUZ(totalPrice)} {t("currency")}
            </div>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default ModalSubcriptionPlans;
