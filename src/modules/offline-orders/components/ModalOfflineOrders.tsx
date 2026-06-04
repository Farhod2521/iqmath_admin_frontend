import { BookOfflineOrdersFormData, putBookOfflineOrders } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, Form, Input, InputNumber, Modal, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { deliveryOptions } from "../utils/options";
import TextArea from "antd/es/input/TextArea";

const Item = Form.Item;

type Props = {
  open: boolean;
  onClose: () => void;
  selected?: any;
};

const ModalOfflineOrders = ({ open, onClose, selected }: Props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: BookOfflineOrdersFormData;
    }) => putBookOfflineOrders(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["data-offline-orders"],
      });
      onClose();
      form.resetFields();
    },
  });

  const handleOk = async () => {
    const values = await form.validateFields();

    updateMutation.mutate({
      id: selected?.id,
      data: values,
    });
  };

  return (
    <Modal
      open={open}
      title="Buyurtma holatini yangilash"
      onCancel={onClose}
      onOk={handleOk}
      okText={t("save")}
      cancelText={t("cancel")}
      confirmLoading={updateMutation.isPending}
    >
      <Form form={form} layout="vertical" initialValues={selected}>
        <Item name="delivery_status" label={t("deliveryStatus")}>
          <Select
            placeholder={t("deliveryStatus")}
            className="w-50!"
            options={deliveryOptions}
            allowClear
          />
        </Item>

        <Item
          name="admin_note"
          label={t("reason")}
          rules={[{ required: true, message: t("required") }]}
        >
          <TextArea rows={2} placeholder={t("reason")} />
        </Item>
      </Form>
    </Modal>
  );
};

export default ModalOfflineOrders;
