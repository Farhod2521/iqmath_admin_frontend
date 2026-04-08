// SolutionStatusModal.tsx

import { Modal, Form, Switch } from "antd";
import React, { useEffect } from "react";
import {
  ManagementSolutionStatusData,
  ManagementSolutionStatusFormData,
} from "@/services";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: ManagementSolutionStatusFormData) => Promise<void>;
  confirmLoading: boolean;
  editingItem: ManagementSolutionStatusData | null;
  form: any;
}

const SolutionStatusModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
  editingItem,
  form,
}: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (editingItem) {
      form.setFieldsValue(editingItem);
    }
  }, [editingItem]);

  return (
    <Modal
      title={t("solutionStatus.title")}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => onSubmit(values)}
      >
        <Form.Item
          name="subject_is_active"
          label={t("solutionStatus.subject")}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="recommendation_is_active"
          label={t("solutionStatus.recommendation")}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SolutionStatusModal;
