import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ModalTag = ({ open, onClose, onSubmit, loading, initialValues }: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText={t("save")}
      cancelText={t("cancel")}
      title={
        initialValues ? t("tags.modal.editTitle") : t("tags.modal.createTitle")
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label={t("tags.modal.name")}
          rules={[{ required: true, message: t("tags.modal.required") }]}
        >
          <Input placeholder={t("tags.modal.placeholder")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalTag;