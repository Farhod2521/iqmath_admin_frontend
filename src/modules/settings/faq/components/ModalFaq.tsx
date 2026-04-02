import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { ManagementFaqData } from "@/services";

const { TextArea } = Input;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  loading: boolean;
  initialValues?: ManagementFaqData | null;
};

const ModalFaq = ({
  open,
  onClose,
  onSubmit,
  loading,
  initialValues,
}: Props) => {
  const [form] = Form.useForm();

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
      title={initialValues ? "Tahrirlash" : "Yangi FAQ"}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="question"
          label="Savol"
          rules={[{ required: true, message: "Savolni kiriting" }]}
        >
          <Input placeholder="Savolni yozing" />
        </Form.Item>

        <Form.Item
          name="answer"
          label="Javob (HTML)"
          rules={[{ required: true, message: "Javobni kiriting" }]}
        >
          <TextArea rows={5} placeholder="Javobni yozing" />
        </Form.Item>

        <Form.Item name="url" label="YouTube havola">
          <Input placeholder="https://youtube.com/..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFaq;
