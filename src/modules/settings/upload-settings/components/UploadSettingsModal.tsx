import { Form, Input, Modal } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
}

const UploadSettingsModal = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title={
        initialValues ? t("uploadSettings.edit") : t("uploadSettings.create")
      }
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={t("save")}
      cancelText={t("cancel")}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item
          name="max_size_mb"
          label={t("uploadSettings.maxSize")}
          rules={[{ required: true, message: t("uploadSettings.required") }]}
        >
          <Input type="number" min={1} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadSettingsModal;
