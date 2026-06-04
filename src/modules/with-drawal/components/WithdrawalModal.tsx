import React, { useEffect, useState } from "react";
import { Modal, Form, InputNumber, message } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchWithDrawalSetting,
  postWithDrawalSetting,
  putWithDrawalSetting,
  withdrawalSettingsData,
} from "@/services";

interface WithdrawalModalProps {
  visible: boolean;
  onClose: () => void;
  editingRecord: withdrawalSettingsData | null;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  visible,
  onClose,
  editingRecord,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const isEditing = !!editingRecord;

  useEffect(() => {
    if (visible && editingRecord) {
      form.setFieldsValue({
        min_amount: editingRecord.min_amount,
        max_amount: editingRecord.max_amount,
      });
    } else if (visible && !editingRecord) {
      form.resetFields();
    }
  }, [visible, editingRecord, form]);

  const createMutation = useMutation({
    mutationFn: postWithDrawalSetting,
    onSuccess: () => {
      message.success(t("settingCreated"));
      queryClient.invalidateQueries({ queryKey: ["data-withdrawal"] });
      handleClose();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || t("createFailed"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      putWithDrawalSetting(id, data),
    onSuccess: () => {
      message.success(t("settingUpdated"));
      queryClient.invalidateQueries({ queryKey: ["data-withdrawal"] });
      handleClose();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || t("updateFailed"));
    },
  });

  const patchMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      patchWithDrawalSetting(id, data),
    onSuccess: () => {
      message.success(t("settingUpdated"));
      queryClient.invalidateQueries({ queryKey: ["data-withdrawal"] });
      handleClose();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error || t("updateFailed"));
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (values.min_amount >= values.max_amount) {
        message.error(t("minAmountLessThanmaxAmount"));
        return;
      }

      setLoading(true);

      if (isEditing) {
        const originalValues = {
          min_amount: editingRecord.min_amount,
          max_amount: editingRecord.max_amount,
        };

        // Check if both fields changed or only one
        if (
          values.min_amount !== originalValues.min_amount &&
          values.max_amount !== originalValues.max_amount
        ) {
          // Both fields changed - use PUT
          await updateMutation.mutateAsync({
            id: editingRecord.id,
            data: values,
          });
        } else {
          // Only one field changed - use PATCH
          const changedData: any = {};
          if (values.min_amount !== originalValues.min_amount) {
            changedData.min_amount = values.min_amount;
          }
          if (values.max_amount !== originalValues.max_amount) {
            changedData.max_amount = values.max_amount;
          }

          await patchMutation.mutateAsync({
            id: editingRecord.id,
            data: changedData,
          });
        }
      } else {
        await createMutation.mutateAsync(values);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
    setLoading(false);
  };

  return (
    <Modal
      title={isEditing ? t("editSetting") : t("addSetting")}
      open={visible}
      onCancel={handleClose}
      onOk={handleSubmit}
      okText={t("save")}
      cancelText={t("cancel")}
      confirmLoading={loading}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          min_amount: 0,
          max_amount: 0,
        }}
      >
        <Form.Item
          name="min_amount"
          label={t("minAmount")}
          rules={[
            { required: true, message: t("pleaseEnterminAmount") },
            { type: "number", min: 0, message: t("minAmountMustBePositive") },
          ]}
        >
          <InputNumber
            className="w-full"
            min={0}
            step={1000}
            precision={2}
            placeholder={t("EnterminAmount")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            // parser={(value) =>
            //   value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            // }
          />
        </Form.Item>

        <Form.Item
          name="max_amount"
          label={t("maxAmount")}
          rules={[
            { required: true, message: t("pleaseEntermaxAmount") },
            { type: "number", min: 0, message: t("maxAmountMustBePositive") },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const minAmount = getFieldValue("min_amount");
                if (value && minAmount && value <= minAmount) {
                  return Promise.reject(
                    new Error(t("maxAmountGreaterThanminAmount")),
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <InputNumber
            className="w-full"
            min={0}
            step={1000}
            precision={2}
            placeholder={t("EntermaxAmount")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            // parser={(value) =>
            //   value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            // }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WithdrawalModal;
