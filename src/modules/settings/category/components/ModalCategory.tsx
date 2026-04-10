import { Form, Input, Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  form: any;
  handleSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
  dataId: number | undefined;
};

const ModalCategory = ({
  form,
  handleSubmit,
  isOpen,
  dataId,
  onClose,
}: Props) => {
  const { t } = useTranslation();

  const title = dataId
    ? t("categories.modal.editTitle")
    : t("categories.modal.createTitle");

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleSubmit}
      okText={t("categories.modal.save")}
      cancelText={t("categories.modal.cancel")}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label={t("categories.modal.name")}
          rules={[
            { required: true, message: t("categories.modal.nameRequired") },
          ]}
        >
          <Input placeholder={t("categories.modal.namePlaceholder")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCategory;