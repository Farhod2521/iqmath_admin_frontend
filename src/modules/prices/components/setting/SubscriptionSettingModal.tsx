import { Form, InputNumber, Modal } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  form: any;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
}

const SubscriptionSettingModal = ({
  open,
  form,
  onClose,
  onSubmit,
  initialValues,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      title={initialValues ? t("uploadSettings.edit") : t("create")}
      onCancel={onClose}
      okText={t("save")}
      cancelText={t("cancel")}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item
          name="free_trial_days"
          label={t("subscription.freeTrialDays")}
          rules={[{ required: true, message: t("required") }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubscriptionSettingModal;
