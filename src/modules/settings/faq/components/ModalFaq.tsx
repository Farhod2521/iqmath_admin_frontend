import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const ModalFaq = ({ open, onClose, onSubmit, loading, initialValues }: any) => {
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
      okText={t("faqs.modal.save")}
      cancelText={t("faqs.modal.cancel")}
      title={
        initialValues ? t("faqs.modal.editTitle") : t("faqs.modal.createTitle")
      }
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="question_uz"
          label={t("faqs.modal.question") + " (UZ)"}
          rules={[
            { required: true, message: t("faqs.modal.questionRequired") },
          ]}
        >
          <Input placeholder={t("faqs.modal.questionPlaceholder")} />
        </Form.Item>
        <Form.Item
          name="question_ru"
          label={t("faqs.modal.question") + " (RU)"}
          rules={[
            { required: true, message: t("faqs.modal.questionRequired") },
          ]}
        >
          <Input placeholder={t("faqs.modal.questionPlaceholder")} />
        </Form.Item>

        <Form.Item
          name="answer_uz"
          label={t("faqs.modal.answer") + " (UZ)"}
          rules={[{ required: true, message: t("faqs.modal.answerRequired") }]}
        >
          <TextArea rows={5} placeholder={t("faqs.modal.answerPlaceholder")} />
        </Form.Item>

        <Form.Item
          name="answer_ru"
          label={t("faqs.modal.answer") + " (RU)"}
          rules={[{ required: true, message: t("faqs.modal.answerRequired") }]}
        >
          <TextArea rows={5} placeholder={t("faqs.modal.answerPlaceholder")} />
        </Form.Item>

        <Form.Item name="url" label={t("faqs.modal.video")}>
          <Input placeholder={t("faqs.modal.videoPlaceholder")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFaq;
